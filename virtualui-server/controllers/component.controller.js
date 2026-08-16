import Component from "../models/component.model.js";
import User from "../models/user.models.js";
import path from "path";
import fs from "fs";
import { execSync } from "child_process";

const runCommand = (command, cwd, label) => {
  try {
    return execSync(command, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"], // capture instead of inherit
      maxBuffer: 1024 * 1024 * 20, // 20MB, build logs can be long
    });
  } catch (error) {
    const stdout = error.stdout?.toString?.() || "";
    const stderr = error.stderr?.toString?.() || "";
    console.error(`[${label}] failed:\n${stdout}\n${stderr}`);
    const detail = (stderr || stdout || error.message || "").trim();
    // Trim to keep the response readable; full log is still in the server console above
    const truncated = detail.length > 2000 ? detail.slice(-2000) : detail;
    throw new Error(`${label} failed: ${truncated}`);
  }
};

// ==========================================
// SAVE COMPONENT
// ==========================================
export const saveComponent = async (req, res) => {
  try {
    const { name, code, props } = req.body;

    if (!name || !code) {
      return res.status(400).json({ message: "Name and code are required" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check duplicate logic for Admin
    if (user.role === "admin") {
      const existing = await Component.findOne({
        name,
        visibility: "public",
      });

      if (existing) {
        return res.status(400).json({
          message: "Admin cannot create duplicate public component name",
        });
      }
    }

    // Check duplicate logic for regular User
    if (user.role !== "admin") {
      const existing = await Component.findOne({
        name,
        owner: req.userId,
      });

      if (existing) {
        return res.status(400).json({
          message: "You already have a component with this name",
        });
      }
    }

    // Create and save component
    const component = await Component.create({
      name,
      code,
      props,
      owner: req.userId,
      visibility: user.role === "admin" ? "public" : "private",
    });

    return res.status(201).json(component);
  } catch (error) {
    console.error("Save component error:", error);
    return res.status(500).json({ message: error.message });
  }
};

// ==========================================
// PUBLISH COMPONENT TO NPM
// ==========================================
export const publishComponent = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        message: "Only admin can publish",
      });
    }

    const { componentId } = req.body;

    if (!componentId) {
      return res.status(400).json({ message: "Component ID is required" });
    }

    const component = await Component.findById(componentId);
    if (!component) {
      return res.status(404).json({
        message: "Component not found",
      });
    }

    if (component.owner.toString() !== req.userId.toString()) {
      return res.status(403).json({
        message: "You can only publish your own components",
      });
    }

    const libPath = path.join(process.cwd(), "../virtualui-lib");
    const componentDir = path.join(
      libPath,
      "src/components",
      component.name
    );
    const componentFile = path.join(
      componentDir,
      `${component.name}.jsx`
    );
    const indexFile = path.join(libPath, "src/index.js");

    // 1. Create component folder if it doesn't exist
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // 2. Write component JSX file
    fs.writeFileSync(componentFile, component.code, "utf8");

    // 3. Regenerate root index.js from what's actually on disk.
    // Rebuilding from scratch (instead of appending) means it self-corrects
    // even if a previous run left duplicate/stale export lines behind.
    const componentsRoot = path.join(libPath, "src/components");
    const componentFolders = fs.existsSync(componentsRoot)
      ? fs.readdirSync(componentsRoot, { withFileTypes: true })
          .filter((entry) => entry.isDirectory())
          .map((entry) => entry.name)
      : [];


    // const exportLines = componentFolders
    //   .filter((folderName) =>
    //     fs.existsSync(path.join(componentsRoot, folderName, `${folderName}.jsx`))
    //   )
    //   // Dedupe by folder name in case of case-sensitivity dupes on disk
    //   .filter((folderName, idx, arr) => arr.indexOf(folderName) === idx)
    //   .sort()
    //   .map(
    //     (folderName) =>
    //       `export { ${folderName} } from "./components/${folderName}/${folderName}.jsx";`
    //   ); 
    
const exportLines = componentFolders
  .filter((folderName) =>
    fs.existsSync(path.join(componentsRoot, folderName, `${folderName}.jsx`))
  )
  .filter((folderName, idx, arr) => arr.indexOf(folderName) === idx)
  .sort()
  .map((folderName) => {
    const filePath = path.join(componentsRoot, folderName, `${folderName}.jsx`);
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Does it have a named export matching the component name?
    // e.g. "export function Navbar", "export const Navbar =", "export class Navbar"
    const namedExportRegex = new RegExp(
      `export\\s+(?:function|const|class|let|var)\\s+${folderName}\\b`
    );
    // Or "export { Navbar }" / "export { Navbar as ... }"
    const namedBraceExportRegex = new RegExp(
      `export\\s*{[^}]*\\b${folderName}\\b[^}]*}`
    );

    const hasNamedExport =
      namedExportRegex.test(fileContent) || namedBraceExportRegex.test(fileContent);

    if (hasNamedExport) {
      return `export { ${folderName} } from "./components/${folderName}/${folderName}.jsx";`;
    }

    // Fall back to default export (covers `export default function ...`,
    // `export default () => {}`, `export default Navbar;`, etc.)
    return `export { default as ${folderName} } from "./components/${folderName}/${folderName}.jsx";`;
  });




    fs.writeFileSync(indexFile, exportLines.join("\n") + "\n", "utf8");

    // ------------------------------------
    // CLEAN OLD BUILD
    // ------------------------------------
    console.log("Cleaning old build...");
    const distPath = path.join(libPath, "dist");
    if (fs.existsSync(distPath)) {
      fs.rmSync(distPath, { recursive: true, force: true });
    }

    // ------------------------------------
    // BUILD LIBRARY
    // ------------------------------------
    console.log("Building library...");
    runCommand("npm run build", libPath, "Build");

    // ------------------------------------
    // UPDATE PACKAGE VERSION
    // ------------------------------------
    console.log("Updating package version...");
    runCommand("npm version patch --no-git-tag-version", libPath, "Version bump");

    // ------------------------------------
    // PUBLISH TO NPM
    // ------------------------------------
    console.log("Publishing to npm...");
    runCommand("npm publish --access public", libPath, "Publish");

    component.visibility = "public";
    component.npmPackage = "bitsnip-ui-library";
    await component.save();

    return res.status(200).json({
      message: "Component published successfully to npm",
      component,
    });
  } catch (error) {
    console.error("Error publishing component:", error);
    return res.status(500).json({
      message: error.message || "Failed to publish component",
    });
  }
};

// ==========================================
// GET ALL COMPONENTS
// ==========================================
export const getAllComponents = async (req, res) => {
  try {
    const components = await Component.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    if (!components) {
      return res.status(404).json({ message: "Components are not found" });
    }

    return res.status(200).json(components);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to get All Components ${error}` });
  }
};
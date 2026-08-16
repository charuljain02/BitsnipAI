var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.js
var index_exports = {};
__export(index_exports, {
  AnimatedCard: () => AnimatedCard,
  Breadcrumb: () => Breadcrumb,
  Button: () => Button,
  Card: () => Card,
  Footer: () => Footer,
  Modal: () => Modal,
  Navbar: () => Navbar,
  Pagination: () => Pagination,
  PasswordStrengthMeter: () => PasswordStrengthMeter,
  ProductCard: () => ProductCard,
  ProfileCard: () => ProfileCard,
  ProgressBar: () => ProgressBar,
  StatCard: () => StatCard,
  Stepper: () => Stepper,
  Tabs: () => Tabs,
  Tooltip: () => Tooltip
});
module.exports = __toCommonJS(index_exports);

// src/components/AnimatedCard/AnimatedCard.jsx
var import_react = __toESM(require("react"));
var AnimatedCard = ({
  title = "Premium Features",
  description = "Unlock all advanced capabilities with our premium plan",
  icon = "\u{1F48E}",
  accent = "#7c3aed",
  bg = "#0f172a",
  width = "280px",
  height = "180px",
  onHoverEffect = true,
  onClick = () => {
  }
}) => {
  const [hovered, setHovered] = (0, import_react.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "div",
    {
      onClick,
      onMouseEnter: () => onHoverEffect && setHovered(true),
      onMouseLeave: () => onHoverEffect && setHovered(false),
      style: {
        width,
        height,
        background: bg,
        borderRadius: "16px",
        padding: "24px",
        position: "relative",
        overflow: "hidden",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.08)"),
        cursor: "pointer",
        boxShadow: hovered ? "0 15px 30px rgba(0,0,0,0.5)" : "0 5px 15px rgba(0,0,0,0.3)",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.2s ease",
        fontFamily: "system-ui, sans-serif"
      }
    },
    /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "absolute",
      top: "-50px",
      right: "-50px",
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      background: alpha(accent, 0.1),
      filter: "blur(20px)",
      opacity: hovered ? 1 : 0,
      transition: "opacity 0.3s ease"
    } }),
    /* @__PURE__ */ import_react.default.createElement("div", { style: {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      background: alpha(accent, 0.2),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "24px",
      marginBottom: "16px",
      border: "1px solid " + alpha(accent, 0.3)
    } }, icon),
    /* @__PURE__ */ import_react.default.createElement("h3", { style: {
      fontSize: "16px",
      fontWeight: "700",
      color: "#fff",
      margin: "0 0 8px"
    } }, title),
    /* @__PURE__ */ import_react.default.createElement("p", { style: {
      fontSize: "13px",
      color: "rgba(255,255,255,0.6)",
      lineHeight: "1.5",
      margin: 0
    } }, description),
    /* @__PURE__ */ import_react.default.createElement("div", { style: {
      position: "absolute",
      bottom: "24px",
      right: "24px",
      width: "24px",
      height: "24px",
      borderRadius: "6px",
      background: alpha(accent, 0.3),
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
      transition: "transform 0.2s ease"
    } }, /* @__PURE__ */ import_react.default.createElement("svg", { width: "12", height: "12", viewBox: "0 0 15 15", fill: "none", stroke: "#fff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react.default.createElement("path", { d: "M8.5 1.5L14 7m0 0l-5.5 5.5M14 7H1" })))
  );
};

// src/components/Breadcrumb/Breadcrumb.jsx
function Breadcrumb({ items = ["Home", "Components", "Breadcrumb"] }) {
  return /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" } }, items.map((item, i) => /* @__PURE__ */ React.createElement("span", { key: i, style: { display: "flex", alignItems: "center", gap: "6px" } }, /* @__PURE__ */ React.createElement("span", { style: {
    color: i === items.length - 1 ? "#3be8ff" : "rgba(255,255,255,0.4)",
    fontWeight: i === items.length - 1 ? 600 : 400,
    cursor: i === items.length - 1 ? "default" : "pointer"
  } }, item), i < items.length - 1 && /* @__PURE__ */ React.createElement("span", { style: { color: "rgba(255,255,255,0.2)" } }, "/"))));
}

// src/components/Button/Button.jsx
var import_react2 = __toESM(require("react"));
var Button = ({
  text = "Click Me",
  bgColor = "#4f46e5",
  hoverColor = "#4338ca",
  textColor = "#ffffff",
  size = "medium",
  onClick = () => {
  }
}) => {
  const [isHovered, setIsHovered] = (0, import_react2.useState)(false);
  const sizeStyles = {
    small: { padding: "6px 12px", fontSize: "12px" },
    medium: { padding: "10px 20px", fontSize: "14px" },
    large: { padding: "14px 28px", fontSize: "16px" }
  };
  const styles = {
    backgroundColor: isHovered ? hoverColor : bgColor,
    color: textColor,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 600,
    transition: "background-color 0.2s ease, transform 0.2s ease",
    transform: isHovered ? "scale(1.03)" : "scale(1)",
    ...sizeStyles[size]
  };
  return /* @__PURE__ */ import_react2.default.createElement(
    "button",
    {
      style: styles,
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick
    },
    text
  );
};

// src/components/Card/Card.jsx
var import_react3 = __toESM(require("react"));
var Card = ({
  title = "Premium Card",
  description = "This is a beautifully designed card component with subtle animations.",
  accent = "#6366f1",
  bg = "#0f172a",
  width = "360px",
  padding = "24px",
  radius = "16px",
  shadow = true,
  border = false,
  hoverEffect = true
}) => {
  const [hovered, setHovered] = (0, import_react3.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react3.default.createElement(
    "div",
    {
      onMouseEnter: () => hoverEffect && setHovered(true),
      onMouseLeave: () => hoverEffect && setHovered(false),
      style: {
        background: bg,
        width,
        padding,
        borderRadius: radius,
        border: border ? "1px solid " + alpha(accent, 0.2) : "none",
        boxShadow: shadow ? "0 10px 30px rgba(0,0,0,0.4)" : "none",
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s, border-color 0.25s",
        transform: hovered && hoverEffect ? "translateY(-4px)" : "none",
        boxShadow: hovered && hoverEffect ? "0 15px 40px rgba(0,0,0,0.5)" : shadow ? "0 10px 30px rgba(0,0,0,0.4)" : "none"
      }
    },
    /* @__PURE__ */ import_react3.default.createElement("h3", { style: {
      fontSize: "18px",
      fontWeight: "700",
      color: "#fff",
      margin: "0 0 12px",
      lineHeight: "1.4"
    } }, title),
    /* @__PURE__ */ import_react3.default.createElement("p", { style: {
      fontSize: "14px",
      color: "rgba(255,255,255,0.65)",
      lineHeight: "1.6",
      margin: "0"
    } }, description),
    hovered && hoverEffect && /* @__PURE__ */ import_react3.default.createElement("div", { style: {
      position: "absolute",
      inset: "0",
      borderRadius: radius,
      background: alpha(accent, 0.03),
      pointerEvents: "none",
      border: "1px solid " + alpha(accent, 0.15)
    } })
  );
};

function Footer({ logo = "BitsnipAI", links = ["Home", "Features", "Pricing", "Contact"], copyright = "\xA9 2026 BitsnipAI. All rights reserved." }) {
  return /* @__PURE__ */ React.createElement("footer", { className: "w-full bg-[#040e11] border-t border-white/[0.06] px-6 py-8 text-white" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-lg font-bold text-[#3be8ff]" }, logo), /* @__PURE__ */ React.createElement("nav", { className: "flex flex-wrap gap-5 text-sm text-white/50" }, links.map((link) => /* @__PURE__ */ React.createElement("a", { key: link, href: "#", className: "hover:text-[#3be8ff] transition-colors" }, link))), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/30" }, copyright)));
}

function Modal({ title, isOpen = true, onClose, children }) {
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 } }, /* @__PURE__ */ React.createElement("div", { style: { background: "#0a1a1e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "16px", padding: "24px", width: "90%", maxWidth: "420px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" } }, /* @__PURE__ */ React.createElement("h3", { style: { color: "#fff", fontWeight: 700, fontSize: "16px" } }, title), /* @__PURE__ */ React.createElement("button", { onClick: onClose, style: { background: "transparent", border: "none", color: "rgba(255,255,255,0.5)", cursor: "pointer", fontSize: "18px" } }, "\xD7")), /* @__PURE__ */ React.createElement("div", { style: { color: "rgba(255,255,255,0.7)", fontSize: "14px" } }, children)));
}

var import_react4 = __toESM(require("react"));
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = (0, import_react4.useState)(false);
  const links = [
    { label: "Home", href: "#" },
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" }
  ];
  return /* @__PURE__ */ import_react4.default.createElement("nav", { className: "w-full bg-slate-900 border-b border-slate-800 text-white" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "w-full max-w-7xl mx-auto px-6 lg:px-8" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "h-20 flex items-center justify-between" }, /* @__PURE__ */ import_react4.default.createElement(
    "a",
    {
      href: "#",
      className: "flex items-center flex-shrink-0"
    },
    /* @__PURE__ */ import_react4.default.createElement("div", { className: "w-10 h-10 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center mr-3 shadow-lg shadow-cyan-400/10" }, /* @__PURE__ */ import_react4.default.createElement(
      "svg",
      {
        className: "w-6 h-6 text-cyan-400",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        xmlns: "http://www.w3.org/2000/svg"
      },
      /* @__PURE__ */ import_react4.default.createElement(
        "path",
        {
          d: "M13 2L3 14H12L11 22L21 10H12L13 2Z",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    )),
    /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-xl font-bold tracking-tight whitespace-nowrap" }, "Nova", /* @__PURE__ */ import_react4.default.createElement("span", { className: "text-cyan-400" }, "UI"))
  ), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hidden md:flex items-center ml-auto mr-10" }, links.map((link, index) => /* @__PURE__ */ import_react4.default.createElement(
    "a",
    {
      key: link.label,
      href: link.href,
      className: `
                  text-sm font-medium
                  text-slate-300
                  hover:text-cyan-400
                  transition-colors duration-200
                  whitespace-nowrap
                  ${index !== links.length - 1 ? "mr-8" : ""}
                `
    },
    link.label
  ))), /* @__PURE__ */ import_react4.default.createElement("div", { className: "hidden md:flex items-center flex-shrink-0" }, /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: "text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 mr-6 whitespace-nowrap"
    },
    "Sign In"
  ), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: "\n                px-5 py-2.5\n                rounded-lg\n                bg-cyan-400\n                text-slate-950\n                text-sm\n                font-semibold\n                hover:bg-cyan-300\n                active:bg-cyan-500\n                transition-all duration-200\n                shadow-lg shadow-cyan-400/20\n                whitespace-nowrap\n              "
    },
    "Get Started"
  )), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      onClick: () => setMobileMenuOpen(!mobileMenuOpen),
      className: "\n              md:hidden\n              w-10 h-10\n              flex items-center justify-center\n              rounded-lg\n              border border-slate-700\n              bg-slate-800\n              text-slate-300\n              hover:text-cyan-400\n              hover:border-cyan-400/40\n              transition-all duration-200\n            ",
      "aria-label": "Toggle navigation menu",
      "aria-expanded": mobileMenuOpen
    },
    mobileMenuOpen ? (
      /* X Icon */
      /* @__PURE__ */ import_react4.default.createElement(
        "svg",
        {
          className: "w-6 h-6",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor"
        },
        /* @__PURE__ */ import_react4.default.createElement(
          "path",
          {
            d: "M6 6L18 18M18 6L6 18",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        )
      )
    ) : (
      /* Hamburger Icon */
      /* @__PURE__ */ import_react4.default.createElement(
        "svg",
        {
          className: "w-6 h-6",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor"
        },
        /* @__PURE__ */ import_react4.default.createElement(
          "path",
          {
            d: "M4 6H20M4 12H20M4 18H20",
            strokeWidth: "2",
            strokeLinecap: "round"
          }
        )
      )
    )
  )), mobileMenuOpen && /* @__PURE__ */ import_react4.default.createElement("div", { className: "md:hidden border-t border-slate-800 py-6" }, /* @__PURE__ */ import_react4.default.createElement("div", { className: "flex flex-col" }, links.map((link) => /* @__PURE__ */ import_react4.default.createElement(
    "a",
    {
      key: link.label,
      href: link.href,
      onClick: () => setMobileMenuOpen(false),
      className: "\n                    py-3\n                    text-base\n                    font-medium\n                    text-slate-300\n                    hover:text-cyan-400\n                    transition-colors duration-200\n                  "
    },
    link.label
  )), /* @__PURE__ */ import_react4.default.createElement("div", { className: "h-px bg-slate-800 my-4" }), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: "\n                  py-3\n                  text-left\n                  text-base\n                  font-medium\n                  text-slate-300\n                  hover:text-white\n                  transition-colors duration-200\n                "
    },
    "Sign In"
  ), /* @__PURE__ */ import_react4.default.createElement(
    "button",
    {
      type: "button",
      className: "\n                  w-full\n                  mt-4\n                  px-5 py-3\n                  rounded-lg\n                  bg-cyan-400\n                  text-slate-950\n                  font-semibold\n                  hover:bg-cyan-300\n                  transition-colors duration-200\n                  shadow-lg shadow-cyan-400/20\n                "
    },
    "Get Started"
  )))));
}

// src/components/Pagination/Pagination.jsx
function Pagination({ totalPages = 5, currentPage, onPageChange }) {
  const [internalPage, setInternalPage] = React.useState(1);
  const page = currentPage || internalPage;
  const setPage = onPageChange || setInternalPage;
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1.5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPage(Math.max(1, page - 1)),
      disabled: page === 1,
      className: "w-8 h-8 rounded-lg text-sm text-white/50 hover:text-white bg-white/[0.04] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
    },
    "\u2039"
  ), Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: num,
      onClick: () => setPage(num),
      className: "w-8 h-8 rounded-lg text-sm font-medium border-none cursor-pointer transition-colors",
      style: {
        background: page === num ? "rgba(59,232,255,0.2)" : "rgba(255,255,255,0.04)",
        color: page === num ? "#3be8ff" : "rgba(255,255,255,0.5)"
      }
    },
    num
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setPage(Math.min(totalPages, page + 1)),
      disabled: page === totalPages,
      className: "w-8 h-8 rounded-lg text-sm text-white/50 hover:text-white bg-white/[0.04] border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
    },
    "\u203A"
  ));
}

// src/components/PasswordStrengthMeter/PasswordStrengthMeter.jsx
var import_react5 = __toESM(require("react"));
var PasswordStrengthMeter = ({ password = "", width = "300px" }) => {
  const getStrength = (pass) => {
    const length = pass.length;
    const hasNumber = /\d/.test(pass);
    const hasLetter = /[a-zA-Z]/.test(pass);
    const hasSpecial = /[^a-zA-Z0-9]/.test(pass);
    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (hasNumber) score++;
    if (hasLetter) score++;
    if (hasSpecial) score++;
    return Math.min(score, 5);
  };
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const strength = getStrength(password);
  const colors = ["#e11d48", "#f97316", "#f59e0b", "#84cc16", "#10b981"];
  const emojis = ["\u{1F621}", "\u{1F615}", "\u{1F610}", "\u{1F642}", "\u{1F60E}"];
  return /* @__PURE__ */ import_react5.default.createElement("div", { style: { width, fontFamily: "system-ui,sans-serif" } }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { height: "6px", borderRadius: "3px", background: "rgba(255,255,255,0.07)", overflow: "hidden", position: "relative", marginBottom: "10px" } }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { width: strength / 5 * 100 + "%", height: "100%", background: colors[strength], borderRadius: "3px", transition: "width 0.3s ease" } })), /* @__PURE__ */ import_react5.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "rgba(255,255,255,0.8)", fontWeight: "500" } }, /* @__PURE__ */ import_react5.default.createElement("span", { style: { fontSize: "18px" } }, emojis[strength]), strength === 0 && "Very Weak", strength === 1 && "Weak", strength === 2 && "Fair", strength === 3 && "Good", strength === 4 && "Strong"));
};

// src/components/ProductCard/ProductCard.jsx
var import_react6 = __toESM(require("react"));
var ProductCard = ({
  image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
  title = "Wireless Headphones",
  description = "Premium noise-cancelling with 30hr battery life",
  price = 199.99,
  currency = "$",
  rating = 4.5,
  reviews = 128,
  discount = 25,
  accent = "#6366f1",
  bg = "#0f172a",
  onAddToCart = () => {
  },
  onWishlist = () => {
  }
}) => {
  const [hovered, setHovered] = (0, import_react6.useState)(false);
  const [wishlisted, setWishlisted] = (0, import_react6.useState)(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return /* @__PURE__ */ import_react6.default.createElement(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        background: bg,
        borderRadius: "16px",
        overflow: "hidden",
        width: "280px",
        border: "1px solid rgba(255,255,255,0.08)",
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0,0,0,0.2)"
      }
    },
    /* @__PURE__ */ import_react6.default.createElement("div", { style: { position: "relative", padding: "16px" } }, discount > 0 && /* @__PURE__ */ import_react6.default.createElement("div", { style: {
      position: "absolute",
      top: "12px",
      left: "12px",
      padding: "4px 8px",
      borderRadius: "6px",
      background: "#e11d48",
      color: "#fff",
      fontSize: "11px",
      fontWeight: "700",
      zIndex: 1
    } }, "-", discount, "%"), /* @__PURE__ */ import_react6.default.createElement(
      "button",
      {
        onClick: () => {
          setWishlisted(!wishlisted);
          onWishlist();
        },
        style: {
          position: "absolute",
          top: "12px",
          right: "12px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1
        }
      },
      /* @__PURE__ */ import_react6.default.createElement("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: wishlisted ? accent : "none", stroke: wishlisted ? accent : "#fff", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react6.default.createElement("path", { d: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" }))
    ), /* @__PURE__ */ import_react6.default.createElement("div", { style: { width: "100%", height: "200px", position: "relative", overflow: "hidden", borderRadius: "12px" } }, /* @__PURE__ */ import_react6.default.createElement(
      "img",
      {
        src: image,
        alt: title,
        style: {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "transform 0.4s ease"
        }
      }
    ), /* @__PURE__ */ import_react6.default.createElement("div", { style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 40%)"
    } }))),
    /* @__PURE__ */ import_react6.default.createElement("div", { style: { padding: "0 16px 16px" } }, /* @__PURE__ */ import_react6.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" } }, /* @__PURE__ */ import_react6.default.createElement("h3", { style: { fontSize: "16px", fontWeight: "700", color: "#fff", margin: 0 } }, title), /* @__PURE__ */ import_react6.default.createElement("div", { style: { display: "flex", alignItems: "center", gap: "4px" } }, /* @__PURE__ */ import_react6.default.createElement("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "#f59e0b", stroke: "#f59e0b", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }, /* @__PURE__ */ import_react6.default.createElement("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })), /* @__PURE__ */ import_react6.default.createElement("span", { style: { fontSize: "13px", color: "rgba(255,255,255,0.8)" } }, rating), /* @__PURE__ */ import_react6.default.createElement("span", { style: { fontSize: "11px", color: "rgba(255,255,255,0.4)" } }, "(", reviews, ")"))), /* @__PURE__ */ import_react6.default.createElement("p", { style: { fontSize: "13px", color: "rgba(255,255,255,0.6)", margin: "0 0 12px", lineHeight: 1.5 } }, description), /* @__PURE__ */ import_react6.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" } }, /* @__PURE__ */ import_react6.default.createElement("div", { style: { display: "flex", alignItems: "baseline", gap: "6px" } }, /* @__PURE__ */ import_react6.default.createElement("span", { style: { fontSize: "18px", fontWeight: "800", color: accent } }, currency, price.toFixed(2)), discount > 0 && /* @__PURE__ */ import_react6.default.createElement("span", { style: { fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "line-through" } }, currency, (price * (100 / (100 - discount))).toFixed(2))), /* @__PURE__ */ import_react6.default.createElement(
      "button",
      {
        onClick: onAddToCart,
        style: {
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          background: "linear-gradient(90deg, " + accent + ", " + alpha(accent, 0.8) + ")",
          color: "#fff",
          fontSize: "13px",
          fontWeight: "700",
          cursor: "pointer",
          fontFamily: "inherit"
        }
      },
      "Add to Cart"
    )))
  );
};

// src/components/ProfileCard/ProfileCard.jsx
var import_react7 = __toESM(require("react"));
var ProfileCard = ({
  name = "Alexandra Chen",
  role = "Senior Product Designer",
  location = "San Francisco, CA",
  avatar = "https://i.pravatar.cc/150?img=47",
  coverColor = "#0F172A",
  accentColor = "#38BDF8",
  bio = "Crafting intuitive digital experiences at the intersection of design systems and human psychology.",
  stats = [
    { label: "Projects", value: "128" },
    { label: "Followers", value: "4.2k" },
    { label: "Following", value: "310" }
  ],
  tags = ["UI/UX", "Systems", "Figma", "React"],
  onFollow = null,
  onMessage = null,
  initialFollowed = false
}) => {
  const [hovered, setHovered] = (0, import_react7.useState)(false);
  const [followed, setFollowed] = (0, import_react7.useState)(initialFollowed);
  const [msgHovered, setMsgHovered] = (0, import_react7.useState)(false);
  const handleFollow = () => {
    setFollowed((f) => !f);
    onFollow == null ? void 0 : onFollow(!followed);
  };
  return /* @__PURE__ */ import_react7.default.createElement(
    "div",
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style: {
        width: "320px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        boxShadow: hovered ? "0 12px 24px rgba(0,0,0,0.12)" : "0 4px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
        fontFamily: "sans-serif"
      }
    },
    /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        style: {
          height: "90px",
          backgroundColor: coverColor,
          position: "relative"
        }
      }
    ),
    /* @__PURE__ */ import_react7.default.createElement("div", { style: { padding: "0 20px 20px", marginTop: "-45px" } }, /* @__PURE__ */ import_react7.default.createElement(
      "img",
      {
        src: avatar,
        alt: name,
        style: {
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          border: "4px solid #ffffff",
          objectFit: "cover",
          display: "block"
        }
      }
    ), /* @__PURE__ */ import_react7.default.createElement("div", { style: { marginTop: "12px" } }, /* @__PURE__ */ import_react7.default.createElement("h3", { style: { margin: 0, fontSize: "18px", fontWeight: 700, color: "#111827" } }, name), /* @__PURE__ */ import_react7.default.createElement("p", { style: { margin: "2px 0", fontSize: "14px", color: accentColor, fontWeight: 600 } }, role), /* @__PURE__ */ import_react7.default.createElement("p", { style: { margin: 0, fontSize: "13px", color: "#6b7280" } }, location)), /* @__PURE__ */ import_react7.default.createElement(
      "p",
      {
        style: {
          fontSize: "13px",
          color: "#4b5563",
          lineHeight: 1.5,
          margin: "12px 0"
        }
      },
      bio
    ), /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          marginBottom: "16px"
        }
      },
      tags.map((tag, i) => /* @__PURE__ */ import_react7.default.createElement(
        "span",
        {
          key: i,
          style: {
            fontSize: "11px",
            fontWeight: 600,
            padding: "4px 10px",
            borderRadius: "999px",
            backgroundColor: `${accentColor}20`,
            color: accentColor
          }
        },
        tag
      ))
    ), /* @__PURE__ */ import_react7.default.createElement(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          padding: "12px 0",
          borderTop: "1px solid #f3f4f6",
          borderBottom: "1px solid #f3f4f6",
          marginBottom: "16px"
        }
      },
      stats.map((stat, i) => /* @__PURE__ */ import_react7.default.createElement("div", { key: i, style: { textAlign: "center" } }, /* @__PURE__ */ import_react7.default.createElement("p", { style: { margin: 0, fontSize: "16px", fontWeight: 700, color: "#111827" } }, stat.value), /* @__PURE__ */ import_react7.default.createElement("p", { style: { margin: 0, fontSize: "12px", color: "#9ca3af" } }, stat.label)))
    ), /* @__PURE__ */ import_react7.default.createElement("div", { style: { display: "flex", gap: "8px" } }, /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        onClick: handleFollow,
        style: {
          flex: 1,
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          fontWeight: 600,
          fontSize: "13px",
          cursor: "pointer",
          backgroundColor: followed ? "#e5e7eb" : accentColor,
          color: followed ? "#374151" : "#ffffff",
          transition: "all 0.2s ease"
        }
      },
      followed ? "Following" : "Follow"
    ), /* @__PURE__ */ import_react7.default.createElement(
      "button",
      {
        onClick: () => onMessage == null ? void 0 : onMessage(),
        onMouseEnter: () => setMsgHovered(true),
        onMouseLeave: () => setMsgHovered(false),
        style: {
          flex: 1,
          padding: "10px",
          borderRadius: "8px",
          border: `1px solid ${accentColor}`,
          fontWeight: 600,
          fontSize: "13px",
          cursor: "pointer",
          backgroundColor: msgHovered ? `${accentColor}15` : "transparent",
          color: accentColor,
          transition: "all 0.2s ease"
        }
      },
      "Message"
    )))
  );
};

// src/components/ProgressBar/ProgressBar.jsx
function ProgressBar({ value = 65, label = "Progress" }) {
  return /* @__PURE__ */ React.createElement("div", { style: { width: "100%", maxWidth: "320px" } }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginBottom: "6px" } }, /* @__PURE__ */ React.createElement("span", { style: { color: "rgba(255,255,255,0.6)", fontSize: "12px" } }, label), /* @__PURE__ */ React.createElement("span", { style: { color: "#3be8ff", fontSize: "12px", fontWeight: 600 } }, value, "%")), /* @__PURE__ */ React.createElement("div", { style: { width: "100%", height: "8px", borderRadius: "999px", background: "rgba(255,255,255,0.06)", overflow: "hidden" } }, /* @__PURE__ */ React.createElement("div", { style: {
    width: `${value}%`,
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #3be8ff, #0ab5d4)",
    transition: "width 0.3s ease"
  } })));
}

// src/components/StatCard/StatCard.jsx
function StatCard({ label = "Total Revenue", value = "$24,500", change = "+12%" }) {
  const isPositive = change.startsWith("+");
  return /* @__PURE__ */ React.createElement("div", { style: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "16px",
    padding: "18px",
    width: "220px"
  } }, /* @__PURE__ */ React.createElement("p", { style: { color: "rgba(255,255,255,0.4)", fontSize: "12px", marginBottom: "8px" } }, label), /* @__PURE__ */ React.createElement("p", { style: { color: "#fff", fontSize: "24px", fontWeight: 700, marginBottom: "6px" } }, value), /* @__PURE__ */ React.createElement("span", { style: {
    fontSize: "11px",
    fontWeight: 600,
    color: isPositive ? "#34d399" : "#f87171",
    background: isPositive ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
    padding: "2px 8px",
    borderRadius: "999px"
  } }, change, " this month"));
}

// src/components/Stepper/Stepper.jsx
function Stepper({ steps = ["Account", "Profile", "Confirm"], currentStep }) {
  const [internalStep, setInternalStep] = React.useState(1);
  const active = currentStep || internalStep;
  return /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center" }, steps.map((label, i) => {
    const num = i + 1;
    const isDone = num < active;
    const isActive = num === active;
    return /* @__PURE__ */ React.createElement("div", { key: label, className: "flex items-center flex-1 last:flex-none" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center gap-1.5" }, /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
        style: {
          background: isDone ? "rgba(16,185,129,0.15)" : isActive ? "rgba(59,232,255,0.15)" : "rgba(255,255,255,0.05)",
          color: isDone ? "#34d399" : isActive ? "#3be8ff" : "rgba(255,255,255,0.3)",
          border: `1px solid ${isDone ? "rgba(16,185,129,0.3)" : isActive ? "rgba(59,232,255,0.3)" : "rgba(255,255,255,0.1)"}`
        }
      },
      isDone ? "\u2713" : num
    ), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-white/40 whitespace-nowrap" }, label)), num < steps.length && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "flex-1 h-[1.5px] mx-2 mb-4",
        style: { background: isDone ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.08)" }
      }
    ));
  })), /* @__PURE__ */ React.createElement("div", { className: "flex gap-2 mt-5" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setInternalStep((s) => Math.max(1, s - 1)),
      disabled: active === 1,
      className: "px-3 py-1.5 rounded-lg text-xs bg-white/5 text-white/50 border-none disabled:opacity-30 cursor-pointer"
    },
    "Back"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setInternalStep((s) => Math.min(steps.length, s + 1)),
      disabled: active === steps.length,
      className: "px-3 py-1.5 rounded-lg text-xs bg-[#3be8ff]/15 text-[#3be8ff] border-none disabled:opacity-30 cursor-pointer"
    },
    "Next"
  )));
}

// src/components/Tabs/Tabs.jsx
function Tabs({ tabs = [
  { label: "Overview", content: "This is the overview content." },
  { label: "Details", content: "This is the details content." },
  { label: "Settings", content: "This is the settings content." }
] }) {
  var _a;
  const [active, setActive] = React.useState(0);
  return /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-1 bg-black/30 p-1 rounded-xl" }, tabs.map((tab, i) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: tab.label,
      onClick: () => setActive(i),
      className: "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-all border-none cursor-pointer",
      style: {
        background: active === i ? "rgba(59,232,255,0.2)" : "transparent",
        color: active === i ? "#3be8ff" : "rgba(255,255,255,0.4)"
      }
    },
    tab.label
  ))), /* @__PURE__ */ React.createElement("div", { className: "mt-3 p-4 rounded-xl border border-white/[0.07] bg-white/[0.02] text-white/70 text-sm" }, (_a = tabs[active]) == null ? void 0 : _a.content));
}

// src/components/Tooltip/Tooltip.jsx
var import_react8 = require("react");
function Tooltip({ text = "This is a tooltip", children }) {
  const [show, setShow] = (0, import_react8.useState)(false);
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      style: { position: "relative", display: "inline-block" },
      onMouseEnter: () => setShow(true),
      onMouseLeave: () => setShow(false)
    },
    /* @__PURE__ */ React.createElement("button", { style: {
      padding: "8px 16px",
      borderRadius: "10px",
      background: "rgba(59,232,255,0.1)",
      border: "1px solid rgba(59,232,255,0.25)",
      color: "#3be8ff",
      fontSize: "13px",
      cursor: "pointer"
    } }, children || "Hover me"),
    show && /* @__PURE__ */ React.createElement("div", { style: {
      position: "absolute",
      bottom: "125%",
      left: "50%",
      transform: "translateX(-50%)",
      background: "#0a1a1e",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "#fff",
      fontSize: "12px",
      padding: "6px 10px",
      borderRadius: "8px",
      whiteSpace: "nowrap",
      zIndex: 10
    } }, text)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnimatedCard,
  Breadcrumb,
  Button,
  Card,
  Footer,
  Modal,
  Navbar,
  Pagination,
  PasswordStrengthMeter,
  ProductCard,
  ProfileCard,
  ProgressBar,
  StatCard,
  Stepper,
  Tabs,
  Tooltip
});

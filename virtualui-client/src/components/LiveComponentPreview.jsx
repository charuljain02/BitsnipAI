import { LiveProvider, LivePreview, LiveError } from "react-live";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";

export const LiveComponentPreview = ({ code }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshPreview = () => {
        setRefreshKey((prev) => prev + 1);
    };

    if (!code) return null;

    // Clean import/export syntax for react-live compilation
    let sanitized = code
        .replace(/import\s+.*?from\s+["'].*?["'];?/g, "")
        .replace(/export\s+default\s+/g, "")
        .replace(/export\s+/g, "");

    // Sanitize position fixed declarations to avoid overlapping page UI
    sanitized = sanitized
        .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
        .replace(/position\s*:\s*`fixed`/g, 'position: "absolute"')
        .replace(/\bfixed\b/g, "absolute");

    // Improved Regex: Matches "const ComponentName" OR "function ComponentName"
    const match = sanitized.match(/(?:const|function)\s+([A-Z]\w+)/);
    const componentName = match ? match[1] : null;

    // Append render tag for react-live noInline mode
    const wrappedCode = componentName
        ? `${sanitized}\n\nrender(<${componentName} />)`
        : sanitized;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                maxWidth: "100%"
            }}
        >
            {/* Remount/refresh button — this is the ONLY refresh control that lives
                inside the preview box. The "regenerate with AI" action lives in the
                parent toolbar so the two never visually overlap. */}
            <motion.button
                onClick={refreshPreview}
                title="Refresh preview"
                aria-label="Refresh preview"
                style={{
                    position: "absolute",
                    right: "8px",
                    top: "8px",
                    background: "#1e293b",
                    border: "none",
                    color: "#94a3b8",
                    padding: "6px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    zIndex: 10,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <FiRefreshCw size={16} />
            </motion.button>

            {/* Live React Context Provider */}
            <LiveProvider
                key={refreshKey}
                code={wrappedCode}
                scope={{ React, useState, useEffect, useRef, useCallback, motion }}
                noInline={true}
            >
                {/* Main Component Preview Container */}
                <motion.div
                    style={{
                        width: "100%",
                        minHeight: "300px",
                        maxWidth: "100%",
                        border: "1px solid #1e293b",
                        borderRadius: "12px",
                        background: "#020617",
                        position: "relative",
                        overflow: "hidden",
                        padding: "clamp(10px, 2vw, 20px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <LivePreview />
                </motion.div>

                {/* Error Display Banner */}
                <LiveError
                    style={{
                        marginTop: "10px",
                        padding: "10px",
                        background: "#450a0a",
                        color: "#f87171",
                        borderRadius: "6px",
                        fontSize: "clamp(12px, 1.5vw, 14px)",
                        overflowX: "auto",
                    }}
                />

                {/* Fallback Notice */}
                {!componentName && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        style={{
                            marginTop: "10px",
                            padding: "10px",
                            background: "#1e293b",
                            borderRadius: "6px",
                            color: "#94a3b8",
                            fontSize: "clamp(12px, 1.5vw, 14px)",
                        }}
                    >
                        Preview is not available. Copy the code and paste it into your project.
                    </motion.div>
                )}
            </LiveProvider>
        </div>
    );
};

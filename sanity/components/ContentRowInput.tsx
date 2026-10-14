// sanity/components/ContentRowInput.tsx
// Custom object input for a contentRow that shows a live layout preview above the fields.
"use client";

import React from "react";
import type { ObjectInputProps } from "sanity";

export function ContentRowInput(props: ObjectInputProps) {
  const imagePosition = (props.value as Record<string, unknown>)?.imagePosition ?? "right";
  const imgLeft = imagePosition === "left";

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      {/* ── Live layout preview ──────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          flexDirection: imgLeft ? "row" : "row-reverse",
          gap: 8,
          marginBottom: 10,
          padding: "12px",
          background: "#f0f4f8",
          borderRadius: 8,
          alignItems: "stretch",
        }}
      >
        {/* Image zone */}
        <div
          style={{
            flex: "0 0 44%",
            background: "#dce9f5",
            border: "1.5px dashed #5b9ac8",
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px 8px",
            minHeight: 88,
            gap: 5,
          }}
        >
          {/* Camera icon */}
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#5b9ac8"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#2a6096", textAlign: "center" }}>
            YOUR IMAGE
          </span>
          <span style={{ fontSize: 10, color: "#5b9ac8", textAlign: "center", lineHeight: 1.3 }}>
            Upload in the<br />"Image" field below
          </span>
        </div>

        {/* Text zone */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1.5px dashed #bbb",
            borderRadius: 6,
            padding: "12px 10px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: "#333" }}>YOUR TEXT</span>
          {[85, 70, 85, 60, 75].map((w, i) => (
            <div
              key={i}
              style={{ height: 5, width: `${w}%`, background: "#d0d0d0", borderRadius: 3 }}
            />
          ))}
          <span style={{ fontSize: 10, color: "#888", marginTop: 2 }}>
            Write in "Text content" field below
          </span>
        </div>
      </div>

      {/* Caption */}
      <p
        style={{
          fontSize: 11,
          color: "#777",
          textAlign: "center",
          margin: "0 0 14px",
        }}
      >
        {imgLeft
          ? "Image sits on the LEFT · Text sits on the RIGHT"
          : "Text sits on the LEFT · Image sits on the RIGHT"}
        {" "}— change with the "Image position" toggle below
      </p>

      {/* ── Default Sanity fields ──────────────────────────────────────── */}
      {props.renderDefault(props)}
    </div>
  );
}

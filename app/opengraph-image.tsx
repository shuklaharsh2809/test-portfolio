import { ImageResponse } from "next/og";

export const alt = "Harsh Shukla — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0a0a",
          color: "#f5f5f5",
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "26px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#a3a3a3",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              borderRadius: "9999px",
              backgroundColor: "#10b981",
            }}
          />
          Software Developer
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div style={{ fontSize: "120px", fontWeight: 600, letterSpacing: "-0.04em" }}>
            Harsh Shukla
          </div>
          <div style={{ fontSize: "36px", color: "#a3a3a3", maxWidth: "900px" }}>
            React Native · Next.js · Firebase · AI-powered products
          </div>
        </div>

        <div style={{ fontSize: "26px", color: "#a3a3a3" }}>
          Lucknow, India
        </div>
      </div>
    ),
    { ...size },
  );
}

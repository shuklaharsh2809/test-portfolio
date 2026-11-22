import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Harsh Shukla — Software Engineer, React Native · React · TypeScript";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const photo = await readFile(join(process.cwd(), "public/profile-photo.png"));
  const photoSrc = `data:image/png;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0b0c10", backgroundImage: "radial-gradient(circle at 90% 0%, rgba(165,152,255,0.22), transparent 50%)",
          color: "#ececf1",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          <img src={photoSrc} width={168} height={168} alt="" style={{ borderRadius: 999, border: "1px solid #2a2b36" }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.04em" }}>Harsh Shukla</div>
            <div style={{ fontSize: 34, color: "#9899a6" }}>Software Engineer · React Native · React · TypeScript</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 72, fontSize: 26, color: "#9899a6" }}>
          <div style={{ display: "flex", border: "1px solid #2a2b36", borderRadius: 12, padding: "10px 18px" }}>2+ years in production</div>
          <div style={{ display: "flex", border: "1px solid #2a2b36", borderRadius: 12, padding: "10px 18px" }}>OneKey Notes · 1,500+ users</div>
          <div style={{ display: "flex", border: "1px solid #2a2b36", borderRadius: 12, padding: "10px 18px" }}>Noida, India</div>
        </div>
      </div>
    ),
    { ...size },
  );
}

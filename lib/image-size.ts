import "server-only";
import { openSync, readSync, closeSync } from "node:fs";
import path from "node:path";

/**
 * Reads the pixel size of a JPEG, PNG or WebP in /public from its file header (no dependencies),
 * so blog images can be rendered with explicit dimensions. Returns null if the format isn't recognised.
 */
export function publicImageSize(src: string): { width: number; height: number } | null {
  if (!src.startsWith("/") || src.includes("..")) return null;
  let fd: number | undefined;
  try {
    fd = openSync(path.join(process.cwd(), "public", src), "r");
    const buf = Buffer.alloc(64 * 1024);
    const length = readSync(fd, buf, 0, buf.length, 0);
    const b = buf.subarray(0, length);

    // PNG: IHDR width/height at bytes 16–23
    if (b.readUInt32BE(0) === 0x89504e47) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };

    // WebP (RIFF....WEBP)
    if (b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") {
      const chunk = b.toString("ascii", 12, 16);
      if (chunk === "VP8X") return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) };
      if (chunk === "VP8 ") return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff };
      if (chunk === "VP8L") {
        const bits = b.readUInt32LE(21);
        return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) };
      }
    }

    // JPEG: walk the markers to the first start-of-frame (SOF0–SOF15, excluding DHT/JPG/DAC)
    if (b[0] === 0xff && b[1] === 0xd8) {
      let offset = 2;
      while (offset + 9 < b.length) {
        if (b[offset] !== 0xff) return null;
        const marker = b[offset + 1];
        const size = b.readUInt16BE(offset + 2);
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { width: b.readUInt16BE(offset + 7), height: b.readUInt16BE(offset + 5) };
        }
        offset += 2 + size;
      }
    }
    return null;
  } catch {
    return null;
  } finally {
    if (fd !== undefined) closeSync(fd);
  }
}

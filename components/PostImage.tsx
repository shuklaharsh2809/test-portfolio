import Image from "next/image";

/** In-article image: optimized by next/image when its size is known, plain <img> otherwise. */
export default function PostImage({
  src,
  alt,
  title,
  width,
  height,
}: {
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}) {
  if (width && height) {
    return (
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width}
        height={height}
        sizes="(max-width: 768px) 100vw, 768px"
        style={{ width: "100%", height: "auto" }}
      />
    );
  }
  // External or unrecognised images: keep a plain lazy-loaded <img>.
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} title={title} loading="lazy" />;
}

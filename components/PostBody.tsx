import Markdoc, { type Config, type Node, type RenderableTreeNode, Tag } from "@markdoc/markdoc";
import React from "react";
import { publicImageSize } from "@/lib/image-size";
import CodeBlock from "./CodeBlock";
import PostImage from "./PostImage";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function plainText(children: RenderableTreeNode[]): string {
  return children.map((child) => (typeof child === "string" ? child : Tag.isTag(child) ? plainText(child.children) : "")).join("");
}

const config: Config = {
  nodes: {
    // h2/h3 get ids so sections can be linked to (/blog/post#some-heading).
    heading: {
      children: ["inline"],
      attributes: { level: { type: Number, required: true } },
      transform(node, cfg) {
        const children = node.transformChildren(cfg);
        const level = node.attributes.level as number;
        return new Tag(`h${level}`, { id: slugify(plainText(children)) }, children);
      },
    },
    // External links open in a new tab.
    link: {
      children: ["strong", "em", "s", "code", "text", "tag"],
      attributes: { href: { type: String, required: true }, title: { type: String } },
      transform(node, cfg) {
        const href = node.attributes.href as string;
        const external = /^https?:\/\//.test(href);
        return new Tag(
          "a",
          { href, title: node.attributes.title, ...(external ? { target: "_blank", rel: "noreferrer" } : {}) },
          node.transformChildren(cfg),
        );
      },
    },
    image: {
      attributes: { src: { type: String, required: true }, alt: { type: String }, title: { type: String } },
      transform(node) {
        const src = node.attributes.src as string;
        const size = publicImageSize(src);
        return new Tag("PostImage", {
          src,
          alt: (node.attributes.alt as string | undefined) ?? "",
          title: node.attributes.title,
          width: size?.width,
          height: size?.height,
        });
      },
    },
    // Code fences become <CodeBlock>, which syntax-highlights them on the server.
    fence: {
      attributes: { content: { type: String }, language: { type: String } },
      transform(node) {
        return new Tag("CodeBlock", {
          content: node.attributes.content as string,
          language: (node.attributes.language as string | undefined) || undefined,
        });
      },
    },
  },
};

/** Renders a Keystatic Markdoc document as React. */
export default function PostBody({ node }: { node: Node }) {
  const content = Markdoc.transform(node, config);
  return <div className="prose">{Markdoc.renderers.react(content, React, { components: { CodeBlock, PostImage } })}</div>;
}

import { bundledLanguages, bundledLanguagesAlias, codeToHtml } from "shiki";
import CopyCodeButton from "./CopyCodeButton";

function supportedLanguage(language: string | undefined) {
  if (!language) return "text";
  const lang = language.toLowerCase();
  return lang in bundledLanguages || lang in bundledLanguagesAlias ? lang : "text";
}

/**
 * A highlighted code block, rendered on the server at build time (no client-side highlighter).
 * Shiki emits both light and dark colours as CSS variables; globals.css picks one per theme.
 */
export default async function CodeBlock({ content, language }: { content: string; language?: string }) {
  const code = content.replace(/\n$/, "");
  const html = await codeToHtml(code, {
    lang: supportedLanguage(language),
    themes: { light: "github-light", dark: "github-dark" },
    defaultColor: false,
  });

  return (
    <div className="code-block">
      <div className="code-block-bar">
        <span className="code-block-lang">{language || "code"}</span>
        <CopyCodeButton code={code} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

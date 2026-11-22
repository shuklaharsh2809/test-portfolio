"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export default function CopyCodeButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1800);
    return () => clearTimeout(timer);
  }, [copied]);

  return (
    <button
      type="button"
      className="code-copy"
      onClick={() => {
        navigator.clipboard.writeText(code).then(() => setCopied(true), () => {});
      }}
      aria-label={copied ? "Copied" : "Copy code"}
    >
      {copied ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}

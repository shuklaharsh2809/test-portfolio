"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

/** On phones, folds a card's details behind a toggle so the list stays short; always open from `sm` up. */
export default function BuildDetails({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <div id={id} className="build-details" data-open={open}>
        {children}
      </div>
      <button
        type="button"
        className="build-toggle"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Less" : "More details"}
        <ChevronDown className="size-3.5 transition-transform" style={{ rotate: open ? "180deg" : "0deg" }} aria-hidden="true" />
      </button>
    </>
  );
}

"use client";

import { useEffect, useState } from "react";

const BOTTOM_THRESHOLD_PX = 240;

// Each nav section ends at the bottom of its own element, except "product",
// which spans several components and ends where "integrations" begins.
const sectionEdges: { id: string; edge: "top" | "bottom"; endId?: string }[] = [
  { id: "product", edge: "top", endId: "integrations" },
  { id: "integrations", edge: "bottom" },
  { id: "pricing", edge: "bottom" },
];

function reachedSectionEnd(viewportHeight: number) {
  return sectionEdges.some(({ id, edge, endId }) => {
    if (!document.getElementById(id)) return false;
    const target = document.getElementById(endId ?? id);
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    const end = edge === "top" ? rect.top : rect.bottom;
    // From just before the section end enters the viewport until it scrolls off the top.
    return end <= viewportHeight + BOTTOM_THRESHOLD_PX && end >= 0;
  });
}

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const { scrollY, innerHeight } = window;
      const pageHeight = document.documentElement.scrollHeight;
      const atPageBottom = scrollY > 0 && scrollY + innerHeight >= pageHeight - BOTTOM_THRESHOLD_PX;
      setVisible(atPageBottom || reachedSectionEnd(innerHeight));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <a
      href="#top"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-2 right-2 z-30 grid size-6 place-content-center rounded-pill bg-brand text-white shadow-brand-button transition-[opacity,transform,background-color] duration-180 hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand tablet:bottom-4 tablet:right-4 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-1 opacity-0"
      }`}
    >
      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
      </svg>
    </a>
  );
}

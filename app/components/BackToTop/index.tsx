"use client";

import { useEffect, useState } from "react";

const BOTTOM_THRESHOLD_PX = 240;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const { scrollY, innerHeight } = window;
      const pageHeight = document.documentElement.scrollHeight;
      setVisible(scrollY > 0 && scrollY + innerHeight >= pageHeight - BOTTOM_THRESHOLD_PX);
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

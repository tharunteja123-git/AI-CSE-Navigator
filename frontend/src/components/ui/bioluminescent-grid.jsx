// ─────────────────────────────────────────────────────────────────
// components/ui/bioluminescent-grid.jsx
// Adapted from a 21st.dev "Bioluminescent Grid" demo — same mouse-
// tracking glow interaction, reskinned from dark/neon to the app's
// cream + amber/teal palette so it sits naturally on a light page.
// ─────────────────────────────────────────────────────────────────

import { useEffect, useRef, forwardRef } from "react";
import "./bioluminescent-grid.css";

function hexToSoftRgba(hex, alpha = 0.16) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const BioluminescentGridItem = forwardRef(
  ({ className, accent = "#E8963C", children }, _ref) => {
    const itemRef = useRef(null);

    useEffect(() => {
      const item = itemRef.current;
      if (!item) return;
      const handleMouseMove = (e) => {
        const rect = item.getBoundingClientRect();
        item.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        item.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      };
      item.addEventListener("mousemove", handleMouseMove);
      return () => item.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
      <div
        ref={itemRef}
        className={`bio-item ${className || ""}`.trim()}
        style={{ "--accent": accent, "--accent-soft": hexToSoftRgba(accent) }}
      >
        <div className="bio-item-content">{children}</div>
      </div>
    );
  }
);
BioluminescentGridItem.displayName = "BioluminescentGridItem";

export const BioluminescentGrid = forwardRef(({ className, children }, ref) => (
  <div ref={ref} className={`bio-grid ${className || ""}`.trim()}>
    {children}
  </div>
));
BioluminescentGrid.displayName = "BioluminescentGrid";

export { BioluminescentGridItem };
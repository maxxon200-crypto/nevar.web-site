"use client";

import { useCallback, useRef, useState } from "react";

/**
 * Before / after wipe shown on the right of the hero. The same page in two
 * states, "Adesso" and "Come sarebbe", meeting at a draggable handle. Works
 * with the mouse (follows the cursor on hover, so it reads as interactive
 * without a click), with touch, and with the keyboard (arrows move 2%, Home and
 * End jump to the extremes).
 *
 * NO-JS: the initial split is 50% and is written as an inline style, so the
 * server HTML already shows half and half even if the script never runs. Never
 * opacity:0 as a base style.
 *
 * TODO (Max) - real screenshots. There are none yet, so this shows two grey
 * placeholders. Drop two files in /public/lavori/ and swap the two ".ba-ph"
 * blocks below for next/image:
 *
 *   import Image from "next/image";
 *   // PRIMA layer (the bottom, always visible):
 *   <Image src="/lavori/studio-prima.webp" alt="La home dello studio com'e adesso"
 *          fill sizes="(max-width: 980px) 100vw, 400px" priority className="ba-img" />
 *   // DOPO layer (inside .ba-after, the clipped one):
 *   <Image src="/lavori/studio-dopo.webp" alt="La stessa home riprogettata da nevar.web"
 *          fill sizes="(max-width: 980px) 100vw, 400px" className="ba-img" />
 *
 * The two files must share crop and ratio, be WebP, max 800px wide, under 120kB
 * each, otherwise the comparison jumps. Keep `priority` only on the "prima"
 * image and re-check Lighthouse mobile (target: stay above 88).
 */
export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const p = Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(4, p - 2));
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(96, p + 2));
    }
    if (e.key === "Home") {
      e.preventDefault();
      setPos(4);
    }
    if (e.key === "End") {
      e.preventDefault();
      setPos(96);
    }
  };

  return (
    <div className="ba-wrap">
      <div className="ba-head">
        <span className="ba-kk">Uno studio milanese, rifatto</span>
        <span className="ba-drag">
          Trascina <i aria-hidden>&#8596;</i>
        </span>
      </div>

      <div
        ref={ref}
        className="ba"
        onMouseMove={(e) => move(e.clientX)}
        onTouchStart={(e) => move(e.touches[0].clientX)}
        onTouchMove={(e) => move(e.touches[0].clientX)}
      >
        {/* PRIMA: the bottom layer, always visible. Grey placeholder until the
            real screenshot is added (see the TODO above). */}
        <div className="ba-ph ba-ph-a">
          <span>Screenshot da inserire</span>
        </div>

        {/* DOPO: clipped from the handle rightward, so "come sarebbe" sits on the
            right under its label and "adesso" (the PRIMA layer) stays on the
            left. clip-path inset(top right bottom left): left inset = pos%.
            Grey placeholder until the real screenshot is added. */}
        <div
          className="ba-after"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div className="ba-ph ba-ph-b">
            <span>Screenshot da inserire</span>
          </div>
        </div>

        <span className="ba-lab l">Adesso</span>
        <span className="ba-lab r">Come sarebbe</span>

        <div
          className="ba-handle"
          style={{ left: `${pos}%` }}
          role="slider"
          tabIndex={0}
          aria-label="Confronta il sito prima e dopo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          onKeyDown={onKey}
        >
          <span className="ba-knob" aria-hidden>
            &#8596;
          </span>
        </div>
      </div>

      <p className="ba-stamp">
        <b>Esercizio non commissionato.</b> Nessuno me lo ha chiesto: l&apos;ho
        fatto per mostrare invece che promettere.
      </p>
    </div>
  );
}

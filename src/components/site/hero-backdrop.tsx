import { useCallback, useState } from "react";
import { HeroScene } from "./hero-scene";
import { HeroBackground } from "./hero-background";

/**
 * Renders the 3D ambient hero scene, falling back to the lightweight 2D
 * particle canvas when WebGL is unavailable or motion is reduced.
 */
export function HeroBackdrop() {
  const [fallback, setFallback] = useState(false);
  const onUnavailable = useCallback(() => setFallback(true), []);

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,138,61,0.10),transparent_65%)]" />
      {fallback ? <HeroBackground /> : <HeroScene onUnavailable={onUnavailable} />}
    </>
  );
}

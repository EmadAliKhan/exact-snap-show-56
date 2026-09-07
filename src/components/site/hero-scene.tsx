import { useEffect, useRef, useState } from "react";

const ACCENT = 0xff8a3d;

function webglSupported() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl2") || c.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Ambient 3D hero background: a slowly drifting network of connected nodes
 * plus a few semi-transparent wireframe solids, with subtle mouse parallax.
 * Renders nothing when WebGL is unavailable or the user prefers reduced motion,
 * so the caller can show a static fallback.
 */
export function HeroScene({ onUnavailable }: { onUnavailable?: () => void }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [ok, setOk] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !webglSupported()) {
      setOk(false);
      onUnavailable?.();
      return;
    }

    let disposed = false;
    let cleanup = () => {};

    void (async () => {
      const THREE = await import("three");
      if (disposed || !hostRef.current) return;

      const width = () => host.clientWidth || window.innerWidth;
      const height = () => host.clientHeight || window.innerHeight;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(55, width() / height(), 0.1, 100);
      camera.position.z = 16;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        setOk(false);
        onUnavailable?.();
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width(), height());
      renderer.setClearAlpha(0);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.display = "block";
      host.appendChild(renderer.domElement);

      const world = new THREE.Group();
      scene.add(world);

      // --- node network -------------------------------------------------
      const isSmall = width() < 768;
      const NODES = isSmall ? 42 : 78;
      const SPREAD_X = isSmall ? 14 : 22;
      const SPREAD_Y = 11;
      const SPREAD_Z = 9;

      const pos = new Float32Array(NODES * 3);
      const vel: number[] = [];
      const phase: number[] = [];
      for (let i = 0; i < NODES; i++) {
        pos[i * 3] = (Math.random() - 0.5) * SPREAD_X;
        pos[i * 3 + 1] = (Math.random() - 0.5) * SPREAD_Y;
        pos[i * 3 + 2] = (Math.random() - 0.5) * SPREAD_Z;
        vel.push((Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.008, (Math.random() - 0.5) * 0.006);
        phase.push(Math.random() * Math.PI * 2);
      }

      const nodeGeo = new THREE.BufferGeometry();
      nodeGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const nodeMat = new THREE.PointsMaterial({
        color: ACCENT,
        size: 0.16,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
      });
      const points = new THREE.Points(nodeGeo, nodeMat);
      world.add(points);

      const MAX_LINKS = NODES * 8;
      const linkPos = new Float32Array(MAX_LINKS * 6);
      const linkGeo = new THREE.BufferGeometry();
      linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPos, 3));
      const linkMat = new THREE.LineBasicMaterial({
        color: ACCENT,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const links = new THREE.LineSegments(linkGeo, linkMat);
      world.add(links);
      const LINK_DIST = isSmall ? 4.2 : 4.6;

      // --- floating wireframe solids -------------------------------------
      const solids: { mesh: import("three").Mesh; sx: number; sy: number; ph: number }[] = [];
      const shapeGeos = [
        new THREE.IcosahedronGeometry(2.1, 0),
        new THREE.BoxGeometry(2.4, 2.4, 2.4),
        new THREE.OctahedronGeometry(1.9, 0),
        new THREE.TorusGeometry(1.7, 0.5, 6, 12),
        new THREE.IcosahedronGeometry(1.4, 1),
      ];
      const layout = isSmall
        ? [
            [-4.2, 3.2, -5],
            [4.4, -3.4, -6],
            [1.5, 4.2, -8],
          ]
        : [
            [-8.5, 2.8, -4],
            [8.2, -2.6, -5],
            [-6.2, -3.8, -7],
            [6.6, 3.6, -8],
            [0.5, -5.2, -9],
          ];
      layout.forEach((p, i) => {
        const geo = shapeGeos[i % shapeGeos.length]!;
        const mat = new THREE.MeshBasicMaterial({
          color: ACCENT,
          wireframe: true,
          transparent: true,
          opacity: 0.13,
          depthWrite: false,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set(p[0]!, p[1]!, p[2]!);
        mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        solids.push({
          mesh,
          sx: (Math.random() - 0.5) * 0.0016,
          sy: (Math.random() - 0.5) * 0.0016,
          ph: Math.random() * Math.PI * 2,
        });
        world.add(mesh);
      });

      // --- interaction ----------------------------------------------------
      const target = { x: 0, y: 0 };
      const current = { x: 0, y: 0 };
      const onMove = (e: PointerEvent) => {
        target.x = (e.clientX / window.innerWidth - 0.5) * 2;
        target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      };
      window.addEventListener("pointermove", onMove, { passive: true });

      const onResize = () => {
        camera.aspect = width() / height();
        camera.updateProjectionMatrix();
        renderer.setSize(width(), height());
      };
      window.addEventListener("resize", onResize);

      let visible = true;
      const onVis = () => {
        visible = !document.hidden;
      };
      document.addEventListener("visibilitychange", onVis);

      let raf = 0;
      let t = 0;
      const nodeAttr = nodeGeo.getAttribute("position") as import("three").BufferAttribute;
      const linkAttr = linkGeo.getAttribute("position") as import("three").BufferAttribute;

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible) return;
        t += 0.016;

        // drift nodes inside a soft box
        const arr = nodeAttr.array as Float32Array;
        for (let i = 0; i < NODES; i++) {
          const ix = i * 3;
          arr[ix]! += vel[ix]!;
          arr[ix + 1]! += vel[ix + 1]!;
          arr[ix + 2]! += vel[ix + 2]!;
          if (Math.abs(arr[ix]!) > SPREAD_X / 2) vel[ix] = -vel[ix]!;
          if (Math.abs(arr[ix + 1]!) > SPREAD_Y / 2) vel[ix + 1] = -vel[ix + 1]!;
          if (Math.abs(arr[ix + 2]!) > SPREAD_Z / 2) vel[ix + 2] = -vel[ix + 2]!;
        }
        nodeAttr.needsUpdate = true;
        nodeMat.opacity = 0.7 + Math.sin(t * 0.8) * 0.15;

        // rebuild links
        let n = 0;
        const la = linkAttr.array as Float32Array;
        for (let i = 0; i < NODES && n < MAX_LINKS; i++) {
          for (let j = i + 1; j < NODES && n < MAX_LINKS; j++) {
            const dx = arr[i * 3]! - arr[j * 3]!;
            const dy = arr[i * 3 + 1]! - arr[j * 3 + 1]!;
            const dz = arr[i * 3 + 2]! - arr[j * 3 + 2]!;
            if (dx * dx + dy * dy + dz * dz < LINK_DIST * LINK_DIST) {
              la[n * 6] = arr[i * 3]!;
              la[n * 6 + 1] = arr[i * 3 + 1]!;
              la[n * 6 + 2] = arr[i * 3 + 2]!;
              la[n * 6 + 3] = arr[j * 3]!;
              la[n * 6 + 4] = arr[j * 3 + 1]!;
              la[n * 6 + 5] = arr[j * 3 + 2]!;
              n++;
            }
          }
        }
        linkGeo.setDrawRange(0, n * 2);
        linkAttr.needsUpdate = true;
        linkMat.opacity = 0.12 + Math.sin(t * 0.6) * 0.05;

        for (const s of solids) {
          s.mesh.rotation.x += s.sx;
          s.mesh.rotation.y += s.sy;
          s.mesh.position.y += Math.sin(t * 0.35 + s.ph) * 0.0035;
        }

        world.rotation.y = Math.sin(t * 0.05) * 0.12;
        current.x += (target.x - current.x) * 0.04;
        current.y += (target.y - current.y) * 0.04;
        camera.position.x = current.x * 1.4;
        camera.position.y = -current.y * 0.9;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };
      tick();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
        renderer.domElement.remove();
        renderer.dispose();
        nodeGeo.dispose();
        linkGeo.dispose();
        nodeMat.dispose();
        linkMat.dispose();
        shapeGeos.forEach((g) => g.dispose());
        solids.forEach((s) => (s.mesh.material as import("three").Material).dispose());
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [onUnavailable]);

  if (!ok) return null;

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
    />
  );
}

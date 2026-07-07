"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MeshTransmissionMaterial,
  Environment,
  Lightformer,
  Float,
} from "@react-three/drei";
import * as THREE from "three";

/**
 * Radial gradient used as the transmission background: cold white at the core,
 * aqua then teal toward the rim. drei renders it into the refraction buffer so
 * it is only ever seen *through* the glass; the page around the orb stays paper.
 * Without a coloured background to refract the sphere reads as flat grey, which
 * is exactly the bug we are fixing.
 */
function useRefractionBackground() {
  return useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const g = ctx.createRadialGradient(
        size * 0.5,
        size * 0.4,
        size * 0.03,
        size * 0.5,
        size * 0.5,
        size * 0.64
      );
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.4, "#e6f6f2");
      g.addColorStop(0.66, "#8fd8cd");
      g.addColorStop(0.86, "#49c5b6");
      g.addColorStop(1, "#009ec9");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, size, size);
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Orb() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const background = useRefractionBackground();

  // Dispose the imperatively-created texture on unmount (R3F only auto-disposes
  // objects reconciled through JSX).
  useEffect(() => () => background.dispose(), [background]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp on tab refocus
    if (inner.current) {
      inner.current.rotation.y += d * 0.12;
      inner.current.rotation.x += d * 0.035;
    }
    if (group.current) {
      // Slow ease toward the pointer - micro-movement, never frantic.
      const tx = state.pointer.y * 0.16;
      const ty = state.pointer.x * 0.26;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
      group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.6}>
      <group ref={group}>
        <mesh ref={inner}>
          {/* detail 6 already reads as a perfectly smooth sphere; going higher
              (drei's 12-16 note is for other geometries) would be millions of
              triangles for no visible gain. */}
          <icosahedronGeometry args={[1.2, 6]} />
          <MeshTransmissionMaterial
            background={background}
            backside
            backsideThickness={0.5}
            thickness={1.6}
            samples={6}
            resolution={512}
            backsideResolution={256}
            transmission={1}
            roughness={0.05}
            ior={1.42}
            chromaticAberration={0.045}
            anisotropicBlur={0.1}
            distortion={0.35}
            distortionScale={0.3}
            temporalDistortion={0.15}
            attenuationColor="#e8fbf6"
            attenuationDistance={3}
            color="#ffffff"
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function GlassOrb({ paused = false }: { paused?: boolean }) {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      // Freeze GPU work when the hero is scrolled out of view without tearing
      // down the (expensive to recompile) transmission material.
      frameloop={paused ? "never" : "always"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 4.2], fov: 34 }}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Two cold lights: a white key and a soft teal fill. */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 5]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.5} color="#49c5b6" />

      <Orb />

      {/* Cold environment built from lightformers - no external HDR fetch, so it
          works behind the restrictive network policy. Bright enough to give the
          glass crisp specular reflections instead of a dull grey body. */}
      <Environment resolution={256} frames={1}>
        <color attach="background" args={["#eef4f4"]} />
        <Lightformer
          form="circle"
          intensity={4}
          position={[0, 2, 4]}
          scale={7}
          color="#ffffff"
        />
        <Lightformer
          form="ring"
          intensity={2.4}
          position={[-3, 1, 3]}
          scale={3.5}
          color="#49c5b6"
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[3, -1, 3]}
          scale={[5, 2, 1]}
          color="#009ec9"
        />
        <Lightformer
          form="rect"
          intensity={2.6}
          position={[0, -3, 2]}
          scale={[9, 2, 1]}
          color="#ffffff"
        />
      </Environment>
    </Canvas>
  );
}

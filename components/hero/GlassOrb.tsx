"use client";

import { useMemo, useRef } from "react";
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
 * aqua then teal toward the rim. It is only ever seen *through* the glass, so
 * the page around the orb stays paper-dominant.
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
        size * 0.42,
        size * 0.04,
        size * 0.5,
        size * 0.5,
        size * 0.62
      );
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.46, "#e9f5f2");
      g.addColorStop(0.72, "#8fd8cd");
      g.addColorStop(0.9, "#49c5b6");
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

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp on tab refocus
    if (inner.current) {
      inner.current.rotation.y += d * 0.1;
      inner.current.rotation.x += d * 0.03;
    }
    if (group.current) {
      // Slow ease toward the pointer - micro-movement, never frantic.
      const tx = state.pointer.y * 0.18;
      const ty = state.pointer.x * 0.28;
      group.current.rotation.x += (tx - group.current.rotation.x) * 0.04;
      group.current.rotation.y += (ty - group.current.rotation.y) * 0.04;
    }
  });

  return (
    <Float speed={1.1} rotationIntensity={0} floatIntensity={0.5}>
      <group ref={group}>
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.16, 6]} />
          <MeshTransmissionMaterial
            transmissionSampler
            backside
            backsideThickness={0.3}
            thickness={1.15}
            samples={6}
            resolution={512}
            backsideResolution={256}
            transmission={1}
            roughness={0.05}
            ior={1.45}
            chromaticAberration={0.06}
            anisotropicBlur={0.1}
            distortion={0.22}
            distortionScale={0.32}
            temporalDistortion={0.12}
            attenuationColor="#dff5f1"
            attenuationDistance={2.6}
            color="#ffffff"
            background={background}
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function GlassOrb() {
  return (
    <Canvas
      flat
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ position: [0, 0, 4.2], fov: 34 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#49c5b6" />

      <Orb />

      {/* Cold environment built from lightformers - no external HDR fetch. */}
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#eef4f4"]} />
        <Lightformer
          form="circle"
          intensity={3}
          position={[0, 2, 3]}
          scale={6}
          color="#ffffff"
        />
        <Lightformer
          form="ring"
          intensity={2}
          position={[-3, 1, 2]}
          scale={3}
          color="#49c5b6"
        />
        <Lightformer
          form="rect"
          intensity={1.6}
          position={[3, -1, 2]}
          scale={[4, 2, 1]}
          color="#009ec9"
        />
        <Lightformer
          form="rect"
          intensity={2}
          position={[0, -3, 1]}
          scale={[8, 2, 1]}
          color="#ffffff"
        />
      </Environment>
    </Canvas>
  );
}

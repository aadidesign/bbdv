"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Blob({
  position,
  scale,
  color,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * speed * 0.3;
  });
  return (
    <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.1}>
      <mesh ref={ref} position={position} scale={scale}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={color}
          distort={0.42}
          speed={1.6}
          roughness={0.15}
          metalness={0.35}
        />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={2.2} />
      <pointLight position={[-5, -3, 2]} intensity={1.6} color="#f4511e" />
      <Blob position={[0, 0, 0]} scale={2.1} color="#c2185b" speed={1.1} />
      <Blob position={[2.4, 1.4, -1.5]} scale={0.7} color="#f4511e" speed={1.6} />
      <Blob position={[-2.6, -1.2, -1]} scale={0.9} color="#7b1b6b" speed={1.3} />
      <Environment preset="sunset" />
    </Canvas>
  );
}

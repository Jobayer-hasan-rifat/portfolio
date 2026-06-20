"use client";

import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, MeshDistortMaterial, Float } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

const SUNSET = ["#f2b14c", "#e8743b", "#d8527c", "#7a4cf2", "#3fb6c4"];

function Core() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const wire = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const colors = useMemo(() => SUNSET.map((c) => new THREE.Color(c)), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const p = scrollState.progress;

    if (group.current) {
      // Drift the core upward and rotate as the user scrolls
      group.current.rotation.y += delta * 0.15;
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        p * Math.PI * 0.6,
        0.05
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        p * 6 - 1.7,
        0.05
      );
      group.current.position.x = THREE.MathUtils.lerp(
        group.current.position.x,
        scrollState.pointerX * 0.6,
        0.04
      );
      const scale = 1 + Math.sin(t * 0.6) * 0.03 - p * 0.15;
      group.current.scale.setScalar(THREE.MathUtils.clamp(scale, 0.5, 1.4));
    }
    if (wire.current) {
      wire.current.rotation.y -= delta * 0.25;
      wire.current.rotation.z += delta * 0.05;
    }
    // Color journey across the sunset palette by scroll
    if (mat.current) {
      const seg = p * (colors.length - 1);
      const i = Math.floor(seg);
      const f = seg - i;
      tmpColor
        .copy(colors[Math.min(i, colors.length - 1)])
        .lerp(colors[Math.min(i + 1, colors.length - 1)], f);
      mat.current.color.lerp(tmpColor, 0.06);
      mat.current.emissive.lerp(tmpColor, 0.06);
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
        {/* Morphing inner core */}
        <mesh ref={inner}>
          <icosahedronGeometry args={[1.2, 24]} />
          <MeshDistortMaterial
            ref={mat as never}
            color="#e8743b"
            emissive="#e8743b"
            emissiveIntensity={0.4}
            roughness={0.25}
            metalness={0.6}
            distort={0.35}
            speed={1.6}
          />
        </mesh>
        {/* Wireframe shell */}
        <mesh ref={wire} scale={2.3}>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshBasicMaterial
            color="#f2b14c"
            wireframe
            transparent
            opacity={0.12}
            toneMapped={false}
          />
        </mesh>
      </Float>
      <pointLight position={[3, 2, 4]} intensity={3} color="#f2b14c" />
      <pointLight position={[-4, -2, -2]} intensity={2} color="#7a4cf2" />
    </group>
  );
}

function Haze() {
  return (
    <mesh position={[0, 0, -8]}>
      <planeGeometry args={[60, 40]} />
      <meshBasicMaterial
        color="#1a0e12"
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </mesh>
  );
}

function Rig() {
  useFrame((state) => {
    // Subtle pointer parallax on the camera
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      scrollState.pointerX * 0.8,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      scrollState.pointerY * 0.5,
      0.03
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.8]}
      >
        <color attach="background" args={["#070708"]} />
        <fog attach="fog" args={["#070708", 8, 22]} />
        <ambientLight intensity={0.4} />
        <Suspense fallback={null}>
          <Haze />
          <Stars
            radius={60}
            depth={40}
            count={3500}
            factor={4}
            saturation={0.4}
            fade
            speed={0.5}
          />
          <Core />
        </Suspense>
        <Rig />
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.9}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.3} darkness={0.7} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}

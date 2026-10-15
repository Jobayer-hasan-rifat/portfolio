"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { scrollState } from "@/lib/scrollState";

/* ------------------------------------------------------------------ */
/* Milky Way: a tilted spiral galaxy of additive points far behind     */
/* ------------------------------------------------------------------ */

function buildGalaxy() {
  const count = 26000;
  const arms = 4;
  const radius = 70;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const inner = new THREE.Color("#ffd9a8");
  const outer = new THREE.Color("#5b7cff");
  const c = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const r = Math.pow(Math.random(), 1.6) * radius;
    const arm = ((i % arms) / arms) * Math.PI * 2;
    const spin = r * 0.09;
    const spread = 0.35 + (r / radius) * 0.9;
    const rx = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * 6;
    const ry = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * 2;
    const rz = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * spread * 6;

    positions[i * 3] = Math.cos(arm + spin) * r + rx;
    positions[i * 3 + 1] = ry;
    positions[i * 3 + 2] = Math.sin(arm + spin) * r + rz;

    c.copy(inner).lerp(outer, r / radius);
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }
  return { positions, colors };
}

/**
 * 0 while the hero fills the screen, 1 once it has scrolled away. The Milky
 * Way owns the hero; the solar system owns every section after it.
 */
function heroExit() {
  return THREE.MathUtils.smoothstep(window.scrollY / window.innerHeight, 0.15, 0.85);
}

function MilkyWay() {
  const ref = useRef<THREE.Points>(null);
  const mat = useRef<THREE.PointsMaterial>(null);

  const { positions, colors } = useMemo(() => buildGalaxy(), []);

  useFrame((_, delta) => {
    if (!ref.current || !mat.current) return;
    ref.current.rotation.y += delta * 0.05;
    const show = 1 - heroExit();
    mat.current.opacity = THREE.MathUtils.lerp(mat.current.opacity, 0.85 * show, 0.1);
    ref.current.visible = mat.current.opacity > 0.01;
  });

  return (
    <group position={[0, 10, -110]} rotation={[0.9, 0, 0.35]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={mat}
          size={0.35}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Solar system: sun + eight orbiting planets + asteroid belt          */
/* ------------------------------------------------------------------ */

interface PlanetDef {
  name: string;
  radius: number;
  distance: number;
  speed: number;
  color: string;
  emissive?: string;
  ring?: boolean;
  tilt?: number;
}

const PLANETS: PlanetDef[] = [
  { name: "Mercury", radius: 0.17, distance: 2.4, speed: 1.6, color: "#a39e97" },
  { name: "Venus", radius: 0.26, distance: 3.2, speed: 1.2, color: "#e3b778" },
  { name: "Earth", radius: 0.3, distance: 4.1, speed: 1.0, color: "#3a7bd5", emissive: "#0b2a55" },
  { name: "Mars", radius: 0.22, distance: 5.0, speed: 0.8, color: "#c1512f" },
  { name: "Jupiter", radius: 0.55, distance: 7.0, speed: 0.45, color: "#d4a373" },
  { name: "Saturn", radius: 0.46, distance: 8.9, speed: 0.33, color: "#e6cf8f", ring: true, tilt: 0.45 },
  { name: "Uranus", radius: 0.3, distance: 10.5, speed: 0.24, color: "#8fd3e0", tilt: 1.4 },
  { name: "Neptune", radius: 0.29, distance: 11.9, speed: 0.19, color: "#3f5fd9" },
];

/** Procedural banded texture so gas giants and rocky planets read as 3D. */
function makeBandTexture(color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const base = new THREE.Color(color);
  for (let y = 0; y < 64; y++) {
    const shade = 0.75 + Math.sin(y * 0.6 + Math.random() * 0.8) * 0.15 + Math.random() * 0.1;
    const c = base.clone().multiplyScalar(shade);
    ctx.fillStyle = `#${c.getHexString()}`;
    ctx.fillRect(0, y, 64, 1);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Planet({ def, offset }: { def: PlanetDef; offset: number }) {
  const pivot = useRef<THREE.Group>(null);
  const body = useRef<THREE.Mesh>(null);
  const map = useMemo(() => makeBandTexture(def.color), [def.color]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (pivot.current) pivot.current.rotation.y = offset + t * def.speed * 0.12;
    if (body.current) body.current.rotation.y += delta * 0.6;
  });

  return (
    <>
      {/* Orbit path */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[def.distance - 0.006, def.distance + 0.006, 128]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>
      <group ref={pivot}>
        <group position={[def.distance, 0, 0]} rotation={[0, 0, def.tilt ?? 0.2]}>
          <mesh ref={body}>
            <sphereGeometry args={[def.radius, 32, 32]} />
            <meshStandardMaterial
              map={map}
              roughness={0.85}
              metalness={0.05}
              emissive={def.emissive ?? "#000000"}
              emissiveIntensity={0.4}
            />
          </mesh>
          {def.ring && (
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[def.radius * 1.4, def.radius * 2.3, 64]} />
              <meshBasicMaterial color="#d9c48f" transparent opacity={0.45} side={THREE.DoubleSide} />
            </mesh>
          )}
        </group>
      </group>
    </>
  );
}

function buildBelt() {
  const count = 1800;
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = 5.7 + Math.random() * 0.8;
    arr[i * 3] = Math.cos(a) * r;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 0.15;
    arr[i * 3 + 2] = Math.sin(a) * r;
  }
  return arr;
}

function AsteroidBelt() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => buildBelt(), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#b9a991" transparent opacity={0.7} depthWrite={false} />
    </points>
  );
}

function Sun() {
  const glow = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,210,140,1)");
    g.addColorStop(0.25, "rgba(255,150,60,0.55)");
    g.addColorStop(1, "rgba(255,120,40,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshBasicMaterial color="#ffb347" toneMapped={false} />
      </mesh>
      <sprite scale={[5.5, 5.5, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <pointLight intensity={60} distance={40} decay={1.4} color="#ffd9a8" />
    </group>
  );
}

/** Close enough to read the inner planets, low enough to sit under the headings. */
const SYSTEM_CENTER: [number, number, number] = [0, -2.4, -2];

function SolarSystem() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    // Grow in once the hero has scrolled away, so it never overlaps the Milky Way
    const target = Math.max(heroExit(), 0.0001);
    const scale = THREE.MathUtils.lerp(group.current.scale.x, target, 0.08);
    group.current.scale.setScalar(scale);
    group.current.visible = scale > 0.01;

    const p = scrollState.progress;
    // Tilt the system and swing it around as the page scrolls
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.42 + p * 0.5, 0.04);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, p * Math.PI * 1.2, 0.04);
  });

  return (
    <group ref={group} position={SYSTEM_CENTER} rotation={[0.42, 0, 0.08]} scale={0.0001}>
      <Sun />
      {PLANETS.map((def, i) => (
        <Planet key={def.name} def={def} offset={i * 1.7} />
      ))}
      <AsteroidBelt />
    </group>
  );
}

function Rig() {
  useFrame((state) => {
    const p = scrollState.progress;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, scrollState.pointerX * 0.8, 0.03);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, 2 + scrollState.pointerY * 0.5 - p * 1.5, 0.03);
    state.camera.position.z = THREE.MathUtils.lerp(state.camera.position.z, 10 - p * 2.5, 0.03);
    state.camera.lookAt(0, -0.6, -2);
  });
  return null;
}

export default function SceneBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1 }}
        camera={{ position: [0, 2, 10], fov: 55, far: 400 }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#030306"]} />
        <ambientLight intensity={0.08} />
        <Suspense fallback={null}>
          <Stars radius={120} depth={60} count={4000} factor={4} saturation={0.3} fade speed={0.4} />
          <MilkyWay />
          <SolarSystem />
        </Suspense>
        <Rig />
        <EffectComposer multisampling={0}>
          <Bloom intensity={0.7} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
        </EffectComposer>
      </Canvas>
      {/* Dim the universe so foreground text always wins */}
      <div className="absolute inset-0 bg-[#030306]/55" />
    </div>
  );
}

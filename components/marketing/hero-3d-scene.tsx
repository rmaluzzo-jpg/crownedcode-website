"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useScroll, useTransform } from "motion/react";
import * as THREE from "three";

/**
 * The actual r3f canvas. Imported by hero-3d.tsx via next/dynamic with ssr:false.
 * - Loads /cinematic/crown.glb (or .stl) if present at runtime.
 * - Falls back to procedural gold geometric shards + particles.
 * - Scroll-linked camera dolly for a subtle cinematic motion.
 */
export default function Hero3DScene() {
  const [assetKind, setAssetKind] = useState<"glb" | "stl" | "none" | "checking">(
    "checking",
  );
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const glb = await fetch("/cinematic/crown.glb", { method: "HEAD" });
        if (!cancelled && glb.ok) {
          setAssetKind("glb");
          return;
        }
      } catch {}
      try {
        const stl = await fetch("/cinematic/crown.stl", { method: "HEAD" });
        if (!cancelled && stl.ok) {
          setAssetKind("stl");
          return;
        }
      } catch {}
      if (!cancelled) setAssetKind("none");
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
      dpr={isMobile ? [1, 1] : [1, 1.5]}
    >
      {/* No opaque background — canvas is transparent so DOM content shows through */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 8, 5]} intensity={2.4} color="#fff5cf" />
      <directionalLight position={[-6, -4, -3]} intensity={0.8} color="#c9a84c" />
      <pointLight position={[0, 0, 2]} intensity={2.5} color="#e2c46e" distance={10} />

      <Suspense fallback={null}>
        <Environment preset="studio" />
        <ScrollDolly>
          {assetKind === "glb" && <CrownGLB />}
          {assetKind === "stl" && <CrownSTL />}
          {(assetKind === "none" || assetKind === "checking") && <ProceduralShards />}
          <ParticleField count={isMobile ? 60 : 140} />
        </ScrollDolly>
      </Suspense>
    </Canvas>
  );
}

/**
 * Drives the crown's choreographed path down the page.
 * X position swings L → R → L between sections. Scale + camera dolly add depth.
 * Movement is keyframed against overall page scroll progress.
 */
function ScrollDolly({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { scrollYProgress } = useScroll();

  // X position: hero center → left for statement → left for "How we work" intro → right for "How we work" mid → right-of-center for capabilities → back to center for CTA
  const xPos = useTransform(
    scrollYProgress,
    [0, 0.12, 0.28, 0.45, 0.65, 0.85, 1],
    [0, -1.8, -2.2, 1.8, 2.4, 0.6, 0],
  );

  // Scale: bigger at the bookends (hero, CTA), smaller through dense content
  const scale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.5, 0.85, 1],
    [1.0, 0.7, 0.6, 0.55, 0.9],
  );

  // Subtle camera dolly — only pulls back during hero region
  const zPull = useTransform(scrollYProgress, [0, 0.15, 1], [0, -1.2, -1.2]);

  // Slight rotation drift over the whole scroll for organic motion
  const rotY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 0.4]);

  useFrame(({ camera }) => {
    camera.position.z = 6 + (zPull.get() as number);
    camera.lookAt(0, 0, 0);
    if (group.current) {
      group.current.position.x = xPos.get() as number;
      group.current.rotation.y = rotY.get() as number;
      group.current.scale.setScalar(scale.get() as number);
    }
  });

  return <group ref={group}>{children}</group>;
}

/** Procedural gold shards orbiting the center. */
function ProceduralShards() {
  const shards = useMemo(
    () =>
      Array.from({ length: 7 }, (_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        return {
          pos: [
            Math.cos(angle) * 1.6,
            Math.sin(angle * 1.3) * 0.5,
            Math.sin(angle) * 1.2,
          ] as [number, number, number],
          rot: [angle * 0.3, angle * 0.7, angle * 0.5] as [number, number, number],
          scale: 0.5 + ((i * 37) % 5) * 0.08,
          speed: 0.2 + ((i * 11) % 7) * 0.05,
        };
      }),
    [],
  );

  return (
    <>
      {shards.map((s, i) => (
        <Float
          key={i}
          speed={s.speed * 4}
          floatIntensity={0.6}
          rotationIntensity={0.4}
        >
          <mesh
            position={s.pos}
            rotation={s.rot}
            scale={s.scale}
            castShadow
            receiveShadow
          >
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#c9a84c"
              metalness={0.95}
              roughness={0.18}
              emissive="#c9a84c"
              emissiveIntensity={0.12}
            />
          </mesh>
        </Float>
      ))}
      {/* center accent */}
      <Float speed={1.6} floatIntensity={0.4} rotationIntensity={0.3}>
        <mesh>
          <icosahedronGeometry args={[0.7, 0]} />
          <meshStandardMaterial
            color="#e2c46e"
            metalness={1}
            roughness={0.12}
            emissive="#c9a84c"
            emissiveIntensity={0.25}
          />
        </mesh>
      </Float>
    </>
  );
}

function CrownGLB() {
  // Lazy-import GLTFLoader + Meshopt decoder (required for meshopt-compressed assets)
  const { GLTFLoader } = require("three/examples/jsm/loaders/GLTFLoader.js");
  const { MeshoptDecoder } = require("three/examples/jsm/libs/meshopt_decoder.module.js");
  const gltf = useLoader(
    GLTFLoader,
    "/cinematic/crown.glb",
    (loader: unknown) => {
      (loader as { setMeshoptDecoder?: (d: unknown) => void }).setMeshoptDecoder?.(
        MeshoptDecoder,
      );
    },
  ) as { scene: THREE.Group };

  const ref = useRef<THREE.Group>(null);

  /** Clone, auto-center on origin, auto-scale to a target size, and override material with gold PBR. */
  const normalized = useMemo(() => {
    const cloned = gltf.scene.clone(true);

    // Auto-center: shift so geometric center sits at world origin
    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    cloned.position.sub(center);

    // Auto-scale: fit longest dimension to a known target so the crown reads regardless of source units
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const target = 2.6;
    cloned.scale.setScalar(target / maxDim);

    // Gold PBR override on every mesh
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#c9a84c"),
      metalness: 0.92,
      roughness: 0.2,
      emissive: new THREE.Color("#c9a84c"),
      emissiveIntensity: 0.08,
    });
    cloned.traverse((obj) => {
      const m = obj as THREE.Mesh;
      if (m.isMesh) {
        m.material = goldMaterial;
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });

    return cloned;
  }, [gltf]);

  /** Continuous rotation + gentle bob — visible regardless of scroll position. */
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.35;
    const t = state.clock.elapsedTime;
    ref.current.rotation.x = Math.sin(t * 0.4) * 0.12;
    ref.current.rotation.z = Math.cos(t * 0.3) * 0.05;
    ref.current.position.y = Math.sin(t * 0.7) * 0.15;
  });

  return (
    <group ref={ref}>
      <primitive object={normalized} />
    </group>
  );
}

function CrownSTL() {
  const { STLLoader } = require("three/examples/jsm/loaders/STLLoader.js");
  const geom = useLoader(STLLoader, "/cinematic/crown.stl") as THREE.BufferGeometry;

  const centered = useMemo(() => {
    const g = geom.clone();
    g.center();
    g.computeBoundingSphere();
    if (g.boundingSphere) {
      const target = 1.4;
      const factor = target / g.boundingSphere.radius;
      g.scale(factor, factor, factor);
    }
    g.computeVertexNormals();
    return g;
  }, [geom]);

  return (
    <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.25}>
      <mesh geometry={centered} castShadow receiveShadow>
        <meshStandardMaterial
          color="#c9a84c"
          metalness={0.92}
          roughness={0.2}
          emissive={new THREE.Color("#c9a84c")}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function ParticleField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const { positions, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4;
      const a = Math.random() * Math.PI * 2;
      const b = (Math.random() - 0.5) * Math.PI;
      positions[i * 3 + 0] = Math.cos(a) * Math.cos(b) * r;
      positions[i * 3 + 1] = Math.sin(b) * r * 0.6;
      positions[i * 3 + 2] = Math.sin(a) * Math.cos(b) * r;
      sizes[i] = 0.02 + Math.random() * 0.05;
    }
    return { positions, sizes };
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#e2c46e"
        size={0.05}
        sizeAttenuation
        transparent
        opacity={0.85}
      />
    </points>
  );
}

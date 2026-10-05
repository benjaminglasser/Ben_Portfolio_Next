"use client";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useFBO, useGLTF } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';

function SpinningMesh(props) {
  const group = useRef(null);
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = group.current.rotation.x += 0.004;
    }
  });

  const { nodes } = useGLTF("/3D/ben.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh_0.geometry}
        material={nodes.mesh_0.material}
      // ref={ref}
      />
    </group>
  );
}

useGLTF.preload("/3D/ben.glb");

extend({ OrbitControls });

function Controls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
      enableZoom={false}
    />
  );
}

const Lights = () => {
  return (
    <>
      <ambientLight intensity={5} />
    </>
  );
};

function BenMesh() {
  return (
    <>
      <mesh>
        <SpinningMesh />
      </mesh>
    </>
  );
}

// Post-processing: redraws the render as a rust dot-matrix halftone so the
// head matches the dot grid and dot type used across the design system.
const halftoneShader = {
  uniforms: {
    tScene: { value: null },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uCell: { value: 6 },
    uInk: { value: new THREE.Vector3(176 / 255, 43 / 255, 26 / 255) },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tScene;
    uniform vec2 uResolution;
    uniform float uCell;
    uniform vec3 uInk;
    varying vec2 vUv;
    void main() {
      vec2 px = vUv * uResolution;
      vec2 cell = floor(px / uCell);
      vec2 center = (cell + 0.5) * uCell;
      vec4 src = texture2D(tScene, center / uResolution);
      float luma = dot(pow(src.rgb, vec3(1.0 / 2.2)), vec3(0.299, 0.587, 0.114));
      float shade = smoothstep(0.15, 0.95, 1.0 - luma);
      float mask = step(0.5, src.a);
      float radius = mix(0.1, 0.55, shade) * uCell;
      float d = length(px - center);
      float ink = (1.0 - smoothstep(radius - 0.75, radius + 0.75, d)) * mask;
      gl_FragColor = vec4(uInk * ink, ink);
    }
  `,
};

function Halftone() {
  const { gl, scene, camera, size, viewport } = useThree();
  const dpr = viewport.dpr;
  const target = useFBO(size.width * dpr, size.height * dpr);

  const [postScene, postCamera, material] = useMemo(() => {
    const mat = new THREE.ShaderMaterial({
      ...halftoneShader,
      uniforms: THREE.UniformsUtils.clone(halftoneShader.uniforms),
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
    const s = new THREE.Scene();
    s.add(quad);
    return [s, new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), mat];
  }, []);

  useFrame(() => {
    material.uniforms.tScene.value = target.texture;
    material.uniforms.uResolution.value.set(size.width * dpr, size.height * dpr);
    material.uniforms.uCell.value = 4.5 * dpr;
    gl.setRenderTarget(target);
    gl.clear();
    gl.render(scene, camera);
    gl.setRenderTarget(null);
    gl.clear();
    gl.render(postScene, postCamera);
  }, 1);

  return null;
}

const ThreeComponent = () => {
  return (
    <Canvas
      shadowMap
      colorManagement
      camera={{ position: [-12, 2, 10], fov: 6 }}>
      <Lights />
      <BenMesh />
      <Controls />
      <Halftone />
    </Canvas>
  );
};

export default ThreeComponent;

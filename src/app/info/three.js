"use client";
import React, { useRef } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useGLTF } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';

function SpinningMesh(props) {
  const group = useRef(null);
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = group.current.rotation.x += 0.01;
    }
  });

  const { nodes } = useGLTF("/ben.glb");
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

useGLTF.preload("/ben.glb");

console.log("OrbitControls", OrbitControls);

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

const ThreeComponent = () => {
  return (
    <Canvas
      shadowMap
      colorManagement
      camera={{ position: [-12, 2, 10], fov: 6 }}>
      <Lights />
      <BenMesh />
      <Controls />
    </Canvas>
  );
};

export default ThreeComponent;

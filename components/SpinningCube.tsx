import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const SpinningCube = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta, xrFrame) => {
    var m = meshRef.current;
    if (m) {
      m.rotation.y += delta * 0.5;
    }
  });
  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default SpinningCube;

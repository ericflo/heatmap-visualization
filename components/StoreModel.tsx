import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const StoreModel = () => {
  const group = useRef<THREE.Group>(null!);
  const { nodes } = useGLTF("/models/store.glb");
  return (
    <group ref={group} dispose={null}>
      {Object.keys(nodes).map((key, i) => {
        const node = nodes[key] as THREE.Mesh;
        if (!node.geometry) {
          return null;
        }
        return (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={node.material}
          />
        );
      })}
    </group>
  );
};

export default StoreModel;

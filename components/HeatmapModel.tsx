import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const HeatmapModel = () => {
  const group = useRef<THREE.Group>(null!);
  const prefix = process.env.NODE_ENV === 'production' ? '/heatmap-visualization' : '';
  const glbPath = prefix + "/models/rebuilt shop heatmap 04 8k.glb";
  //const texPath = prefix + "/textures/meredith_map flattened 02 2K.png";
  const texPath = prefix + "/textures/new_tex.png";
  const { nodes } = useGLTF(glbPath);
  const colorMap = useLoader(TextureLoader, texPath);
  useEffect(() => {
    colorMap.flipY = false;
    colorMap.generateMipmaps = false;
  }, [colorMap]);
  return (
    <group ref={group} dispose={null}>
      {Object.keys(nodes).map((key, i) => {
        const node = nodes[key] as THREE.Mesh;
        if (!node.geometry) {
          return null;
        }
        const mat = node.material as THREE.MeshStandardMaterial;
        mat.map = colorMap;
        return (
          <mesh
            key={key}
            castShadow
            receiveShadow
            geometry={node.geometry}
            material={mat}
          />
        );
      })}
    </group>
  );
};

export default HeatmapModel;

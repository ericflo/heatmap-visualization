import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";

interface HeatmapModelProps {
  assetPrefix: string;
}

const HeatmapModel = ({ assetPrefix }: HeatmapModelProps) => {
  const group = useRef<THREE.Group>(null!);
  const glbPath = assetPrefix + "/models/heatmap.glb";
  const { nodes } = useGLTF(glbPath);
  return (
    <group ref={group} dispose={null}>
      {Object.keys(nodes).map((key, i) => {
        const node = nodes[key] as THREE.Mesh;
        if (!node.geometry) {
          return null;
        }
        const basicMat = node.material as THREE.MeshBasicMaterial;
        return (
          <mesh
            key={key}
            geometry={node.geometry}
            material={
              new THREE.MeshBasicMaterial({
                transparent: true,
                map: basicMat.map,
                depthWrite: false,
              })
            }
            renderOrder={1}
          />
        );
      })}
    </group>
  );
};

export default HeatmapModel;

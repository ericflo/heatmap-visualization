import * as THREE from "three";
import { useRef, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";

interface HeatmapModelProps {
  assetPrefix: string;
  wireframe?: boolean;
}

const HeatmapModel = ({ assetPrefix, wireframe }: HeatmapModelProps) => {
  const group = useRef<THREE.Group>(null!);
  const glbPath = assetPrefix + "/models/rebuilt shop heatmap 04 8k.glb";
  const texPath = assetPrefix + "/textures/meredith_map flattened 02 2K.png";
  const texAlphaPath =
    assetPrefix + "/textures/meredith_map flattened 02 2K alpha.png";
  //const texPath = assetPrefix + "/textures/new_tex.png";
  const { nodes } = useGLTF(glbPath);
  const colorMap = useLoader(TextureLoader, texPath);
  const alphaMap = useLoader(TextureLoader, texAlphaPath);
  useEffect(() => {
    if (colorMap) {
      colorMap.flipY = false;
      colorMap.generateMipmaps = true;
      colorMap.minFilter = THREE.NearestFilter;
      colorMap.magFilter = THREE.NearestFilter;
    }
    if (alphaMap) {
      alphaMap.flipY = false;
      alphaMap.generateMipmaps = true;
      alphaMap.minFilter = THREE.NearestFilter;
      alphaMap.magFilter = THREE.NearestFilter;
    }
  }, [colorMap, alphaMap]);
  return (
    <group ref={group} dispose={null}>
      {Object.keys(nodes).map((key, i) => {
        const node = nodes[key] as THREE.Mesh;
        if (!node.geometry) {
          return null;
        }
        const mat = new THREE.MeshBasicMaterial({
          transparent: true,
          map: colorMap,
          depthWrite: false,
        });
        const wireframeMat = wireframe
          ? new THREE.MeshBasicMaterial({
              transparent: false,
              wireframe: true,
              color: 0xffffff,
            })
          : undefined;
        return (
          <>
            <mesh
              key={key}
              geometry={node.geometry}
              material={mat}
              renderOrder={1}
            />
            {wireframe ? (
              <mesh
                key={key}
                geometry={node.geometry}
                material={wireframeMat}
                renderOrder={2}
              />
            ) : null}
          </>
        );
      })}
    </group>
  );
};

export default HeatmapModel;

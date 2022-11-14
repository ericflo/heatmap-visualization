import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import StoreModel from "../components/StoreModel";
import HeatmapModel from "../components/HeatmapModel";
import NavigationControls from "../components/NavigationControls";

const ASSET_PREFIX =
  process.env.NODE_ENV === "production" ? "/heatmap-visualization" : "";

const HomePage = () => {
  const [showModel, setShowModel] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const handleToggleHeatmap = useCallback(() => setShowHeatmap((b) => !b), []);
  const handleToggleModel = useCallback(() => setShowModel((b) => !b), []);
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <div className="buttons">
        <button onClick={handleToggleModel}>
          {showModel ? "Hide" : "Show"} 3D Model
        </button>
        <button onClick={handleToggleHeatmap}>
          {showHeatmap ? "Hide" : "Show"} Heatmap
        </button>
      </div>
      <div style={{ height: "100%" }}>
        <Canvas>
          <NavigationControls
            onHeatmapToggle={handleToggleHeatmap}
            on3DModelToggle={handleToggleModel}
            cameraSensitivity={0.2}
          />
          <ambientLight intensity={0.75} />
          {showModel ? <StoreModel assetPrefix={ASSET_PREFIX} /> : null}
          {showHeatmap ? <HeatmapModel assetPrefix={ASSET_PREFIX} /> : null}
        </Canvas>
      </div>
    </div>
  );
};

export default HomePage;

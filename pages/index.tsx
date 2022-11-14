import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import StoreModel from "../components/StoreModel";
import HeatmapModel from "../components/HeatmapModel";
import NavigationControls from "../components/NavigationControls";

const HomePage = () => {
  const [mode, setMode] = useState("heatmap");
  const handleViewHeatmapClick = useCallback(() => setMode("heatmap"), []);
  const handleView3DModelClick = useCallback(() => setMode("rgb"), []);
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <div className="buttons">
        {mode === "heatmap" ? (
          <button onClick={handleView3DModelClick}>View 3D Model</button>
        ) : (
          <button onClick={handleViewHeatmapClick}>View Heatmap</button>
        )}
      </div>
      <div style={{ height: "100%" }}>
        <Canvas>
          <NavigationControls onModeChange={setMode} cameraSensitivity={0.2} />
          <ambientLight intensity={0.75} />
          {mode === "heatmap" ? <HeatmapModel /> : <StoreModel />}
        </Canvas>
      </div>
    </div>
  );
};

export default HomePage;

import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Head from "next/head";
import Image from "next/image";
import StoreModel from "../components/StoreModel";
import HeatmapModel from "../components/HeatmapModel";
import NavigationControls from "../components/NavigationControls";
//import modelIcon from "../public/images/model-icon.png";
//import heatmapIcon from "../public/images/heatmap-icon.png";

const ASSET_PREFIX =
  process.env.NODE_ENV === "production" ? "/heatmap-visualization" : "";
const IMG_PREFIX = `${ASSET_PREFIX}/images`;

const HomePage = () => {
  const [showModel, setShowModel] = useState(true);
  const [showHeatmap, setShowHeatmap] = useState(true);
  const handleToggleHeatmap = useCallback(() => setShowHeatmap((b) => !b), []);
  const handleToggleModel = useCallback(() => setShowModel((b) => !b), []);
  const modelIcon = `${IMG_PREFIX}/${
    showModel ? "" : "disabled-"
  }model-icon.png`;
  const heatmapIcon = `${IMG_PREFIX}/${
    showHeatmap ? "" : "disabled-"
  }heatmap-icon.png`;
  return (
    <div style={{ height: "100vh" }}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

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
      <div className="buttons">
        <button
          onClick={handleToggleModel}
          className={showModel ? "activated" : ""}
        >
          <Image
            src={modelIcon}
            alt={(showModel ? "Hide" : "Show") + " 3D Model"}
            width={100}
            height={100}
          />
          <span>{(showModel ? "Hide" : "Show") + " 3D Model"}</span>
        </button>
        <button
          onClick={handleToggleHeatmap}
          className={showHeatmap ? "activated" : ""}
        >
          <Image
            src={heatmapIcon}
            alt={(showHeatmap ? "Hide" : "Show") + " Heatmap"}
            width={100}
            height={100}
          />
          <span>{(showHeatmap ? "Hide" : "Show") + " Heatmap"}</span>
        </button>
      </div>
    </div>
  );
};

export default HomePage;

import { useState, useCallback, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
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

const InitialCameraSetup = () => {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(0.5652270391377908, -0.6096, 4.4364535039924355);
    camera.rotation.set(
      -1.506695914101631,
      1.4448726362555877,
      1.5061857385900277,
      "XYZ"
    );
  }, [camera]);
  return null;
};

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
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      <div style={{ height: "100%" }}>
        <Canvas>
          <InitialCameraSetup />
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

      <div className="paxton-gate">
        <a href="https://paxtongate.com/" target="_blank">
          <Image
            src={`${IMG_PREFIX}/pin-icon.png`}
            alt="Location pin icon"
            width={18}
            height={18}
          />
          Paxton Gate
        </a>
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

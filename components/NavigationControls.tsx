import * as THREE from "three";
import { useEffect, useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

interface NavigationControlsProps {
  onHeatmapToggle: () => void;
  on3DModelToggle: () => void;
  cameraSensitivity: number;
}

const NavigationControls = ({
  onHeatmapToggle,
  on3DModelToggle,
  cameraSensitivity,
}: NavigationControlsProps) => {
  const { camera } = useThree();
  const velocity = useRef(new THREE.Vector2(0, 0));
  const damping = 0.95;
  const speed = 0.025;
  const vec = useRef(new THREE.Vector3());

  useEffect(() => {
    const mouse = { down: false, prevTouch: [-1, -1] };

    const handleKeyDown = (ev: KeyboardEvent) => {
      const isU = ev.key === "ArrowUp" || ev.key === "Up" || ev.key === "w";
      const isD = ev.key === "ArrowDown" || ev.key === "Down" || ev.key === "s";
      const isL = ev.key === "ArrowLeft" || ev.key === "Left" || ev.key === "a";
      const isR =
        ev.key === "ArrowRight" || ev.key === "Right" || ev.key === "d";
      if (isU || isD) {
        velocity.current.x += (isU ? 1 : -1) * speed;
      } else if (isL || isR) {
        velocity.current.y += (isR ? 1 : -1) * speed;
      } else if (ev.key === "h") {
        onHeatmapToggle?.();
      } else if (ev.key === "m") {
        on3DModelToggle?.();
      }
    };

    const handleMouseMove = (ev: MouseEvent) => {
      if (!mouse.down) {
        return;
      }
      var movementY = (ev.movementY * Math.PI * cameraSensitivity) / 180;
      var movementX = (ev.movementX * Math.PI * cameraSensitivity) / 180;
      camera.rotateOnWorldAxis(
        new THREE.Vector3(0, 1, 0),
        THREE.MathUtils.degToRad(50 * movementX)
      );
      camera.rotateX(movementY);
    };

    const handleTouchMove = (ev: TouchEvent) => {
      if (!mouse.down) {
        return;
      }
      const firstRun = mouse.prevTouch[0] === -1 && mouse.prevTouch[1] === -1;

      if (!firstRun) {
        const deltaX = ev.touches[0].pageX - mouse.prevTouch[0];
        const deltaY = ev.touches[0].pageY - mouse.prevTouch[1];
        var movementY = (deltaY * Math.PI * cameraSensitivity) / 180;
        var movementX = (deltaX * Math.PI * cameraSensitivity) / 180;
        camera.rotateOnWorldAxis(
          new THREE.Vector3(0, 1, 0),
          THREE.MathUtils.degToRad(-50 * movementX)
        );
        camera.rotateX(-movementY);
      }

      mouse.prevTouch[0] = ev.touches[0].pageX;
      mouse.prevTouch[1] = ev.touches[0].pageY;
    };

    const handleMouseDown = () => {
      mouse.down = true;
    };

    const handleMouseUp = () => {
      mouse.down = false;
      mouse.prevTouch[0] = -1;
      mouse.prevTouch[1] = -1;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleMouseDown);
    window.addEventListener("touchend", handleMouseUp);
    window.addEventListener("touchcancel", handleMouseUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleMouseDown);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("touchcancel", handleMouseUp);
    };
  }, [cameraSensitivity]);

  useFrame((state, delta, frame) => {
    // Forward / Backward Movement
    vec.current.setFromMatrixColumn(camera.matrix, 0);
    vec.current.crossVectors(camera.up, vec.current);
    camera.position.addScaledVector(vec.current, velocity.current.x);

    // Left / Right Strafe Movement
    vec.current.setFromMatrixColumn(camera.matrix, 0);
    camera.position.addScaledVector(vec.current, velocity.current.y);

    velocity.current.x *= damping; // TODO: Incorporate deltaTime
    velocity.current.y *= damping; // TODO: Incorporate deltaTime
  });
  return null;
};

export default NavigationControls;

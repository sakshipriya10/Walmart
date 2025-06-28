 import React, { useEffect } from "react";
import "aframe";
import "mind-ar/dist/mindar-image-aframe.prod.js";

const ARViewer = ({ modelUrl, onClose }) => {
  useEffect(() => {
    return () => {
      // Cleanup when component unmounts
      const sceneEl = document.querySelector("a-scene");
      if (sceneEl) {
        sceneEl.pause();
        sceneEl.renderer && sceneEl.renderer.dispose();
        sceneEl.remove();
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white z-50">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white rounded z-50"
      >
        ❌ Close AR
      </button>

      <a-scene
        mindar-image="imageTargetSrc: /targets/target.mind; autoStart: true;"
        color-space="sRGB"
        renderer="colorManagement: true, physicallyCorrectLights"
        vr-mode-ui="enabled: false"
        device-orientation-permission-ui="enabled: true"
        embedded
      >
        <a-assets>
          <a-asset-item id="model" src={modelUrl}></a-asset-item>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        <a-entity mindar-image-target="targetIndex: 0">
          <a-gltf-model
            src="#model"
            position="0 0 0"
            rotation="0 0 0"
            scale="0.1 0.1 0.1"
          ></a-gltf-model>
        </a-entity>
      </a-scene>
    </div>
  );
};

export default ARViewer;

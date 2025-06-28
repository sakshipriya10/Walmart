 import React, { useRef, useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const ObjectDetection = ({ setShowAR }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [stream, setStream] = useState(null);

  useEffect(() => {
    let model = null;
    let animationFrameId;

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            runDetection();
          };
          setStream(stream);
        }
      } catch (err) {
        console.error("❌ Camera access error:", err);
      }
    };

    const runDetection = async () => {
      model = await cocoSsd.load();
      console.log("✅ COCO-SSD model loaded");

      const detectFrame = async () => {
        if (
          videoRef.current &&
          videoRef.current.readyState === 4 &&
          isDetecting
        ) {
          const predictions = await model.detect(videoRef.current);
          drawPredictions(predictions);
          showRecommendation(predictions);
        }
        animationFrameId = requestAnimationFrame(detectFrame);
      };

      detectFrame();
    };

    const drawPredictions = (predictions) => {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      predictions.forEach((prediction) => {
        const [x, y, width, height] = prediction.bbox;
        ctx.beginPath();
        ctx.rect(x, y, width, height);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "lime";
        ctx.fillStyle = "lime";
        ctx.stroke();
        ctx.font = "16px Arial";
        ctx.fillText(prediction.class, x, y > 10 ? y - 5 : 10);
      });
    };

    const showRecommendation = (predictions) => {
      const objects = predictions.map((p) => p.class);
      if (objects.includes("handbag")) {
        setRecommendation("👜 Recommended: Trendy Handbags");
      } else if (objects.includes("person")) {
        setRecommendation("👕 Recommended: Outfit Ideas for You");
      } else if (objects.includes("bottle")) {
        setRecommendation("🥤 Recommended: Water Bottles");
      } else {
        setRecommendation("");
      }
    };

    if (isDetecting) {
      setupCamera();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isDetecting]);

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setIsDetecting(false);
    setRecommendation("");
  };

  return (
    <div className="bg-white border rounded-xl shadow-lg p-6 text-left">
      <h3 className="text-xl font-bold text-gray-800 mb-4">🎥 Smart Object Detection</h3>
      <p className="text-gray-600 text-sm mb-2">
        Detect real-world items using your webcam and get shopping suggestions instantly.
      </p>

      {!isDetecting ? (
        <button
          onClick={() => setIsDetecting(true)}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
        >
          Start Detection
        </button>
      ) : (
        <>
          <div className="relative mt-4">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              width="640"
              height="480"
              className="w-full h-auto rounded"
            />
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              className="absolute top-0 left-0 w-full h-auto pointer-events-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={stopCamera}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              ❌ Stop Detection
            </button>

            <button
              onClick={() => setShowAR(true)}
              className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
            >
              🪄 Try in AR
            </button>
          </div>

          {recommendation && (
            <div className="mt-4 p-3 border rounded bg-pink-50 text-gray-800">
              <p className="text-md font-medium">{recommendation}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ObjectDetection;

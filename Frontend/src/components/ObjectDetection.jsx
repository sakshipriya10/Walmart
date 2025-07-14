 import React, { useRef, useEffect, useState } from "react";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import { useNavigate } from "react-router-dom";

const ObjectDetection = ({ setShowAR }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [modelLoaded, setModelLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let model = null;
    let animationFrameId;
    let localStream = null;

    const setupCamera = async () => {
      try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = localStream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            runDetection();
          };
        }
      } catch (err) {
        console.error("❌ Camera access error:", err);
      }
    };

    const runDetection = async () => {
      model = await cocoSsd.load();
      setModelLoaded(true);
      console.log("✅ COCO-SSD model loaded");

      const detectFrame = async () => {
        if (videoRef.current && isDetecting && modelLoaded) {
          const predictions = await model.detect(videoRef.current);
          console.log("Predictions:", predictions);
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

    const showRecommendation = async (predictions) => {
      const objects = predictions.map((p) => p.class);
      console.log("Detected:", objects);

      let query = "";
      if (objects.includes("handbag") || objects.includes("backpack")) {
        setRecommendation("👜 Recommended: Trendy Handbags or Backpacks");
        query = "handbag";
      } else if (objects.includes("person")) {
        setRecommendation("👕 Recommended: Outfit Ideas for You");
        query = "clothing";
      } else if (objects.includes("earing")) {
        setRecommendation("🌟 Recommended: Earings");
        query = "earing";
      } else {
        setRecommendation("📦 Try detecting another object like bottle, handbag, or person.");
        setRecommendedProducts([]);
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/products/search?q=${query}`);
        const data = await res.json();
        setRecommendedProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setRecommendedProducts([]);
      }
    };

    if (isDetecting) {
      setupCamera();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, [isDetecting, modelLoaded]);

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsDetecting(false);
    setRecommendation("");
    setRecommendedProducts([]);
  };

  const handleProductClick = (productId) => {
    stopCamera();
    navigate(`/products/${productId}`);
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
          className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded hover:shadow-[0_0_12px_#9333ea] transition"
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
              className="px-4 py-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded hover:shadow-[0_0_12px_#9333ea] transition"
            >
              ❌ Stop Detection
            </button>

          </div>

          {recommendation && (
            <div className="mt-4 p-3 border rounded bg-pink-50 text-gray-800">
              <p className="text-md font-medium">{recommendation}</p>
            </div>
          )}

          {recommendedProducts.length > 0 ? (
            <div className="mt-6">
              <h4 className="text-lg font-semibold text-gray-700 mb-2">🛍 Suggested Products</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="border rounded-xl p-4 shadow-md bg-white"
                  >
                    <img
                      src={product.image || product.thumbnail}
                      alt={product.name}
                      className="w-full h-40 object-contain mb-2 rounded"
                    />
                    <h5 className="font-bold text-pink-600">{product.name}</h5>
                    <p className="text-sm text-gray-600">₹{Math.round(product.price * 85)}</p>
                    <button
                      onClick={() => handleProductClick(product._id)}
                      className="mt-2 px-2 py-2 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-rounder-lg hover:shadow-[0_0_12px_#9333ea] transition"
                    >
                      View Product
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 italic mt-4">
              No products matched the detected object.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ObjectDetection;

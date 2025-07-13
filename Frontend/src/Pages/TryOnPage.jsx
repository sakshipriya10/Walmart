import React, { useState, useRef, useEffect } from "react";

// ✅ Local images
import shirt1 from "../assets/tryon/shirt1.png";
import shirt2 from "../assets/tryon/shirt2.png";
import shirt3 from "../assets/tryon/shirt3.png";
import shirt4 from "../assets/tryon/shirt4.png";
import shirt5 from "../assets/tryon/shirt5.png";
import shirt6 from "../assets/tryon/shirt6.png";
import shirt7 from "../assets/tryon/shirt7.png";
import shirt8 from "../assets/tryon/shirt8.png";
import shirt9 from "../assets/tryon/shirt9.png";

import { useProductData } from "../data/useProductData";

// ✅ Local clothes array
const localTryonClothes = [
  { id: 1, image: shirt1 },
  { id: 2, image: shirt2 },
  { id: 3, image: shirt3 },
  { id: 4, image: shirt4 },
  { id: 5, image: shirt5 },
  { id: 6, image: shirt6 },
  { id: 7, image: shirt7 },
  { id: 8, image: shirt8 },
  { id: 9, image: shirt9 },
];

const TryOnPage = () => {
  const [cameraOn, setCameraOn] = useState(false);
  const [useUpload, setUseUpload] = useState(false);
  const [selectedCloth, setSelectedCloth] = useState(null);
  const [overlayImage, setOverlayImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [fitType, setFitType] = useState("medium");


  const { allProducts, loading } = useProductData();
  const items = localTryonClothes;

  useEffect(() => {
    if (cameraOn && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
        })
        .catch((err) => console.error("Error accessing camera:", err));
    }
  }, [cameraOn]);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraOn(false);
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  const handleTryOn = async () => {
  if (!selectedCloth || (!cameraOn && !uploadedImage)) return;

  let userBlob;

  if (useUpload && uploadedImage) {
    // uploadedImage is a dataURL (base64) → convert to Blob
    const response = await fetch(uploadedImage);
    userBlob = await response.blob();
  } else {
    const imageDataURL = captureImage();
    userBlob = await (await fetch(imageDataURL)).blob();
  }

  let clothBlob;
  try {
    const response = await fetch(selectedCloth.image);
    clothBlob = await response.blob();
  } catch (err) {
    console.error("Failed to load cloth image:", err);
    return;
  }

  const formData = new FormData();
  formData.append("userImage", userBlob, "user.png");
  formData.append("itemImage", clothBlob, "cloth.png");
  formData.append("fit", fitType);

  try {
    const res = await fetch("http://localhost:5000/api/tryon", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Server error: ${res.status} - ${errText}`);
    }

    const data = await res.blob();
    const outputUrl = URL.createObjectURL(data);
    setOverlayImage(outputUrl);
  } catch (err) {
    console.error("Try-on failed:", err);
  }
};

const handleReset = () => {
  setOverlayImage(null);
  setSelectedCloth(null);
  setUploadedImage(null);
};



 return (
  <div className="min-h-screen w-screen overflow-x-hidden bg-gradient-to-br from-[#FDEEF4] to-[#E0F7FA]">
    <div className="max-w-[1440px] mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-[#4A4A4A] text-center mb-6">Virtual Try-On</h1>

      {/* Fit Type Toggle */}
      <div className="flex justify-center mb-6 gap-2">
        <span className="text-sm font-medium text-gray-600">Fit Style:</span>
        {["tight", "medium", "loose"].map((fit) => (
          <button
            key={fit}
            onClick={() => setFitType(fit)}
            className={`px-3 py-1 text-sm rounded-full border transition-all ${
              fitType === fit
                ? "bg-pink-200 text-gray-800 border-pink-300 font-semibold"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {fit.charAt(0).toUpperCase() + fit.slice(1)}
          </button>
        ))}
      </div>

      {/* Main Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Try-On Area */}
        <div className="flex flex-col items-center justify-center flex-1 bg-[#E6E6FA] rounded-2xl p-6 shadow-lg">
          {/* Preview Area */}
          <div className="w-full h-full max-h-[500px] bg-[#F3F4F6] rounded-xl flex items-center justify-center overflow-hidden relative">
            {overlayImage ? (
              <img src={overlayImage} alt="Result" className="w-full h-full object-contain rounded-xl" />
            ) : cameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover rounded-xl"
              />
            ) : uploadedImage ? (
              <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-contain rounded-xl" />
            ) : (
              <span className="text-gray-400">Your image or live feed</span>
            )}
          </div>

          {/* Buttons Group */}
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <button
              className={`px-4 py-2 rounded-lg text-white transition ${
                !useUpload ? "bg-[#81D4FA]" : "bg-gray-400"
              }`}
              onClick={() => {
                setUseUpload(false);
                setOverlayImage(null);
                setUploadedImage(null);
                setCameraOn((prev) => !prev);
                if (cameraOn) stopCamera();
              }}
            >
              {cameraOn ? "Stop Camera" : "Use Live Camera"}
            </button>

            <input
              type="file"
              accept="image/*"
              id="fileUpload"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setUploadedImage(reader.result);
                    setUseUpload(true);
                    setOverlayImage(null);
                    setCameraOn(false);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />

            <button
              className="px-4 py-2 rounded-lg text-white transition bg-[#81D4FA] hover:bg-[#4FC3F7]"
              onClick={() => document.getElementById("fileUpload").click()}
            >
              Upload a Photo
            </button>
          </div>

          {/* Try-On + Reset Buttons */}
          <div className="flex gap-4 mt-4">
            {(selectedCloth && (cameraOn || uploadedImage)) && !overlayImage && (
              <button
                className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={handleTryOn}
              >
                Try Selected Cloth
              </button>
            )}
            {overlayImage && (
              <button
                className="bg-red-400 text-white px-5 py-2 rounded-lg hover:bg-red-500 transition"
                onClick={handleReset}
              >
                Reset Try-On
              </button>
            )}
          </div>
        </div>

        {/* Item List */}
        <div className="w-full lg:w-[350px] bg-[#E6E6FA] rounded-2xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
          <h2 className="text-xl font-semibold text-[#4A4A4A] mb-4">Try Clothes</h2>

          <div className="grid grid-cols-3 gap-4">
            {items.map((item) => (
              <img
                key={item.id}
                src={item.image}
                onClick={() => setSelectedCloth(item)}
                className={`rounded-xl h-24 w-24 object-contain cursor-pointer hover:scale-105 transition ${
                  selectedCloth?.id === item.id ? "ring-4 ring-blue-400" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);


};

export default TryOnPage;

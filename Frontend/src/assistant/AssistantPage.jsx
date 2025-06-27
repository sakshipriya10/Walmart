 import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function AssistantPage() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
    }
  }, [browserSupportsSpeechRecognition]);

  // Optional: Auto-fill from voice input
  useEffect(() => {
    setMessage(transcript);
  }, [transcript]);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/assistant", { message });
      setResponse(res.data.products);
    } catch (err) {
      console.error("Error:", err);
      setResponse([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">🧠 Smart Shopping Assistant</h1>

      <div className="mb-4">
        <textarea
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe what you're looking for..."
          className="w-full border p-3 rounded shadow"
        ></textarea>

        <div className="flex gap-3 mt-2">
          <button
            onClick={handleSubmit}
            className="bg-pink-400 hover:bg-pink-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>

          <button
            onClick={() => SpeechRecognition.startListening({ continuous: true })}
            className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded"
          >
            Start Voice
          </button>

          <button
            onClick={SpeechRecognition.stopListening}
            className="bg-cyan-400 hover:bg-cyan-500 text-white px-4 py-2 rounded"
          >
            Stop
          </button>

          <button
            onClick={() => {
              resetTranscript();
              setMessage("");
            }}
            className="bg-purple-400 hover:bg-purple-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-1">
          🎙️ Mic status: {listening ? "Listening..." : "Stopped"}
        </p>
      </div>

      {loading && <p className="text-blue-500">Loading products...</p>}

      {response && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">🛍️ Results:</h2>
          {response.length > 0 ? (
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {response.map((product, index) => (
                <li
                  key={index}
                  className="border p-4 rounded shadow-sm bg-white"
                >
                  <p className="font-bold capitalize">{product.category}</p>
                  <p>Color: {product.color}</p>
                  <p>Price: ₹{product.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No matching products found.</p>
          )}
        </div>
      )}
    </div>
  );
}

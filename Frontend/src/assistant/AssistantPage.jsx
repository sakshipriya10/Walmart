  import React, { useState, useEffect } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ResultList from "./ResultList"; // adjust path if needed

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

      <div className="mb-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 p-4 rounded-lg shadow-md">
        <textarea
          rows="3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="🛍️ Describe what you're looking for..."
          className="w-full rounded-xl p-4 text-gray-800 placeholder-gray-400 bg-gradient-to-br from-white via-blue-50 to-purple-100 border-2 border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 shadow-inner resize-none"
        ></textarea>

        <div className="flex flex-wrap gap-3 mt-3">
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 hover:shadow-lg text-white px-4 py-2 rounded-full transition"
          >
            🔍 Search
          </button>

          <button
            onClick={() => SpeechRecognition.startListening({ continuous: true })}
            className="bg-gradient-to-r from-blue-400 to-blue-600 hover:shadow-lg text-white px-4 py-2 rounded-full transition"
          >
            🎙️ Start Voice
          </button>

          <button
            onClick={SpeechRecognition.stopListening}
            className="bg-gradient-to-r from-cyan-400 to-cyan-600 hover:shadow-lg text-white px-4 py-2 rounded-full transition"
          >
            🛑 Stop
          </button>

          <button
            onClick={() => {
              resetTranscript();
              setMessage("");
            }}
            className="bg-gradient-to-r from-purple-400 to-purple-600 hover:shadow-lg text-white px-4 py-2 rounded-full transition"
          >
            🧹 Clear
          </button>
        </div>

        <p className="text-sm text-gray-600 mt-2">
          🎙️ Mic status:{" "}
          <span className={listening ? "text-green-500 font-medium" : "text-red-500"}>
            {listening ? "Listening..." : "Stopped"}
          </span>
        </p>
      </div>

      {loading && (
        <p className="text-blue-500 text-center font-medium animate-pulse mt-4">
          Loading products...
        </p>
      )}

      {response && (
        <div className="mt-6">
          <ResultList products={response} />
        </div>
      )}
    </div>
  );
}

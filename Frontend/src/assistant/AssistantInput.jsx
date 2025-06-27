 import React, { useState } from "react";
import ResultList from "./ResultList";

const AssistantInput = () => {
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("❌ Error fetching assistant results:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-center">
      <h2 className="text-2xl font-semibold mb-4">Search with Assistant 🧠</h2>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded"
          placeholder="e.g. Show me black jackets under 1000"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-700"
          onClick={handleSearch}
        >
          {loading ? "Searching..." : "Ask"}
        </button>
      </div>

      <ResultList products={products} />
    </div>
  );
};

export default AssistantInput;

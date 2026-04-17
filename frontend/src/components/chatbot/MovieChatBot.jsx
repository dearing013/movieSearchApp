import React, { useState } from "react";

function MovieChatbot({ onShowResults }) {
  const [messages, setMessages] = useState([
    { id: 1, sender: "bot", text: "Hi! Tell me what kind of movie you’re in the mood for 🎬" },
  ]);
  const [input, setInput] = useState("");

  const addMessage = (sender, text) => {
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, sender, text },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userText = input.trim();
    if (!userText) return;

    addMessage("user", userText);
    setInput("");

    // Get movie suggestions based on user text
    const reply = await handleUserMessage(userText, onShowResults);
    addMessage("bot", reply);
  };

  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12, maxHeight: 400, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, overflowY: "auto", marginBottom: 8 }}>
        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              textAlign: m.sender === "user" ? "right" : "left",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                display: "inline-block",
                padding: "6px 10px",
                borderRadius: 12,
                background: m.sender === "user" ? "#1976d2" : "#eee",
                color: m.sender === "user" ? "#fff" : "#000",
                fontSize: 14,
              }}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask for a movie… e.g. 'funny action movie from the 90s'"
          style={{ flex: 1, padding: 6, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
export default MovieChatbot
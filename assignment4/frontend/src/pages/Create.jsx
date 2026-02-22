import { useState } from "react";

export default function Create() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic, data })
    });

    setTopic("");
    setData("");
    alert("Post created!");
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Create Post</h2>

        <form onSubmit={submit}>
          <label>Topic</label>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} />

          <label>Content</label>
          <textarea value={data} onChange={(e) => setData(e.target.value)} />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

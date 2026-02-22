import { useEffect, useState } from "react";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>All Posts</h2>

        <button onClick={fetchPosts}>Refresh</button>

        <br /><br />

        {posts.map((post) => (
          <div key={post.id} className="post-item">
            <div className="post-topic">{post.topic}</div>
            <div className="post-data">{post.data}</div>
            <div className="post-timestamp">
              Posted on {new Date(post.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

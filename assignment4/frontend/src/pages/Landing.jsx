import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="container">
      <div className="card">
        <h1>Welcome to the Posting System</h1>
        <p>Assignment 4 - Persistent Multi Page Posting System</p>

        <h3>Features:</h3>
        <ul>
          <li>Create posts with topics and content</li>
          <li>View all posts in chronological order</li>
          <li>Data persistence using MySQL database</li>
          <li>Multi page navigation with React Router</li>
        </ul>

        <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
          <Link to="/posts"><button>View Posts</button></Link>
          <Link to="/create"><button>Create New Post</button></Link>
        </div>
      </div>
    </div>
  );
}

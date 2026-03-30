import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MERN Blog</h1>
        <p style={styles.subtitle}>Built with MongoDB · Express · React · Node</p>
      </header>

      <main style={styles.main}>
        {loading ? (
          <p style={styles.loading}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={styles.loading}>No posts found.</p>
        ) : (
          posts.map(post => (
            <div key={post.id} style={styles.card}>
              <h2 style={styles.postTitle}>{post.title}</h2>
              <p style={styles.postBody}>{post.body}</p>
            </div>
          ))
        )}
      </main>

      <footer style={styles.footer}>
        <p>Built by Adithya Gowda — github.com/adhiboss</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#0d1117',
    minHeight: '100vh',
    color: '#c9d1d9',
  },
  header: {
    textAlign: 'center',
    padding: '40px 0 20px',
    borderBottom: '1px solid #21262d',
  },
  title: {
    fontSize: '2.5rem',
    color: '#58a6ff',
    margin: 0,
  },
  subtitle: {
    color: '#8b949e',
    marginTop: '8px',
  },
  main: {
    padding: '30px 0',
  },
  loading: {
    textAlign: 'center',
    color: '#8b949e',
  },
  card: {
    backgroundColor: '#161b22',
    border: '1px solid #21262d',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  postTitle: {
    color: '#58a6ff',
    marginTop: 0,
  },
  postBody: {
    color: '#c9d1d9',
    lineHeight: '1.6',
  },
  footer: {
    textAlign: 'center',
    padding: '20px 0',
    borderTop: '1px solid #21262d',
    color: '#8b949e',
    fontSize: '0.9rem',
  },
};

export default App;

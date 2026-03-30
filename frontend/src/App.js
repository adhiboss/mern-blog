import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !body) return;
    const newPost = { id: posts.length + 1, title, body };
    setPosts([newPost, ...posts]);
    setTitle('');
    setBody('');
    setShowForm(false);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>MERN Blog</h1>
        <p style={styles.subtitle}>Built with MongoDB · Express · React · Node</p>
        <button
          style={styles.button}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : '+ New Post'}
        </button>
      </header>

      {showForm && (
        <div style={styles.form}>
          <h2 style={styles.formTitle}>Create New Post</h2>
          <input
            style={styles.input}
            placeholder="Post title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea
            style={styles.textarea}
            placeholder="Write your post..."
            value={body}
            onChange={e => setBody(e.target.value)}
            rows={5}
          />
          <button style={styles.button} onClick={handleSubmit}>
            Publish Post
          </button>
        </div>
      )}

      <main style={styles.main}>
        {loading ? (
          <p style={styles.loading}>Loading posts...</p>
        ) : posts.length === 0 ? (
          <p style={styles.loading}>No posts yet. Create one!</p>
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
  main: { padding: '30px 0' },
  loading: { textAlign: 'center', color: '#8b949e' },
  card: {
    backgroundColor: '#161b22',
    border: '1px solid #21262d',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '20px',
  },
  postTitle: { color: '#58a6ff', marginTop: 0 },
  postBody: { color: '#c9d1d9', lineHeight: '1.6' },
  footer: {
    textAlign: 'center',
    padding: '20px 0',
    borderTop: '1px solid #21262d',
    color: '#8b949e',
    fontSize: '0.9rem',
  },
  form: {
    backgroundColor: '#161b22',
    border: '1px solid #21262d',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px 0',
  },
  formTitle: { color: '#58a6ff', marginTop: 0 },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#0d1117',
    border: '1px solid #21262d',
    borderRadius: '6px',
    color: '#c9d1d9',
    fontSize: '1rem',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#0d1117',
    border: '1px solid #21262d',
    borderRadius: '6px',
    color: '#c9d1d9',
    fontSize: '1rem',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  button: {
    backgroundColor: '#238636',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

export default App;

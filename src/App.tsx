import React from 'react';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      <h1>Hello, World!</h1>
      <p>Backend URL: {backendUrl}</p>
    </div>
  );
}

export default App;
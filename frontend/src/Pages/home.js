import React from "react";


function Home() {
  const name=localStorage.getItem('authName');
  const token=localStorage.getItem('authToken');

  return (
    <div className="home-container">
      <header className="hero-section">
        {token &&(
        <h1>Szia {name}</h1>
      )}
      </header>
        <h2>Fedezd fel a legújabb filmeket</h2>
        <p>Legyen szó akcióról, drámáról vagy vígjátékról, nálunk mindent megtalálsz!</p>
        <p>Értékeld a filmeket ahogy tetszik!</p>
      
    </div>
  )
};

export default Home;
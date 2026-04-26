import React from "react";
import logo from "./assets/jbn_cakes.jpeg";
import "./home.css";

function Home() {
  return (
    <main className="main-content" id="home">
      {/* HERO */}
      <section className="hero fade-in">
        <div className="hero-text slide-left" >
          <h1 style={{color:" rgba(199, 48, 118, 0.95)"}}>JBN Cakes</h1>
          
          <h2 >
            Designer cakes made fresh premium cakes in kanyakumari
          </h2>

        </div>

        <div className="hero-image slide-right">
          <img src={logo} alt="JBN Cakes logo" />
           {/* <div className="hero-actions">
  
</div> */}


        </div>
        {/* <div className="hero-actions">
  <a
    href="https://www.instagram.com/jbnca_kes/"
    target="_blank"
    rel="noreferrer"
    className="btn primary"
  >
    Contact on Instagram
  </a>
</div> */}
      </section>

      {/* FEATURES */}
      <section className="features fade-in">
        <div className="feature-card">
          <h3>🎂 Handcrafted Cakes</h3>
          <p>Every cake is freshly baked and uniquely designed for you.</p>
        </div>
        <div className="feature-card">
          <h3>✨ Premium Ingredients</h3>
          <p>Only the finest chocolate, cream, and flavors we trust.</p>
        </div>
        <div className="feature-card">
          <h3>❤️ Made With Love</h3>
          <p>We bake with passion to make your moments sweeter.</p>
        </div>
      </section>
    </main>
  );
}

export default Home;


import React from "react";
import "@/styles/navbar.css";

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand">
          <span className="brand-icon" aria-hidden="true" />
          <span className="brand-text">
            <span className="brand-job">Job</span>
            <span className="brand-sphere">Sphere</span>
          </span>
        </div>

        <nav className="main-nav" aria-label="Primary">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Jobs</a></li>
            <li><a href="#">Companies</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>

        <div className="actions">
          <button className="btn btn-login">Login</button>
          <button className="btn btn-register">Register</button>
        </div>
      </div>
    </header>
  );
}

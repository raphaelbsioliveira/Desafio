import React from "react";
import { Outlet, Link } from "react-router-dom";
import ProfileDropdown from "./Components/ProfileDropdown/ProfileDropdown";
import Logo from "./assets/icons/logo.svg";
import Heart from "./assets/images/heart.png";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <Link to="/">
          <img src={Logo} alt="Netshoes" className="app-logo" />
        </Link>
        <nav className="app-nav">
          <Link to="/wishlist" className="nav-link">
            <img src={Heart} alt="Lista de desejos" width={22} height={22} />
            <span className="nav-text">Wishlist</span>{" "}
          </Link>
          <ProfileDropdown />
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}

export default App;

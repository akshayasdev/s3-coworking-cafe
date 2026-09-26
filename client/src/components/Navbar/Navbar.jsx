import { Menu, X } from "lucide-react";
import { useState } from "react";

import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <a
          href="#home"
          className="navbar-logo"
          onClick={closeMenu}
        >
          S3
        </a>

        <div
          className={`navbar-links ${
            menuOpen ? "navbar-links-open" : ""
          }`}
        >
          <a href="#home" onClick={closeMenu}>
            Home
          </a>

          <a href="#workspace" onClick={closeMenu}>
            Workspace
          </a>

          <a href="#cafe" onClick={closeMenu}>
            Café
          </a>

          <a href="#memberships" onClick={closeMenu}>
            Memberships
          </a>

          <a href="#meeting-rooms" onClick={closeMenu}>
            Meeting Rooms
          </a>

          <a href="#events" onClick={closeMenu}>
            Events
          </a>

          <a href="#about" onClick={closeMenu}>
            About
          </a>

          <a href="#location" onClick={closeMenu}>
            Contact
          </a>

          <a
            href="#workspace"
            className="navbar-book-button"
            onClick={closeMenu}
          >
            Book a Space
          </a>
        </div>

        <button
          className="navbar-menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
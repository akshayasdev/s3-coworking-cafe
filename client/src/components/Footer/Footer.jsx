import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <h2>S3</h2>

            <p className="footer-tagline">
              SIP. SIT. START.
            </p>

            <p className="footer-description">
              A modern coworking café where coffee,
              workspace and community come together.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                Instagram
              </a>

              <a href="#" aria-label="LinkedIn">
                LinkedIn
              </a>

              <a href="#" aria-label="Facebook">
                Facebook
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="footer-links">
            <h3>Explore</h3>

            <a href="#workspace">Workspace</a>
            <a href="#cafe">Café</a>
            <a href="#memberships">Memberships</a>
            <a href="#meeting-rooms">Meeting Rooms</a>
            <a href="#events">Events</a>
          </div>

          {/* Company */}
          <div className="footer-links">
            <h3>Company</h3>

            <a href="#about">About S3</a>
            <a href="#gallery">Gallery</a>
            <a href="#testimonials">Testimonials</a>
            <a href="#location">Contact</a>
          </div>

          {/* Contact */}
          <div className="footer-contact">
            <h3>Get In Touch</h3>

            <div>
              <MapPin size={16} />
              <span>
                Hyderabad, Telangana
              </span>
            </div>

            <div>
              <Phone size={16} />
              <span>
                +91 90000 00000
              </span>
            </div>

            <div>
              <Mail size={16} />
              <span>
                hello@s3cafe.com
              </span>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="footer-bottom">

          <p>
            © 2026 S3 Coworking Café. All rights reserved.
          </p>

          <div className="footer-bottom-links">
            <a href="#">
              Privacy Policy
            </a>

            <a href="#">
              Terms & Conditions
            </a>
          </div>

          <button
            className="back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={17} />
          </button>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
import { ArrowRight, Coffee, Wifi, Users } from "lucide-react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-overlay"></div>

      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-badge">
            <span></span>
            Your everyday workspace & café
          </div>

          <h1>
            Work.
            <br />
            Sip.
            <br />
            <em>Connect.</em>
          </h1>

          <p>
            A thoughtfully designed workspace where great ideas,
            meaningful conversations and great coffee come together.
          </p>

          <div className="hero-buttons">
            <a href="#booking" className="hero-primary-btn">
              Book a Workspace
              <ArrowRight size={18} />
            </a>

            <a href="#workspace" className="hero-secondary-btn">
              Explore S3
            </a>
          </div>

        </div>

        <div className="availability-card">

          <p className="availability-label">
            FIND YOUR SPACE
          </p>

          <h3>
            Everything you need
            <br />
            to get things done.
          </h3>

          <div className="availability-items">

            <div className="availability-item">
              <div className="availability-icon">
                <Coffee size={19} />
              </div>

              <div>
                <strong>Café</strong>
                <span>Freshly brewed coffee</span>
              </div>
            </div>

            <div className="availability-item">
              <div className="availability-icon">
                <Wifi size={19} />
              </div>

              <div>
                <strong>Hot Desk</strong>
                <span>High-speed Wi-Fi</span>
              </div>
            </div>

            <div className="availability-item">
              <div className="availability-icon">
                <Users size={19} />
              </div>

              <div>
                <strong>Meeting Rooms</strong>
                <span>Book by the hour</span>
              </div>
            </div>

          </div>

          <a href="#booking" className="availability-btn">
            Check Availability
            <ArrowRight size={17} />
          </a>

        </div>

      </div>

    </section>
  );
}

export default Hero;
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

import "./Location.css";

function Location() {
  return (
    <section className="location-section" id="location">
      <div className="location-container">

        <div className="location-header">
          <span className="location-label">
            FIND S3
          </span>

          <h2>
            Come Work.
            <span> Stay Connected.</span>
          </h2>

          <p>
            Your next productive day starts here.
            Visit S3 and experience a workspace built
            around the way you work.
          </p>
        </div>

        <div className="location-details">

          <div className="location-item">
            <div className="location-icon">
              <MapPin size={21} />
            </div>

            <div>
              <h3>Our Location</h3>

              <p>
                S3 Coworking Café
                <br />
                Hyderabad, Telangana
                <br />
                India
              </p>
            </div>
          </div>

          <div className="location-item">
            <div className="location-icon">
              <Clock size={21} />
            </div>

            <div>
              <h3>Opening Hours</h3>

              <p>
                Monday – Saturday
                <br />
                8:00 AM – 10:00 PM
                <br />
                Sunday – 9:00 AM – 8:00 PM
              </p>
            </div>
          </div>

          <div className="location-item">
            <div className="location-icon">
              <Phone size={21} />
            </div>

            <div>
              <h3>Call Us</h3>

              <p>
                +91 90000 00000
              </p>
            </div>
          </div>

          <div className="location-item">
            <div className="location-icon">
              <Mail size={21} />
            </div>

            <div>
              <h3>Email</h3>

              <p>
                hello@s3cafe.com
              </p>
            </div>
          </div>

        </div>

        <div className="location-bottom">
          <div>
            <strong>Ready to visit S3?</strong>

            <p>
              Drop by for coffee, work and meaningful
              conversations.
            </p>
          </div>

          <button>
            Contact S3
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Location;
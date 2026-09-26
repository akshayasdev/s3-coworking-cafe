import {
  Quote,
  Star,
  ArrowRight,
} from "lucide-react";

import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    role: "Startup Founder",
    text:
      "S3 has completely changed the way I work. I get the productivity of an office with the comfort of a great café.",
  },
  {
    id: 2,
    name: "Priya Reddy",
    role: "UI/UX Designer",
    text:
      "The atmosphere is amazing. Great coffee, fast Wi-Fi and a really comfortable workspace. I can easily spend an entire day here.",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    role: "Software Developer",
    text:
      "I regularly use the meeting rooms for client calls. The setup is professional and booking a space is very convenient.",
  },
];

function Testimonials() {
  return (
    <section
      className="testimonials-section"
      id="testimonials"
    >
      <div className="testimonials-container">

        <div className="testimonials-header">
          <div>
            <span className="testimonials-label">
              S3 COMMUNITY
            </span>

            <h2>
              Loved by People
              <span> Who Get Things Done.</span>
            </h2>
          </div>

          <p>
            See what members and visitors say about
            their experience at S3.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div
              className="testimonial-card"
              key={testimonial.id}
            >
              <div className="testimonial-top">
                <Quote size={25} />

                <div className="testimonial-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={15}
                      fill="currentColor"
                    />
                  ))}
                </div>
              </div>

              <p className="testimonial-text">
                "{testimonial.text}"
              </p>

              <div className="testimonial-user">
                <div className="testimonial-avatar">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3>{testimonial.name}</h3>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-bottom">
          <div>
            <strong>Ready to experience S3?</strong>
            <p>
              Find your workspace and become part of
              our community.
            </p>
          </div>

          <button>
            Join S3
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Testimonials;
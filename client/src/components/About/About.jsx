import {
  Coffee,
  Users,
  Wifi,
  Briefcase,
  ArrowRight,
} from "lucide-react";

import "./About.css";

const highlights = [
  {
    id: 1,
    icon: Coffee,
    title: "Great Coffee",
    description:
      "Freshly brewed coffee and delicious food to keep you energized throughout the day.",
  },
  {
    id: 2,
    icon: Briefcase,
    title: "Work Your Way",
    description:
      "Choose from hot desks, dedicated desks, private cabins and meeting rooms.",
  },
  {
    id: 3,
    icon: Users,
    title: "Real Community",
    description:
      "Meet ambitious professionals, founders, freelancers and creators under one roof.",
  },
  {
    id: 4,
    icon: Wifi,
    title: "Stay Connected",
    description:
      "High-speed Wi-Fi, comfortable workspaces and everything you need to get things done.",
  },
];

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
            alt="S3 coworking workspace"
          />

          <div className="about-image-card">
            <strong>S3</strong>
            <span>Sip. Sit. Start.</span>
          </div>
        </div>

        <div className="about-content">

          <span className="about-label">
            WHY S3
          </span>

          <h2>
            More Than a Café.
            <span> It's Your Space.</span>
          </h2>

          <p className="about-intro">
            S3 brings together the comfort of a café,
            the productivity of a coworking space and
            the energy of a growing community.
          </p>

          <p className="about-text">
            Whether you're working on your next big idea,
            meeting a client, building your startup or
            simply looking for a comfortable place to focus,
            S3 gives you the space and environment to make
            it happen.
          </p>

          <div className="about-highlights">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  className="about-highlight"
                  key={item.id}
                >
                  <div className="about-icon">
                    <Icon size={21} />
                  </div>

                  <div>
                    <h3>{item.title}</h3>

                    <p>{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button className="about-button">
            Discover S3
            <ArrowRight size={17} />
          </button>

        </div>
      </div>
    </section>
  );
}

export default About;
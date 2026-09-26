
import {
  Coffee,
  LockKeyhole,
  Users,
  Monitor,
  ArrowRight,
} from "lucide-react";

import "./Workspace.css";

function Workspace() {
  const workspaces = [
    {
      title: "Hot Desk",
      description:
        "A comfortable shared workspace for focused work, study and creativity.",
      price: "299",
      period: "day",
      icon: Users,
      popular: false,
      features: [
        "High-speed Wi-Fi",
        "Power outlet",
        "Unlimited workspace access",
        "Complimentary coffee",
      ],
    },
    {
      title: "Dedicated Desk",
      description:
        "Your own dedicated desk in a productive coworking environment.",
      price: "6,999",
      period: "month",
      icon: Monitor,
      popular: true,
      features: [
        "Personal dedicated desk",
        "Storage space",
        "High-speed Wi-Fi",
        "4 meeting room credits",
      ],
    },
    {
      title: "Private Cabin",
      description:
        "A quiet private workspace designed for deep focus and productivity.",
      price: "999",
      period: "day",
      icon: LockKeyhole,
      popular: false,
      features: [
        "Private workspace",
        "Meeting facilities",
        "High-speed Wi-Fi",
        "Coffee & refreshments",
      ],
    },
    {
      title: "Meeting Room",
      description:
        "Professional meeting spaces for interviews, presentations and team calls.",
      price: "499",
      period: "hour",
      icon: Users,
      popular: false,
      features: [
        "Display / screen",
        "Whiteboard",
        "High-speed Wi-Fi",
        "Coffee & refreshments",
      ],
    },
  ];

  return (
    <section className="workspace-section" id="workspace">
      <div className="workspace-container">

        {/* Header */}
        <div className="workspace-header">
          <div>
            <div className="section-label">
              FIND YOUR SPACE
            </div>

            <h2>
              Work Your Way.
              <br />
              <span>Choose Your Space.</span>
            </h2>
          </div>

          <p>
            Whether you need a desk for a few hours, a dedicated workspace
            for the month, or a private room for your team, S3 has a space
            that fits the way you work.
          </p>
        </div>

        {/* Workspace Cards */}
        <div className="workspace-grid">

          {workspaces.map((workspace) => {
            const Icon = workspace.icon;

            return (
              <div
                className={`workspace-card ${
                  workspace.popular ? "workspace-popular" : ""
                }`}
                key={workspace.title}
              >

                {/* Popular Badge */}
                {workspace.popular && (
                  <div className="popular-badge">
                    MOST POPULAR
                  </div>
                )}

                {/* Icon */}
                <div className="workspace-icon">
                  <Icon size={23} strokeWidth={1.8} />
                </div>

                {/* Title */}
                <h3>{workspace.title}</h3>

                {/* Description */}
                <p className="workspace-description">
                  {workspace.description}
                </p>

                {/* Price */}
                <div className="workspace-price">
                  <span className="price-symbol">₹</span>

                  <span className="price-value">
                    {workspace.price}
                  </span>

                  <span className="price-period">
                    / {workspace.period}
                  </span>
                </div>

                <div className="workspace-divider"></div>

                {/* Features */}
                <ul className="workspace-features">
                  {workspace.features.map((feature) => (
                    <li key={feature}>
                      <span className="check-icon">
                        ✓
                      </span>

                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button */}
                <a
                  href="#booking"
                  className="workspace-button"
                >
                  Book Now
                  <ArrowRight size={16} />
                </a>

              </div>
            );
          })}

        </div>

        {/* Bottom Note */}
        <div className="workspace-note">

          <div className="note-icon">
            <Coffee size={18} />
          </div>

          <p>
            Every S3 workspace includes comfortable seating,
            high-speed Wi-Fi and a great cup of coffee.
          </p>

        </div>

      </div>
    </section>
  );
}

export default Workspace;


import {
  Coffee,
  Laptop,
  Users,
  Presentation
} from "lucide-react";

import "./Features.css";

function Features() {
  const features = [
    {
      icon: Coffee,
      title: "Great Coffee",
      description:
        "Freshly brewed coffee and handcrafted beverages to keep your ideas flowing."
    },
    {
      icon: Laptop,
      title: "Flexible Workspaces",
      description:
        "Comfortable desks, reliable Wi-Fi and everything you need for focused work."
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Meet entrepreneurs, freelancers, students and creators building amazing things."
    },
    {
      icon: Presentation,
      title: "Meeting Rooms",
      description:
        "Professional spaces for meetings, interviews, presentations and collaborations."
    }
  ];

  return (
    <section className="features-section" id="about">

      <div className="features-container">

        {/* Section Header */}

        <div className="features-header">

          <div className="section-label">
            WHY S3
          </div>

          <h2>
            More Than a Café.
            <br />
            <span>Your Everyday Workspace.</span>
          </h2>

          <p>
            S3 brings together the comfort of a café and the productivity
            of a modern coworking space. Come for the coffee, stay for
            the ideas and community.
          </p>

        </div>

        {/* Feature Cards */}

        <div className="features-grid">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (
              <div
                className="feature-card"
                key={feature.title}
              >

                <div className="feature-number">
                  0{index + 1}
                </div>

                <div className="feature-icon">
                  <Icon size={25} strokeWidth={1.7} />
                </div>

                <h3>
                  {feature.title}
                </h3>

                <p>
                  {feature.description}
                </p>

                <div className="feature-line"></div>

              </div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Features;
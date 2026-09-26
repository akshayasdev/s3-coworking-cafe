import {
  Check,
  ArrowRight,
  Coffee,
  Briefcase,
  Building2,
} from "lucide-react";

import "./Memberships.css";

const plans = [
  {
    id: 1,
    name: "Day Pass",
    subtitle: "Perfect for occasional workdays",
    price: 299,
    period: "day",
    icon: Coffee,
    features: [
      "Hot Desk access",
      "High-speed Wi-Fi",
      "Café access",
      "Power outlet",
    ],
    buttonText: "Get Day Pass",
  },
  {
    id: 2,
    name: "Flex Membership",
    subtitle: "For flexible professionals",
    price: 3999,
    period: "month",
    icon: Briefcase,
    features: [
      "12 workspace days",
      "Hot Desk access",
      "High-speed Wi-Fi",
      "Café discounts",
      "Meeting room credits",
      "Community events",
    ],
    buttonText: "Choose Flex",
    popular: true,
  },
  {
    id: 3,
    name: "Pro Membership",
    subtitle: "For professionals who need more",
    price: 6999,
    period: "month",
    icon: Building2,
    features: [
      "Unlimited workspace access",
      "Dedicated Desk",
      "High-speed Wi-Fi",
      "Café discounts",
      "Meeting room credits",
      "Priority booking",
    ],
    buttonText: "Choose Pro",
  },
];

function Memberships() {
  return (
    <section className="memberships-section" id="memberships">
      <div className="memberships-container">

        <div className="memberships-header">
          <span className="membership-label">
            S3 MEMBERSHIPS
          </span>

          <h2>
            Find Your <span>Perfect Plan.</span>
          </h2>

          <p>
            Flexible workspace memberships designed around
            the way you work.
          </p>
        </div>

        <div className="membership-grid">
          {plans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                className={`membership-card ${
                  plan.popular ? "popular" : ""
                }`}
                key={plan.id}
              >

                {plan.popular && (
                  <div className="popular-badge">
                    MOST POPULAR
                  </div>
                )}

                <div className="membership-icon">
                  <Icon size={25} />
                </div>

                <h3>{plan.name}</h3>

                <p className="membership-subtitle">
                  {plan.subtitle}
                </p>

                <div className="membership-price">
                  <span>₹</span>
                  {plan.price}
                  <small>/{plan.period}</small>
                </div>

                <div className="membership-features">
                  {plan.features.map((feature) => (
                    <div
                      className="membership-feature"
                      key={feature}
                    >
                      <Check size={17} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="membership-button">
                  {plan.buttonText}
                  <ArrowRight size={17} />
                </button>

              </div>
            );
          })}
        </div>

        <div className="membership-bottom">
          <p>Need a custom plan for your team?</p>

          <button>
            Talk to S3
            <ArrowRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Memberships;
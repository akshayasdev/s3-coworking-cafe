import {
  CalendarDays,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

import "./Events.css";

const events = [
  {
    id: 1,
    title: "Startup Networking Night",
    description:
      "Meet founders, creators and professionals from the local startup community.",
    date: "18",
    month: "OCT",
    time: "6:30 PM – 8:30 PM",
    location: "S3 Community Space",
    category: "NETWORKING",
  },
  {
    id: 2,
    title: "Build Your Personal Brand",
    description:
      "A practical session on building your professional presence and personal brand.",
    date: "25",
    month: "OCT",
    time: "11:00 AM – 1:00 PM",
    location: "S3 Meeting Room",
    category: "WORKSHOP",
  },
  {
    id: 3,
    title: "Coffee & Conversations",
    description:
      "Connect over coffee and have meaningful conversations with fellow members.",
    date: "02",
    month: "NOV",
    time: "5:00 PM – 7:00 PM",
    location: "S3 Café",
    category: "COMMUNITY",
  },
];

function Events() {
  return (
    <section className="events-section" id="events">
      <div className="events-container">

        <div className="events-header">
          <div>
            <span className="events-label">
              S3 COMMUNITY
            </span>

            <h2>
              Learn. <span>Connect.</span> Grow.
            </h2>
          </div>

          <p>
            Discover workshops, networking sessions and
            community events designed to help you connect
            and grow.
          </p>
        </div>

        <div className="events-grid">
          {events.map((event) => (
            <div className="event-card" key={event.id}>

              <div className="event-date">
                <strong>{event.date}</strong>
                <span>{event.month}</span>
              </div>

              <div className="event-content">

                <span className="event-category">
                  {event.category}
                </span>

                <h3>{event.title}</h3>

                <p className="event-description">
                  {event.description}
                </p>

                <div className="event-details">

                  <div>
                    <Clock size={16} />
                    <span>{event.time}</span>
                  </div>

                  <div>
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>

                </div>

                <button className="event-button">
                  Register Now
                  <ArrowRight size={17} />
                </button>

              </div>
            </div>
          ))}
        </div>

        <div className="events-bottom">
          <div>
            <CalendarDays size={24} />

            <div>
              <strong>Something happening at S3</strong>
              <p>
                New events are added regularly.
              </p>
            </div>
          </div>

          <button>
            View All Events
            <ArrowRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Events;
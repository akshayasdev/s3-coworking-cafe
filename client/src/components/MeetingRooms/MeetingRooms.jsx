import {
  Users,
  Monitor,
  Clock,
  ArrowRight,
} from "lucide-react";

import "./MeetingRooms.css";

const rooms = [
  {
    id: 1,
    name: "Focus Room",
    description:
      "A quiet private room for focused discussions, interviews and small meetings.",
    capacity: "2–4 People",
    price: 399,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Display Screen",
      "Wi-Fi",
      "Whiteboard",
    ],
  },
  {
    id: 2,
    name: "Collaboration Room",
    description:
      "A comfortable space for team meetings, brainstorming and collaboration.",
    capacity: "4–8 People",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1000&q=80",
    features: [
      "Large Display",
      "Video Conferencing",
      "Whiteboard",
    ],
  },
  {
    id: 3,
    name: "Board Room",
    description:
      "A premium meeting space for presentations, workshops and important discussions.",
    capacity: "8–12 People",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    features: [
      "4K Display",
      "Video Conferencing",
      "Premium Seating",
    ],
  },
];

function MeetingRooms() {
  return (
    <section
      className="meeting-rooms-section"
      id="meeting-rooms"
    >
      <div className="meeting-rooms-container">

        {/* Header */}
        <div className="meeting-rooms-header">

          <div>
            <span className="meeting-label">
              MEETING ROOMS
            </span>

            <h2>
              Meet. <span>Collaborate.</span> Create.
            </h2>
          </div>

          <p>
            Professional meeting spaces designed for
            productive conversations, presentations and
            collaboration.
          </p>

        </div>

        {/* Room Cards */}
        <div className="meeting-rooms-grid">

          {rooms.map((room) => (
            <div
              className="meeting-room-card"
              key={room.id}
            >

              {/* Image */}
              <div className="meeting-room-image">

                <img
                  src={room.image}
                  alt={room.name}
                />

                <div className="room-price">
                  ₹{room.price}
                  <small>/hour</small>
                </div>

              </div>

              {/* Content */}
              <div className="meeting-room-content">

                <h3>{room.name}</h3>

                <p className="room-description">
                  {room.description}
                </p>

                {/* Capacity */}
                <div className="room-capacity">
                  <Users size={17} />
                  <span>{room.capacity}</span>
                </div>

                {/* Features */}
                <div className="room-features">

                  {room.features.map((feature) => (
                    <span key={feature}>
                      {feature}
                    </span>
                  ))}

                </div>

                {/* Button */}
                <button className="book-room-button">
                  Book This Room
                  <ArrowRight size={17} />
                </button>

              </div>

            </div>
          ))}

        </div>

        {/* Information */}
        <div className="meeting-info">

          <div className="meeting-info-item">

            <Clock size={22} />

            <div>
              <strong>Flexible Hours</strong>
              <p>Book by the hour</p>
            </div>

          </div>

          <div className="meeting-info-item">

            <Monitor size={22} />

            <div>
              <strong>Modern Equipment</strong>
              <p>Display & presentation setup</p>
            </div>

          </div>

          <div className="meeting-info-item">

            <Users size={22} />

            <div>
              <strong>Professional Space</strong>
              <p>Comfortable meeting environment</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default MeetingRooms;
import { ArrowUpRight } from "lucide-react";

import "./Gallery.css";

const galleryItems = [
  {
    id: 1,
    title: "The Workspace",
    category: "WORKSPACE",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    large: true,
  },
  {
    id: 2,
    title: "Coffee & Conversations",
    category: "CAFÉ",
    image:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Focus Spaces",
    category: "WORKSPACE",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Community",
    category: "EVENTS",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Meeting Spaces",
    category: "MEETINGS",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
  },
];

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-container">

        <div className="gallery-header">
          <div>
            <span className="gallery-label">
              S3 SPACE
            </span>

            <h2>
              A Space That
              <span> Inspires.</span>
            </h2>
          </div>

          <p>
            Take a look inside S3 — where work,
            coffee and community come together.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryItems.map((item) => (
            <div
              className={`gallery-card ${
                item.large ? "gallery-large" : ""
              }`}
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.title}
              />

              <div className="gallery-overlay">
                <div>
                  <span>{item.category}</span>
                  <h3>{item.title}</h3>
                </div>

                <button>
                  <ArrowUpRight size={19} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-bottom">
          <p>
            Come experience S3 for yourself.
          </p>

          <button>
            Visit S3
            <ArrowUpRight size={17} />
          </button>
        </div>

      </div>
    </section>
  );
}

export default Gallery;
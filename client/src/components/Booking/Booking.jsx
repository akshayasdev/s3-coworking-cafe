import { useState } from "react";

import "./Booking.css";


/* =========================================
   API URL
========================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


/* =========================================
   COMPONENT
========================================= */

function Booking() {
  const [formData, setFormData] = useState({
    workspace: "Hot Desk",
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    duration: "1 Hour",
    people: "1",
  });

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState(null);


  /* =========================================
     HANDLE INPUT
  ========================================= */

  const handleChange = (event) => {
    const { name, value } =
      event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
    setSuccess(null);
  };


  /* =========================================
     SUBMIT BOOKING
  ========================================= */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(formData),
        }
      );


      const contentType =
        response.headers.get(
          "content-type"
        ) || "";

      if (
        !contentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The S3 backend did not return a JSON response. Please check the API URL."
        );
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create booking."
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to create booking."
        );
      }


      setSuccess({
        message:
          data.message ||
          "Booking submitted successfully!",

        bookingId:
          data.bookingId,
      });


      /* ---------------------------------------
         RESET FORM
      --------------------------------------- */

      setFormData({
        workspace: "Hot Desk",
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        duration: "1 Hour",
        people: "1",
      });

    } catch (error) {
      console.error(
        "Booking error:",
        error
      );

      setError(
        error.message ||
          "Unable to submit booking."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =========================================
     TODAY'S DATE
  ========================================= */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  /* =========================================
     PAGE
  ========================================= */

  return (
    <section
      id="booking"
      className="booking-section"
    >

      <div className="booking-container">

        {/* ===================================
            LEFT SIDE
        =================================== */}

        <div className="booking-intro">

          <span className="booking-eyebrow">
            BOOK YOUR SPACE
          </span>

          <h2>
            Find your perfect
            <span>
              {" "}workspace.
            </span>
          </h2>

          <p>
            Choose a workspace, select
            your preferred time and
            reserve your spot at S3.
          </p>


          <div className="booking-info-list">

            <div className="booking-info-item">

              <strong>
                Flexible spaces
              </strong>

              <span>
                Hot desks, dedicated
                desks and private cabins.
              </span>

            </div>


            <div className="booking-info-item">

              <strong>
                Meeting rooms
              </strong>

              <span>
                Professional spaces for
                meetings and collaboration.
              </span>

            </div>


            <div className="booking-info-item">

              <strong>
                Easy booking
              </strong>

              <span>
                Select your date and time
                and we'll handle the rest.
              </span>

            </div>

          </div>

        </div>


        {/* ===================================
            BOOKING FORM
        =================================== */}

        <div className="booking-card">

          <div className="booking-card-header">

            <h3>
              Book a Space
            </h3>

            <p>
              Fill in your booking details.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="booking-form"
          >

            {/* WORKSPACE */}

            <div className="booking-form-group">

              <label>
                Workspace
              </label>

              <select
                name="workspace"
                value={
                  formData.workspace
                }
                onChange={
                  handleChange
                }
                required
              >
                <option value="Hot Desk">
                  Hot Desk
                </option>

                <option value="Dedicated Desk">
                  Dedicated Desk
                </option>

                <option value="Private Cabin">
                  Private Cabin
                </option>

                <option value="Meeting Room">
                  Meeting Room
                </option>

              </select>

            </div>


            {/* NAME */}

            <div className="booking-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={
                  handleChange
                }
                placeholder="Enter your full name"
                required
              />

            </div>


            {/* EMAIL */}

            <div className="booking-form-group">

              <label>
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={
                  handleChange
                }
                placeholder="you@example.com"
                required
              />

            </div>


            {/* PHONE */}

            <div className="booking-form-group">

              <label>
                Phone
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={
                  handleChange
                }
                placeholder="+91 98765 43210"
                required
              />

            </div>


            {/* DATE + TIME */}

            <div className="booking-form-row">

              <div className="booking-form-group">

                <label>
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={
                    formData.date
                  }
                  min={today}
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>


              <div className="booking-form-group">

                <label>
                  Start Time
                </label>

                <input
                  type="time"
                  name="time"
                  value={
                    formData.time
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

            </div>


            {/* DURATION + PEOPLE */}

            <div className="booking-form-row">

              <div className="booking-form-group">

                <label>
                  Duration
                </label>

                <select
                  name="duration"
                  value={
                    formData.duration
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="1 Hour">
                    1 Hour
                  </option>

                  <option value="2 Hours">
                    2 Hours
                  </option>

                  <option value="3 Hours">
                    3 Hours
                  </option>

                  <option value="4 Hours">
                    4 Hours
                  </option>

                  <option value="Full Day">
                    Full Day
                  </option>

                </select>

              </div>


              <div className="booking-form-group">

                <label>
                  People
                </label>

                <select
                  name="people"
                  value={
                    formData.people
                  }
                  onChange={
                    handleChange
                  }
                  required
                >
                  <option value="1">
                    1 Person
                  </option>

                  <option value="2">
                    2 People
                  </option>

                  <option value="3">
                    3 People
                  </option>

                  <option value="4">
                    4 People
                  </option>

                  <option value="5">
                    5 People
                  </option>

                  <option value="6">
                    6 People
                  </option>

                  <option value="7">
                    7 People
                  </option>

                  <option value="8">
                    8 People
                  </option>

                  <option value="10">
                    10 People
                  </option>

                </select>

              </div>

            </div>


            {/* ERROR */}

            {error && (
              <div className="booking-error">
                {error}
              </div>
            )}


            {/* SUCCESS */}

            {success && (
              <div className="booking-success">

                <strong>
                  {success.message}
                </strong>

                {success.bookingId && (
                  <div className="success-booking-details">
                    Booking ID: #
                    {success.bookingId}
                  </div>
                )}

                <p className="success-note">
                  Your booking has been
                  received. Our team will
                  review it and confirm your
                  reservation.
                </p>

              </div>
            )}


            {/* SUBMIT */}

            <button
              type="submit"
              className="booking-submit-button"
              disabled={loading}
            >
              {loading
                ? "Checking availability..."
                : "Check Availability"}
            </button>

          </form>

        </div>

      </div>

    </section>
  );
}


export default Booking;
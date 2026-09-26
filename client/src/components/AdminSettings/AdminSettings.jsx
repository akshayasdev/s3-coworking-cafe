import { useEffect, useState } from "react";
import {
  Save,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import "./AdminSettings.css";


/* =========================================
   API URL
========================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


/* =========================================
   DEFAULT SETTINGS
========================================= */

const defaultSettings = {
  cafeName: "",
  tagline: "",
  email: "",
  phone: "",
  address: "",
  openingTime: "08:00",
  closingTime: "22:00",
  bookingEnabled: true,
  emailNotifications: true,
  autoConfirmBookings: false,
};


/* =========================================
   COMPONENT
========================================= */

function AdminSettings() {
  const [settings, setSettings] =
    useState(defaultSettings);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");


  /* =========================================
     LOAD SETTINGS FROM MYSQL
  ========================================= */

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        setError("");


        const response =
          await fetch(
            `${API_BASE_URL}/api/settings`
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
            "The S3 backend did not return JSON. Please check your API URL."
          );
        }


        const data =
          await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to load settings."
          );
        }


        if (!data.success) {
          throw new Error(
            data.message ||
              "Failed to load settings."
          );
        }


        const dbSettings =
          data.settings;


        if (!dbSettings) {
          throw new Error(
            "Settings data was not found."
          );
        }


        setSettings({
          cafeName:
            dbSettings.cafe_name ||
            "",

          tagline:
            dbSettings.tagline ||
            "",

          email:
            dbSettings.email ||
            "",

          phone:
            dbSettings.phone ||
            "",

          address:
            dbSettings.address ||
            "",


          openingTime:
            dbSettings.opening_time
              ? dbSettings.opening_time.substring(
                  0,
                  5
                )
              : "08:00",


          closingTime:
            dbSettings.closing_time
              ? dbSettings.closing_time.substring(
                  0,
                  5
                )
              : "22:00",


          bookingEnabled:
            Boolean(
              dbSettings.booking_enabled
            ),


          emailNotifications:
            Boolean(
              dbSettings.email_notifications
            ),


          autoConfirmBookings:
            Boolean(
              dbSettings.auto_confirm_bookings
            ),
        });

      } catch (err) {
        console.error(
          "Settings loading error:",
          err
        );


        setError(
          err.message ||
            "Unable to load settings."
        );

      } finally {
        setLoading(false);
      }
    };


    fetchSettings();

  }, []);


  /* =========================================
     INPUT CHANGE
  ========================================= */

  const handleChange = (
    event
  ) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;


    setSettings(
      (currentSettings) => ({
        ...currentSettings,

        [name]:
          type === "checkbox"
            ? checked
            : value,
      })
    );


    setMessage("");
    setError("");
  };


  /* =========================================
     SAVE SETTINGS
  ========================================= */

  const handleSave = async (
    event
  ) => {
    event.preventDefault();


    try {
      setSaving(true);
      setMessage("");
      setError("");


      const response =
        await fetch(
          `${API_BASE_URL}/api/settings`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify(
              settings
            ),
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
          "The S3 backend did not return JSON. Please check your API URL."
        );
      }


      const data =
        await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to save settings."
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to save settings."
        );
      }


      setMessage(
        "Settings saved successfully."
      );

    } catch (err) {
      console.error(
        "Settings save error:",
        err
      );


      setError(
        err.message ||
          "Unable to save settings."
      );

    } finally {
      setSaving(false);
    }
  };


  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <section className="admin-settings">

        <div className="admin-settings-loading">

          <div className="admin-settings-spinner" />

          <p>
            Loading settings...
          </p>

        </div>

      </section>
    );
  }


  /* =========================================
     PAGE
  ========================================= */

  return (
    <section className="admin-settings">

      {/* HEADER */}

      <div className="admin-settings-header">

        <div>

          <p className="admin-settings-eyebrow">
            ADMIN SETTINGS
          </p>

          <h1>
            Settings
          </h1>

          <p>
            Manage your S3 coworking café
            information and booking
            preferences.
          </p>

        </div>

      </div>


      {/* SUCCESS MESSAGE */}

      {message && (
        <div className="admin-settings-message admin-settings-success">

          <CheckCircle2 size={19} />

          <span>
            {message}
          </span>

        </div>
      )}


      {/* ERROR MESSAGE */}

      {error && (
        <div className="admin-settings-message admin-settings-error">

          <AlertCircle size={19} />

          <span>
            {error}
          </span>

        </div>
      )}


      <form
        className="admin-settings-form"
        onSubmit={handleSave}
      >

        {/* =====================================
            CAFE INFORMATION
        ===================================== */}

        <div className="admin-settings-card">

          <div className="admin-settings-card-header">

            <div>

              <h2>
                Café Information
              </h2>

              <p>
                Basic information displayed
                across your S3 website.
              </p>

            </div>

          </div>


          <div className="admin-settings-grid">

            <div className="admin-settings-field">

              <label htmlFor="cafeName">
                Café Name
              </label>

              <input
                id="cafeName"
                name="cafeName"
                type="text"
                value={
                  settings.cafeName
                }
                onChange={
                  handleChange
                }
                placeholder="S3 Coworking Café"
                required
              />

            </div>


            <div className="admin-settings-field">

              <label htmlFor="tagline">
                Tagline
              </label>

              <input
                id="tagline"
                name="tagline"
                type="text"
                value={
                  settings.tagline
                }
                onChange={
                  handleChange
                }
                placeholder="Sip. Sit. Start."
                required
              />

            </div>

          </div>

        </div>


        {/* =====================================
            CONTACT INFORMATION
        ===================================== */}

        <div className="admin-settings-card">

          <div className="admin-settings-card-header">

            <div>

              <h2>
                Contact Information
              </h2>

              <p>
                Contact details for your
                coworking café.
              </p>

            </div>

          </div>


          <div className="admin-settings-grid">

            <div className="admin-settings-field">

              <label htmlFor="email">
                Email Address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={
                  settings.email
                }
                onChange={
                  handleChange
                }
                placeholder="hello@s3cafe.com"
                required
              />

            </div>


            <div className="admin-settings-field">

              <label htmlFor="phone">
                Phone Number
              </label>

              <input
                id="phone"
                name="phone"
                type="text"
                value={
                  settings.phone
                }
                onChange={
                  handleChange
                }
                placeholder="+91 98765 43210"
                required
              />

            </div>


            <div className="admin-settings-field admin-settings-field-full">

              <label htmlFor="address">
                Address
              </label>

              <textarea
                id="address"
                name="address"
                rows="3"
                value={
                  settings.address
                }
                onChange={
                  handleChange
                }
                placeholder="Hyderabad, Telangana, India"
                required
              />

            </div>

          </div>

        </div>


        {/* =====================================
            OPENING HOURS
        ===================================== */}

        <div className="admin-settings-card">

          <div className="admin-settings-card-header">

            <div>

              <h2>
                Opening Hours
              </h2>

              <p>
                Set the operating hours
                for S3.
              </p>

            </div>

          </div>


          <div className="admin-settings-grid">

            <div className="admin-settings-field">

              <label htmlFor="openingTime">
                Opening Time
              </label>

              <input
                id="openingTime"
                name="openingTime"
                type="time"
                value={
                  settings.openingTime
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>


            <div className="admin-settings-field">

              <label htmlFor="closingTime">
                Closing Time
              </label>

              <input
                id="closingTime"
                name="closingTime"
                type="time"
                value={
                  settings.closingTime
                }
                onChange={
                  handleChange
                }
                required
              />

            </div>

          </div>

        </div>


        {/* =====================================
            BOOKING SETTINGS
        ===================================== */}

        <div className="admin-settings-card">

          <div className="admin-settings-card-header">

            <div>

              <h2>
                Booking Settings
              </h2>

              <p>
                Control how workspace
                bookings are handled.
              </p>

            </div>

          </div>


          <div className="admin-settings-options">

            {/* BOOKING ENABLED */}

            <label className="admin-settings-option">

              <div>

                <strong>
                  Enable Bookings
                </strong>

                <span>
                  Allow customers to submit
                  workspace bookings.
                </span>

              </div>


              <input
                type="checkbox"
                name="bookingEnabled"
                checked={
                  settings.bookingEnabled
                }
                onChange={
                  handleChange
                }
              />

              <span className="admin-settings-toggle" />

            </label>


            {/* EMAIL NOTIFICATIONS */}

            <label className="admin-settings-option">

              <div>

                <strong>
                  Email Notifications
                </strong>

                <span>
                  Receive notifications about
                  new bookings.
                </span>

              </div>


              <input
                type="checkbox"
                name="emailNotifications"
                checked={
                  settings.emailNotifications
                }
                onChange={
                  handleChange
                }
              />

              <span className="admin-settings-toggle" />

            </label>


            {/* AUTO CONFIRM */}

            <label className="admin-settings-option">

              <div>

                <strong>
                  Auto-confirm Bookings
                </strong>

                <span>
                  Automatically confirm new
                  workspace bookings.
                </span>

              </div>


              <input
                type="checkbox"
                name="autoConfirmBookings"
                checked={
                  settings.autoConfirmBookings
                }
                onChange={
                  handleChange
                }
              />

              <span className="admin-settings-toggle" />

            </label>

          </div>

        </div>


        {/* =====================================
            SAVE BUTTON
        ===================================== */}

        <div className="admin-settings-actions">

          <button
            type="submit"
            className="admin-settings-save"
            disabled={saving}
          >

            <Save size={18} />

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </form>

    </section>
  );
}


export default AdminSettings;
import { useEffect, useMemo, useState } from "react";

import {
  CalendarDays,
  Clock,
  Users,
  Building2,
  RefreshCw,
  Check,
  X,
  Search,
} from "lucide-react";

import "./AdminBookings.css";


/* =========================================
   API URL
========================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


/* =========================================
   COMPONENT
========================================= */

function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [actionLoading, setActionLoading] =
    useState(null);

  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");


  /* =========================================
     LOAD BOOKINGS
  ========================================= */

  useEffect(() => {
    fetchBookings();
  }, []);


  /* =========================================
     FETCH BOOKINGS
  ========================================= */

  const fetchBookings = async (
    showRefreshLoader = false
  ) => {
    try {
      if (showRefreshLoader) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setErrorMessage("");

      const response = await fetch(
        `${API_BASE_URL}/api/bookings`
      );


      /* ---------------------------------------
         CHECK RESPONSE TYPE
      --------------------------------------- */

      const contentType =
        response.headers.get("content-type") || "";

      if (
        !contentType.includes("application/json")
      ) {
        throw new Error(
          "The S3 backend is not returning JSON. Please check your API URL and make sure the Express server is running."
        );
      }


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            `Booking API error (${response.status}).`
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Failed to fetch bookings."
        );
      }


      setBookings(
        Array.isArray(data.bookings)
          ? data.bookings
          : []
      );

    } catch (error) {
      console.error(
        "Fetch bookings error:",
        error
      );

      setBookings([]);

      setErrorMessage(
        error.message ||
          "Unable to load bookings."
      );

    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };


  /* =========================================
     UPDATE BOOKING STATUS
  ========================================= */

  const updateBookingStatus = async (
    bookingId,
    action
  ) => {
    try {
      setActionLoading(
        `${action}-${bookingId}`
      );

      setMessage("");
      setErrorMessage("");


      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${bookingId}/${action}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      const contentType =
        response.headers.get("content-type") || "";

      if (
        !contentType.includes("application/json")
      ) {
        throw new Error(
          "The S3 backend did not return a JSON response."
        );
      }


      const data = await response.json();


      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to update booking."
        );
      }


      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to update booking."
        );
      }


      setMessage(
        data.message ||
          "Booking updated successfully."
      );


      await fetchBookings();


      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.error(
        "Booking status error:",
        error
      );

      setErrorMessage(
        error.message ||
          "Unable to update booking."
      );

    } finally {
      setActionLoading(null);
    }
  };


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (dateValue) => {
    if (!dateValue) {
      return "-";
    }

    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
      return dateValue;
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  /* =========================================
     FORMAT TIME
  ========================================= */

  const formatTime = (timeValue) => {
    if (!timeValue) {
      return "-";
    }

    const timeString =
      timeValue.toString();

    const parts =
      timeString.split(":");

    if (parts.length < 2) {
      return timeString;
    }

    let hours = Number(parts[0]);
    const minutes = parts[1];

    if (Number.isNaN(hours)) {
      return timeString;
    }

    const period =
      hours >= 12 ? "PM" : "AM";

    hours = hours % 12;

    if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${period}`;
  };


  /* =========================================
     STATUS CLASS
  ========================================= */

  const getStatusClass = (status) => {
    if (status === "confirmed") {
      return "status-confirmed";
    }

    if (status === "cancelled") {
      return "status-cancelled";
    }

    return "status-pending";
  };


  /* =========================================
     FILTER BOOKINGS
  ========================================= */

  const filteredBookings = useMemo(() => {
    const search =
      searchTerm
        .trim()
        .toLowerCase();

    return bookings.filter(
      (booking) => {
        const matchesSearch =
          !search ||
          booking.name
            ?.toLowerCase()
            .includes(search) ||
          booking.email
            ?.toLowerCase()
            .includes(search) ||
          booking.phone
            ?.toLowerCase()
            .includes(search) ||
          booking.workspace
            ?.toLowerCase()
            .includes(search);

        const matchesStatus =
          statusFilter === "all" ||
          booking.status ===
            statusFilter;

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );
  }, [
    bookings,
    searchTerm,
    statusFilter,
  ]);


  /* =========================================
     BOOKING COUNTS
  ========================================= */

  const totalBookings =
    bookings.length;

  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "pending"
    ).length;

  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "confirmed"
    ).length;

  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status ===
        "cancelled"
    ).length;


  /* =========================================
     PAGE
  ========================================= */

  return (
    <section className="admin-bookings">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="admin-bookings-header">

        <div>
          <p className="admin-bookings-eyebrow">
            RESERVATION MANAGEMENT
          </p>

          <h1>
            Bookings
          </h1>

          <p>
            Manage workspace and meeting
            room bookings.
          </p>
        </div>


        <button
          type="button"
          className="admin-bookings-refresh"
          onClick={() =>
            fetchBookings(true)
          }
          disabled={refreshing}
        >
          <RefreshCw
            size={18}
            className={
              refreshing
                ? "admin-bookings-spin"
                : ""
            }
          />

          {refreshing
            ? "Refreshing..."
            : "Refresh"}
        </button>

      </div>


      {/* =====================================
          STATS
      ===================================== */}

      <div className="admin-bookings-stats">

        <div className="admin-bookings-stat-card">
          <span>
            Total Bookings
          </span>

          <strong>
            {totalBookings}
          </strong>
        </div>


        <div className="admin-bookings-stat-card">
          <span>
            Pending
          </span>

          <strong>
            {pendingBookings}
          </strong>
        </div>


        <div className="admin-bookings-stat-card">
          <span>
            Confirmed
          </span>

          <strong>
            {confirmedBookings}
          </strong>
        </div>


        <div className="admin-bookings-stat-card">
          <span>
            Cancelled
          </span>

          <strong>
            {cancelledBookings}
          </strong>
        </div>

      </div>


      {/* =====================================
          SEARCH + FILTER
      ===================================== */}

      <div className="admin-bookings-toolbar">

        <div className="admin-bookings-search">

          <Search size={19} />

          <input
            type="text"
            placeholder="Search by name, email, phone or workspace..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value
              )
            }
          />

        </div>


        <select
          className="admin-bookings-filter"
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
        >
          <option value="all">
            All Status
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="confirmed">
            Confirmed
          </option>

          <option value="cancelled">
            Cancelled
          </option>
        </select>

      </div>


      {/* =====================================
          SUCCESS MESSAGE
      ===================================== */}

      {message && (
        <div className="admin-bookings-message admin-bookings-success">
          <Check size={18} />

          <span>
            {message}
          </span>
        </div>
      )}


      {/* =====================================
          ERROR MESSAGE
      ===================================== */}

      {errorMessage && (
        <div className="admin-bookings-message admin-bookings-error">
          <X size={18} />

          <span>
            {errorMessage}
          </span>
        </div>
      )}


      {/* =====================================
          TABLE
      ===================================== */}

      <div className="admin-bookings-table-card">

        {loading ? (

          <div className="admin-bookings-loading">

            <RefreshCw
              size={24}
              className="admin-bookings-spin"
            />

            <p>
              Loading bookings...
            </p>

          </div>

        ) : filteredBookings.length === 0 ? (

          <div className="admin-bookings-empty">

            <CalendarDays
              size={38}
            />

            <h3>
              No bookings found.
            </h3>

            <p>
              {bookings.length === 0
                ? "There are currently no bookings."
                : "No bookings match your search or filter."}
            </p>

          </div>

        ) : (

          <div className="admin-bookings-table-wrapper">

            <table className="admin-bookings-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Workspace</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th>People</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>


              <tbody>

                {filteredBookings.map(
                  (booking) => (

                    <tr
                      key={booking.id}
                    >

                      {/* ID */}

                      <td>
                        <strong>
                          #{booking.id}
                        </strong>
                      </td>


                      {/* CUSTOMER */}

                      <td>

                        <div className="admin-booking-customer">

                          <div className="admin-booking-avatar">
                            {booking.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>
                            <strong>
                              {booking.name}
                            </strong>

                            <span>
                              {booking.email}
                            </span>
                          </div>

                        </div>

                      </td>


                      {/* WORKSPACE */}

                      <td>

                        <div className="admin-booking-workspace">

                          <Building2
                            size={16}
                          />

                          <span>
                            {booking.workspace}
                          </span>

                        </div>

                      </td>


                      {/* DATE */}

                      <td>
                        {formatDate(
                          booking.booking_date
                        )}
                      </td>


                      {/* TIME */}

                      <td>

                        <div className="admin-booking-time">

                          <Clock
                            size={15}
                          />

                          {formatTime(
                            booking.booking_time
                          )}

                        </div>

                      </td>


                      {/* DURATION */}

                      <td>
                        {booking.duration}
                      </td>


                      {/* PEOPLE */}

                      <td>

                        <div className="admin-booking-people">

                          <Users
                            size={15}
                          />

                          {booking.people}

                        </div>

                      </td>


                      {/* STATUS */}

                      <td>

                        <span
                          className={`admin-booking-status ${getStatusClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>

                      </td>


                      {/* ACTIONS */}

                      <td>

                        <div className="admin-booking-actions">

                          {booking.status !==
                            "confirmed" &&
                            booking.status !==
                              "cancelled" && (
                              <>

                                {/* CONFIRM */}

                                <button
                                  type="button"
                                  className="admin-booking-confirm"
                                  onClick={() =>
                                    updateBookingStatus(
                                      booking.id,
                                      "confirm"
                                    )
                                  }
                                  disabled={
                                    actionLoading !==
                                    null
                                  }
                                >

                                  {actionLoading ===
                                  `confirm-${booking.id}` ? (
                                    <RefreshCw
                                      size={15}
                                      className="admin-bookings-spin"
                                    />
                                  ) : (
                                    <Check
                                      size={15}
                                    />
                                  )}

                                  Confirm

                                </button>


                                {/* CANCEL */}

                                <button
                                  type="button"
                                  className="admin-booking-cancel"
                                  onClick={() =>
                                    updateBookingStatus(
                                      booking.id,
                                      "cancel"
                                    )
                                  }
                                  disabled={
                                    actionLoading !==
                                    null
                                  }
                                >

                                  {actionLoading ===
                                  `cancel-${booking.id}` ? (
                                    <RefreshCw
                                      size={15}
                                      className="admin-bookings-spin"
                                    />
                                  ) : (
                                    <X
                                      size={15}
                                    />
                                  )}

                                  Cancel

                                </button>

                              </>
                            )}


                          {/* CONFIRMED */}

                          {booking.status ===
                            "confirmed" && (
                            <span className="admin-booking-completed">

                              <Check
                                size={15}
                              />

                              Confirmed

                            </span>
                          )}


                          {/* CANCELLED */}

                          {booking.status ===
                            "cancelled" && (
                            <span className="admin-booking-completed admin-booking-completed-cancelled">

                              <X
                                size={15}
                              />

                              Cancelled

                            </span>
                          )}

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>


      {/* =====================================
          FOOTER COUNT
      ===================================== */}

      <div className="admin-bookings-footer">

        Showing{" "}

        <strong>
          {filteredBookings.length}
        </strong>

        {" "}of{" "}

        <strong>
          {bookings.length}
        </strong>

        {" "}bookings

      </div>

    </section>
  );
}


export default AdminBookings;
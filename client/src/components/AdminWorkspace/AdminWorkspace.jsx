import { useEffect, useState } from "react";

import {
  CalendarCheck,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
} from "lucide-react";

import "./AdminWorkspace.css";


/* =========================================
   API URL
========================================= */

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


/* =========================================
   COMPONENT
========================================= */

function AdminWorkspace() {
  const [bookings, setBookings] = useState([]);
  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  /* =========================================
     FETCH DASHBOARD DATA
  ========================================= */

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");


      const [
        bookingsResponse,
        membersResponse,
      ] = await Promise.all([
        fetch(
          `${API_BASE_URL}/api/bookings`
        ),
        fetch(
          `${API_BASE_URL}/api/members`
        ),
      ]);


      /* ---------------------------------------
         CHECK BOOKINGS RESPONSE
      --------------------------------------- */

      const bookingsContentType =
        bookingsResponse.headers.get(
          "content-type"
        ) || "";


      if (
        !bookingsContentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The bookings API did not return JSON. Please check your backend/API URL."
        );
      }


      /* ---------------------------------------
         CHECK MEMBERS RESPONSE
      --------------------------------------- */

      const membersContentType =
        membersResponse.headers.get(
          "content-type"
        ) || "";


      if (
        !membersContentType.includes(
          "application/json"
        )
      ) {
        throw new Error(
          "The members API did not return JSON. Please check your backend/API URL."
        );
      }


      const bookingsData =
        await bookingsResponse.json();

      const membersData =
        await membersResponse.json();


      /* ---------------------------------------
         CHECK API STATUS
      --------------------------------------- */

      if (!bookingsResponse.ok) {
        throw new Error(
          bookingsData.message ||
            "Failed to fetch bookings."
        );
      }


      if (!membersResponse.ok) {
        throw new Error(
          membersData.message ||
            "Failed to fetch members."
        );
      }


      /* ---------------------------------------
         STORE DATA
      --------------------------------------- */

      setBookings(
        Array.isArray(
          bookingsData.bookings
        )
          ? bookingsData.bookings
          : []
      );


      setMembers(
        Array.isArray(
          membersData.members
        )
          ? membersData.members
          : []
      );

    } catch (error) {
      console.error(
        "Dashboard fetch error:",
        error
      );

      setBookings([]);
      setMembers([]);

      setError(
        error.message ||
          "Failed to load dashboard data."
      );

    } finally {
      setLoading(false);
    }
  };


  /* =========================================
     INITIAL LOAD
  ========================================= */

  useEffect(() => {
    fetchDashboardData();
  }, []);


  /* =========================================
     STATISTICS
  ========================================= */

  const totalBookings =
    bookings.length;


  const pendingBookings =
    bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() ===
        "pending"
    ).length;


  const confirmedBookings =
    bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() ===
        "confirmed"
    ).length;


  const cancelledBookings =
    bookings.filter(
      (booking) =>
        booking.status?.toLowerCase() ===
        "cancelled"
    ).length;


  const activeMembers =
    members.filter(
      (member) =>
        member.status?.toLowerCase() ===
        "active"
    ).length;


  /* =========================================
     TODAY'S BOOKINGS
  ========================================= */

  const today =
    new Date()
      .toISOString()
      .split("T")[0];


  const todaysBookings =
    bookings.filter((booking) => {

      if (!booking.booking_date) {
        return false;
      }


      const bookingDate =
        new Date(
          booking.booking_date
        )
          .toISOString()
          .split("T")[0];


      return bookingDate === today;
    });


  /* =========================================
     RECENT BOOKINGS
  ========================================= */

  const recentBookings =
    [...bookings]
      .sort(
        (a, b) =>
          new Date(
            b.created_at
          ) -
          new Date(
            a.created_at
          )
      )
      .slice(0, 5);


  /* =========================================
     FORMAT DATE
  ========================================= */

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }


    const formattedDate =
      new Date(date);


    if (
      Number.isNaN(
        formattedDate.getTime()
      )
    ) {
      return date;
    }


    return formattedDate.toLocaleDateString(
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

  const formatTime = (time) => {

    if (!time) {
      return "-";
    }


    const timeString =
      String(time).substring(0, 5);


    const [
      hours,
      minutes,
    ] =
      timeString.split(":");


    let hour = Number(hours);


    const period =
      hour >= 12
        ? "PM"
        : "AM";


    hour =
      hour % 12 || 12;


    return `${hour}:${minutes} ${period}`;
  };


  /* =========================================
     PAGE
  ========================================= */

  return (
    <section className="admin-workspace">

      {/* =====================================
          HEADER
      ===================================== */}

      <div className="admin-workspace-header">

        <div>

          <h1>
            Dashboard
          </h1>

          <p>
            Welcome back to your S3
            coworking café dashboard.
          </p>

        </div>


        <button
          type="button"
          className="admin-workspace-refresh"
          onClick={
            fetchDashboardData
          }
          disabled={loading}
        >

          <RefreshCw
            size={17}
            className={
              loading
                ? "admin-refresh-spinning"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* =====================================
          ERROR
      ===================================== */}

      {error && (
        <div className="admin-workspace-error">
          {error}
        </div>
      )}


      {/* =====================================
          LOADING
      ===================================== */}

      {loading ? (

        <div className="admin-workspace-loading">
          Loading dashboard...
        </div>

      ) : (

        <>

          {/* =================================
              STAT CARDS
          ================================= */}

          <div className="admin-workspace-stats">


            {/* TOTAL BOOKINGS */}

            <div className="admin-workspace-stat-card">

              <div className="admin-stat-icon">

                <CalendarCheck
                  size={22}
                />

              </div>


              <div>

                <span>
                  Total Bookings
                </span>

                <strong>
                  {totalBookings}
                </strong>

              </div>

            </div>


            {/* TODAY */}

            <div className="admin-workspace-stat-card">

              <div className="admin-stat-icon">

                <Clock
                  size={22}
                />

              </div>


              <div>

                <span>
                  Today's Bookings
                </span>

                <strong>
                  {
                    todaysBookings.length
                  }
                </strong>

              </div>

            </div>


            {/* MEMBERS */}

            <div className="admin-workspace-stat-card">

              <div className="admin-stat-icon">

                <Users
                  size={22}
                />

              </div>


              <div>

                <span>
                  Active Members
                </span>

                <strong>
                  {activeMembers}
                </strong>

              </div>

            </div>


            {/* CONFIRMED */}

            <div className="admin-workspace-stat-card">

              <div className="admin-stat-icon">

                <CheckCircle
                  size={22}
                />

              </div>


              <div>

                <span>
                  Confirmed
                </span>

                <strong>
                  {confirmedBookings}
                </strong>

              </div>

            </div>

          </div>


          {/* =================================
              SECONDARY STATS
          ================================= */}

          <div className="admin-workspace-secondary-stats">


            <div className="admin-secondary-card">

              <span>
                Pending Bookings
              </span>

              <strong>
                {pendingBookings}
              </strong>

            </div>


            <div className="admin-secondary-card">

              <span>
                Cancelled Bookings
              </span>

              <strong>
                {cancelledBookings}
              </strong>

            </div>


            <div className="admin-secondary-card">

              <span>
                Total Members
              </span>

              <strong>
                {members.length}
              </strong>

            </div>

          </div>


          {/* =================================
              RECENT BOOKINGS
          ================================= */}

          <div className="admin-workspace-section">

            <div className="admin-workspace-section-header">

              <div>

                <h2>
                  Recent Bookings
                </h2>

                <p>
                  Latest workspace
                  reservations.
                </p>

              </div>

            </div>


            {recentBookings.length ===
            0 ? (

              <div className="admin-workspace-empty">
                No bookings available.
              </div>

            ) : (

              <div className="admin-workspace-table-wrapper">

                <table className="admin-workspace-table">

                  <thead>

                    <tr>

                      <th>
                        Customer
                      </th>

                      <th>
                        Workspace
                      </th>

                      <th>
                        Date
                      </th>

                      <th>
                        Time
                      </th>

                      <th>
                        Status
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {recentBookings.map(
                      (booking) => (

                        <tr
                          key={
                            booking.id
                          }
                        >

                          <td>

                            <div className="admin-dashboard-customer">

                              <strong>
                                {
                                  booking.name
                                }
                              </strong>

                              <span>
                                {
                                  booking.email
                                }
                              </span>

                            </div>

                          </td>


                          <td>
                            {
                              booking.workspace
                            }
                          </td>


                          <td>
                            {formatDate(
                              booking.booking_date
                            )}
                          </td>


                          <td>
                            {formatTime(
                              booking.booking_time
                            )}
                          </td>


                          <td>

                            <span
                              className={`admin-dashboard-status admin-dashboard-status-${booking.status
                                ?.toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                            >
                              {
                                booking.status
                              }
                            </span>

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>


          {/* =================================
              MEMBERS OVERVIEW
          ================================= */}

          <div className="admin-workspace-section">

            <div className="admin-workspace-section-header">

              <div>

                <h2>
                  Members Overview
                </h2>

                <p>
                  Current S3 membership
                  information.
                </p>

              </div>

            </div>


            <div className="admin-members-overview">


              {/* TOTAL MEMBERS */}

              <div className="admin-member-overview-card">

                <Users
                  size={20}
                />

                <div>

                  <span>
                    Total Members
                  </span>

                  <strong>
                    {members.length}
                  </strong>

                </div>

              </div>


              {/* ACTIVE MEMBERS */}

              <div className="admin-member-overview-card">

                <CheckCircle
                  size={20}
                />

                <div>

                  <span>
                    Active Members
                  </span>

                  <strong>
                    {activeMembers}
                  </strong>

                </div>

              </div>


              {/* INACTIVE / PENDING */}

              <div className="admin-member-overview-card">

                <XCircle
                  size={20}
                />

                <div>

                  <span>
                    Inactive / Pending
                  </span>

                  <strong>
                    {
                      members.length -
                      activeMembers
                    }
                  </strong>

                </div>

              </div>

            </div>

          </div>

        </>

      )}

    </section>
  );
}


export default AdminWorkspace;
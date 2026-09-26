const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const app = express();


/* =========================================
   MIDDLEWARE
========================================= */

app.use(cors());
app.use(express.json());


/* =========================================
   ROOT API
========================================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "S3 Coworking Cafe API is running",
  });
});


/* =========================================
   BOOKING HELPER
========================================= */

function getDurationInHours(duration) {
  if (duration === "1 Hour") return 1;
  if (duration === "2 Hours") return 2;
  if (duration === "3 Hours") return 3;
  if (duration === "4 Hours") return 4;
  if (duration === "Full Day") return 8;

  return 1;
}


/* =========================================
   GET ALL BOOKINGS
========================================= */

app.get("/api/bookings", async (req, res) => {
  try {
    const sql = `
      SELECT
        id,
        name,
        email,
        phone,
        workspace,
        booking_date,
        booking_time,
        duration,
        people,
        status,
        created_at
      FROM bookings
      ORDER BY created_at DESC
    `;

    const [bookings] = await db.execute(sql);

    res.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error(
      "Get bookings error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings.",
    });
  }
});


/* =========================================
   CREATE BOOKING
========================================= */

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      workspace,
      date,
      time,
      duration,
      people,
    } = req.body;


    /* ---------------------------------------
       VALIDATION
    --------------------------------------- */

    if (
      !name ||
      !email ||
      !phone ||
      !workspace ||
      !date ||
      !time ||
      !duration ||
      !people
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all booking details.",
      });
    }


    /* ---------------------------------------
       GET BOOKING SETTINGS
    --------------------------------------- */

    const [settingsRows] =
      await db.execute(`
        SELECT
          booking_enabled,
          auto_confirm_bookings
        FROM settings
        WHERE id = 1
        LIMIT 1
      `);

    if (settingsRows.length === 0) {
      return res.status(500).json({
        success: false,
        message:
          "Booking settings are not configured.",
      });
    }

    const bookingSettings =
      settingsRows[0];


    /* ---------------------------------------
       CHECK BOOKINGS ENABLED
    --------------------------------------- */

    if (
      !Boolean(
        bookingSettings.booking_enabled
      )
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Online bookings are currently disabled. Please contact S3 for assistance.",
      });
    }


    /* ---------------------------------------
       DURATION
    --------------------------------------- */

    const durationHours =
      getDurationInHours(duration);


    /* ---------------------------------------
       NEW BOOKING TIME
    --------------------------------------- */

    const timeParts =
      time.split(":");

    const newStartMinutes =
      Number(timeParts[0]) * 60 +
      Number(timeParts[1]);

    const newEndMinutes =
      newStartMinutes +
      durationHours * 60;


    /* ---------------------------------------
       FIND EXISTING BOOKINGS
    --------------------------------------- */

    const checkSql = `
      SELECT
        id,
        booking_time,
        duration,
        status
      FROM bookings
      WHERE workspace = ?
      AND booking_date = ?
      AND status != 'cancelled'
    `;

    const [existingBookings] =
      await db.execute(
        checkSql,
        [workspace, date]
      );


    /* ---------------------------------------
       CHECK OVERLAP
    --------------------------------------- */

    for (
      const booking of existingBookings
    ) {
      const existingTime =
        booking.booking_time
          .toString()
          .split(":");

      const existingStartMinutes =
        Number(existingTime[0]) * 60 +
        Number(existingTime[1]);

      const existingDurationHours =
        getDurationInHours(
          booking.duration
        );

      const existingEndMinutes =
        existingStartMinutes +
        existingDurationHours * 60;

      const hasOverlap =
        newStartMinutes <
          existingEndMinutes &&
        newEndMinutes >
          existingStartMinutes;

      if (hasOverlap) {
        return res.status(409).json({
          success: false,
          message:
            "This workspace is unavailable for the selected time because another booking overlaps with it.",
        });
      }
    }


    /* ---------------------------------------
       BOOKING STATUS
    --------------------------------------- */

    const bookingStatus =
      Boolean(
        bookingSettings.auto_confirm_bookings
      )
        ? "confirmed"
        : "pending";


    /* ---------------------------------------
       INSERT BOOKING
    --------------------------------------- */

    const insertSql = `
      INSERT INTO bookings
      (
        name,
        email,
        phone,
        workspace,
        booking_date,
        booking_time,
        duration,
        people,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name.trim(),
      email.trim(),
      phone.trim(),
      workspace,
      date,
      time,
      duration,
      Number(people),
      bookingStatus,
    ];

    const [result] =
      await db.execute(
        insertSql,
        values
      );


    /* ---------------------------------------
       RESPONSE
    --------------------------------------- */

    res.status(201).json({
      success: true,

      message:
        bookingStatus === "confirmed"
          ? "Booking confirmed successfully!"
          : "Booking submitted successfully and is awaiting confirmation.",

      bookingId:
        result.insertId,

      status: bookingStatus,
    });

  } catch (error) {
    console.error(
      "Booking error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Failed to save booking.",
    });
  }
});


/* =========================================
   CONFIRM BOOKING
========================================= */

app.put(
  "/api/bookings/:id/confirm",
  async (req, res) => {
    try {
      const { id } = req.params;

      const [result] =
        await db.execute(
          `
            UPDATE bookings
            SET status = 'confirmed'
            WHERE id = ?
            AND status != 'cancelled'
          `,
          [id]
        );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found or already cancelled.",
        });
      }

      res.json({
        success: true,
        message:
          "Booking confirmed successfully.",
      });

    } catch (error) {
      console.error(
        "Confirm booking error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to confirm booking.",
      });
    }
  }
);


/* =========================================
   CANCEL BOOKING
========================================= */

app.put(
  "/api/bookings/:id/cancel",
  async (req, res) => {
    try {
      const { id } = req.params;

      const [result] =
        await db.execute(
          `
            UPDATE bookings
            SET status = 'cancelled'
            WHERE id = ?
            AND status != 'cancelled'
          `,
          [id]
        );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Booking not found or already cancelled.",
        });
      }

      res.json({
        success: true,
        message:
          "Booking cancelled successfully.",
      });

    } catch (error) {
      console.error(
        "Cancel booking error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to cancel booking.",
      });
    }
  }
);


/* =========================================
   SETTINGS API
========================================= */


/* =========================================
   GET SETTINGS
========================================= */

app.get(
  "/api/settings",
  async (req, res) => {
    try {
      const [settings] =
        await db.execute(`
          SELECT
            id,
            cafe_name,
            tagline,
            email,
            phone,
            address,
            opening_time,
            closing_time,
            booking_enabled,
            email_notifications,
            auto_confirm_bookings,
            updated_at
          FROM settings
          WHERE id = 1
          LIMIT 1
        `);

      if (settings.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Settings not found.",
        });
      }

      res.json({
        success: true,
        settings: settings[0],
      });

    } catch (error) {
      console.error(
        "Get settings error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch settings.",
      });
    }
  }
);


/* =========================================
   UPDATE SETTINGS
========================================= */

app.put(
  "/api/settings",
  async (req, res) => {
    try {
      const {
        cafeName,
        tagline,
        email,
        phone,
        address,
        openingTime,
        closingTime,
        bookingEnabled,
        emailNotifications,
        autoConfirmBookings,
      } = req.body;


      /* -------------------------------------
         VALIDATION
      ------------------------------------- */

      if (
        !cafeName ||
        !tagline ||
        !email ||
        !phone ||
        !address ||
        !openingTime ||
        !closingTime
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all required settings.",
        });
      }


      /* -------------------------------------
         UPDATE
      ------------------------------------- */

      const sql = `
        UPDATE settings
        SET
          cafe_name = ?,
          tagline = ?,
          email = ?,
          phone = ?,
          address = ?,
          opening_time = ?,
          closing_time = ?,
          booking_enabled = ?,
          email_notifications = ?,
          auto_confirm_bookings = ?
        WHERE id = 1
      `;

      const values = [
        cafeName.trim(),
        tagline.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        address.trim(),
        openingTime,
        closingTime,
        Boolean(bookingEnabled),
        Boolean(emailNotifications),
        Boolean(autoConfirmBookings),
      ];

      const [result] =
        await db.execute(
          sql,
          values
        );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Settings not found.",
        });
      }

      res.json({
        success: true,
        message:
          "Settings updated successfully.",
      });

    } catch (error) {
      console.error(
        "Update settings error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to update settings.",
      });
    }
  }
);


/* =========================================
   MEMBERS API
========================================= */


/* =========================================
   GET ALL MEMBERS
========================================= */

app.get(
  "/api/members",
  async (req, res) => {
    try {
      const sql = `
        SELECT
          id,
          name,
          email,
          phone,
          plan,
          status,
          joined_at,
          created_at
        FROM members
        ORDER BY created_at DESC
      `;

      const [members] =
        await db.execute(sql);

      res.json({
        success: true,
        members,
      });

    } catch (error) {
      console.error(
        "Get members error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch members.",
      });
    }
  }
);


/* =========================================
   GET SINGLE MEMBER
========================================= */

app.get(
  "/api/members/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const [members] =
        await db.execute(
          `
            SELECT
              id,
              name,
              email,
              phone,
              plan,
              status,
              joined_at,
              created_at
            FROM members
            WHERE id = ?
          `,
          [id]
        );

      if (members.length === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Member not found.",
        });
      }

      res.json({
        success: true,
        member: members[0],
      });

    } catch (error) {
      console.error(
        "Get member error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch member.",
      });
    }
  }
);


/* =========================================
   CREATE MEMBER
========================================= */

app.post(
  "/api/members",
  async (req, res) => {
    try {
      const {
        name,
        email,
        phone,
        plan,
        status,
      } = req.body;


      /* -------------------------------------
         VALIDATION
      ------------------------------------- */

      if (
        !name ||
        !email ||
        !phone ||
        !plan ||
        !status
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all member details.",
        });
      }


      /* -------------------------------------
         JOIN DATE
      ------------------------------------- */

      const joinedAt =
        new Date()
          .toISOString()
          .split("T")[0];


      /* -------------------------------------
         INSERT MEMBER
      ------------------------------------- */

      const sql = `
        INSERT INTO members
        (
          name,
          email,
          phone,
          plan,
          status,
          joined_at
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `;

      const values = [
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        plan,
        status,
        joinedAt,
      ];

      const [result] =
        await db.execute(
          sql,
          values
        );

      res.status(201).json({
        success: true,
        message:
          "Member created successfully.",
        memberId:
          result.insertId,
      });

    } catch (error) {
      console.error(
        "Create member error:",
        error
      );

      if (
        error.code ===
        "ER_DUP_ENTRY"
      ) {
        return res.status(409).json({
          success: false,
          message:
            "A member with this email already exists.",
        });
      }

      res.status(500).json({
        success: false,
        message:
          "Failed to create member.",
      });
    }
  }
);


/* =========================================
   UPDATE MEMBER
========================================= */

app.put(
  "/api/members/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        name,
        email,
        phone,
        plan,
        status,
      } = req.body;


      /* -------------------------------------
         VALIDATION
      ------------------------------------- */

      if (
        !name ||
        !email ||
        !phone ||
        !plan ||
        !status
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Please fill all member details.",
        });
      }


      /* -------------------------------------
         UPDATE MEMBER
      ------------------------------------- */

      const sql = `
        UPDATE members
        SET
          name = ?,
          email = ?,
          phone = ?,
          plan = ?,
          status = ?
        WHERE id = ?
      `;

      const values = [
        name.trim(),
        email.trim().toLowerCase(),
        phone.trim(),
        plan,
        status,
        id,
      ];

      const [result] =
        await db.execute(
          sql,
          values
        );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Member not found.",
        });
      }

      res.json({
        success: true,
        message:
          "Member updated successfully.",
      });

    } catch (error) {
      console.error(
        "Update member error:",
        error
      );

      if (
        error.code ===
        "ER_DUP_ENTRY"
      ) {
        return res.status(409).json({
          success: false,
          message:
            "Another member already uses this email.",
        });
      }

      res.status(500).json({
        success: false,
        message:
          "Failed to update member.",
      });
    }
  }
);


/* =========================================
   DELETE MEMBER
========================================= */

app.delete(
  "/api/members/:id",
  async (req, res) => {
    try {
      const { id } = req.params;

      const [result] =
        await db.execute(
          `
            DELETE FROM members
            WHERE id = ?
          `,
          [id]
        );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message:
            "Member not found.",
        });
      }

      res.json({
        success: true,
        message:
          "Member deleted successfully.",
      });

    } catch (error) {
      console.error(
        "Delete member error:",
        error
      );

      res.status(500).json({
        success: false,
        message:
          "Failed to delete member.",
      });
    }
  }
);


/* =========================================
   START SERVER
========================================= */
/* =========================================
   START SERVER LOCALLY
========================================= */

if (require.main === module) {
  async function startServer() {
    try {
      const connection =
        await db.getConnection();

      console.log(
        "MySQL connected successfully!"
      );

      connection.release();

      const PORT =
        process.env.PORT || 5000;

      app.listen(
        PORT,
        () => {
          console.log(
            `S3 server running on port ${PORT}`
          );
        }
      );

    } catch (error) {
      console.error(
        "MySQL connection failed!"
      );

      console.error(error);
    }
  }

  startServer();
}


/* =========================================
   EXPORT EXPRESS APP
========================================= */

module.exports = app;
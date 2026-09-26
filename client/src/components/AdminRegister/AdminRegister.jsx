import { useState } from "react";
import {
  User,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import "./AdminRegister.css";


function AdminRegister({ onBackToLogin }) {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [successMessage, setSuccessMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);


  const handleSubmit = (event) => {

    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");


    // ==========================================
    // VALIDATION
    // ==========================================

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {

      setErrorMessage(
        "Please fill in all the fields."
      );

      return;
    }


    if (name.trim().length < 2) {

      setErrorMessage(
        "Please enter a valid admin name."
      );

      return;
    }


    if (password.length < 8) {

      setErrorMessage(
        "Password must contain at least 8 characters."
      );

      return;
    }


    if (password !== confirmPassword) {

      setErrorMessage(
        "Passwords do not match."
      );

      return;
    }


    setLoading(true);


    // ==========================================
    // TEMPORARY FRONTEND ACCOUNT
    // ==========================================

    setTimeout(() => {

      const existingAdmin =
        localStorage.getItem(
          "s3AdminAccount"
        );


      if (existingAdmin) {

        setErrorMessage(
          "An admin account already exists. Please sign in instead."
        );

        setLoading(false);

        return;
      }


      const adminAccount = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
      };


      localStorage.setItem(
        "s3AdminAccount",
        JSON.stringify(adminAccount)
      );


      setSuccessMessage(
        "Admin account created successfully. You can now sign in."
      );


      setLoading(false);


      // Give the user time to see success message
      setTimeout(() => {

        onBackToLogin();

      }, 1200);

    }, 500);
  };


  return (

    <section className="admin-register-section">

      <div className="admin-register-container">


        {/* ======================================
            BRAND
        ====================================== */}

        <div className="admin-register-brand">

          <div className="admin-register-logo">
            S3
          </div>

          <span>
            S3 Coworking Café
          </span>

        </div>


        {/* ======================================
            REGISTER CARD
        ====================================== */}

        <div className="admin-register-card">


          <button
            className="admin-back-button"
            onClick={onBackToLogin}
            type="button"
          >

            <ArrowLeft size={17} />

            Back to Login

          </button>


          <div className="admin-register-icon">

            <User size={24} />

          </div>


          <div className="admin-register-heading">

            <span>
              S3 ADMIN
            </span>

            <h1>
              Create account
            </h1>

            <p>
              Create an administrator account
              to manage S3 bookings.
            </p>

          </div>


          {/* ======================================
              ERROR
          ====================================== */}

          {errorMessage && (

            <div className="admin-register-error">

              <AlertCircle size={18} />

              <span>
                {errorMessage}
              </span>

            </div>

          )}


          {/* ======================================
              SUCCESS
          ====================================== */}

          {successMessage && (

            <div className="admin-register-success">

              <CheckCircle2 size={18} />

              <span>
                {successMessage}
              </span>

            </div>

          )}


          {/* ======================================
              FORM
          ====================================== */}

          <form
            className="admin-register-form"
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div className="admin-register-group">

              <label htmlFor="admin-name">
                Admin Name
              </label>


              <div className="admin-register-input">

                <User size={18} />

                <input
                  id="admin-name"
                  type="text"
                  placeholder="Enter admin name"
                  value={name}
                  onChange={(event) =>
                    setName(
                      event.target.value
                    )
                  }
                  autoComplete="name"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="admin-register-group">

              <label htmlFor="register-email">
                Email Address
              </label>


              <div className="admin-register-input">

                <Mail size={18} />

                <input
                  id="register-email"
                  type="email"
                  placeholder="admin@s3cafe.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  autoComplete="email"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="admin-register-group">

              <label htmlFor="register-password">
                Password
              </label>


              <div className="admin-register-input">

                <LockKeyhole size={18} />

                <input
                  id="register-password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="admin-register-group">

              <label htmlFor="confirm-password">
                Confirm Password
              </label>


              <div className="admin-register-input">

                <LockKeyhole size={18} />

                <input
                  id="confirm-password"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(
                      event.target.value
                    )
                  }
                  autoComplete="new-password"
                />


                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >

                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* CREATE ACCOUNT */}

            <button
              type="submit"
              className="admin-register-button"
              disabled={loading}
            >

              {loading
                ? "Creating account..."
                : "Create Admin Account"}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* FOOTER */}

          <div className="admin-register-footer">

            <span>
              S3
            </span>

            <p>
              Sip. Sit. Start.
            </p>

          </div>

        </div>


        <p className="admin-register-copyright">
          S3 Coworking Café · Admin Portal
        </p>

      </div>

    </section>

  );
}


export default AdminRegister;
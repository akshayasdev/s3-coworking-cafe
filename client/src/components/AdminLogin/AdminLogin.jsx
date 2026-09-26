import { useState } from "react";

import {
  LockKeyhole,
  Mail,
  ArrowRight,
  AlertCircle,
  UserPlus,
} from "lucide-react";

import "./AdminLogin.css";

function AdminLogin({
  onLogin,
  onCreateAccount,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage(
        "Please enter your email and password."
      );

      return;
    }

    setLoading(true);

    setTimeout(() => {
      const savedAccount =
        localStorage.getItem(
          "s3AdminAccount"
        );

      if (!savedAccount) {
        setErrorMessage(
          "No admin account exists yet. Please create an account first."
        );

        setLoading(false);

        return;
      }

      try {
        const adminAccount =
          JSON.parse(savedAccount);

        if (
          email.trim().toLowerCase() ===
            adminAccount.email &&
          password === adminAccount.password
        ) {
          localStorage.setItem(
            "s3AdminLoggedIn",
            "true"
          );

          onLogin();
        } else {
          setErrorMessage(
            "Invalid admin email or password."
          );
        }
      } catch (error) {
        console.error(
          "Admin account error:",
          error
        );

        setErrorMessage(
          "Unable to read the admin account. Please create the account again."
        );
      }

      setLoading(false);
    }, 500);
  };

  return (
    <section className="admin-login-section">
      <div className="admin-login-container">

        {/* BRAND */}
        <div className="admin-login-brand">
          <div className="admin-login-logo">
            S3
          </div>

          <span>
            S3 Coworking Café
          </span>
        </div>


        {/* LOGIN CARD */}
        <div className="admin-login-card">

          {/* ICON */}
          <div className="admin-login-icon">
            <LockKeyhole size={24} />
          </div>


          {/* HEADING */}
          <div className="admin-login-heading">

            <span>
              S3 ADMIN
            </span>

            <h1>
              Welcome back
            </h1>

            <p>
              Sign in to manage workspace
              bookings.
            </p>

          </div>


          {/* ERROR MESSAGE */}
          {errorMessage && (
            <div className="admin-login-error">

              <AlertCircle size={18} />

              <span>
                {errorMessage}
              </span>

            </div>
          )}


          {/* LOGIN FORM */}
          <form
            className="admin-login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="admin-form-group">

              <label htmlFor="admin-email">
                Admin Email
              </label>

              <div className="admin-input-wrapper">

                <Mail size={18} />

                <input
                  id="admin-email"
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
            <div className="admin-form-group">

              <label htmlFor="admin-password">
                Password
              </label>

              <div className="admin-input-wrapper">

                <LockKeyhole size={18} />

                <input
                  id="admin-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  autoComplete="current-password"
                />

              </div>

            </div>


            {/* SIGN IN */}
            <button
              type="submit"
              className="admin-login-button"
              disabled={loading}
            >

              {loading
                ? "Signing in..."
                : "Sign in to Dashboard"}

              {!loading && (
                <ArrowRight size={18} />
              )}

            </button>

          </form>


          {/* ==================================
              CREATE ACCOUNT
          ================================== */}

          <div className="admin-create-account">

            <div className="admin-divider">

              <span></span>

              <p>
                OR
              </p>

              <span></span>

            </div>


            <button
              type="button"
              className="admin-create-account-button"
              onClick={onCreateAccount}
            >

              <UserPlus size={17} />

              <span>
                Create Admin Account
              </span>

            </button>


            <p className="admin-create-account-text">
              Don't have an admin account?
            </p>

          </div>


          {/* FOOTER */}
          <div className="admin-login-footer">

            <span>
              S3
            </span>

            <p>
              Sip. Sit. Start.
            </p>

          </div>

        </div>


        {/* COPYRIGHT */}
        <p className="admin-login-copyright">
          S3 Coworking Café · Admin Portal
        </p>

      </div>
    </section>
  );
}

export default AdminLogin;
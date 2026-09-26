import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

import { useState } from "react";

import "./AdminLayout.css";

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const currentPath =
    window.location.pathname;

  const navigate = (path) => {
    window.location.href = path;
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to logout?"
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem(
      "s3AdminLoggedIn"
    );

    window.location.href =
      "/admin/login";
  };

  const isActive = (path) => {
    return currentPath === path;
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-layout">

      {/* =====================================
          MOBILE HEADER
      ===================================== */}

      <header className="admin-mobile-header">

        <button
          className="admin-mobile-menu-button"
          onClick={() =>
            setSidebarOpen(true)
          }
          aria-label="Open admin menu"
        >
          <Menu size={23} />
        </button>

        <div className="admin-mobile-logo">
          <strong>S3</strong>
          <span>ADMIN</span>
        </div>

      </header>


      {/* =====================================
          MOBILE OVERLAY
      ===================================== */}

      {sidebarOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={closeSidebar}
        />
      )}


      {/* =====================================
          SIDEBAR
      ===================================== */}

      <aside
        className={`admin-sidebar ${
          sidebarOpen
            ? "admin-sidebar-open"
            : ""
        }`}
      >

        {/* ===================================
            LOGO
        =================================== */}

        <div className="admin-sidebar-logo">

          <div className="admin-logo-mark">
            S3
          </div>

          <div className="admin-logo-text">

            <strong>S3</strong>

            <span>
              COWORKING CAFE
            </span>

          </div>

          <button
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

        </div>


        {/* ===================================
            LABEL
        =================================== */}

        <div className="admin-sidebar-label">
          ADMIN PANEL
        </div>


        {/* ===================================
            NAVIGATION
        =================================== */}

        <nav className="admin-sidebar-nav">

          {/* DASHBOARD */}

          <button
            className={`admin-sidebar-link ${
              isActive("/admin")
                ? "admin-sidebar-link-active"
                : ""
            }`}
            onClick={() => {
              navigate("/admin");
              closeSidebar();
            }}
          >
            <LayoutDashboard size={19} />

            <span>
              Dashboard
            </span>
          </button>


          {/* BOOKINGS */}

          <button
            className={`admin-sidebar-link ${
              isActive(
                "/admin/bookings"
              )
                ? "admin-sidebar-link-active"
                : ""
            }`}
            onClick={() => {
              navigate(
                "/admin/bookings"
              );
              closeSidebar();
            }}
          >
            <CalendarCheck size={19} />

            <span>
              Bookings
            </span>
          </button>


          {/* MEMBERS */}

          <button
            className={`admin-sidebar-link ${
              isActive(
                "/admin/members"
              )
                ? "admin-sidebar-link-active"
                : ""
            }`}
            onClick={() => {
              navigate(
                "/admin/members"
              );
              closeSidebar();
            }}
          >
            <Users size={19} />

            <span>
              Members
            </span>
          </button>


          {/* SETTINGS */}

          <button
            className={`admin-sidebar-link ${
              isActive(
                "/admin/settings"
              )
                ? "admin-sidebar-link-active"
                : ""
            }`}
            onClick={() => {
              navigate(
                "/admin/settings"
              );
              closeSidebar();
            }}
          >
            <Settings size={19} />

            <span>
              Settings
            </span>
          </button>

        </nav>


        {/* ===================================
            BOTTOM
        =================================== */}

        <div className="admin-sidebar-bottom">

          <div className="admin-sidebar-divider" />


          {/* VIEW WEBSITE */}

          <button
            className="admin-sidebar-link admin-view-website-link"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <ExternalLink size={19} />

            <span>
              View Website
            </span>
          </button>


          {/* LOGOUT */}

          <button
            className="admin-sidebar-link admin-logout-link"
            onClick={handleLogout}
          >
            <LogOut size={19} />

            <span>
              Logout
            </span>
          </button>

        </div>

      </aside>


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="admin-main-content">
        {children}
      </main>

    </div>
  );
}

export default AdminLayout;
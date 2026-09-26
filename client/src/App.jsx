import { useState } from "react";

/* =========================================
   PUBLIC WEBSITE
========================================= */

import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Features from "./components/Features/Features";
import Workspace from "./components/Workspace/Workspace";
import CafeMenu from "./components/CafeMenu/CafeMenu";
import Memberships from "./components/Memberships/Memberships";
import MeetingRooms from "./components/MeetingRooms/MeetingRooms";
import Events from "./components/Events/Events";
import About from "./components/About/About";
import Gallery from "./components/Gallery/Gallery";
import Testimonials from "./components/Testimonials/Testimonials";
import Location from "./components/Location/Location";
import Booking from "./components/Booking/Booking";
import Cart from "./components/Cart/Cart";
import Footer from "./components/Footer/Footer";

/* =========================================
   ADMIN
========================================= */

import AdminLogin from "./components/AdminLogin/AdminLogin";
import AdminRegister from "./components/AdminRegister/AdminRegister";
import AdminLayout from "./components/AdminLayout/AdminLayout";
import AdminWorkspace from "./components/AdminWorkspace/AdminWorkspace";
import AdminBookings from "./components/AdminBookings/AdminBookings";
import AdminMembers from "./components/AdminMembers/AdminMembers";
import AdminSettings from "./components/AdminSettings/AdminSettings";


function App() {
  const [isAdminLoggedIn, setIsAdminLoggedIn] =
    useState(
      localStorage.getItem(
        "s3AdminLoggedIn"
      ) === "true"
    );

  const [adminAuthView, setAdminAuthView] =
    useState("login");


  /* =========================================
     CURRENT PATH
  ========================================= */

  const currentPath =
    window.location.pathname;


  /* =========================================
     ADMIN LOGIN
  ========================================= */

  const handleAdminLogin = () => {
    localStorage.setItem(
      "s3AdminLoggedIn",
      "true"
    );

    setIsAdminLoggedIn(true);

    window.location.href = "/admin";
  };


  /* =========================================
     ADMIN LOGOUT
  ========================================= */

  const handleAdminLogout = () => {
    localStorage.removeItem(
      "s3AdminLoggedIn"
    );

    setIsAdminLoggedIn(false);

    window.location.href =
      "/admin/login";
  };


  /* =========================================
     CREATE ACCOUNT
  ========================================= */

  const handleCreateAccount = () => {
    setAdminAuthView("register");

    window.history.pushState(
      {},
      "",
      "/admin/register"
    );

    window.dispatchEvent(
      new PopStateEvent("popstate")
    );
  };


  /* =========================================
     BACK TO LOGIN
  ========================================= */

  const handleBackToLogin = () => {
    setAdminAuthView("login");

    window.history.pushState(
      {},
      "",
      "/admin/login"
    );

    window.dispatchEvent(
      new PopStateEvent("popstate")
    );
  };


  /* =========================================
     ADMIN LOGIN / REGISTER
  ========================================= */

  const isAdminRoute =
    currentPath === "/admin" ||
    currentPath.startsWith("/admin/");


  if (isAdminRoute) {

    /* =======================================
       LOGIN PAGE
    ======================================= */

    if (
      !isAdminLoggedIn &&
      (
        currentPath === "/admin" ||
        currentPath === "/admin/login"
      )
    ) {
      return (
        <AdminLogin
          onLogin={handleAdminLogin}
          onCreateAccount={
            handleCreateAccount
          }
        />
      );
    }


    /* =======================================
       REGISTER PAGE
    ======================================= */

    if (
      !isAdminLoggedIn &&
      currentPath === "/admin/register"
    ) {
      return (
        <AdminRegister
          onBackToLogin={
            handleBackToLogin
          }
        />
      );
    }


    /* =======================================
       PROTECT ADMIN PAGES
    ======================================= */

    if (!isAdminLoggedIn) {
      window.location.href =
        "/admin/login";

      return null;
    }


    /* =======================================
       ADMIN CONTENT
    ======================================= */

    let adminContent = null;


    /* DASHBOARD */

    if (
      currentPath === "/admin"
    ) {
      adminContent = (
        <AdminWorkspace />
      );
    }


    /* BOOKINGS */

    else if (
      currentPath ===
      "/admin/bookings"
    ) {
      adminContent = (
        <AdminBookings />
      );
    }


    /* MEMBERS */

    else if (
      currentPath ===
      "/admin/members"
    ) {
      adminContent = (
        <AdminMembers />
      );
    }


    /* SETTINGS */

    else if (
      currentPath ===
      "/admin/settings"
    ) {
      adminContent = (
        <AdminSettings />
      );
    }


    /* UNKNOWN ADMIN PAGE */

    else {
      adminContent = (
        <AdminWorkspace />
      );
    }


    /* =======================================
       ADMIN LAYOUT
    ======================================= */

    return (
      <AdminLayout>
        {adminContent}
      </AdminLayout>
    );
  }


  /* =========================================
     PUBLIC WEBSITE
  ========================================= */

  return (
    <>
      <Navbar />

      <main>
        <Hero />

        <Features />

        <Workspace />

        <CafeMenu />

        <Memberships />

        <MeetingRooms />

        <Events />

        <About />

        <Gallery />

        <Testimonials />

        <Location />

        <Booking />
      </main>

      <Cart />

      <Footer />
    </>
  );
}


export default App;
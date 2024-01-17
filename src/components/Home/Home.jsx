import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Home.module.css";
import Current from "../Pages/Current";
import Hourly from "../Pages/Hourly";
import Forecast from "../Pages/Forecast";
import Future from "../Pages/Future";
import History from "../Pages/History";
import Faq from "../Pages/Faq";
import NoPage from "../Pages/NoPage";

function Home({ city, onCitySubmit, menuVisibility }) {
  // Check which URL is currently active
  const location = useLocation();
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const renderContent = () => {
    if (isActive("/")) {
      return <Current city={city} onCitySubmit={onCitySubmit} />;
    } else if (isActive("/hourly")) {
      return <Hourly city={city}  />;
    } else if (isActive("/forecast")) {
      return <Forecast city={city}  />;
    }  else if (isActive("/future")) {
      return <Future city={city}  />;
    } else if (isActive("/history")) {
      return <History city={city} />;
    } else if (isActive("/air-quality")) {
      return <Faq />;
    } else if (isActive("/faqs")) {
      return <Faq />;
    } else {
      return <NoPage />;
    }
  };

  return (
    <>
      {/* Sidebar section */}
      <aside className={`${menuVisibility ? styles.hideMenu : ""}`}>
        <Link to="/" className={isActive("/")}>
          Today / Real Time
        </Link>
        <Link to="/hourly" className={isActive("/hourly")}>
          Hourly
        </Link>
        <Link to="/forecast" className={isActive("/forecast")}>
          Forecast
        </Link>
        <Link to="/future" className={isActive("/future")}>
          Future
        </Link>
        <Link to="/history" className={isActive("/history")}>
          History
        </Link>
        <Link to="/air-quality" className={isActive("/air-quality")}>
          Air Quality
        </Link>
        <Link to="/faqs" className={isActive("/faqs")}>
          FAQs
        </Link>
      </aside>
      <main className={`${menuVisibility ? styles.expandMain : ""}`}>{renderContent()}</main>
    </>
  );
}

export default Home;

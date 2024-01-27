import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import CityContext from "../../context/CityContext";
import Current from "../Pages/Current";
import Hourly from "../Pages/Hourly";
import Forecast from "../Pages/Forecast";
import Future from "../Pages/Future";
import History from "../Pages/History";
import Faq from "../Pages/Faq";
import NoPage from "../Pages/NoPage";

function Home() {
  const { city, menu, setMenu } = useContext(CityContext);

  // Check which URL is currently active
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  // Redirect to Home when new city searched
  useEffect(() => {
    navigate("/");
    hideMenu();
  }, [city]);

  // Hide Menu in Smaller Screen
  function hideMenu() {
    if (window.innerWidth < 800) {
      setMenu(true);
    }
  }

  const renderContent = () => {
    if (isActive("/")) {
      return <Current />;
    } else if (isActive("/hourly")) {
      return <Hourly city={city} />;
    } else if (isActive("/forecast")) {
      return <Forecast city={city} />;
    } else if (isActive("/future")) {
      return <Future city={city} />;
    } else if (isActive("/history")) {
      return <History city={city} />;
    } else if (isActive("/faqs")) {
      return <Faq />;
    } else {
      return <NoPage />;
    }
  };

  return (
    <>
      {/* Sidebar section */}
      <aside className={`${menu ? styles.hideMenu : ""}`}>
        <Link to="/" className={isActive("/")} onClick={hideMenu}>
          Today / Real Time
        </Link>
        <Link to="/hourly" className={isActive("/hourly")} onClick={hideMenu}>
          Hourly
        </Link>
        <Link to="/forecast" className={isActive("/forecast")} onClick={hideMenu}>
          Forecast
        </Link>
        <Link to="/future" className={isActive("/future")} onClick={hideMenu}>
          Future
        </Link>
        <Link to="/history" className={isActive("/history")} onClick={hideMenu}>
          History
        </Link>
        <Link to="/faqs" className={isActive("/faqs")}     onClick={hideMenu}>
          FAQs
        </Link>
      </aside>
      <main className={`${menu ? styles.expandMain : ""}`}>{renderContent()}</main>
    </>
  );
}

export default Home;

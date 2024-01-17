import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";

function App() {
  const [city, setCity] = useState("");
  // State for managing menu visibility
  const [menuShow, setMenuShow] = useState(false);

  // Function to handle city submission in App.js
  const handleCitySubmit = (submittedCity) => {
    setCity(submittedCity);
  };

  // Toggle Sidebar visibility
  const changeMenu = () => {
    setMenuShow(!menuShow);
  };


  return (
    <>
      <BrowserRouter>
        <Header
          city={city}
          onCitySubmit={handleCitySubmit}
          onMenuClicked={changeMenu}
        />
        <Routes>
          <Route
            path="/"
            element={<Home city={city} onCitySubmit={handleCitySubmit} menuVisibility={menuShow} />}
          />
          <Route
            path="/hourly"
            element={<Home city={city} onCitySubmit={handleCitySubmit} menuVisibility={menuShow} />}
          />
          <Route
            path="/faqs"
            element={<Home city={city} onCitySubmit={handleCitySubmit} menuVisibility={menuShow} />}
          />
          <Route
            path="/air-quality"
            element={<Home city={city} onCitySubmit={handleCitySubmit} menuVisibility={menuShow} />}
          />
          <Route
            path="*"
            element={<Home city={city} onCitySubmit={handleCitySubmit} menuVisibility={menuShow} />}
          />
        </Routes>

        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;

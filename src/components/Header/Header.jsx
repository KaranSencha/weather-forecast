import React, { useState, useEffect, useCallback } from "react";
import styles from "./Header.module.css";
import apiKey from "../../helpers/apiKey";
import search_icon from "../../assets/search.svg";
import menu_icon from "../../assets/menu.svg";

function Header({city, onCitySubmit, onMenuClicked }) {
  const [inputValue, setInputValue] = useState("");
  const [suggestionData, setSuggestionData] = useState([]);
  const [cityData, setCityData] = useState({});

  // suggest city click handle
  const handleCityClick = (clickedCity) => {
    setSuggestionData([]);
    setInputValue("");
    onCitySubmit(clickedCity);
  };

  // Input
  const inputChanged = useCallback((event) => {
    let inputValue = event.target.value;
    if (inputValue.trim().length === 0) {
      return;
    }
    setInputValue(inputValue);
  }, []);

  // Input - handle enter key
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        onCitySubmit(inputValue);
        setSuggestionData([]);
        setInputValue("");
      } else if (event.key === "Backspace" && inputValue.length === 1) {
        setInputValue("");
      }
    },
    [inputValue, onCitySubmit]
  );

  // Api for City Suggestion
  useEffect(() => {
    if (inputValue.length > 0) {
      fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${inputValue}`)
        .then((response) => response.json())
        .then((response) => {
          setSuggestionData(response);
        });
    }
  }, [inputValue]);

  // Api Current Weather Get
  // Input Cities Api Call
  useEffect(() => {
    if (city !== "") {
      fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`)
        .then((response) => response.json())
        .then((response) => {
          setCityData(response);
        });
    }
  }, [city]);

  return (
    <>
      {/* Header section */}
      <header>
        {/* Menu Icon  */}
        <div className={styles.menuIcon} onClick={onMenuClicked}>
          <img src={menu_icon} alt="Menu Icon" />
          <div className={styles.logo}>Weather</div>
        </div>
        {/* Check if city is not searched  */}
        {/* City Info  */}
        {Object.keys(cityData).length !== 0 && (
          <div className={styles.cityInfo}>
            <div className={styles.cityInfoName}>
              {cityData?.location.name}, {cityData?.location.region}
            </div>
            <div className={styles.tempBox}>
              <span className={styles.temp}>
                {" "}
                {cityData?.current.temp_c}
                <sup>°</sup>
              </span>
              <span className={styles.tempC}>c </span>
            </div>
          </div>
        )}

        {/* Search Box  */}
        <div className={styles.searchBox}>
          <input
            className={styles.search}
            type="text"
            placeholder="search city"
            value={inputValue}
            onKeyDown={handleKeyDown}
            onChange={inputChanged}
          />

          {/* Search icon for submitting the entered city */}
          <img src={search_icon} alt="search icon" onClick={() => handleCityClick(inputValue)} />

          {/* Suggestions box */}
          <div className={styles.suggestionBox}>
            {suggestionData.map((item, ind) => (
              <div className={styles.cityBox} key={ind} onClick={() => handleCityClick(item.name)}>
                <div className={styles.cityName}>{item.name}</div>
                <div className={styles.countryName}>
                  {item.region}, {item.country}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;

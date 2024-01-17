import React from "react";
import styles from "./City.module.css";

function City({ region, country, temp, imgUrl, onClick }) {
  const handleClick = () => {
    onClick(`${region}, ${country}`); // Combine region and country to form the city name and pass it to the onClick function
  };

  return (
    <div className={styles.cityBox} onClick={handleClick}>
      <div className={styles.cityName}>
        {region} {country}
      </div>

      <div className={styles.tempBox}>
        <img src={imgUrl} alt="cloud condition icon" />
        <span>{temp}°</span>c
      </div>
    </div>
  );
}

export default City;

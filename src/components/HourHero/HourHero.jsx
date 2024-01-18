import React, { useState, useEffect } from "react";
import styles from "./HourHero.module.css";
import allCloudCondition from "../../assets/data/allCloudCondition";
function HourHero({ city, country, temp, tempValues, code, values }) {
  const [imgUrl, setImgUrl] = useState("");
  const [cloudText, setCloudText] = useState("");

  // Find the matching condition based on the code
  useEffect(() => {
    const condition = allCloudCondition.find((item) => item.code === code);
    if (condition) {
      setImgUrl(condition.imgId);
      setCloudText(condition.text);
    }
  }, [code]);

  return (
    <div className={styles.heroBox}>
      {/* left Box  */}
      <div className={styles.left}>
        <div className={styles.cityName}>
          {city} {">"}
          {country}
        </div>

        <div className={styles.tempBox}>
          {temp} &#8451; <span>03:00 AM</span>
        </div>
        {/* left bottom  */}
        <div className={styles.valueBox}>
          {tempValues.map((item, index) => (
            <div key={index}>
              <span className={styles.value}>{item.value}</span>
              <span className={styles.valueName}>{item.property}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right box */}
      <div className={styles.right}>
        {/* Right img box  */}
        <div className={styles.imgBox}>
          <img src={imgUrl} alt="Weather" />
          <div className={styles.cloudText}>{cloudText}</div>
        </div>

        {/* Right Bottom  */}
        <div className={styles.infoBox}>
          {values.map((item, index) => (
            <p key={index}>
              <span>{item.property}</span> <span>{item.value}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HourHero;

import React, { useState, useEffect } from "react";
import styles from "./Hero.module.css";
import allCloudCondition from "../../assets/data/allCloudCondition";
import moment from "moment-timezone";

function Hero({ day, cityTimezone, temp, code, values }) {
  const [imgUrl, setImgUrl] = useState("");
  const [cloudText, setCloudText] = useState("");
  const [dayText, setDayText] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (cityTimezone) {
        const timeInTimezone = moment().tz(cityTimezone).format("HH:mm:ss");
        setCurrentTime(timeInTimezone);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cityTimezone]);

  // Find the matching condition based on the code
  useEffect(() => {
    const condition = allCloudCondition.find((item) => item.code === code);
    if (condition) {
      if (day === 1) {
        setImgUrl(condition.day.imgId);
        setCloudText(condition.day.text);
        setDayText("Day is Active");
      } else {
        setImgUrl(condition.night.imgId);
        setCloudText(condition.night.text);
        setDayText("Night is Active");
      }
    }
  }, [code]);

  return (
    <div className={styles.heroBox}>
      <div className={styles.left}>
        <div className={styles.cityName}>{dayText}</div>

        <div className={styles.tempBox}>
          {temp}
          <sup>°</sup>
          <span>C</span>
        </div>

        <div className={styles.date}>{currentTime}</div>
      </div>

      <div className={styles.right}>
        <div className={styles.imgBox}>
          <img src={imgUrl} alt="Weather" />
          <div className={styles.cloudText}>{cloudText}</div>
        </div>

        <div className={styles.infoBox}>
          {values.map((item, index) =>
            item.value.includes("°") ? (
              <p key={index}>
                <span>{item.property}</span>{" "}
                <span>
                  {parseInt(item.value)}
                  <sup>°</sup>
                </span>
              </p>
            ) : (
              <p key={index}>
                <span>{item.property}</span> <span>{item.value}</span>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;

import React, { useState, useEffect } from "react";
import styles from "./ForHero.module.css";
import allCloudCondition from "../../assets/data/allCloudCondition";

function ForHero({isHour, day, temp, code, values }) {
  const [imgUrl, setImgUrl] = useState("");
  const [cloudText, setCloudText] = useState("");

  // Find the matching condition based on the code
  useEffect(() => {
    const condition = allCloudCondition.find((item) => item.code === code);
    if (condition) {
      if (day === undefined) return;
        if (day === 1) {
          setImgUrl(condition.day.imgId);
          setCloudText(condition.day.text);
        } else {
          setImgUrl(condition.night.imgId);
          setCloudText(condition.night.text);
        }
    }
  }, [code]);

  function RenderHour() {
    if (isHour) {
      return <div className={styles.hourTime}>{isHour}</div>;
    }
  }
  
  function RenderContext() {
    if (!isHour) {
      return " avg.";
    }

  }

  return (
    <div className={styles.heroBox}>

      {/* top Box  */}
      <div className={styles.top}>
        <div className={styles.tempBox}>
         <RenderHour />
          <div className={styles.temp}>
            {temp}<sup>°</sup>
            <span>C 
              <RenderContext />
          </span>
          </div>
        </div>
        <div className={styles.imgBox}>
          <img src={imgUrl} alt="Weather" />
          <div className={styles.cloudText}>{cloudText}</div>
        </div>
      </div>
      
        {/*  bottom  */}
        <div className={styles.bottom}>
          {values.map((item, index) => (
            <div key={index} className={styles.valueBox}>
              <span className={styles.value}>{item.value}</span>
              <span className={styles.valueName}>{item.property}</span>
            </div>
          ))}
      </div>
      </div>
  );
}

export default ForHero;

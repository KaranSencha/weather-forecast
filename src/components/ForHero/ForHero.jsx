import React, { useState, useEffect } from "react";
import styles from "./ForHero.module.css";
import allCloudCondition from "../../assets/CloudCondition/allCloudCondition";

function ForHero({ temp, tempValues, code, values }) {
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

      {/* top Box  */}
      <div className={styles.top}>
        <div className={styles.tempBox}>
          <div>
          {temp}<sup>°</sup>
          <span>C avg.</span>
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

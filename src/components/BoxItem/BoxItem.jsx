import React from "react";
import styles from "./BoxItem.module.css";

function BoxItem({ heading, imgId, values }) {
  return (
    <div className={styles.box}>
      <div className={styles.heading}>
        <h3>{heading}</h3>
        <img src={imgId} />
      </div>
      {values.map((item, index) => (
        <p key={index}>
          <span>{item.property}</span> <span>{item.value}</span>
        </p>
      ))}
    </div>
  );
}

export default BoxItem;

import React, { useState, useEffect } from 'react';
import styles from "../../styles/LinearLoader.module.scss"

const LinearLoader = ({loading}) => {
  return (
    <div className={styles.linear_loader_container}>
      {loading && <div className={styles.linear_loader}></div>}
    </div>
  );
};

export default LinearLoader;

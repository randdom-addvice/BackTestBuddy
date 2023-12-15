import React from "react";
// import "./Sidebar.module.scss";
import styles from "./Sidebar.module.scss";

const SideBar = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.child1}></div>
          <div className={styles.child2}></div>
        </div>
      </div>
    </section>
  );
};

export default SideBar;

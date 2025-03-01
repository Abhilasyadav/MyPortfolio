import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import Download from "../Download/Download";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Abhilash</h1>
        <p className={styles.description}>
          I'm a full-stack developer with six months of experience using ReactJS.
        </p>
        <Download />
        {/* <a href="mailto:yadavabhilash2003@gmail.com" className={styles.contactBtn}>
          Contact Me
        </a> */}
      </div>
      <img
        src={getImageUrl("hero/man.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};

import React, { useState } from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import Download from "../Download/Download";
import View from "../ResumeView/View";

export const Hero = () => {
  const [openResume, setOpenResume] = useState(false);

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Hi, I'm Abhilash</h1>
        <p className={styles.description}>
          I’m a passionate full-stack developer specializing in building modern,
          scalable web applications with React and Java backends. I love crafting
          seamless user experiences and solving real-world problems through code.
        </p>
        <div className={styles.buttonGroup}>
          <Download />
          <button
            className={styles.viewBtn}
            onClick={() => setOpenResume(true)}
            type="button"
          >
            View Resume
          </button>
        </div>
      </div>
      <img
        src={getImageUrl("hero/man.png")}
        alt="Hero image of me"
        className={styles.heroImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
      <View open={openResume} onClose={() => setOpenResume(false)} />
    </section>
  );
};

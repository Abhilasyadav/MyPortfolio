import React, { useState } from "react";
<<<<<<< HEAD
import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import View from "../ResumeView/View";
import { useTypewriter } from "../../hooks/useTypewriter";

const ROLES = [
  "Full-Stack Developer",
  "React Specialist",
  "Java Backend Engineer",
  "UI/UX Enthusiast",
];

export const Hero = () => {
  const [openResume, setOpenResume] = useState(false);
  const typedText = useTypewriter(ROLES);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Abhilash_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className={styles.hero}>
      <div className={styles.inner}>

        {/* ── Left column ── */}
        <div className={styles.leftCol}>
          <p className={styles.greeting}>HELLO I AM</p>
          <h1 className={styles.name}>Abhilash Yadav</h1>
          <p className={styles.role}>
            I'm a&nbsp;
            <span className={styles.typed}>{typedText}</span>
            <span className={styles.cursor}>|</span>
          </p>
          <p className={styles.desc}>
            Passionate about building modern, scalable web applications with
            React and Java. I craft seamless user experiences and solve
            real-world problems through clean code.
          </p>
          <div className={styles.ctaRow}>
            <button className={styles.primaryBtn} onClick={handleDownload}>
              ⬇&nbsp;&nbsp;Download CV
            </button>
            <button className={styles.ghostBtn} onClick={() => setOpenResume(true)}>
              <span className={styles.dot} />
              View Resume
            </button>
          </div>
        </div>

        {/* ── Right column: photo + floating stat card ── */}
        <div className={styles.rightCol}>
          <div className={styles.photoRing}>
            <img
              src={getImageUrl("hero/man.jpg")}
              alt="Abhilash Yadav"
              className={styles.photo}
            />
          </div>
          {/* Stat card overlapping wave boundary */}
          <div className={styles.statCard}>
            <span className={styles.statNum}>5+</span>
            <span className={styles.statTxt}>Projects<br />Completed</span>
          </div>
        </div>

      </div>

      {/* ── Wave: concave on left, low on right (matches reference) ── */}
      <div className={styles.waveWrap}>
        <svg
          viewBox="0 0 1440 160"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C160,0 300,150 580,150 C820,150 1060,65 1440,95 L1440,160 L0,160 Z"
            fill="#f4f7f5"
          />
        </svg>
      </div>

=======

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
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3
      <View open={openResume} onClose={() => setOpenResume(false)} />
    </section>
  );
};

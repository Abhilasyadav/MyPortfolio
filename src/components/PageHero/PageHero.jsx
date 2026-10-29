import React from "react";
import { motion } from "motion/react";
import styles from "./PageHero.module.css";

export const PageHero = ({ title, highlight, subtitle, breadcrumb }) => (
  <section className={styles.hero}>
    <div className={styles.orb1} aria-hidden="true" />
    <div className={styles.orb2} aria-hidden="true" />
    <div className={styles.inner}>
      {breadcrumb && (
        <motion.p
          className={styles.breadcrumb}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Home</span>
          <span className={styles.sep}>/</span>
          <span className={styles.crumbActive}>{breadcrumb}</span>
        </motion.p>
      )}
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {title}{" "}
        {highlight && <span className={styles.highlight}>{highlight}</span>}
      </motion.h1>
      {subtitle && (
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        className={styles.line}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
        style={{ originX: 0.5 }}
        aria-hidden="true"
      />
    </div>
  </section>
);

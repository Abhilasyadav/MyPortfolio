import { motion } from "motion/react";
import styles from "./PageHero.module.css";

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export const PageHero = ({ title, highlight, subtitle, breadcrumb }) => (
  <section className={styles.hero}>
    <div className={styles.inner}>
      {breadcrumb && (
        <motion.p className="eyebrow" {...rise(0)}>
          Index / {breadcrumb}
        </motion.p>
      )}
      <motion.h1 className={styles.title} {...rise(0.06)}>
        {title} {highlight && <em>{highlight}</em>}
      </motion.h1>
      {subtitle && (
        <motion.p className={styles.subtitle} {...rise(0.12)}>
          {subtitle}
        </motion.p>
      )}
    </div>
  </section>
);

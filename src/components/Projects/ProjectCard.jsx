import React from "react";
import { motion } from "motion/react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const mainTech = skills[0]?.split(",")[0]?.trim() || skills[0];

  return (
    <motion.div
      className={styles.container}
      tabIndex={0}
      whileHover={{ y: -8, boxShadow: "0 24px 56px rgba(20,184,166,0.22)" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.imageWrapper}>
        <motion.img
          src={getImageUrl(imageSrc)}
          alt={`Screenshot of ${title}`}
          className={styles.image}
          loading="lazy"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        <span className={styles.badge}>{mainTech}</span>
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <ul className={styles.skills}>
          {skills[0]?.split(",").map((skill, id) => (
            <motion.li
              key={id}
              className={styles.skill}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.15 }}
            >
              {skill.trim()}
            </motion.li>
          ))}
        </ul>
        <div className={styles.links}>
          {demo && (
            <motion.a
              href={demo}
              className={styles.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Live Demo
            </motion.a>
          )}
          <motion.a
            href={source}
            className={styles.linkSecondary}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
          >
            Source Code
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

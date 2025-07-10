import React from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  const mainTech = skills[0]?.split(",")[0] || skills[0];

  return (
    <div className={styles.container} tabIndex={0}>
      <div className={styles.imageWrapper}>
        <img
          src={getImageUrl(imageSrc)}
          alt={`Screenshot of ${title}`}
          className={styles.image}
          loading="lazy"
        />
        <span className={styles.badge}>{mainTech}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <ul className={styles.skills}>
        {skills[0]
          .split(",")
          .map((skill, id) => (
            <li key={id} className={styles.skill}>
              {skill.trim()}
            </li>
          ))}
      </ul>
      <div className={styles.links}>
        {demo && (
          <a
            href={demo}
            className={styles.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
        )}
        <a
          href={source}
          className={styles.linkSecondary}
          target="_blank"
          rel="noopener noreferrer"
        >
          Source Code
        </a>
      </div>
    </div>
  );
};

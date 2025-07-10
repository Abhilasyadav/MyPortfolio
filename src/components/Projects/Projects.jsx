import React from "react";

import styles from "./Projects.module.css";

import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  return (
    <section className={styles.container} id="projects">
      <h2 className={styles.title}>Projects</h2>
      <div className={styles.projects}>
        {projects.map((project, id) => {
          return (
            <div
              key={id}
              className={styles.fadeInUp}
              style={{ animationDelay: `${id * 0.15 + 0.2}s` }}
            >
              <ProjectCard project={project} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

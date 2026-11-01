import { useState } from "react";
import { motion } from "motion/react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

// Each project lists its tech as one comma-separated string.
const split = (s) => s?.split(",").map(t => t.trim()).filter(Boolean) || [];
const techOf = (p) => [...split(p.skills[0]), ...split(p.deploy)];

// Chips only for tech shared by several projects, so the row stays short.
const tagCounts = projects.flatMap(techOf).reduce(
  (acc, t) => acc.set(t, (acc.get(t) || 0) + 1),
  new Map()
);
const ALL_TAGS = ["All", ...[...tagCounts].filter(([, n]) => n > 1).map(([t]) => t)];

export const Projects = () => {
  const [filter, setFilter] = useState("All");

  const visible = filter === "All"
    ? projects
    : projects.filter(p => techOf(p).includes(filter));

  return (
    <section className={styles.section} id="projects">
      <div className={styles.filters} role="group" aria-label="Filter projects by technology">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`${styles.chip} ${filter === tag ? styles.chipActive : ""}`}
            aria-pressed={filter === tag}
            onClick={() => setFilter(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.empty}>No projects found for this filter.</p>
      ) : (
        <motion.div
          key={filter}
          className={styles.grid}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {visible.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i + 1} />
          ))}
        </motion.div>
      )}
    </section>
  );
};

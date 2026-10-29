import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Projects.module.css";
import projects from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

const ALL_TAGS = ["All", ...new Set(
  projects.flatMap(p => p.skills[0]?.split(",").map(s => s.trim()) || [])
)];

export const Projects = () => {
  const [filter, setFilter] = useState("All");

  const visible = filter === "All"
    ? projects
    : projects.filter(p => p.skills[0]?.includes(filter));

  return (
    <section className={styles.section} id="projects">
      {/* Filter chips */}
      <motion.div
        className={styles.filters}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {ALL_TAGS.slice(0, 8).map((tag, i) => (
          <motion.button
            key={tag}
            className={`${styles.chip} ${filter === tag ? styles.chipActive : ""}`}
            onClick={() => setFilter(tag)}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4 }}
          >
            {tag}
          </motion.button>
        ))}
      </motion.div>

      {visible.length === 0 ? (
        <motion.p
          className={styles.empty}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          No projects found for this filter.
        </motion.p>
      ) : (
        <motion.div className={styles.grid} layout>
          <AnimatePresence mode="popLayout">
            {visible.map((project, id) => (
              <motion.div
                key={project.title || id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -16 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: id * 0.07 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

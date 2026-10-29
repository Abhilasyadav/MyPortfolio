import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import styles from './Skills.module.css';
import skillsData from '../../data/skills.json';

const LEVEL_CONFIG = {
  Expert: { color: '#14b8a6', bg: 'rgba(20,184,166,0.12)', bar: 95 },
  Proficient: { color: '#5eead4', bg: 'rgba(94,234,212,0.12)', bar: 75 },
  Learning: { color: '#7ee787', bg: 'rgba(126,231,135,0.12)', bar: 50 },
};

const getProficiencyLevel = (proficiency) => {
  if (proficiency >= 85) return 'Expert';
  if (proficiency >= 65) return 'Proficient';
  return 'Learning';
};

const getAbbr = (title) =>
  title.replace('.js', '').replace(' IDE', '').split(/[\s.]/)[0].substring(0, 3).toUpperCase();

function SkillCard({ skill, index }) {
  const levelName = getProficiencyLevel(skill.proficiency);
  const level = LEVEL_CONFIG[levelName];
  const [imgError, setImgError] = useState(false);
  const showImage = skill.imageSrc && !imgError;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 }}
      whileHover={{ y: -6, boxShadow: "0 16px 40px rgba(20,184,166,0.18)" }}
    >
      <div className={styles.cardTop}>
        <motion.div
          className={styles.iconWrap}
          whileHover={{ scale: 1.12, rotate: -4 }}
          transition={{ duration: 0.2 }}
        >
          {showImage ? (
            <img
              src={skill.imageSrc}
              alt={skill.title}
              className={styles.icon}
              onError={() => setImgError(true)}
            />
          ) : (
            <span className={styles.abbr}>{getAbbr(skill.title)}</span>
          )}
        </motion.div>
        <div className={styles.cardInfo}>
          <h3 className={styles.skillName}>{skill.title}</h3>
          <span className={styles.category}>{skill.category}</span>
        </div>
      </div>

      <div className={styles.barTrack}>
        <motion.div
          className={styles.barFill}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.proficiency}%` } : { width: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: index * 0.05 + 0.2 }}
          style={{ background: `linear-gradient(90deg, ${level.color}, #5eead4)` }}
        />
      </div>

      <div className={styles.cardBottom}>
        <span className={styles.pct}>{skill.proficiency}%</span>
        <span
          className={styles.badge}
          style={{ color: level.color, background: level.bg, borderColor: level.color }}
        >
          {levelName}
        </span>
      </div>
    </motion.div>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredSkills, setFilteredSkills] = useState(skillsData.skills);

  useEffect(() => {
    const filtered = activeCategory === 'All'
      ? skillsData.skills
      : skillsData.skills.filter(s => s.category === activeCategory);
    setFilteredSkills(filtered);
  }, [activeCategory]);

  return (
    <section className={styles.section} id="skills">
      <div className={styles.inner}>
        {/* Filter chips */}
        <motion.div
          className={styles.filters}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {skillsData.categories.map((cat, i) => (
            <motion.button
              key={cat}
              className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ''}`}
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.06, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <div className={styles.grid}>
          {filteredSkills.map((skill, i) => (
            <SkillCard key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

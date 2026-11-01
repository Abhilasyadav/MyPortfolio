import { useState } from 'react';
import { motion } from 'motion/react';
import styles from './Skills.module.css';
import skillsData from '../../data/skills.json';

const getLevel = (proficiency) => {
  if (proficiency >= 85) return 'Expert';
  if (proficiency >= 65) return 'Proficient';
  return 'Learning';
};

const getAbbr = (title) =>
  title.replace('.js', '').replace(' IDE', '').split(/[\s.]/)[0].substring(0, 3).toUpperCase();

function SkillItem({ skill }) {
  const [imgError, setImgError] = useState(false);
  const showImage = skill.imageSrc && !imgError;

  return (
    <li className={styles.item}>
      <span className={styles.iconWrap} aria-hidden="true">
        {showImage ? (
          <img
            src={skill.imageSrc}
            alt=""
            className={`${styles.icon} ${skill.mono ? styles.mono : ''} ${skill.silhouette ? styles.silhouette : ''}`}
            loading="lazy"
            width="28"
            height="28"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.abbr}>{getAbbr(skill.title)}</span>
        )}
      </span>
      <span className={styles.name}>{skill.title}</span>
      <span className={styles.level}>{getLevel(skill.proficiency)}</span>
    </li>
  );
}

export function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All'
    ? skillsData.skills
    : skillsData.skills.filter(s => s.category === activeCategory);

  return (
    <section className={styles.section} id="skills">
      <div className={styles.inner}>
        <div className={styles.filters} role="group" aria-label="Filter skills by category">
          {skillsData.categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ''}`}
              aria-pressed={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.ul
          key={activeCategory}
          className={styles.list}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {filteredSkills.map((skill) => (
            <SkillItem key={skill.id} skill={skill} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

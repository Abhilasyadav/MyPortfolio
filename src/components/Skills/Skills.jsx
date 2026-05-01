import React, { useState, useEffect } from 'react';
import styles from './Skills.module.css';
import skillsData from '../../data/skills.json';

export default function Skills(){
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredSkills, setFilteredSkills] = useState(skillsData.skills);
  const [visibleSkills, setVisibleSkills] = useState([]);

  useEffect(() => {
    const filtered = activeCategory === 'All' 
      ? skillsData.skills 
      : skillsData.skills.filter(skill => skill.category === activeCategory);
    
    setFilteredSkills(filtered);
    setVisibleSkills([]);
    
    // Stagger animation for skills
    filtered.forEach((_, index) => {
      setTimeout(() => {
        setVisibleSkills(prev => [...prev, index]);
      }, index * 100);
    });
  }, [activeCategory]);

  const getSkillIcon = (skillTitle) => {
    const iconMap = {
      'Java': '☕',
      'JavaScript': '🟨',
      'SQL': '🗃️',
      'React.js': '⚛️',
      'HTML5': '📄',
      'CSS3': '🎨',
      'Bootstrap': '🅱️',
      'Spring Boot': '🍃',
      'Spring MVC': '🌱',
      'Hibernate': '🐻',
      'JPA': '📊',
      'JDBC': '🔌',
      'MySQL': '🐬',
      'NoSQL': '📋',
      'Git': '🔧',
      'GitHub': '🐙',
      'VS Code': '💻',
      'Eclipse IDE': '🌙',
      'Postman': '📮',
      'Docker': '🐳',
      'Netlify': '🌐',
      'Railway': '🚂'
    };
    return iconMap[skillTitle] || '💻';
  };

  const getProficiencyLevel = (proficiency) => {
    if (proficiency >= 85) return { label: 'Expert', color: '#4f8cff' };
    if (proficiency >= 65) return { label: 'Proficient', color: '#ffb400' };
    return { label: 'Learning', color: '#7ee787' };
  };

  const SkillCard = ({ skill, index, isVisible }) => {
    const level = getProficiencyLevel(skill.proficiency);
    return (
      <div
        className={`${styles.skillCard} ${isVisible ? styles.visible : ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className={styles.skillImageContainer}>
          <div className={styles.skillImageBg}>
            <div className={styles.skillIcon}>
              <span className={styles.skillEmoji}>
                {getSkillIcon(skill.title)}
              </span>
            </div>
          </div>
          <div className={styles.skillGlow}></div>
        </div>

        <div className={styles.skillContent}>
          <h3 className={styles.skillTitle}>{skill.title}</h3>
          <span className={styles.skillCategory}>{skill.category}</span>
          <span
            className={styles.levelBadge}
            style={{ color: level.color, borderColor: level.color }}
          >
            {level.label}
          </span>
        </div>
      </div>
    );
  };

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.titleText}>Skills & Expertise</span>
            <div className={styles.titleUnderline}></div>
          </h2>
          <p className={styles.sectionDescription}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className={styles.categoryFilter}>
          {skillsData.categories.map(category => (
            <button
              key={category}
              className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className={styles.skillsGrid}>
          {filteredSkills.map((skill, index) => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              index={index}
              isVisible={visibleSkills.includes(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// export default Skills;
import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import { useScrollAnimation } from "../../hooks/useScrollAnimation";

/* Animated percentage counter */
function Counter({ end, suffix = "%" }) {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useScrollAnimation(0.2);

  useEffect(() => {
    if (!isVisible) return;
    let cur = 0;
    const step = Math.ceil(end / 28);
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setCount(end); clearInterval(t); }
      else setCount(cur);
    }, 40);
    return () => clearInterval(t);
  }, [isVisible, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const INFO_ROWS = [
  { label: "Education", value: "B.Tech, Computer Science" },
  { label: "Location",  value: "India"                    },
  { label: "Email",     value: "yadavabhilash2003@gmail.com" },
  { label: "Phone",     value: "+91 7347845062"            },
  { label: "Freelance", value: "Open to Work"              },
];

const STATS = [
  { pct: 90, label: "Frontend Dev"    },
  { pct: 85, label: "Java / Backend"  },
  { pct: 88, label: "React.js"        },
  { pct: 80, label: "Problem Solving" },
];

/* Colored social icon circles */
const SOCIALS = [
  { href: "https://www.linkedin.com/in/abhilash-yadav-572489251/", label: "in",  bg: "#0077b5", color: "#fff"  },
  { href: "https://www.github.com/abhilasyadav",                   label: "gh",  bg: "#24292e", color: "#fff"  },
  { href: "mailto:yadavabhilash2003@gmail.com",                    label: "@",   bg: "#1d6b5a", color: "#fff"  },
];

export const About = () => {
  const [ref, visible] = useScrollAnimation(0.05);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Abhilash_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="about"
      ref={ref}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
    >
      {/* ══════════════════════════════
          TOP ROW: left bio | right text
          ══════════════════════════════ */}
      <div className={styles.topRow}>

        {/* Left column */}
        <div className={styles.leftCol}>
          <h2 className={styles.heading}>About Me</h2>
          <p className={styles.subHeading}>I love building modern web applications</p>

          <p className={styles.bio}>
            I'm a dedicated full-stack developer with a passion for crafting
            robust, user-friendly web experiences. My expertise spans both
            frontend (React) and backend (Java, Spring Boot), allowing me to
            deliver end-to-end digital solutions.
          </p>

          {/* Download CV button */}
          <button className={styles.downloadBtn} onClick={handleDownload}>
            ⬇&nbsp;&nbsp;DOWNLOAD CV
          </button>

          {/* Colored social icon circles */}
          <div className={styles.socials}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCircle}
                style={{ background: s.bg, color: s.color }}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rightCol}>
          <p className={styles.rightText}>
            I specialize in crafting modern, responsive, and accessible user
            interfaces using React, while simultaneously building scalable
            RESTful APIs with Java and Spring Boot. I'm a continuous learner,
            always staying updated with the latest trends in technology.
          </p>
          <p className={styles.rightText}>
            My goal is to create seamless digital experiences that make a real
            impact, combining clean code with intuitive design principles.
          </p>
          {/* Cursive signature */}
          <p className={styles.signature}>Abhilash Yadav</p>
        </div>

      </div>

      {/* ══════════════════════════════
          BOTTOM ROW: info table | stats
          ══════════════════════════════ */}
      <div className={styles.bottomRow}>

        {/* Pill-shaped alternating info table */}
        <div className={styles.infoTable}>
          {INFO_ROWS.map((row, i) => (
            <div
              key={i}
              className={`${styles.infoRow} ${i % 2 === 0 ? styles.pill : styles.plain}`}
            >
              <span className={styles.infoLabel}>{row.label}:</span>
              <span className={styles.infoValue}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Stats grid — outer gradient-border wrapper + inner cards */}
        <div className={styles.statsOuter}>
          <div className={styles.statsInner}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <span className={styles.statPct}>
                  <Counter end={s.pct} />
                </span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import styles from "./About.module.css";

function Counter({ end, suffix = "%" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let cur = 0;
    const step = Math.ceil(end / 28);
    const t = setInterval(() => {
      cur += step;
      if (cur >= end) { setCount(end); clearInterval(t); }
      else setCount(cur);
    }, 40);
    return () => clearInterval(t);
  }, [isInView, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const INFO_ROWS = [
  { label: "Experience", value: "1.5+ Years" },
  { label: "Education", value: "B.Tech, Computer Science" },
  { label: "Location", value: "India" },
  { label: "Email", value: "yadavabhilash2003@gmail.com" },
  { label: "Freelance", value: "Open to Work ✅" },
];

const STATS = [
  { pct: 95, suffix: "%", label: "Python / AI" },
  { pct: 92, suffix: "%", label: "LLM / Agents" },
  { pct: 90, suffix: "%", label: "React Dashboards" },
  { pct: 1.5, suffix: "+ Yrs", label: "Experience" },
];

const SOCIALS = [
  { href: "https://www.linkedin.com/in/abhilash-yadav-572489251/", label: "in", bg: "#0077b5", color: "#fff" },
  { href: "https://www.github.com/abhilasyadav", label: "gh", bg: "#24292e", color: "#fff" },
  { href: "mailto:yadavabhilash2003@gmail.com", label: "@", bg: "#14b8a6", color: "#fff" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

export const About = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Abhilash_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className={styles.section}>

      {/* ── Top row ── */}
      <div className={styles.topRow}>

        {/* Left — identity */}
        <motion.div className={styles.leftCol} {...fadeUp(0)}>
          <div className={styles.labelChip}>About Me</div>
          <h2 className={styles.heading}>
            AI Engineer &amp; <br />
            <span className={styles.accentText}>Full‑Stack Developer</span>
          </h2>
          <p className={styles.subHeading}>
            Building AI systems that automate real-world workflows
          </p>
          <p className={styles.bio}>
            I'm an AI &amp; Full-Stack developer specializing in building intelligent,
            agentic systems — from LLM-powered voice bots and RAG pipelines to
            production REST APIs and real-time React dashboards.
          </p>

          <motion.button
            className={styles.downloadBtn}
            onClick={handleDownload}
            whileHover={{ scale: 1.04, y: -2, boxShadow: "0 16px 36px -8px rgba(20,184,166,0.5)" }}
            whileTap={{ scale: 0.97 }}
          >
            ⬇&nbsp;&nbsp;Download CV
          </motion.button>

          <div className={styles.socials}>
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialCircle}
                style={{ background: s.bg, color: s.color }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4, scale: 1.12 }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right — description */}
        <motion.div className={styles.rightCol} {...fadeUp(0.15)}>
          <div className={styles.glassCard}>
            <p className={styles.rightText}>
              I architect and deploy end-to-end AI solutions using LangChain,
              LangGraph, and AWS Bedrock — building fully agentic and scripted
              voice bots (Sarvam, Exotel) and WhatsApp chatbots that handle
              real business workflows autonomously.
            </p>
            <p className={styles.rightText}>
              I also build highly interactive business dashboards using React,
              helping teams track and visualize all their data in one place.
              My goal is seamless AI + product integration.
            </p>
            <div className={styles.techPills}>
              {["Python", "FastAPI", "LangChain", "LangGraph", "AWS Bedrock", "React.js", "Docker"].map((t, i) => (
                <motion.span
                  key={t}
                  className={styles.techPill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  whileHover={{ scale: 1.08 }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          </div>
          <p className={styles.signature}>Abhilash Yadav</p>
        </motion.div>
      </div>

      {/* ── Bottom row ── */}
      <div className={styles.bottomRow}>

        {/* Info table */}
        <motion.div className={styles.infoTable} {...fadeUp(0.05)}>
          <h3 className={styles.tableTitle}>Personal Info</h3>
          {INFO_ROWS.map((row, i) => (
            <motion.div
              key={i}
              className={styles.infoRow}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className={styles.infoLabel}>{row.label}</span>
              <span className={styles.infoDot} />
              <span className={styles.infoValue}>{row.value}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.1)}>
          <div className={styles.statsOuter}>
            <div className={styles.statsInner}>
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  className={styles.statCard}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.05, y: -4 }}
                >
                  <span className={styles.statPct}>
                    <Counter end={s.pct} suffix={s.suffix} />
                  </span>
                  <span className={styles.statLabel}>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

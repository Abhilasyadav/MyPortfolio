import React, { Suspense, lazy, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";
import { PROFILE } from "../../data/profile";
import {
  IconArrowRight,
  IconDownload,
  IconEye,
  IconGitHub,
  IconLinkedIn,
  IconMail,
  IconMapPin,
} from "../Icons";

const ResumeView = lazy(() => import("../ResumeView/View"));

const CORE_STACK = ["Python", "FastAPI", "Django", "React.js", "LangChain", "AWS Bedrock", "Docker"];

const SOCIALS = [
  { href: PROFILE.github, label: "GitHub", Icon: IconGitHub },
  { href: PROFILE.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: `mailto:${PROFILE.email}`, label: "Email", Icon: IconMail },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

export const Hero = () => {
  const [openResume, setOpenResume] = useState(false);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.p className={styles.badge} {...fadeUp(0)}>
            <span className={styles.pulse} />
            Open to full-time roles &amp; freelance
          </motion.p>

          <motion.p className={styles.kicker} {...fadeUp(0.08)}>
            {PROFILE.name} · {PROFILE.role}
          </motion.p>

          <motion.h1 className={styles.headline} {...fadeUp(0.15)}>
            I build <span className={styles.highlight}>intelligent, agentic</span> AI systems,
            from LLM pipelines to voice bots &amp; interactive dashboards.
          </motion.h1>

          <motion.p className={styles.lead} {...fadeUp(0.22)}>
            AI &amp; Full-Stack developer specializing in LLM agents, RAG systems, voice &amp; chat bots,
            FastAPI / Django backends, and React dashboards — built on AWS Bedrock &amp; LangGraph.
          </motion.p>

          <motion.div className={styles.ctas} {...fadeUp(0.30)}>
            <Link className="btn btn-primary" to="/projects">
              View Projects <IconArrowRight />
            </Link>
            <a className="btn btn-ghost" href={PROFILE.resume} download={PROFILE.resumeFileName}>
              <IconDownload /> Download Resume
            </a>
          </motion.div>

          <motion.div className={styles.meta} {...fadeUp(0.36)}>
            <button className={styles.textLink} onClick={() => setOpenResume(true)}>
              <IconEye /> Preview resume
            </button>
            <span className={styles.divider} aria-hidden="true" />
            <ul className={styles.socials}>
              {SOCIALS.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    title={label}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div className={styles.stack} {...fadeUp(0.42)}>
            <span className={styles.stackLabel}>Core stack</span>
            <ul className={styles.chips}>
              {CORE_STACK.map((tech, i) => (
                <motion.li
                  key={tech}
                  className={styles.chip}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.08, y: -2 }}
                >
                  {tech}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className={styles.photoFrame}>
            <img
              src={getImageUrl("hero/portrait.jpg")}
              alt={`Portrait of ${PROFILE.name}`}
              className={styles.photo}
              width="760"
              height="1351"
              fetchpriority="high"
            />
          </div>

          <motion.div
            className={`${styles.floatCard} ${styles.codeCard}`}
            aria-hidden="true"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className={styles.dots}>
              <span /> <span /> <span />
            </div>
            <pre>
              <code>
                <span className={styles.tAnno}>@RestController</span>
                {"\n"}
                <span className={styles.tKey}>class</span> Abhilash {"{"}
                {"\n  "}
                <span className={styles.tFn}>ship</span>() {"{"}
                {"\n    "}
                <span className={styles.tKey}>return</span>{" "}
                <span className={styles.tStr}>&quot;AI + React&quot;</span>;
                {"\n  }\n}"}
              </code>
            </pre>
          </motion.div>

          <motion.div
            className={`${styles.floatCard} ${styles.locationCard}`}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          >
            <IconMapPin />
            <span>
              {PROFILE.location} <em>· Remote-friendly</em>
            </span>
          </motion.div>
        </motion.div>
      </div>

      <a href="#about" className={styles.scrollCue} aria-label="Scroll to About section">
        <span />
      </a>

      {openResume &&
        createPortal(
          <Suspense fallback={null}>
            <ResumeView open={openResume} onClose={() => setOpenResume(false)} />
          </Suspense>,
          document.body
        )}
    </section>
  );
};

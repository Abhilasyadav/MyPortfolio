import { Suspense, lazy, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

import styles from "./Hero.module.css";
import { PROFILE } from "../../data/profile";
import {
  IconArrowRight,
  IconDownload,
  IconEye,
  IconGitHub,
  IconLinkedIn,
  IconMail,
} from "../Icons";

const ResumeView = lazy(() => import("../ResumeView/View"));

const SOCIALS = [
  { href: PROFILE.github, label: "GitHub", Icon: IconGitHub },
  { href: PROFILE.linkedin, label: "LinkedIn", Icon: IconLinkedIn },
  { href: `mailto:${PROFILE.email}`, label: "Email", Icon: IconMail },
];

const rise = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export const Hero = () => {
  const [openResume, setOpenResume] = useState(false);

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.p className={`eyebrow ${styles.status}`} {...rise(0)}>
            <span className={styles.dot} aria-hidden="true" />
            Available for full-time roles &amp; freelance
          </motion.p>

          <motion.h1 className={styles.headline} {...rise(0.08)}>
            I build full-stack apps and the <em>AI agents</em> that do real work inside them.
          </motion.h1>

          <motion.p className={styles.lead} {...rise(0.16)}>
            I&apos;m {PROFILE.name}. I ship React and Node.js dashboards with LLM agents behind them: a
            voice bot that books hospital follow-ups over phone calls, a WhatsApp bot for dealership
            services, and RAG search over private documents.
          </motion.p>

          <motion.div className={styles.ctas} {...rise(0.24)}>
            <Link className="btn btn-primary" to="/projects">
              View projects <IconArrowRight />
            </Link>
            <a className="btn btn-ghost" href={PROFILE.resume} download={PROFILE.resumeFileName}>
              <IconDownload /> Resume
            </a>
            <button type="button" className={styles.textLink} onClick={() => setOpenResume(true)}>
              <IconEye /> Preview
            </button>
          </motion.div>

          <motion.ul className={styles.socials} {...rise(0.32)}>
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.aside className={styles.glance} aria-label="At a glance" {...rise(0.2)}>
          <p className="eyebrow">At a glance</p>
          <dl>
            <div>
              <dt className="eyebrow">Role</dt>
              <dd>{PROFILE.role}</dd>
            </div>
            <div>
              <dt className="eyebrow">AI agents</dt>
              <dd>Voice bots, WhatsApp bots, RAG, LangGraph, LangSmith, OpenClaw</dd>
            </div>
            <div>
              <dt className="eyebrow">Full-stack</dt>
              <dd>React, Node.js, Express, Python, FastAPI, Django, MongoDB</dd>
            </div>
            <div>
              <dt className="eyebrow">Ship &amp; run</dt>
              <dd>Git, GitHub, Docker, GitLab CI/CD, AWS Lightsail, Lambda, Bedrock, OCI, Google Play Store</dd>
            </div>
            <div>
              <dt className="eyebrow">Based in</dt>
              <dd>{PROFILE.location}, open to remote</dd>
            </div>
          </dl>
        </motion.aside>
      </div>

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

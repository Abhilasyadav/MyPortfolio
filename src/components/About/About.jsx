import { Link } from "react-router-dom";
import { motion } from "motion/react";
import styles from "./About.module.css";
import { PROFILE } from "../../data/profile";
import { IconDownload } from "../Icons";

const CAPABILITIES = [
  {
    title: "AI agents",
    text: "Agents that hold a real conversation and then act: confirm, reschedule or cancel a booking by phone or WhatsApp. Built with LangGraph and OpenClaw, using OpenAI or AWS Bedrock models, and traced with LangSmith.",
    tags: ["Voice bots", "WhatsApp bots", "RAG", "LangGraph", "OpenClaw"],
  },
  {
    title: "Full-stack products",
    text: "The dashboard and API around the agent: React and TypeScript front ends, Python (FastAPI, Django) and Node.js (Express) back ends, MongoDB data, role-based login and one place for staff to see everything.",
    tags: ["React", "Node.js", "Python", "FastAPI", "Django", "MongoDB"],
  },
  {
    title: "Ship and run it",
    text: "Git and GitHub for code, Docker and GitLab CI/CD pipelines for releases, and deployments on AWS (Lightsail, Lambda, Bedrock) and Oracle Cloud, with Nginx, HTTPS and CloudWatch logs. Android apps go live on the Google Play Store.",
    tags: ["Git", "GitHub", "Docker", "GitLab CI/CD", "AWS", "OCI", "Google Play Store"],
  },
];

const INFO_ROWS = [
  { label: "Experience", value: "1.5+ years" },
  { label: "Education", value: "B.Tech, Computer Science" },
  { label: "Location", value: PROFILE.location },
  { label: "Email", value: PROFILE.email, href: `mailto:${PROFILE.email}` },
  { label: "Availability", value: "Open to full-time and freelance work" },
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
});

export const About = () => (
  <section id="about" className={styles.section}>
    <div className={styles.inner}>
      <motion.header className={styles.head} {...reveal(0)}>
        <p className="eyebrow">01 / About</p>
        <h2 className={styles.heading}>
          Full-stack developer who builds <em>AI agents</em>.
        </h2>
      </motion.header>

      <motion.div className={styles.body} {...reveal(0.08)}>
        <p className={styles.lede}>
          I build the whole product, not just the model: the AI agent, the API behind it and the
          dashboard your team uses every day.
        </p>
        <p>
          My recent work includes CareDesk, where a voice bot phones patients in their own
          language to confirm hospital follow-ups, and DealerDesk, where a WhatsApp bot books
          two-wheeler services while a React dashboard tracks bookings, sales and revenue. I also
          built a semantic search that answers questions from private documents with RAG.
        </p>
        <p>
          I care about agents that are reliable in production: fixed scripts where wording
          matters, models only where judgement is needed, every action going through the same
          business rules as the dashboard, and traces to see what happened on any call or chat.
        </p>

        <div className={styles.links}>
          <Link className="btn btn-primary" to="/projects">
            See projects
          </Link>
          <a className="btn btn-ghost" href={PROFILE.resume} download={PROFILE.resumeFileName}>
            <IconDownload /> Download CV
          </a>
        </div>
      </motion.div>

      <ul className={styles.caps}>
        {CAPABILITIES.map((c, i) => (
          <motion.li key={c.title} className={styles.cap} {...reveal(0.05 * i)}>
            <p className="eyebrow">{String(i + 1).padStart(2, "0")}</p>
            <h3 className={styles.capTitle}>{c.title}</h3>
            <p className={styles.capText}>{c.text}</p>
            <p className={styles.capTags}>{c.tags.join(" / ")}</p>
          </motion.li>
        ))}
      </ul>

      <motion.dl className={styles.info} {...reveal(0.12)}>
        {INFO_ROWS.map((row) => (
          <div key={row.label} className={styles.row}>
            <dt className="eyebrow">{row.label}</dt>
            <dd>{row.href ? <a href={row.href}>{row.value}</a> : row.value}</dd>
          </div>
        ))}
      </motion.dl>
    </div>
  </section>
);

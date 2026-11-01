import { Link } from "react-router-dom";
import { motion } from "motion/react";
import styles from "./AI.module.css";
import { Page, Intro, Heading, Principles, Layers, Playbooks } from "../Playbooks/Playbooks";
import { PRINCIPLES, LAYERS, GROUPS, TOPICS, SHIPPED } from "../../data/ai";

export const AI = () => (
  <Page>
    <Intro>
      Everything I know about building LLM products and AI agents that work outside a demo: the
      rules I follow, the stack I use, and short playbooks with code.
    </Intro>

    <Heading>How I build agents</Heading>
    <Principles items={PRINCIPLES} />

    <Heading>The stack</Heading>
    <Layers items={LAYERS} />

    <Heading>Agents I have shipped</Heading>
    <div className={styles.shipped}>
      {SHIPPED.map((s, i) => (
        <motion.article
          key={s.title}
          className={styles.card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
        >
          <h3 className={styles.cardTitle}>{s.title}</h3>
          <p className={styles.cardText}>{s.text}</p>
          <p className={styles.tech}>{s.tech}</p>
        </motion.article>
      ))}
    </div>
    <p className={styles.more}>
      <Link to="/projects">See the projects</Link> or read the{" "}
      <Link to="/process">step-by-step build guides</Link>.
    </p>

    <Heading>Playbooks</Heading>
    <Playbooks groups={GROUPS} topics={TOPICS} />
  </Page>
);

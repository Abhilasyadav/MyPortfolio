import { useState } from "react";
import { motion } from "motion/react";
import styles from "./Playbooks.module.css";
import { CodeBlock } from "../CodeBlock/CodeBlock";

// Building blocks shared by the AI Agents and Full-Stack pages.

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

export const Page = ({ children }) => (
  <section className={styles.section}>
    <div className={styles.inner}>{children}</div>
  </section>
);

export const Intro = ({ children }) => <p className={styles.intro}>{children}</p>;

export const Heading = ({ children }) => <h2 className={styles.heading}>{children}</h2>;

export const Principles = ({ items }) => (
  <ol className={styles.principles}>
    {items.map((p, i) => (
      <motion.li key={p.title} className={styles.principle} {...reveal(Math.min(i, 3) * 0.05)}>
        <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
        <h3 className={styles.cardTitle}>{p.title}</h3>
        <p className={styles.cardText}>{p.text}</p>
      </motion.li>
    ))}
  </ol>
);

export const Layers = ({ items }) => (
  <dl className={styles.layers}>
    {items.map((layer) => (
      <div key={layer.name} className={styles.layer}>
        <dt className="eyebrow">{layer.name}</dt>
        <dd>{layer.items.join(" / ")}</dd>
      </div>
    ))}
  </dl>
);

// Filter chips plus a list of topic cards, each with an explanation and code samples.
export const Playbooks = ({ groups, topics }) => {
  const [group, setGroup] = useState("All");
  const visible = group === "All" ? topics : topics.filter((t) => t.group === group);

  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filter playbooks">
        {groups.map((g) => (
          <button
            key={g}
            type="button"
            className={`${styles.chip} ${group === g ? styles.chipActive : ""}`}
            aria-pressed={group === g}
            onClick={() => setGroup(g)}
          >
            {g}
          </button>
        ))}
      </div>

      <div className={styles.topics}>
        {visible.map((topic) => (
          <article key={topic.id} id={topic.id} className={styles.topic}>
            <header className={styles.topicHead}>
              <h3 className={styles.topicTitle}>{topic.title}</h3>
              <span className={styles.tag}>{topic.group}</span>
            </header>
            <p className={styles.cardText}>{topic.what}</p>
            <h4 className={styles.small}>Why it matters</h4>
            <ul className={styles.why}>
              {topic.why.map((w) => (
                <li key={w}>{w}</li>
              ))}
            </ul>
            {topic.blocks.map((b) => (
              <CodeBlock key={b.title} title={b.title} code={b.code} />
            ))}
          </article>
        ))}
      </div>
    </>
  );
};

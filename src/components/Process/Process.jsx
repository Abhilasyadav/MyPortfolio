import { useState } from "react";
import { motion } from "motion/react";
import styles from "./Process.module.css";
import { STEPS, GROUPS, TOPICS, DEPLOYMENTS } from "../../data/process";
import { GUIDES } from "../../data/guides";
import { CodeBlock } from "../CodeBlock/CodeBlock";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay },
});

function Guide({ guide }) {
  return (
    <div className={styles.guide}>
      <p className={styles.topicWhat}>{guide.summary}</p>
      <ul className={styles.tags}>
        {guide.stack.map((t) => (
          <li key={t} className={styles.tag}>{t}</li>
        ))}
      </ul>

      <ol className={styles.flow} aria-label="How the pieces connect">
        {guide.flow.map((node) => (
          <li key={node} className={styles.flowNode}>{node}</li>
        ))}
      </ol>

      <ol className={styles.guideSteps}>
        {guide.steps.map((step, i) => (
          <li key={step.title} className={styles.guideStep}>
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <div className={styles.guideBody}>
              <h4 className={styles.stepTitle}>{step.title}</h4>
              <ul className={styles.tags}>
                {step.tech.map((t) => (
                  <li key={t} className={styles.tag}>{t}</li>
                ))}
              </ul>
              <p className={styles.stepText}>{step.text}</p>
              {step.code && <CodeBlock title="Example" code={step.code} />}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export const Process = () => {
  const [group, setGroup] = useState("All");
  const [guideId, setGuideId] = useState(GUIDES[0].id);
  const guide = GUIDES.find((g) => g.id === guideId);
  const topics = group === "All" ? TOPICS : TOPICS.filter((t) => t.group === group);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>How I build every project</h2>
        <ol className={styles.steps}>
          {STEPS.map((step, i) => (
            <motion.li key={step.title} className={styles.step} {...reveal(Math.min(i, 3) * 0.06)}>
              <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepText}>{step.text}</p>
                <ul className={styles.tags}>
                  {step.tags.map((t) => (
                    <li key={t} className={styles.tag}>{t}</li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>

        <h2 className={styles.heading}>Project build guides</h2>
        <p className={styles.lead}>
          The full step-by-step process, with the technology used at every step.
        </p>
        <div className={styles.filters} role="tablist" aria-label="Project guides">
          {GUIDES.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={guideId === g.id}
              className={`${styles.chip} ${guideId === g.id ? styles.chipActive : ""}`}
              onClick={() => setGuideId(g.id)}
            >
              {g.title}
            </button>
          ))}
        </div>
        <Guide key={guide.id} guide={guide} />

        <h2 className={styles.heading}>Tools &amp; how I use them</h2>
        <p className={styles.lead}>
          What each tool is, why I use it, and the commands I run, with a comment on every line.
        </p>

        <div className={styles.filters} role="group" aria-label="Filter tools">
          {GROUPS.map((g) => (
            <button
              key={g}
              type="button"
              className={`${styles.chip} ${group === g ? styles.chipActive : ""}`}
              onClick={() => setGroup(g)}
            >
              {g}
            </button>
          ))}
        </div>

        <div className={styles.topics}>
          {topics.map((topic) => (
            <article key={topic.id} id={topic.id} className={styles.topic}>
              <header className={styles.topicHead}>
                <h3 className={styles.topicTitle}>{topic.title}</h3>
                <span className={styles.tag}>{topic.group}</span>
              </header>
              <p className={styles.topicWhat}>{topic.what}</p>
              <h4 className={styles.small}>Why I use it</h4>
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

        <h2 className={styles.heading}>How each project is deployed</h2>
        <div className={styles.deploys}>
          {DEPLOYMENTS.map((d, i) => (
            <motion.article key={d.project} className={styles.deploy} {...reveal(i * 0.08)}>
              <h3 className={styles.stepTitle}>{d.project}</h3>
              <p className={styles.deployStack}>{d.stack}</p>
              <ol className={styles.deploySteps}>
                {d.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

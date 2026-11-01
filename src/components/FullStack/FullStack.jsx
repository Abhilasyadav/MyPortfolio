import { Link } from "react-router-dom";
import styles from "./FullStack.module.css";
import { Page, Intro, Heading, Principles, Layers, Playbooks } from "../Playbooks/Playbooks";
import { PRINCIPLES, LAYERS, GROUPS, TOPICS } from "../../data/fullstack";

export const FullStack = () => (
  <Page>
    <Intro>
      The back-end and data side of my full-stack work: Python and Node.js frameworks, APIs and
      real-time, authentication and authorisation, databases, and the architecture that holds it
      together.
    </Intro>

    <Heading>How I build back ends</Heading>
    <Principles items={PRINCIPLES} />

    <Heading>The stack</Heading>
    <Layers items={LAYERS} />
    <p className={styles.more}>
      See these in real products on the <Link to="/projects">projects page</Link>, or read the{" "}
      <Link to="/process">step-by-step build guides</Link>.
    </p>

    <Heading>Playbooks</Heading>
    <Playbooks groups={GROUPS} topics={TOPICS} />
  </Page>
);

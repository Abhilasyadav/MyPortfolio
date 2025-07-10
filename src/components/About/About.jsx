import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>About</h2>
      <p
        style={{
          color: "#bfc9e0",
          fontSize: "1.15rem",
          marginBottom: "32px",
          maxWidth: "600px",
        }}
      >
        I’m a dedicated developer with a passion for building robust, user-friendly
        web applications. My expertise spans both frontend and backend, allowing
        me to deliver seamless digital experiences.
      </p>
      <div className={styles.content}>
        <img
          src={getImageUrl("about/laptopImg.png")}
          alt="Me sitting with a laptop"
          className={styles.aboutImage}
        />
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/cursorIcon.png")} alt="Cursor icon" />
            <div className={styles.aboutItemText}>
              <h3>Frontend Developer</h3>
              <p>
                I specialize in crafting modern, responsive, and accessible user
                interfaces using React and the latest web technologies. My focus
                is on delivering pixel-perfect, high-performance experiences.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/serverIcon.png")} alt="Server icon" />
            <div className={styles.aboutItemText}>
              <h3>Backend Developer</h3>
              <p>
                I build scalable and efficient backend systems and RESTful APIs,
                primarily with Java and Node.js, ensuring robust data management
                and seamless integration with frontend applications.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <img src={getImageUrl("about/rocketIcon.png")} alt="Rocket icon" />
            <div className={styles.aboutItemText}>
              <h3>Continuous Learner</h3>
              <p>
                I am committed to continuous learning and staying updated with the
                latest trends in technology, always striving to improve my skills
                and deliver innovative solutions.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

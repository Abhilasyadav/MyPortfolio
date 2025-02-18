import React from "react";

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.text}>
        <h2>Contact</h2>
        <p>Feel free to reach out me!</p>
        <br/>
        <a>+91 7347845062</a>
      </div>
      <ul className={styles.links}>
        <li className={styles.link}>
          <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
          <a href="mailto:yadavabhilash2003@gmail.com">yadavabhilash2003@gmail.com</a>
        </li>
        <li className={styles.link}>
          <img
            src={getImageUrl("contact/linkedinIcon.png")}
            alt="LinkedIn icon"
          />
          <a href="https://www.linkedin.com/in/abhilash-yadav-572489251/">Abhilash Yadav</a>
        </li>
        <li className={styles.link}>
          <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
          <a href="https://www.github.com/abhilasyadav">Abhilash Yadav</a>
        </li>
        {/* <li className={styles.link}>
          <img src={getImageUrl("contact/phone.png")} alt="call icon" />
          <a href="https://whatsapp.com">+917347845062</a>
        </li> */}
      </ul>
    </footer>
  );
};

<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3

import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
<<<<<<< HEAD
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    const form = e.target;
    const data = new FormData(form);

    // Replace the URL below with your Formspree endpoint after signing up at formspree.io
    const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.left}>
        <div className={styles.text}>
          <h2>Contact</h2>
          <p>Feel free to reach out!</p>
        </div>
        <ul className={styles.links}>
          <li className={styles.link}>
            <img src={getImageUrl("contact/emailIcon.png")} alt="Email icon" />
            <a href="mailto:yadavabhilash2003@gmail.com">yadavabhilash2003@gmail.com</a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn icon" />
            <a href="https://www.linkedin.com/in/abhilash-yadav-572489251/" target="_blank" rel="noopener noreferrer">
              LinkedIn — Abhilash Yadav
            </a>
          </li>
          <li className={styles.link}>
            <img src={getImageUrl("contact/githubIcon.png")} alt="Github icon" />
            <a href="https://www.github.com/abhilasyadav" target="_blank" rel="noopener noreferrer">
              GitHub — Abhilash Yadav
            </a>
          </li>
        </ul>
        <p className={styles.location}>📍 India &nbsp;·&nbsp; Open to remote opportunities</p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <h3 className={styles.formTitle}>Send a Message</h3>
        <input
          className={styles.input}
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />
        <input
          className={styles.input}
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />
        <textarea
          className={styles.textarea}
          name="message"
          placeholder="Your Message"
          rows={5}
          required
        />
        <button className={styles.submitBtn} type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send Message"}
        </button>
        {status === "sent" && (
          <p className={styles.successMsg}>Message sent! I'll get back to you soon.</p>
        )}
        {status === "error" && (
          <p className={styles.errorMsg}>Something went wrong. Please try again.</p>
        )}
      </form>

      <p className={styles.copyright}>© 2026 Abhilash Yadav. All rights reserved.</p>
=======
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
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3
    </footer>
  );
};

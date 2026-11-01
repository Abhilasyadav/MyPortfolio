
import styles from "./Contact.module.css";
import { PROFILE } from "../../data/profile";
import { IconGitHub, IconLinkedIn, IconMail, IconMapPin } from "../Icons";

export const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;
    const subject = `Portfolio Contact from ${name}`;
    const body = `From: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    form.reset();
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
            <IconMail size={20} />
            <a href={`mailto:${PROFILE.email}`}>{PROFILE.email}</a>
          </li>
          <li className={styles.link}>
            <IconLinkedIn size={20} />
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn &mdash; Abhilash Yadav
            </a>
          </li>
          <li className={styles.link}>
            <IconGitHub size={20} />
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer">
              GitHub &mdash; Abhilash Yadav
            </a>
          </li>
        </ul>
        <p className={styles.location}><IconMapPin size={16} /> India &nbsp;&middot;&nbsp; Open to remote opportunities</p>
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
        <button className={styles.submitBtn} type="submit">
          Send Message
        </button>
      </form>

      <p className={styles.copyright}>&copy; 2026 Abhilash Yadav. All rights reserved.</p>
    </footer>
  );
};

import React from "react";
import styles from "./View.module.css";

export default function View({ open, onClose }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Close Resume Popup"
        >
          &times;
        </button>
        <h2 className={styles.title}>My Resume</h2>
        <div className={styles.resumeContainer}>
          <iframe
            src="/resume.pdf"
            title="Resume"
            className={styles.resumeFrame}
            frameBorder="0"
          />
        </div>
      </div>
    </div>
  );
}

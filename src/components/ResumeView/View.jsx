import { useEffect } from "react";
import styles from "./View.module.css";
import { PROFILE } from "../../data/profile";
import { IconClose, IconDownload } from "../Icons";

// Uses the browser's own PDF viewer: no library, no CDN worker, nothing to break.
export default function View({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Resume preview">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h2 className={styles.title}>Resume</h2>
          <div className={styles.actions}>
            <a className="btn btn-ghost btn-sm" href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
              Open in new tab
            </a>
            <a className="btn btn-primary btn-sm" href={PROFILE.resume} download={PROFILE.resumeFileName}>
              <IconDownload size={16} /> Download
            </a>
            <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close preview">
              <IconClose />
            </button>
          </div>
        </header>

        <object className={styles.frame} data={`${PROFILE.resume}#view=FitH`} type="application/pdf">
          <p className={styles.fallback}>
            Your browser can&apos;t show the PDF here.{" "}
            <a href={PROFILE.resume} target="_blank" rel="noopener noreferrer">
              Open the resume in a new tab
            </a>{" "}
            or{" "}
            <a href={PROFILE.resume} download={PROFILE.resumeFileName}>
              download it
            </a>
            .
          </p>
        </object>
      </div>
    </div>
  );
}

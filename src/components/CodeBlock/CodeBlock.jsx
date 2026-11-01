import { useState } from "react";
import styles from "./CodeBlock.module.css";

// A titled code sample with a Copy button, shared by the Process and AI pages.
export function CodeBlock({ title, code }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <figure className={styles.block}>
      <figcaption className={styles.blockHead}>
        <span>{title}</span>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </figcaption>
      <pre className={styles.code} tabIndex={0}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}

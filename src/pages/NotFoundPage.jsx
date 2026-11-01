import { useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

// A spotlight follows the pointer and reveals the lit "404" underneath.
const NotFoundPage = () => {
  const sceneRef = useRef(null);

  const onPointerMove = (e) => {
    const scene = sceneRef.current;
    if (!scene) return;
    const rect = scene.getBoundingClientRect();
    scene.style.setProperty("--x", `${e.clientX - rect.left}px`);
    scene.style.setProperty("--y", `${e.clientY - rect.top}px`);
    scene.dataset.active = "true";
  };

  const onPointerLeave = () => {
    if (sceneRef.current) sceneRef.current.dataset.active = "false";
  };

  return (
    <section className={styles.page}>
      <div
        ref={sceneRef}
        className={styles.scene}
        data-active="false"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <p className={styles.glyph} aria-hidden="true">404</p>
        <p className={`${styles.glyph} ${styles.lit}`} aria-hidden="true">404</p>
        <span className={styles.lens} aria-hidden="true" />
      </div>

      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.sub}>
        Nothing lives at this address. Move your cursor over the numbers to look closer.
      </p>
      <Link className="btn btn-primary" to="/">
        Back to Home
      </Link>
    </section>
  );
};

export default NotFoundPage;

<<<<<<< HEAD
import React, { useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import styles from "./View.module.css";

export default function View({ open, onClose }) {
  const pageNav = pageNavigationPlugin();
  const zoom = zoomPlugin();

  const { CurrentPageInput, NumberOfPages, GoToPreviousPage, GoToNextPage } = pageNav;
  const { ZoomIn, ZoomOut, CurrentScale } = zoom;

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Abhilash_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

        {/* Single unified teal header */}
        <div className={styles.header}>
          {/* Left: branding */}
          <div className={styles.headerLeft}>
            <span className={styles.dot} />
            <h2 className={styles.title}>My Resume</h2>
          </div>

          {/* Center: page nav + zoom */}
          <div className={styles.headerCenter}>
            <GoToPreviousPage>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Previous page">‹</button>
              )}
            </GoToPreviousPage>
            <span className={styles.pageInfo}>
              <CurrentPageInput /> <span className={styles.pageSep}>/</span> <NumberOfPages />
            </span>
            <GoToNextPage>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Next page">›</button>
              )}
            </GoToNextPage>
            <div className={styles.divider} />
            <ZoomOut>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Zoom out">−</button>
              )}
            </ZoomOut>
            <span className={styles.zoomLabel}>
              <CurrentScale>{({ scale }) => `${Math.round(scale * 100)}%`}</CurrentScale>
            </span>
            <ZoomIn>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Zoom in">+</button>
              )}
            </ZoomIn>
          </div>

          {/* Right: actions */}
          <div className={styles.headerRight}>
            <button className={styles.downloadBtn} onClick={handleDownload}>
              ⬇&nbsp; Download
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
          </div>
        </div>

        {/* PDF body — no toolbar */}
        <div className={styles.body}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl="/resume.pdf"
              plugins={[pageNav, zoom]}
            />
          </Worker>
        </div>

=======
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
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3
      </div>
    </div>
  );
}

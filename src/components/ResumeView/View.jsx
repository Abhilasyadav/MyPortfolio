import React, { useEffect } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { pageNavigationPlugin } from "@react-pdf-viewer/page-navigation";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/core/lib/styles/index.css";
import styles from "./View.module.css";

const IconPrev = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const IconNext = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconZoomOut = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const IconZoomIn = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

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

        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.dot} />
            <h2 className={styles.title}>My Resume</h2>
          </div>

          <div className={styles.headerCenter}>
            <GoToPreviousPage>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Previous page">
                  <IconPrev />
                </button>
              )}
            </GoToPreviousPage>
            <span className={styles.pageInfo}>
              <CurrentPageInput /> <span className={styles.pageSep}>/</span> <NumberOfPages />
            </span>
            <GoToNextPage>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Next page">
                  <IconNext />
                </button>
              )}
            </GoToNextPage>
            <div className={styles.divider} />
            <ZoomOut>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Zoom out">
                  <IconZoomOut />
                </button>
              )}
            </ZoomOut>
            <span className={styles.zoomLabel}>
              <CurrentScale>{({ scale }) => `${Math.round(scale * 100)}%`}</CurrentScale>
            </span>
            <ZoomIn>
              {({ onClick }) => (
                <button className={styles.navBtn} onClick={onClick} title="Zoom in">
                  <IconZoomIn />
                </button>
              )}
            </ZoomIn>
          </div>

          <div className={styles.headerRight}>
            <button className={styles.downloadBtn} onClick={handleDownload}>
              &#11015;&nbsp;Download
            </button>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <IconClose />
            </button>
          </div>
        </div>

        <div className={styles.body}>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer
              fileUrl="/resume.pdf"
              plugins={[pageNav, zoom]}
            />
          </Worker>
        </div>

      </div>
    </div>
  );
}

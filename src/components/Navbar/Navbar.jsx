import React, { useState, useEffect } from "react";

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

const SECTIONS = ["about", "skills", "projects", "contact"];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observers = SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Abhilash_Yadav_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className={styles.navbar}>
      <a className={styles.logo} href="/">
        <span className={styles.logoIcon}>A</span>
        <span className={styles.title}>Portfolio</span>
      </a>
      <div className={styles.menu}>
        <img
          className={styles.menuBtn}
          src={
            menuOpen
              ? getImageUrl("nav/closeIcon.png")
              : getImageUrl("nav/menuIcon.png")
          }
          alt="menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
        />
        <ul
          className={`${styles.menuItems} ${menuOpen ? styles.menuOpen : ""}`}
          onClick={() => setMenuOpen(false)}
        >
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? styles.activeLink : ""}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            </li>
          ))}
        </ul>
        <button className={styles.cvBtn} onClick={handleDownload}>
          ⬇ Download CV
        </button>
      </div>
    </nav>
  );
};

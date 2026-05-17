<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3

import styles from "./Navbar.module.css";
import { getImageUrl } from "../../utils";

<<<<<<< HEAD
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
=======
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <a className={styles.title} href="/">
        Portfolio
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3
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
<<<<<<< HEAD
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
=======
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
>>>>>>> 92bf37afb5efcafa2f1782d1754b4a6a377eadd3
      </div>
    </nav>
  );
};

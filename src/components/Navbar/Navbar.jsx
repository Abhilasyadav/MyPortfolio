import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import styles from "./Navbar.module.css";
import { PROFILE } from "../../data/profile";
import { useTheme } from "../../hooks/useTheme";
import { IconClose, IconDownload, IconMenu, IconMoon, IconSun } from "../Icons";

const LINKS = [
  { to: "/", label: "Home" },
  { to: { pathname: "/", hash: "#about" }, label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/full-stack", label: "Full-Stack" },
  { to: "/ai", label: "AI Agents" },
  { to: "/process", label: "Process" },
  { to: { pathname: "/", hash: "#contact" }, label: "Contact" },
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, toggleTheme] = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth > 860 && setMenuOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const isLight = theme === "light";

  const linkClass = (active) =>
    active ? `${styles.navLink} ${styles.active}` : styles.navLink;

  const isActive = (to) => {
    if (typeof to === "string") {
      return location.pathname === to && (to !== "/" || !location.hash);
    }
    return location.pathname === to.pathname && location.hash === to.hash;
  };

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ""}`}>
      <nav className={styles.nav} aria-label="Main">
        <NavLink className={styles.logo} to="/" onClick={() => setMenuOpen(false)}>
          <span className={styles.logoMark}>AY</span>
          <span className={styles.logoText}>{PROFILE.name}</span>
        </NavLink>

        <ul id="nav-menu" className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {LINKS.map(({ to, label }) => (
            <li key={label}>
              <Link
                to={to}
                className={linkClass(isActive(to))}
                aria-current={isActive(to) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className={styles.mobileCta}>
            <a
              className="btn btn-primary"
              href={PROFILE.resume}
              download={PROFILE.resumeFileName}
            >
              <IconDownload /> Download Resume
            </a>
          </li>
        </ul>

        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={isLight ? "Switch to dark theme" : "Switch to light theme"}
            title={isLight ? "Dark mode" : "Light mode"}
          >
            {isLight ? <IconMoon /> : <IconSun />}
          </button>
          <a
            className={`btn btn-ghost btn-sm ${styles.resumeBtn}`}
            href={PROFILE.resume}
            download={PROFILE.resumeFileName}
          >
            Resume <IconDownload size={16} />
          </a>
          <button
            className={`${styles.iconBtn} ${styles.menuBtn}`}
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="nav-menu"
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>
    </header>
  );
};

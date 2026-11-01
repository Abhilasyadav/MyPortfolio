import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { MotionConfig } from "motion/react";

import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ProcessPage = lazy(() => import("./pages/ProcessPage"));
const FullStackPage = lazy(() => import("./pages/FullStackPage"));
const AIPage = lazy(() => import("./pages/AIPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Scroll to the hash target if there is one, otherwise to the top.
function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has mounted after a route change.
      const id = requestAnimationFrame(() =>
        document.getElementById(hash.slice(1))?.scrollIntoView()
      );
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
    <BrowserRouter>
      <div className={styles.App}>
        <Navbar />
        <ScrollReset />
        <main>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/full-stack" element={<FullStackPage />} />
              <Route path="/ai" element={<AIPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </BrowserRouter>
    </MotionConfig>
  );
}

export default App;

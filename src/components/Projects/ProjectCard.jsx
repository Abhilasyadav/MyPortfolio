import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, images, description, skills, deploy, demo, source },
  index,
}) => {
  const techs = skills[0]?.split(",").map((s) => s.trim()) || [];
  const shots = images?.length ? images : [imageSrc];

  return (
    <article className={styles.container}>
      <div className={`${styles.imageWrapper} ${shots.length > 1 ? styles.multi : ""}`}>
        {shots.map((src, i) => (
          <img
            key={src}
            src={getImageUrl(src)}
            alt={`Screenshot ${i + 1} of ${title}`}
            className={styles.image}
            loading="lazy"
            decoding="async"
            width="1000"
            height="450"
          />
        ))}
      </div>

      <div className={styles.body}>
        <p className="eyebrow">{String(index).padStart(2, "0")}</p>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <p className={styles.skills}>{techs.join(" / ")}</p>
        {deploy && <p className={styles.deploy}>Deploy: {deploy.split(",").map((t) => t.trim()).join(" / ")}</p>}
        {(demo || source) && (
          <div className={styles.links}>
            {demo && (
              <a href={demo} className={styles.link} target="_blank" rel="noopener noreferrer">
                Live demo ↗
              </a>
            )}
            {source && (
              <a href={source} className={styles.link} target="_blank" rel="noopener noreferrer">
                Source ↗
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
};

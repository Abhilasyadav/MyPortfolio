import React from "react";
import { PageHero } from "../components/PageHero/PageHero";
import { Projects } from "../components/Projects/Projects";

const ProjectsPage = () => (
    <>
        <PageHero
            breadcrumb="Projects"
            title="My"
            highlight="Projects"
            subtitle="A collection of things I've built — from full-stack web apps to REST APIs and open-source tools."
        />
        <Projects />
    </>
);

export default ProjectsPage;

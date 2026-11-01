import { PageHero } from "../components/PageHero/PageHero";
import { Skills } from "../components/Skills/Skills";

const SkillsPage = () => (
    <>
        <PageHero
            breadcrumb="Skills"
            title="Skills &"
            highlight="Expertise"
            subtitle="Technologies and tools I work with every day to build fast, scalable, and reliable applications."
        />
        <Skills />
    </>
);

export default SkillsPage;

import { PageHero } from "../components/PageHero/PageHero";
import { Process } from "../components/Process/Process";

const ProcessPage = () => (
    <>
        <PageHero
            breadcrumb="Process"
            title="How I"
            highlight="Build"
            subtitle="From idea to production: how I plan, build, test and ship every project, including my CI/CD pipeline."
        />
        <Process />
    </>
);

export default ProcessPage;

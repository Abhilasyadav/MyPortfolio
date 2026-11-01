import { PageHero } from "../components/PageHero/PageHero";
import { AI } from "../components/AI/AI";

const AIPage = () => (
    <>
        <PageHero
            breadcrumb="AI & Agents"
            title="LLMs &"
            highlight="AI Agents"
            subtitle="How I design, build and run LLM applications: voice bots, WhatsApp bots, RAG and agent workflows that hold up in production."
        />
        <AI />
    </>
);

export default AIPage;

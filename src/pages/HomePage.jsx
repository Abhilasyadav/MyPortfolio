import { Hero } from "../components/Hero/Hero";
import { About } from "../components/About/About";
import { Contact } from "../components/Contact/Contact";

const HomePage = () => (
    <>
        <Hero />
        <div className="defer"><About /></div>
        <div className="defer"><Contact /></div>
    </>
);

export default HomePage;

import { PageHero } from "../components/PageHero/PageHero";
import { FullStack } from "../components/FullStack/FullStack";

const FullStackPage = () => (
  <>
    <PageHero
      breadcrumb="Full-Stack"
      title="Full-Stack"
      highlight="Development"
      subtitle="Django, FastAPI and Node.js back ends, REST, WebSockets and webhooks, JWT and OAuth 2.0, SQL and NoSQL databases, and the architecture behind them."
    />
    <FullStack />
  </>
);

export default FullStackPage;

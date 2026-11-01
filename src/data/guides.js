// Step-by-step build guides shown on the Process page.
// Edit the text here. Code samples are short, illustrative excerpts, not the full source.

export const GUIDES = [
  {
    id: "caredesk",
    title: "CareDesk: Dashboard & Voice Bot",
    summary:
      "One project, two parts: a multi-tenant React dashboard where hospital staff manage follow-ups, and an AI voice bot that phones patients in their own language to confirm, reschedule or cancel.",
    stack: [
      "React", "TypeScript", "Node.js", "Express", "MongoDB",
      "Exotel", "Sarvam AI (STT, TTS, Translation)", "WebSocket", "LangGraph", "LangSmith", "OpenAI",
      "Git", "GitLab CI/CD", "Docker", "AWS Lightsail",
    ],
    flow: ["React dashboard", "Express API", "MongoDB", "Exotel call", "WebSocket audio", "Sarvam STT", "LangGraph agent (OpenAI)", "Sarvam TTS"],
    steps: [
      {
        title: "Define roles and tenants first",
        tech: ["Architecture", "RBAC"],
        text: "A hospital is a tenant. Five roles (Super Admin, Hospital Admin, Branch Admin, Staff, Doctor) decide who can see what. I wrote this down before any code so every later feature inherits it.",
      },
      {
        title: "Build the API in layers",
        tech: ["Node.js", "Express", "TypeScript", "MongoDB", "zod"],
        text: "Request flow is routes, controllers, services, repositories. zod validates every input and every response uses one success/error shape with a request id. Mongoose models hold the data.",
      },
      {
        title: "Secure login and tenant isolation",
        tech: ["JWT", "httpOnly cookies", "AsyncLocalStorage"],
        text: "Short-lived access token plus a rotating refresh cookie. The hospital id is stored per request, and every query is scoped to it, so one hospital can never read another's data. All changes are audit logged.",
        code: `// every repository call reads the hospital from the request context
const { hospitalId } = tenantContext.getStore();
return Patient.find({ hospitalId, archivedAt: null });`,
      },
      {
        title: "Schedules, slots and follow-ups",
        tech: ["MongoDB transactions", "Luxon"],
        text: "Doctor schedules, leave and holidays produce free slots on the fly. A follow-up proposes the nearest free slot, and booking runs in one transaction with a live re-check, so two patients can never take the same slot.",
      },
      {
        title: "Build the dashboard UI",
        tech: ["React", "TypeScript", "MUI", "TanStack Query"],
        text: "One folder per feature: appointments, patients, messages, follow-ups, doctors, schedules, staff, audit logs. KPI cards and charts show follow-ups, confirmations, no-shows and cancellations, filtered by branch, doctor, specialty and date.",
      },
      {
        title: "Design the call script",
        tech: ["Script", "State machine"],
        text: "The spoken text is fixed, with real values filled in. The model only decides the patient's intent (confirm, another time, cancel), so the bot never makes up what is said or booked.",
      },
      {
        title: "Dial with Exotel, stream audio over WebSocket",
        tech: ["Exotel", "WebSocket (ws)"],
        text: "When a follow-up with channel Call is saved, the API asks Exotel to dial the patient inside their contact window. When they answer, Exotel opens a WebSocket to my server and streams the call audio.",
        code: `import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ server, path: "/ws/audio" });

wss.on("connection", (socket, req) => {
  const token = new URL(req.url, "http://x").searchParams.get("token");
  if (token !== process.env.VOICE_WS_TOKEN) return socket.close(); // only Exotel may connect

  socket.on("message", (frame) => handleAudio(socket, frame)); // audio in
});`,
      },
      {
        title: "Speech to text, translation and text to speech",
        tech: ["Sarvam AI"],
        text: "Sarvam transcribes what the patient says (STT), translates between their language and English when needed, and speaks the bot's reply back (TTS), so one bot works in many Indian languages.",
      },
      {
        title: "Run the conversation as a graph",
        tech: ["LangGraph", "OpenAI"],
        text: "A LangGraph agent holds the call state: greeting, offer, confirm, reschedule, cancel, and retry. An OpenAI model classifies each reply into an intent, and obvious words like 'yes' skip the model entirely.",
        code: `// the model returns ONLY an intent, never free text
type Intent = "confirm" | "reschedule" | "cancel" | "decline" | "repeat" | "choose" | "unclear";

const intent = quickKeywords(text) ?? (await classifyWithLLM(text));`,
      },
      {
        title: "Book through the same service as the dashboard",
        tech: ["AppointmentService"],
        text: "Confirm, reschedule and cancel call the same booking service the dashboard uses, so rules, audit logs and slot checks are identical on every channel.",
      },
      {
        title: "Trace and debug every call",
        tech: ["LangSmith", "Call logs"],
        text: "LangSmith traces each agent run so I can see what the patient said, the intent chosen and why. Call logs on the dashboard show the outcome of every attempt, with retries for unanswered calls.",
      },
      {
        title: "Containerize and ship with CI/CD",
        tech: ["Docker", "GitLab CI/CD", "AWS Lightsail"],
        text: "Docker Compose runs the API, web app and MongoDB. A GitLab pipeline lints, tests, builds the images and deploys to an AWS Lightsail server on every merge to main.",
        code: `# build and start the whole stack on the Lightsail server
docker compose up -d --build

# first run only: create the platform super admin
docker compose run --rm backend node dist/scripts/bootstrapSuperAdmin.js`,
      },
    ],
  },
  {
    id: "dealerdesk",
    title: "DealerDesk: Dashboard & WhatsApp Bot",
    summary:
      "A service and sales desk for two-wheeler dealerships: a React dashboard for bookings, services due, sales, inventory and revenue, plus a WhatsApp bot that greets customers and books services.",
    stack: [
      "React", "JavaScript", "Node.js", "Express", "MongoDB",
      "Webhooks", "Meta WhatsApp Cloud API",
      "Git", "GitLab CI/CD", "Docker", "OCI",
    ],
    flow: ["Customer on WhatsApp", "Meta Cloud API", "Signed webhook", "Express + MongoDB", "Reply with buttons", "React dashboard"],
    steps: [
      {
        title: "Map what the dealership needs",
        tech: ["Requirements"],
        text: "Service bookings, services due, vehicle sales, inventory, vehicles, mechanics and reports, all in one place, with WhatsApp as the channel customers already use.",
      },
      {
        title: "Model the data",
        tech: ["MongoDB", "Mongoose"],
        text: "Collections for customers, vehicles, bookings, mechanics, inventory, sales and WhatsApp conversations. Each booking links a customer, a vehicle and a time slot.",
      },
      {
        title: "Build the REST API",
        tech: ["Node.js", "Express", "JWT"],
        text: "Express routes for bookings, sales, inventory and reports, with login and roles for admins and staff. Business rules live in services, not in route handlers.",
      },
      {
        title: "Import data from the dealer system",
        tech: ["File upload", "Spreadsheet parsing"],
        text: "An 'Upload DMS Data' page lets staff import service history from the dealer management system. Rows are validated and saved, which powers the 'Services Due' list.",
      },
      {
        title: "Build the dashboard",
        tech: ["React", "JavaScript", "Charts"],
        text: "A service view and a sales view with a date filter: messages sent, bookings, cancellations, no-shows, revenue and message cost, plus booking trend and volume-by-model charts.",
      },
      {
        title: "Set up the Meta WhatsApp app",
        tech: ["Meta Business", "WhatsApp Cloud API"],
        text: "Create the Meta app, add the dealership's number, get the access token and phone number id, and register message templates for reminders and offers.",
      },
      {
        title: "Receive webhooks safely",
        tech: ["Webhooks", "HMAC-SHA256"],
        text: "Meta calls my endpoint once to verify it, then sends every customer message as a signed event. I check the signature on the raw body before trusting anything.",
        code: `import crypto from "node:crypto";

// GET: Meta checks the endpoint once
app.get("/webhooks/whatsapp", (req, res) => {
  const ok = req.query["hub.verify_token"] === process.env.WHATSAPP_VERIFY_TOKEN;
  ok ? res.send(req.query["hub.challenge"]) : res.sendStatus(403);
});

// POST: every event is signed with the app secret
function isValid(rawBody, header = "") {
  const expected =
    "sha256=" + crypto.createHmac("sha256", process.env.WHATSAPP_APP_SECRET).update(rawBody).digest("hex");
  return header.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(header), Buffer.from(expected));
}`,
      },
      {
        title: "Design the chat flow",
        tech: ["Interactive messages", "Buttons"],
        text: "The bot replies to 'hi' with a welcome image and two buttons: 'Buy a 2-wheeler' and 'Book a Service'. 'Book a Service' continues with vehicle, date and slot questions, then confirms the booking.",
      },
      {
        title: "Keep every chat on the dashboard",
        tech: ["MongoDB", "React"],
        text: "Each incoming and outgoing message is stored with its delivery status, so staff can read the full 'WhatsApp Chats' history next to the booking and see what each message cost.",
      },
      {
        title: "Reminders and campaigns",
        tech: ["Templates", "Scheduled jobs"],
        text: "A daily job finds services that are due and sends an approved template message. Replies flow back through the same webhook and update the booking.",
      },
      {
        title: "Containerize and deploy to OCI",
        tech: ["Docker", "GitLab CI/CD", "OCI", "Nginx"],
        text: "Docker images are built by a GitLab pipeline and deployed to an OCI virtual machine behind Nginx with HTTPS. See the OCI step-by-step in the tools section below.",
        code: `# on the OCI server: pull the new images and restart the stack
docker compose pull
docker compose up -d`,
      },
    ],
  },
  {
    id: "semantic-search",
    title: "Semantic Search (RAG)",
    summary:
      "Search documents by meaning, not keywords, then let a local language model answer from the best matching passages.",
    stack: ["Python", "Weaviate", "Docker", "Ollama", "Embeddings", "pypdf", "RAG"],
    flow: ["PDF documents", "Chunk text", "Embed (vectors)", "Weaviate vector DB", "Semantic query", "LLM answer"],
    steps: [
      {
        title: "Collect and clean the documents",
        tech: ["PDF", "pypdf"],
        text: "Extract text page by page and keep the file name and page number with each piece, so every answer can point back to its source.",
        code: `from pypdf import PdfReader

reader = PdfReader("guide.pdf")
pages = [
    {"filename": "guide.pdf", "page_No": i + 1, "content": page.extract_text()}
    for i, page in enumerate(reader.pages)
]`,
      },
      {
        title: "Split into chunks",
        tech: ["Chunking"],
        text: "Long pages are cut into overlapping chunks (a few hundred words) so each one holds a single idea and fits the embedding model.",
      },
      {
        title: "Run Weaviate and Ollama",
        tech: ["Docker Compose", "Weaviate", "Ollama"],
        text: "Weaviate (the vector database) runs in Docker. Ollama runs locally with an embedding model and a chat model, so no document leaves my machine.",
        code: `# start the vector database
docker compose up -d

# pull the models used for embeddings and answers
ollama pull snowflake-arctic-embed:latest
ollama pull llama3:latest`,
      },
      {
        title: "Create the collection",
        tech: ["Weaviate v4 client"],
        text: "The collection stores each chunk with its metadata, and tells Weaviate which model turns text into vectors automatically.",
        code: `import weaviate
from weaviate.classes.config import Configure, Property, DataType

client = weaviate.connect_to_local()

client.collections.create(
    name="PDF",
    vectorizer_config=Configure.Vectorizer.text2vec_ollama(
        api_endpoint="http://host.docker.internal:11434",
        model="snowflake-arctic-embed",   # turns text into vectors
    ),
    generative_config=Configure.Generative.ollama(
        api_endpoint="http://host.docker.internal:11434",
        model="llama3",                   # writes the final answer
    ),
    properties=[
        Property(name="filename", data_type=DataType.TEXT),
        Property(name="page_No", data_type=DataType.INT),
        Property(name="content", data_type=DataType.TEXT),
    ],
)`,
      },
      {
        title: "Load the data",
        tech: ["Batch insert"],
        text: "Chunks are inserted in batches. Weaviate calls the embedding model for each one and stores the vector next to the text.",
        code: `pdf = client.collections.get("PDF")

with pdf.batch.dynamic() as batch:      # sends objects in efficient batches
    for page in pages:
        batch.add_object(properties=page)`,
      },
      {
        title: "Semantic search",
        tech: ["near_text"],
        text: "The question is embedded with the same model, and Weaviate returns the closest chunks by meaning. 'refund policy' also finds 'getting my money back'.",
        code: `response = pdf.query.near_text(query="how do I reset my password", limit=3)

for obj in response.objects:
    print(obj.properties["filename"], obj.properties["page_No"])
    print(obj.properties["content"])`,
      },
      {
        title: "Generate an answer (RAG)",
        tech: ["Generative search", "Llama 3"],
        text: "The top chunks are passed to the language model together with the question, so the answer is based on my documents instead of the model's memory.",
        code: `response = pdf.generate.near_text(
    query="how do I reset my password",
    limit=3,
    grouped_task="Answer in 3 to 5 bullet points using only these passages.",
)
print(response.generated)   # the final answer`,
      },
      {
        title: "Improve and ship",
        tech: ["Evaluation", "FastAPI"],
        text: "Check results with real questions, tune chunk size and the number of results, then expose search as a small API and a UI. Keep API keys in environment variables, never in docker-compose files.",
      },
    ],
  },
];

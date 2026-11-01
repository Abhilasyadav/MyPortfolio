// Content for the Full-Stack page. Edit the text here; the page renders it as-is.
// Code samples are short, illustrative excerpts, not full source.

export const PRINCIPLES = [
  {
    title: "Validate at the edge",
    text: "Every request is checked (types, ranges, ownership) before it reaches business logic. Bad input gets a clear 4xx, never a crash.",
  },
  {
    title: "Rules live in services",
    text: "Routes stay thin. Business rules sit in one service layer that the dashboard, bots and webhooks all call, so every channel behaves the same.",
  },
  {
    title: "Least privilege",
    text: "Users, tokens and services get only the access they need. Roles decide what a person can do; the tenant decides whose data they can see.",
  },
  {
    title: "Safe to retry",
    text: "Webhooks and mobile networks repeat requests. Writes are idempotent (unique keys, transactions), so a retry never double-books or double-charges.",
  },
  {
    title: "Change data with migrations",
    text: "Schema changes are versioned and reviewed like code. Nobody edits a production database by hand.",
  },
  {
    title: "Observe everything",
    text: "Structured logs with a request id, health checks and audit trails make a failure explainable in minutes.",
  },
];

export const LAYERS = [
  { name: "Languages", items: ["Python", "JavaScript", "TypeScript"] },
  { name: "Back ends", items: ["Django + DRF", "FastAPI", "Node.js + Express"] },
  { name: "APIs & real-time", items: ["REST", "WebSockets", "Webhooks"] },
  { name: "Security", items: ["JWT", "RBAC", "OAuth 2.0", "bcrypt", "Rate limiting"] },
  { name: "Data", items: ["SQL (MySQL, PostgreSQL)", "MongoDB", "Redis"] },
  { name: "ORM / ODM", items: ["Django ORM", "SQLAlchemy", "Mongoose"] },
  { name: "Front end", items: ["React", "TypeScript", "TanStack Query"] },
  { name: "Delivery", items: ["Docker", "GitLab CI/CD", "Nginx"] },
];

export const GROUPS = ["All", "Python", "APIs", "Real-time", "Auth", "Data", "Architecture"];

export const TOPICS = [
  {
    id: "django",
    group: "Python",
    title: "Django & Django REST Framework",
    what: "A batteries-included Python framework: ORM, migrations, admin, authentication and forms out of the box. DRF adds serializers and viewsets for JSON APIs.",
    why: [
      "Fast to build data-heavy back ends with a ready-made admin for staff.",
      "Security defaults (CSRF, SQL injection protection, password hashing) are built in.",
      "Serializers validate input and shape output in one place.",
    ],
    blocks: [
      {
        title: "Start a project",
        code: `pip install django djangorestframework       # install Django and DRF
django-admin startproject config .             # create the project in this folder
python manage.py startapp booking              # create an app called "booking"
python manage.py makemigrations                # turn model changes into a migration file
python manage.py migrate                       # apply migrations to the database
python manage.py createsuperuser               # admin login for /admin
python manage.py runserver                     # dev server on http://127.0.0.1:8000`,
      },
      {
        title: "Model, serializer, viewset and route",
        code: `# booking/models.py
from django.db import models

class Appointment(models.Model):
    patient = models.ForeignKey("Patient", on_delete=models.CASCADE, related_name="appointments")
    starts_at = models.DateTimeField()
    status = models.CharField(max_length=20, default="PROPOSED")

# booking/serializers.py
from rest_framework import serializers

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ["id", "patient", "starts_at", "status"]

# booking/views.py
from rest_framework import viewsets, permissions

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related("patient")   # avoids one query per row
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

# config/urls.py
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register("appointments", AppointmentViewSet)           # gives list, create, retrieve, update, delete
urlpatterns = router.urls`,
      },
    ],
  },
  {
    id: "fastapi",
    group: "Python",
    title: "FastAPI",
    what: "A modern async Python framework. Type hints become request validation, documentation and editor autocomplete.",
    why: [
      "Pydantic models validate every request and response automatically.",
      "Interactive API docs are generated for free at /docs.",
      "Async by default, a good fit for AI agents, WebSockets and calls to other services.",
    ],
    blocks: [
      {
        title: "A validated endpoint with a dependency",
        code: `from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel

app = FastAPI()

class BookIn(BaseModel):
    slot_id: str
    patient_id: str

async def get_current_user():                       # a dependency: runs before the endpoint
    ...                                             # read the token, load the user, or raise 401

@app.post("/appointments", status_code=201)
async def book(data: BookIn, user=Depends(get_current_user)):
    slot = await find_slot(data.slot_id)            # my own service function
    if slot is None:
        raise HTTPException(status_code=404, detail="Slot not found")
    return await book_slot(slot, data.patient_id)`,
      },
      {
        title: "Run it",
        code: `pip install fastapi uvicorn
uvicorn main:app --reload        # dev server with auto reload
# open http://127.0.0.1:8000/docs for the interactive documentation`,
      },
    ],
  },
  {
    id: "rest",
    group: "APIs",
    title: "REST API design",
    what: "A predictable way to expose data over HTTP: nouns in the URL, verbs in the method, JSON in the body, and honest status codes.",
    why: [
      "Dashboards, bots and webhooks can all use the same endpoints.",
      "Consistent naming, errors and pagination make an API easy to learn and hard to misuse.",
      "Versioning (/api/v1) lets me change things without breaking existing clients.",
    ],
    blocks: [
      {
        title: "Conventions I follow",
        code: `GET    /api/v1/appointments            list (supports ?page=1&limit=20&status=CONFIRMED)
GET    /api/v1/appointments/42         one item
POST   /api/v1/appointments            create            -> 201 Created
PATCH  /api/v1/appointments/42         change some fields
DELETE /api/v1/appointments/42         remove or archive -> 204 No Content

Status codes: 200 OK, 201 Created, 204 No Content, 400 bad input, 401 not logged in,
              403 not allowed, 404 not found, 409 conflict (slot taken), 429 too many requests

Success: { "success": true,  "data": ..., "meta": { "page": 1, "total": 120 } }
Error:   { "success": false, "error": { "code": "SLOT_TAKEN", "message": "...", "requestId": "..." } }`,
      },
      {
        title: "Pagination (FastAPI)",
        code: `from fastapi import Query

@app.get("/appointments")
async def list_appointments(page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100)):
    skip = (page - 1) * limit
    items = await repo.find(skip=skip, limit=limit)        # my repository function
    total = await repo.count()
    return {"success": True, "data": items, "meta": {"page": page, "limit": limit, "total": total}}`,
      },
    ],
  },
  {
    id: "websockets",
    group: "Real-time",
    title: "WebSockets",
    what: "A connection that stays open so server and client can send messages to each other at any time.",
    why: [
      "Live dashboards, chat and voice-bot audio streams all need push, not polling.",
      "Authenticate the connection before accepting it, and limit its lifetime.",
      "Plan for reconnects: networks drop, so clients retry with a growing delay.",
    ],
    blocks: [
      {
        title: "FastAPI WebSocket endpoint",
        code: `from fastapi import WebSocket, WebSocketDisconnect

@app.websocket("/ws")
async def ws_endpoint(socket: WebSocket, token: str):
    if not valid_token(token):                      # check the token BEFORE accepting
        await socket.close(code=1008)               # 1008 = policy violation
        return
    await socket.accept()
    try:
        while True:
            message = await socket.receive_text()   # wait for a client message
            await socket.send_text("echo: " + message)
    except WebSocketDisconnect:
        pass                                        # client left, clean up here`,
      },
      {
        title: "Browser client with reconnect",
        code: `function connect(retry = 0) {
  const ws = new WebSocket("wss://example.com/ws?token=" + token);

  ws.onmessage = (event) => console.log(JSON.parse(event.data));
  ws.onclose = () => {
    const wait = Math.min(1000 * 2 ** retry, 15000);   // 1s, 2s, 4s ... up to 15s
    setTimeout(() => connect(retry + 1), wait);
  };
}
connect();`,
      },
    ],
  },
  {
    id: "webhooks",
    group: "Real-time",
    title: "Webhooks",
    what: "Another system (WhatsApp, a payment gateway, GitLab) calls my endpoint when something happens, instead of me asking repeatedly.",
    why: [
      "Anyone can POST to a public URL, so every request must be verified with a signature.",
      "Senders retry, so each event is handled once (store the event id with a unique index).",
      "Reply 200 quickly and do slow work in a background job.",
    ],
    blocks: [
      {
        title: "Verify the signature (FastAPI)",
        code: `import hmac, hashlib, os
from fastapi import Request, HTTPException

@app.post("/webhooks/whatsapp")
async def whatsapp_webhook(request: Request):
    raw = await request.body()                                   # sign-check the RAW bytes
    sent = request.headers.get("X-Hub-Signature-256", "")
    expected = "sha256=" + hmac.new(os.environ["APP_SECRET"].encode(), raw, hashlib.sha256).hexdigest()

    if not hmac.compare_digest(sent, expected):                  # constant-time comparison
        raise HTTPException(status_code=401, detail="Bad signature")

    event = await request.json()
    if await already_processed(event["id"]):                     # duplicate delivery: ignore
        return {"ok": True}
    await queue_for_processing(event)                            # do the real work in the background
    return {"ok": True}                                          # answer fast`,
      },
    ],
  },
  {
    id: "auth-basics",
    group: "Auth",
    title: "Authentication basics",
    what: "Proving who a user is: passwords stored safely, then a session or token that proves it on later requests.",
    why: [
      "Never store plain passwords: hash with bcrypt (or Argon2) and a per-user salt.",
      "Authentication answers 'who are you?'; authorisation answers 'what may you do?'. They are separate steps.",
      "Rate-limit login and add lockouts or delays against guessing.",
    ],
    blocks: [
      {
        title: "Hash and check passwords (Node.js)",
        code: `import bcrypt from "bcrypt";

const hash = await bcrypt.hash(plainPassword, 12);          // 12 = cost; higher is slower and safer
// store only "hash" in the database

const ok = await bcrypt.compare(plainPassword, user.hash);  // true if the password matches
if (!ok) return res.status(401).json({ error: "Invalid email or password" });   // same message for both cases`,
      },
      {
        title: "Hash and check passwords (Python)",
        code: `import bcrypt

hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))   # store this
ok = bcrypt.checkpw(password.encode(), hashed)                         # True or False`,
      },
    ],
  },
  {
    id: "jwt-basics",
    group: "Auth",
    title: "JWT: what it is and how it is built",
    what: "A JSON Web Token is a signed string the server hands out after login. The client sends it back, and the server trusts it because the signature proves it was not changed.",
    why: [
      "Stateless: the server does not need a session store to know who is calling.",
      "Three parts joined by dots: header.payload.signature, each Base64URL encoded.",
      "The payload is only encoded, not encrypted, so never put secrets in it.",
    ],
    blocks: [
      {
        title: "Anatomy of a token",
        code: `eyJhbGciOiJIUzI1NiJ9 . eyJzdWIiOiI0MiIsInJvbGUiOiJTVEFGRiIsImV4cCI6MTc2MjAwMDAwMH0 . 3pQ...signature

HEADER   { "alg": "HS256", "typ": "JWT" }                 how it was signed
PAYLOAD  { "sub": "42",              who the token is about (user id)
           "role": "STAFF",          my own claim (used for authorisation)
           "iat": 1761999100,        issued at
           "exp": 1762000000,        expires at (always set this)
           "iss": "caredesk",        issuer
           "jti": "a1b2c3" }         unique id (lets me revoke one token)
SIGNATURE  HMAC-SHA256(header + "." + payload, secret)   changes if anyone edits the payload`,
      },
      {
        title: "Common claims",
        code: `sub  subject: the user id
iss  issuer: who created the token
aud  audience: who the token is meant for
exp  expiry time (Unix seconds); verification fails after this
nbf  not before: token is invalid until this time
iat  issued at
jti  unique token id, used for revocation and replay protection`,
      },
    ],
  },
  {
    id: "jwt-code",
    group: "Auth",
    title: "JWT: sign and verify (Node.js and Python)",
    what: "Creating a token at login and verifying it on every protected request.",
    why: [
      "Always pass the allowed algorithms when verifying, so a forged header cannot pick the algorithm.",
      "Check issuer and expiry, and keep access tokens short-lived (about 15 minutes).",
      "The secret must be long and random, and live in an environment variable.",
    ],
    blocks: [
      {
        title: "Node.js (jsonwebtoken) with Express middleware",
        code: `import jwt from "jsonwebtoken";

export function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, role: user.role },            // payload
    process.env.JWT_SECRET,                       // 32+ random characters
    { expiresIn: "15m", issuer: "caredesk", algorithm: "HS256" }
  );
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";          // "Bearer <token>"
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS256"],                      // never trust the token's own "alg"
      issuer: "caredesk",
    });
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}`,
      },
      {
        title: "Python (PyJWT) with a FastAPI dependency",
        code: `import os, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

SECRET = os.environ["JWT_SECRET"]
bearer = HTTPBearer()

def create_access_token(user_id: str, role: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": user_id, "role": role, "iat": now, "exp": now + timedelta(minutes=15), "iss": "caredesk"}
    return jwt.encode(payload, SECRET, algorithm="HS256")

def current_user(creds: HTTPAuthorizationCredentials = Depends(bearer)):
    try:
        return jwt.decode(creds.credentials, SECRET, algorithms=["HS256"], issuer="caredesk")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")`,
      },
    ],
  },
  {
    id: "jwt-refresh",
    group: "Auth",
    title: "JWT: access tokens, refresh tokens and rotation",
    what: "A short-lived access token does the work; a longer-lived refresh token quietly gets a new access token when it expires.",
    why: [
      "If an access token leaks it stops working in minutes.",
      "Refresh tokens are stored on the server (hashed) so they can be revoked, and are single-use.",
      "If an already-used refresh token appears again, it was probably stolen: revoke every session of that user.",
    ],
    blocks: [
      {
        title: "The flow",
        code: `1. POST /auth/login          check password
                             -> access token (15 min, kept in memory)
                             -> refresh token (7 days, httpOnly + Secure + SameSite cookie)
2. API calls                 Authorization: Bearer <access token>
3. Access token expires      API answers 401
4. POST /auth/refresh        browser sends the refresh cookie automatically
                             server checks it against the stored hash, then:
                             -> issues a NEW access token AND a NEW refresh token (rotation)
                             -> marks the old refresh token as used
5. Old refresh token reused  treat as theft -> revoke all sessions of that user
6. POST /auth/logout         delete the stored refresh sessions, clear the cookie`,
      },
      {
        title: "Refresh cookie settings (Express)",
        code: `res.cookie("refreshToken", refreshToken, {
  httpOnly: true,                  // JavaScript cannot read it, which blocks theft through XSS
  secure: true,                    // HTTPS only
  sameSite: "strict",              // not sent on cross-site requests (CSRF protection)
  path: "/api/v1/auth",            // only sent to the auth routes
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});`,
      },
    ],
  },
  {
    id: "jwt-security",
    group: "Auth",
    title: "JWT: security checklist",
    what: "The mistakes that make JWT unsafe, and how I avoid each one.",
    why: [
      "Most JWT incidents come from configuration, not from the standard itself.",
      "Treat every token as a bearer key: whoever holds it can use it.",
    ],
    blocks: [
      {
        title: "Checklist",
        code: `[x] Allow-list the algorithm when verifying (never accept "none" or a token-chosen alg)
[x] Strong random secret (32+ chars), loaded from the environment, rotated if exposed
[x] Always set exp; keep access tokens short (5-15 minutes)
[x] Check iss and aud so a token for another app is rejected
[x] Put only what you need in the payload (id, role); no passwords, no personal data
[x] Browser storage: access token in memory, refresh token in an httpOnly cookie, not localStorage
[x] Rotate refresh tokens and store them hashed on the server so they can be revoked
[x] Use HTTPS everywhere
[x] RS256 / ES256 (private key signs, public key verifies) when many services must verify tokens
[x] Check roles and tenant on the server for every request; never trust the client's view of them`,
      },
      {
        title: "HS256 or RS256?",
        code: `HS256  one shared secret signs AND verifies.
       Simple. Good when one service issues and verifies its own tokens.

RS256  private key signs, public key verifies.
       Good when several services must verify tokens but only the auth service may create them.`,
      },
    ],
  },
  {
    id: "rbac",
    group: "Auth",
    title: "Authorisation & RBAC",
    what: "Role-Based Access Control: users get roles, roles get permissions, and every request is checked against them on the server.",
    why: [
      "Authorisation is checked on the server for every request, never by hiding buttons.",
      "Roles say what you can do; the tenant (hospital, dealership) says whose data you can see. I enforce both.",
      "Permissions are named (appointment:cancel), so rules are easy to read and test.",
    ],
    blocks: [
      {
        title: "Role and permission middleware (Express)",
        code: `const PERMISSIONS = {
  SUPER_ADMIN:    ["hospital:create"],
  HOSPITAL_ADMIN: ["branch:manage", "doctor:manage", "appointment:view", "appointment:cancel"],
  STAFF:          ["appointment:view", "appointment:cancel"],
  DOCTOR:         ["appointment:view"],
};

export const can = (permission) => (req, res, next) => {
  const allowed = PERMISSIONS[req.user.role] || [];
  if (!allowed.includes(permission)) return res.status(403).json({ error: "Not allowed" });
  next();
};

// every query is also scoped to the user's tenant
app.delete("/api/v1/appointments/:id", requireAuth, can("appointment:cancel"), async (req, res) => {
  const appt = await Appointment.findOne({ _id: req.params.id, hospitalId: req.user.hospitalId });
  if (!appt) return res.sendStatus(404);       // another hospital's record looks like "not found"
  await cancelAppointment(appt);
  res.sendStatus(204);
});`,
      },
      {
        title: "The same idea in FastAPI",
        code: `def require_role(*roles: str):
    def checker(user=Depends(current_user)):
        if user["role"] not in roles:
            raise HTTPException(status_code=403, detail="Not allowed")
        return user
    return checker

@app.delete("/appointments/{appointment_id}", status_code=204)
async def cancel(appointment_id: str, user=Depends(require_role("HOSPITAL_ADMIN", "STAFF"))):
    await cancel_appointment(appointment_id, tenant=user["hospital_id"])`,
      },
    ],
  },
  {
    id: "oauth2",
    group: "Auth",
    title: "OAuth 2.0 & OpenID Connect",
    what: "A standard for letting a user sign in with another provider (Google, Microsoft) or letting an app act on their behalf, without ever seeing their password.",
    why: [
      "Users trust 'Sign in with Google' more than a new password form.",
      "The Authorization Code flow with PKCE is the recommended flow for web and mobile apps.",
      "OpenID Connect adds an ID token that says who the user is; OAuth alone only grants access.",
    ],
    blocks: [
      {
        title: "Authorization Code flow with PKCE",
        code: `Roles: resource owner = the user, client = my app,
       authorization server = Google, resource server = the API

1. My app creates a random code_verifier and its hash (code_challenge)
2. Redirect the user to the provider:
     https://accounts.example.com/authorize?response_type=code&client_id=<id>
       &redirect_uri=https://myapp.com/callback&scope=openid%20email%20profile
       &state=<random>&code_challenge=<hash>&code_challenge_method=S256
3. The user signs in and agrees to the scopes
4. The provider redirects back: https://myapp.com/callback?code=<code>&state=<random>
5. My server checks that state matches, then POSTs the code + code_verifier to the token endpoint
6. The provider returns an access token (and an ID token with openid)
7. My server verifies the ID token, finds or creates the user, and issues my own session / JWT`,
      },
      {
        title: "Create the PKCE values (Python)",
        code: `import base64, hashlib, secrets

code_verifier = secrets.token_urlsafe(64)                       # random secret kept by my app
digest = hashlib.sha256(code_verifier.encode()).digest()
code_challenge = base64.urlsafe_b64encode(digest).rstrip(b"=").decode()   # sent in step 2
state = secrets.token_urlsafe(16)                               # protects against CSRF`,
      },
      {
        title: "Scopes and grant types",
        code: `Scopes         small permissions the app asks for: openid, email, profile, calendar.readonly
Authorization Code + PKCE   web apps, single-page apps and mobile apps (use this by default)
Client Credentials          machine to machine, no user involved (service accounts)
Refresh Token               get a new access token without asking the user again
Avoid: Implicit and Password grants (deprecated)`,
      },
    ],
  },
  {
    id: "orm-python",
    group: "Data",
    title: "ORM in Python: Django ORM & SQLAlchemy",
    what: "An ORM lets me work with database rows as Python objects instead of writing SQL strings by hand.",
    why: [
      "Less repetitive SQL, and parameters are escaped for me, which prevents SQL injection.",
      "Migrations keep the database schema in step with the models.",
      "I still read the SQL it produces and fix N+1 queries with joins.",
    ],
    blocks: [
      {
        title: "Django ORM",
        code: `# create
appt = Appointment.objects.create(patient=patient, starts_at=when, status="CONFIRMED")

# read with filters, ordering and a join in one query
upcoming = (
    Appointment.objects
    .filter(status="CONFIRMED", starts_at__gte=timezone.now())
    .select_related("patient")           # JOIN: one query instead of one per appointment
    .order_by("starts_at")[:20]
)

# update many rows at once, inside a transaction
from django.db import transaction
with transaction.atomic():
    Appointment.objects.filter(status="PROPOSED").update(status="EXPIRED")`,
      },
      {
        title: "SQLAlchemy 2.0",
        code: `from sqlalchemy import ForeignKey, select
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, Session

class Base(DeclarativeBase):
    pass

class Patient(Base):
    __tablename__ = "patients"
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str]
    appointments: Mapped[list["Appointment"]] = relationship(back_populates="patient")

class Appointment(Base):
    __tablename__ = "appointments"
    id: Mapped[int] = mapped_column(primary_key=True)
    patient_id: Mapped[int] = mapped_column(ForeignKey("patients.id"))
    status: Mapped[str] = mapped_column(default="PROPOSED")
    patient: Mapped[Patient] = relationship(back_populates="appointments")

with Session(engine) as session:
    stmt = select(Appointment).where(Appointment.status == "CONFIRMED")
    for appt in session.scalars(stmt):
        print(appt.id, appt.status)`,
      },
    ],
  },
  {
    id: "orm-mern",
    group: "Data",
    title: "ODM in the MERN stack: Mongoose",
    what: "Mongoose maps MongoDB documents to JavaScript models, with schemas, validation, indexes and relations through populate.",
    why: [
      "A schema gives MongoDB's flexible documents a clear, validated shape.",
      "Indexes are declared next to the fields they speed up.",
      "Transactions need a replica set, which I run even in development.",
    ],
    blocks: [
      {
        title: "Schema, index and query",
        code: `import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    hospitalId: { type: mongoose.Schema.Types.ObjectId, required: true },   // tenant
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    startsAt: { type: Date, required: true },
    status: { type: String, enum: ["PROPOSED", "CONFIRMED", "CANCELLED"], default: "PROPOSED" },
  },
  { timestamps: true }                                                      // createdAt, updatedAt
);

appointmentSchema.index({ hospitalId: 1, startsAt: 1 });                    // speeds up the list query
export const Appointment = mongoose.model("Appointment", appointmentSchema);

// query: filter, join with populate, sort, limit
const upcoming = await Appointment.find({ hospitalId, status: "CONFIRMED", startsAt: { $gte: new Date() } })
  .populate("patient", "name phone")      // like a JOIN: fetch only these patient fields
  .sort({ startsAt: 1 })
  .limit(20)
  .lean();                                // plain objects, faster to read`,
      },
      {
        title: "A transaction",
        code: `const session = await mongoose.startSession();
try {
  await session.withTransaction(async () => {
    const slot = await Slot.findOneAndUpdate(
      { _id: slotId, booked: false }, { booked: true }, { session }
    );
    if (!slot) throw new Error("SLOT_TAKEN");             // abort: nothing is saved
    await Appointment.create([{ slotId, patient: patientId, hospitalId }], { session });
  });
} finally {
  session.endSession();
}`,
      },
    ],
  },
  {
    id: "sql",
    group: "Data",
    title: "SQL databases (MySQL, PostgreSQL)",
    what: "Relational databases: data lives in tables with typed columns, and relations are enforced with keys.",
    why: [
      "Strong consistency and transactions, ideal for bookings, payments and anything with strict rules.",
      "Joins answer questions across tables in one query.",
      "Indexes make reads fast; foreign keys prevent orphan records.",
    ],
    blocks: [
      {
        title: "Tables, relations and a join",
        code: `CREATE TABLE patients (
  id    BIGINT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(120) NOT NULL,
  phone VARCHAR(20)  NOT NULL UNIQUE                 -- UNIQUE: no duplicate phone numbers
);

CREATE TABLE appointments (
  id         BIGINT PRIMARY KEY AUTO_INCREMENT,
  patient_id BIGINT NOT NULL,
  starts_at  DATETIME NOT NULL,
  status     VARCHAR(20) NOT NULL DEFAULT 'PROPOSED',
  FOREIGN KEY (patient_id) REFERENCES patients(id),  -- relation is enforced by the database
  INDEX idx_status_start (status, starts_at)         -- speeds up status + date filters
);

-- appointments with their patient, newest first
SELECT a.id, p.name, a.starts_at
FROM appointments a
JOIN patients p ON p.id = a.patient_id
WHERE a.status = 'CONFIRMED'
ORDER BY a.starts_at
LIMIT 20;`,
      },
      {
        title: "A transaction (all or nothing)",
        code: `START TRANSACTION;
UPDATE slots SET booked = 1 WHERE id = 42 AND booked = 0;   -- 0 rows changed means someone else won
INSERT INTO appointments (patient_id, starts_at) VALUES (7, '2026-11-02 11:30:00');
COMMIT;      -- use ROLLBACK; instead if anything above failed`,
      },
    ],
  },
  {
    id: "nosql",
    group: "Data",
    title: "NoSQL databases (MongoDB, Redis)",
    what: "MongoDB stores flexible JSON-like documents. Redis keeps data in memory for very fast reads, caching and counters.",
    why: [
      "MongoDB suits data that changes shape (chat messages, call logs, AI results) and nested documents.",
      "Redis is perfect for caching, sessions, rate limits and queues.",
      "Choose by the access pattern, not by habit: use SQL when relations and strict rules matter.",
    ],
    blocks: [
      {
        title: "MongoDB aggregation (mongosh)",
        code: `// bookings per doctor this month, busiest first
db.appointments.aggregate([
  { $match: { status: "CONFIRMED", startsAt: { $gte: ISODate("2026-11-01") } } },   // filter first
  { $group: { _id: "$doctorId", total: { $sum: 1 } } },                              // count per doctor
  { $sort: { total: -1 } },
  { $limit: 5 }
]);

db.appointments.createIndex({ doctorId: 1, startsAt: 1 });   // index for the filter and grouping`,
      },
      {
        title: "Redis for cache and rate limiting",
        code: `SET  slots:doctor:42 "<json>" EX 60      # cache a result for 60 seconds
GET  slots:doctor:42                     # fast read; nil means "go to the database"

INCR rate:login:203.0.113.5              # count attempts from one IP
EXPIRE rate:login:203.0.113.5 60         # the counter resets after a minute (allow ~10, then answer 429)`,
      },
      {
        title: "SQL or NoSQL?",
        code: `Pick SQL when:    relations and constraints matter, money or bookings are involved,
                  you need joins, reports and strong transactions.
Pick MongoDB when: documents are nested or change shape, you store logs, chats or AI output,
                  you read a whole document at once.
Add Redis when:    the same data is read often and can be a few seconds old,
                  or you need counters, rate limits and short-lived keys.
Most real systems use more than one.`,
      },
    ],
  },
  {
    id: "layered",
    group: "Architecture",
    title: "Layered back-end architecture",
    what: "Separate the code by responsibility: routes receive requests, controllers translate them, services hold the rules, repositories talk to the database.",
    why: [
      "Business rules live in one place, so the dashboard, bots and webhooks cannot disagree.",
      "Each layer is easy to test on its own.",
      "Swapping a database or a provider touches one layer, not the whole app.",
    ],
    blocks: [
      {
        title: "Request flow and folders",
        code: `Request -> routes -> middleware (auth, validation) -> controller -> service -> repository -> database
                                                                       |
                                                              policy (who may do this?)

backend/src
  routes/        URL + method -> controller
  middleware/    auth, validation (zod / pydantic), rate limit, request id
  controllers/   read the request, call a service, shape the response
  services/      business rules, transactions, calls to other systems
  repositories/  the only code that talks to the database
  models/        schemas (Mongoose / Django models / SQLAlchemy)
  integrations/  WhatsApp, Exotel, payment providers behind interfaces
  config/        environment validation (fail fast at start-up)`,
      },
    ],
  },
  {
    id: "monolith",
    group: "Architecture",
    title: "Monolith, modular monolith or microservices",
    what: "How to split a system into deployable parts. Most of my products start as a well-organised monolith.",
    why: [
      "One deployable app is simpler to build, test and run for a small team.",
      "Splitting too early adds network calls, versioning and debugging pain.",
      "Split a service out when it has a different scaling need, owner or release cycle, such as a voice-bot gateway.",
    ],
    blocks: [
      {
        title: "How I decide",
        code: `Monolith           one codebase, one deploy. Start here.
Modular monolith   one deploy, but strict modules (booking, messaging, billing) with clear interfaces.
Microservices      separate deploys talking over HTTP or queues.

Split a module out only when:
  - it needs to scale on its own (a WebSocket / voice gateway),
  - it changes at a different speed or is owned by another team,
  - a failure in it must not take the rest down.

Example: dashboard API (REST) + voice gateway (WebSocket) + background worker, all from one repo.`,
      },
    ],
  },
  {
    id: "multitenancy",
    group: "Architecture",
    title: "Multi-tenancy",
    what: "One system serving many customers (hospitals, dealerships) with their data kept strictly separate.",
    why: [
      "One deployment and one codebase serve every customer.",
      "The tenant id is attached to every record and applied to every query automatically.",
      "Tests prove that tenant A can never read tenant B's data.",
    ],
    blocks: [
      {
        title: "Three common models",
        code: `Shared database, shared tables      every row has tenantId; every query filters by it   (what I use)
Shared database, schema per tenant  stronger separation, more migrations to run
Database per tenant                 strongest isolation, highest cost and operations effort

Rules I follow:
  1. tenantId is taken from the verified token, never from the request body
  2. a repository helper adds the tenant filter to every query
  3. unique indexes include tenantId
  4. super-admin accounts have no access to tenant data
  5. an integration test checks cross-tenant access returns 404`,
      },
    ],
  },
  {
    id: "background-jobs",
    group: "Architecture",
    title: "Background jobs, queues & caching",
    what: "Slow or repeatable work (sending reminders, retrying calls, generating reports) runs outside the request, and hot data is cached.",
    why: [
      "The API answers fast and the heavy work happens in a worker.",
      "Retries with backoff and a dead-letter list handle failures calmly.",
      "Caching removes repeated work but needs a clear expiry, so users never see wrong data for long.",
    ],
    blocks: [
      {
        title: "A simple job pattern",
        code: `API request  ->  save the work as a job (status QUEUED, runAt, attempts = 0)  ->  return 202 Accepted

Worker loop (every few seconds, or a queue consumer such as Celery or BullMQ):
  1. take due jobs with a lock, so two workers never run the same job
  2. run the job
  3. success -> mark DONE
     failure -> attempts + 1, runAt = now + backoff (1 min, 5 min, 30 min ...)
     too many attempts -> mark FAILED and alert the dashboard

Cache rule of thumb: cache reads that are expensive and can be a little old,
set a short TTL, and delete the key whenever the data changes.`,
      },
    ],
  },
  {
    id: "config-ops",
    group: "Architecture",
    title: "Configuration, logging & health",
    what: "The small habits that make a back end easy to run: validated configuration, structured logs and health checks.",
    why: [
      "The app refuses to start if a required setting is missing, and names it.",
      "A request id on every log line lets me follow one request through the whole system.",
      "Health endpoints tell Docker, Nginx and monitors whether the app is ready.",
    ],
    blocks: [
      {
        title: "Fail-fast config and health checks (Node.js)",
        code: `import { z } from "zod";

const Env = z.object({
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1),
  JWT_SECRET: z.string().min(32),               // refuse weak secrets
});
export const env = Env.parse(process.env);       // throws at start-up if anything is missing

app.get("/health", (req, res) => res.json({ ok: true }));                  // process is alive
app.get("/health/ready", async (req, res) => {                              // dependencies are reachable
  const dbOk = mongoose.connection.readyState === 1;
  res.status(dbOk ? 200 : 503).json({ ok: dbOk });
});`,
      },
    ],
  },
];

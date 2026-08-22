# Hospitality Agent Cloud

Enterprise Multi-Tenant Agent-as-a-Service (AaaS) SaaS platform for resorts, hotels, hostels, vacation properties, homestays, and hospitality groups.

---

## 🌟 Core Business Concept

Hospitality businesses subscribe to the platform and create their own AI hospitality agents. The customer **does NOT** manage servers, Docker, Kubernetes, databases, Redis, vector stores, or LLM infrastructure.

The customer simply:
1. Creates an account & organization.
2. Creates a property.
3. Creates & configures an AI agent (No-Code Builder).
4. Uploads property knowledge & enables live data sync.
5. Tests the agent in the interactive Playground.
6. Clicks **"Deploy Agent"**.

The platform handles:
- Stateful agent runtime execution (LangGraph + LiteLLM).
- Strict multi-tenant data isolation (`organization_id`, `property_id`).
- Real-time tool execution for live pool status, room availability, pricing, and broadcasts.
- Multi-channel support (Embeddable Web Widget, Voice Gateway, WhatsApp, API).
- Usage metering, AI cost calculation, and subscription billing.

---

## 🚀 Quick Start (Local Development)

### 1. Requirements
- Python 3.12+ (or Python 3.14)
- Node.js 18+ & npm
- Docker Compose (Optional for Postgres/Redis)

### 2. Environment Setup
```bash
cp .env.example .env
```

### 3. Initialize Database & Seed Demo Data
```bash
python -m services.database.init_db
python -m scripts.seed_demo
```

### 4. Run API Server (FastAPI Control & Data Plane)
```bash
python -m uvicorn apps.api.main:app --reload --port 8000
```
- OpenAPI Documentation: `http://localhost:8000/docs`
- Health Check: `http://localhost:8000/health`

### 5. Run Web Frontend (Next.js Dashboard & Builder)
```bash
cd apps/web
npm install
npm run dev
```
- Admin Dashboard: `http://localhost:3000/dashboard`
- Agent Builder: `http://localhost:3000/dashboard/agents/builder`
- Agent Playground: `http://localhost:3000/dashboard/agents/playground`

---

## 🧪 Running Automated Tests

Run the test suite to verify tenant vector isolation, tool authorization, agent lifecycle transitions, and billing entitlements:

```bash
python -m pytest tests/
```

---

## 📁 Repository Monorepo Structure

```
├── apps/
│   ├── api/            # FastAPI Control Plane & Data Plane REST API
│   ├── web/            # Next.js 14 Admin Dashboard & 9-Step Agent Builder
│   └── widget/         # Lightweight embeddable Webchat & Voice Widget Snippet
├── services/
│   ├── agent_runtime/  # Stateful Agent Execution Engine (LangGraph + Tools)
│   ├── database/       # SQLAlchemy 2 Models, Async Sessions, & Alembic Migrations
│   ├── rag/            # RAG-as-a-Service Chunking, Embeddings & Vector Store
│   ├── billing/        # Usage Metering, Entitlements & AI Cost Engine
│   └── integrations/   # PMS, Weather & External Provider Interfaces
├── packages/
│   └── agent_sdk/      # Internal Python SDK for Agent Lifecycle
├── scripts/            # Demo Dataset Seeding (Azure Hospitality Group)
├── tests/              # Multi-tenant isolation & agent lifecycle unit tests
├── infra/              # Docker Compose & Infrastructure Configuration
└── docs/               # Technical Architecture Documentation
```

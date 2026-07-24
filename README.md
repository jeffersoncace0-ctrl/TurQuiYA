# TurQuiYA

> **Discover the Atlántico region at your own pace, budget, and style**

Smart Tourism Web Application (SPA) for discovering Barranquilla and the Atlántico region based on the traveler's budget.

TurQuiYA centralizes tourist destinations, budget planning, and traveler profiles into a single-page application without page reloads.

**Live Demo:** [https://turquiya.dpdns.org](https://turquiya.dpdns.org)

---

## Table of Contents

1. [Project Description](#project-description)
2. [Project Status](#project-status)
3. [Technologies Used](#technologies-used)
4. [Project Structure](#project-structure)
5. [Development & Deployment](#development--deployment)
6. [Supabase Configuration](#supabase-configuration)
7. [GitFlow Evidence](#gitflow-evidence)
8. [Team](#team)

---

## Project Description

### Problem

Planning a trip to the Atlántico region often requires consulting multiple sources to find information about destinations, transportation, and travel costs.

### Solution

TurQuiYA is a Single Page Application (SPA) that brings together the following modules in one platform:

| Module | Status | Description |
| --- | --- | --- |
| Home | ✅ Functional | Welcome page with navigation |
| Registration | ✅ Functional | Form with validations and Supabase Auth |
| Login | ✅ Functional | JWT Authentication with persistent session |
| Discover Atlántico | ✅ Functional | Map and destination catalog |
| Smart Planner | 🔄 In development | Budget-based recommendations |
| Transportation | 📋 Planned | Fares and routes |
| Currency Exchange | ✅ Functional | COP/USD/EUR/GBP conversion |
| Traveler Profile | ✅ Functional | Preferences management |

---

## Project Status

* ✅ **Functional MVP deployed** in production
* ✅ Full authentication with Supabase Auth
* ✅ PostgreSQL database with Row Level Security (RLS)
* ✅ API completely migrated to Supabase Edge Functions
* 🔄 Budget planner in development
* 📋 Gamification and favorites system planned

---

## Technologies Used

| Layer | Technology | Why? |
| --- | --- | --- |
| Frontend | HTML5, CSS3, JavaScript (Vanilla ES6+) | No heavy frameworks, fast loading, full DOM control |
| Cloud Backend | Supabase Edge Functions | Serverless API execution, bypassing local servers |
| Database | PostgreSQL (Supabase) | Robust relational DB, JSONB support, native RLS |
| Authentication | Supabase Auth | JWT, refresh tokens, Google OAuth, persistent sessions |
| Hosting & DNS | GitHub Pages + Cloudflare | Free hosting, Git integration, custom domain management |
| Version Control | Git + GitHub | GitFlow, pull requests, code review |

### Evaluated Alternatives

* **Firebase**: Discarded due to vendor lock-in and lower SQL flexibility.
* **MongoDB + Express**: Discarded due to higher configuration complexity for this MVP scope.
* **React/Vue/Angular**: Discarded for the MVP, will be considered in future scalability updates.

---

## Project Structure

```text
TurQuiYA/
├── index.html              # Entry point, dynamic navbar
├── main.js                 # SPA Router, session control, dynamic menu
├── styles.css              # Global styles, responsive design, gradients
├── pages/                  # Application views (SPA)
│   ├── login.js            # Login form
│   ├── registro.js         # Registration form with validations
│   ├── home.js             # Main dashboard/landing page
│   ├── destinos.js         # Destination catalog
│   ├── planificador.js     # Budget and routing engine
│   ├── perfil.js           # User profile management
│   └── admin.js            # Administration panel
├── services/               # Business logic and API communication
│   └── api.js              # Supabase client, auth, CRUD operations
├── assets/                 # Static resources
│   ├── images/             # Destination photos, logos
│   └── icons/              # SVG icons, favicon
├── database/
│   └── turquiya.sql        # Table creation and RLS script
├── CNAME                   # Custom domain configuration
├── manifest.json           # PWA configuration
└── README.md               # This file

```

---

## Development & Deployment

To ensure global accessibility without relying on local servers, TurQuiYA was built using a strict cloud-only architecture. **The project does not require installing Node.js, Docker, or PostgreSQL locally to run.**

### Final Architecture

**User** ➔ **GitHub Pages (Frontend)** ➔ **Supabase Edge Functions (API)** ➔ **PostgreSQL (Database)**

### 1. Domain & DNS Configuration (Cloudflare)

* The custom domain (`turquiya.dpdns.org`) was acquired via DPDNS.
* DNS zone management was migrated to **Cloudflare** by replacing the original Name Servers.
* DNS records were configured to point directly to GitHub Pages.

### 2. Frontend Hosting (GitHub Pages)

* The application was deployed directly from the `develop` branch, utilizing `/ (root)` and `index.html` as the entry point.
* Configured the custom domain in the repository settings, successfully resolving the initial `NotServedByPagesError` once Cloudflare DNS propagation finished.

### 3. Serverless Backend Migration (Edge Functions)

* **The Problem:** Initially, the frontend relied on a local Node.js/Express server (`localhost:3000`), meaning external users could see the UI but the destinations catalog would fail to load.
* **The Solution:** The local Express dependency was completely eliminated. The API logic was migrated to **Supabase Edge Functions**.
* **Implementation:** A custom Express-based Edge Function named `Destinos` was created to handle endpoints (`GET /destinos`, `GET /destinos/:id`), bypassing CORS and JWT issues present in the default Supabase templates.
* The frontend `services/api.js` now fetches data directly from the cloud: `https://oznhwcpbwivngxinrsbx.supabase.co/functions/v1/Destinos`.

### How to use the App

Because the app is fully serverless and relies on hidden `.env` cloud credentials, the only official way to test and interact with TurQuiYA is through the production link:

👉 **Test the application here:** [https://turquiya.dpdns.org](https://turquiya.dpdns.org)

---

## Supabase Configuration

*Overview of our production environment setup in Supabase:*

| Configuration | Value | Supabase Location |
| --- | --- | --- |
| Project URL | `https://[hidden].supabase.co` | Project Settings → API |
| Anon Key | `eyJhbGciOiJIUzI1NiIs...` | Project Settings → API |
| Auth Provider | Email | Authentication → Providers |
| Email Confirmations | OFF (for MVP) | Authentication → Settings |
| Site URL | `https://turquiya.dpdns.org` | Authentication → URL Configuration |

---


## GitFlow Evidence

The development of TurQuiYA followed the GitFlow workflow to ensure code stability and organized collaboration.

*   **Branching Strategy Graph:** [View Repository Network](https://github.com/jeffersoncace0-ctrl/TurQuiYA/network)
*   **Code Review & Integrations:** [View Closed Pull Requests](https://github.com/jeffersoncace0-ctrl/TurQuiYA/pulls?q=is%3Apr+is%3Aclosed)
*   **Commit History:** [View Main Commits](https://github.com/jeffersoncace0-ctrl/TurQuiYA/commits/main)



---

## Team

| Role | Member | GitHub | Responsibility |
| --- | --- | --- | --- |
| Scrum Master | Jefferson Cacerez | [@jeffersoncace0-ctrl](https://github.com/jeffersoncace0-ctrl) | Facilitation, documentation, pitch |
| Frontend Developer | Cristian Ortiz | [@ctian299o](https://github.com/ctian299o) | UI/UX, responsive design |
| Frontend Developer | Juan Gomez | [@jgmez9](https://github.com/jgmez9) | Views, API integration, SPA router |
| Backend Developer | Arley Diaz | [@diazvergaraarley](https://github.com/diazvergaraarley) | DB deployment, Cloudflare & GH Pages rollout, Edge Functions, Debugging |
| Backend Developer | Edward Barrios | [@thultra19](https://github.com/thultra19) | Data modeling, auth, optimization |
| Analyst | Jhon Salgado | [@jhonfredi2710-bit](https://github.com/jhonfredi2710-bit) | Requirements, testing, QA |
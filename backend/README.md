# BetterApply Backend

Backend server for BetterApply — helps internationals predict job chances in Denmark

---

## Tech Stack

- Node.js + Express (web server)
- TypeScript (typed JavaScript)
- PostgreSQL (database)
- Prisma (ORM)
- Nodemailer (email)

---

## 📂 Folder Structure

- `routes/` – defines API endpoints
- `controllers/` – handles HTTP logic
- `services/` – business logic
- `db/` – database access using Prisma
- `generated/` – Prisma client output
- `server.ts` – app entry point

---

## 🔄 Flow Overview

1.  `POST /auth/request-code`

    - Creates user (if not exists) with a `null` password
    - Generates 6-digit verification code (stored temporarily in memory)
    - Sends email with a **verification link** via SMTP using Nodemailer

      The link looks like:

      `http://FRONTEND_URL/verify?email=...&code=...`

2.  `POST /auth/verify-code`
    - Validates email + code
    - Updates the password in the DB (if code is correct)

---

## Getting Started

1. Install dependencies  
   `npm install`

2. Generate Prisma client  
   `npx prisma generate`

3. Apply DB schema  
   `npx prisma migrate dev --name init`

4. Run server  
   `npm run dev`

5. Inspect DB with Prisma Studio (GUI for DB)  
   `npx prisma studio`

---

## Current Features

- [x] Request login code by email
- [x] Verify code and set password
- [x] Add user account to the DB
- [x] Login functionality
- [x] Predict job match score
- [x] Tracking functionality

---

## 📌 Notes

- DB schema was defined in `schema.prisma` and written in its own DSL
- Prisma client (allows interaction between backend code and DB) is imported from `./generated/prisma` and is only compatible with js and ts
- The `.env` file stores sensitive credentials to keep them secure and separate from the code
- Modular (layered) architecture = scalable, testable, clean

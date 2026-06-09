# Power India Services CRM — Setup Guide

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Environment variables
Copy `.env.example` to `.env.local` and fill in your values:
```bash
cp .env.example .env.local
```

Required variables:
| Variable | Description |
|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string |
| `NEXTAUTH_SECRET` | Random secret (`openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Your app URL (e.g. `http://localhost:3000`) |
| `NEXT_PUBLIC_APP_URL` | Same as above (used in emails) |
| `SMTP_HOST` | SMTP server (e.g. `smtp.gmail.com`) |
| `SMTP_PORT` | Usually `587` (TLS) or `465` (SSL) |
| `SMTP_USER` | Your email address |
| `SMTP_PASS` | App password (not your real password) |
| `SMTP_FROM` | Display name + email |

### 3. Gmail App Password Setup
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to [App Passwords](https://myaccount.google.com/apppasswords)
4. Generate a password for "Mail" → use it as `SMTP_PASS`

### 4. Create the first Admin user
Since registration is invite-only, seed the first Admin directly:
```bash
npm run seed
# or run this in MongoDB shell:
```
```js
db.users.insertOne({
  name: "Super Admin",
  email: "admin@powerindia.com",
  password: "$2a$12$...", // bcrypt hash of your password
  role: "Admin",
  isActive: true,
  isRegistered: true,
  createdAt: new Date()
})
```

Or use the seed script:
```bash
npx ts-node scripts/seed-admin.ts
```

### 5. Run development server
```bash
npm run dev
```

---

## Auth Flow

### Employee Registration (Invite-based)
```
Admin → Employees → "Invite Employee" → Fill name, email, role
     ↓
Email sent with /register?token=xxx link (expires 48h)
     ↓
Employee clicks link → Sets password → Account activated
     ↓
Employee can now login at /login
```

### Forgot Password
```
User → /login → "Forgot your password?"
     ↓
Enter email → Reset link sent (expires 1h)
     ↓
Click link → /reset-password?token=xxx → Set new password
     ↓
Confirmation email sent → Redirect to /login
```

---

## Role Access Matrix

| Role | Pages |
|---|---|
| **Admin** | All pages + Employee management + Settings |
| **Management** | All pages (read + limited edit) + Reports |
| **Sales** | Own Leads + Own Tasks + Dashboard |
| **Documentation** | Own Tasks + Documents + Certifications |
| **Accounts** | Finance + Invoices + Clients + Certifications |

---

## Lead Management Pipeline

| Stage | Status | Action |
|---|---|---|
| 1 | New | Lead created |
| 2 | Assigned | Task assigned to employee |
| 3 | In Progress | Employee following up |
| 4 | Contacted/Nurturing/Matured | Status updated after follow-up |
| 5 | Converted | Client ID created |
| 6 | — | PI / Proforma Invoice generated |
| 7 | — | Invoice payment received |
| 8 | — | Certificate / Service delivered |
| 9 | Completed | Case closed |

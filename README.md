# Agency MCM Portal

A modern agency operations dashboard built with Next.js, React, Tailwind CSS, NextAuth, and Prisma.

This project is designed for marketing and client-management workflows, with dedicated areas for campaign oversight, client accounts, leads, and reporting. The current codebase is positioned as a front-end product prototype with authentication scaffolding and Prisma models in place for future backend expansion.

## Overview

Agency MCM Portal provides a premium dashboard experience for agencies that need a single workspace to monitor:

- Portfolio-level performance
- Client account health
- Advertising campaigns across channels
- Lead pipeline activity
- Reporting and exported insights

The UI is built around a polished SaaS-style layout with responsive dashboard views and interactive charts.

## Current Feature Scope

The application currently includes:

- Landing and login experience
- Protected dashboard routes via middleware
- Dashboard summary view with performance visuals
- Client accounts module
- Ads manager module
- Leads inbox module
- Reports and insights module
- Prisma schema for users, client accounts, leads, ad accounts, campaigns, and metrics

## Current Implementation Notes

This repository is not yet a fully wired production system. A few important details:

- Most dashboard screens currently render mock data for UI and product prototyping.
- Authentication is configured with NextAuth credentials and includes a mock login path for local testing.
- Prisma is set up and partially referenced, but the Prisma adapter is currently commented out in [`auth.ts`](C:/Users/HP/Documents/Agency-MCM-Portal/agency-mcm-portal/auth.ts).
- The login page currently signs in with hardcoded demo credentials for prototype convenience.

Demo sign-in used by the current implementation:

- Email: `admin@agency.com`
- Password: `password`

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- UI: React 19, Tailwind CSS 4, shadcn-style components
- Authentication: NextAuth v5 beta
- ORM: Prisma
- Database: PostgreSQL
- Charts: ApexCharts, Recharts
- Icons and Motion: Lucide React, Framer Motion

## Project Structure

```text
app/
  api/auth/[...nextauth]/   NextAuth route handler
  dashboard/                Protected application routes
  login/                    Login page
components/                 Shared UI and app components
context/                    React context providers
hooks/                      Custom hooks
lib/                        Shared utilities and Prisma client
prisma/                     Prisma schema
public/                     Static assets
auth.ts                     Main NextAuth setup
auth.config.ts              Shared auth configuration
middleware.ts               Route protection
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- PostgreSQL

### Installation

```bash
git clone https://github.com/<your-username>/agency-mcm-portal.git
cd agency-mcm-portal
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/agency_portal"
NEXTAUTH_SECRET="replace-with-a-secure-random-string"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Push the schema to your local database:

```bash
npx prisma db push
```

Optional: inspect the database with Prisma Studio:

```bash
npx prisma studio
```

### Run the App

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Authentication and Access Control

- `/dashboard` routes are protected by [`middleware.ts`](C:/Users/HP/Documents/Agency-MCM-Portal/agency-mcm-portal/middleware.ts)
- Unauthenticated users are redirected away from protected routes
- Login currently uses a credentials provider and prototype-friendly mock access
- The codebase is structured to support deeper Prisma-backed auth flows later

## Prisma Data Model

The Prisma schema currently models:

- `User`
- `Account`
- `Session`
- `VerificationToken`
- `ClientAccount`
- `AdAccount`
- `AdCampaign`
- `AdMetric`
- `Lead`

This provides a strong base for evolving the portal from a front-end prototype into a fully data-backed agency operations platform.

## Deployment

The project can be deployed on platforms such as Vercel.

Before deploying:

- Set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL`
- Ensure the PostgreSQL database is reachable from the deployment environment
- Run Prisma generation as part of the build pipeline if needed
- Review the current mock authentication behavior before exposing the app publicly

## Roadmap Ideas

- Replace mock dashboard data with live database-backed queries
- Enable Prisma adapter in NextAuth
- Add secure password hashing and user provisioning
- Add role-based access for agency admins and client users
- Support report exports and client sharing workflows
- Connect real ad platform and CRM data sources

## License

This project is currently private/internal unless you choose to publish it under a separate license.

# Symphony Deck Platform

A full-stack web application for creating, managing, and presenting slide decks for Symphony — Your Integrated HV Infrastructure Partner.

## Tech Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (from motion/react)
- **Auth**: NextAuth.js v5 (credentials provider)
- **Drag & Drop**: @dnd-kit/core

## Quick Start

### Prerequisites

- Node.js 22+
- Docker & Docker Compose (for PostgreSQL)

### Setup

1. **Start the database:**
   ```bash
   docker-compose up db -d
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Push the database schema:**
   ```bash
   npx prisma db push
   ```

4. **Seed the database:**
   ```bash
   npx prisma db seed
   ```

5. **Start the dev server:**
   ```bash
   npm run dev
   ```

6. **Open the app:**
   - Login: http://localhost:3000/login
   - Email: `admin@symphony.com`
   - Password: `changeme123`

### Docker (Full Stack)

```bash
docker-compose up --build
```

This starts both PostgreSQL and the Next.js app. Access at http://localhost:3000.

## Features

- **Admin Dashboard** with slide library management, deck builder, and user management
- **Slide Library** with 10 component types (Hero, Value Chain, Products Grid, Partnership Overview, Partnership Configurator, Why We Exist, Text Block, Stats Block, Leadership Team, Image Block)
- **Deck Builder** with drag-and-drop composition and live preview
- **Deck Viewer** — full-screen scrollable presentations with dark/light theme toggle
- **Role-based access** (Admin / Viewer)
- **Brand Guide** page with colour swatches, typography scale, and component patterns

## Project Structure

```
src/
  app/           # Next.js App Router pages
  components/
    admin/       # Dashboard components (Sidebar, Topbar, forms)
    slides/      # All slide type components
    deck-viewer/ # Presentation viewer components
    ui/          # Shared UI primitives (Button, Card, Input, etc.)
  icons/         # Isometric SVG icon components
  lib/           # Brand system, Prisma client, auth config, slide registry
  types/         # Shared TypeScript types
prisma/          # Schema and seed script
```

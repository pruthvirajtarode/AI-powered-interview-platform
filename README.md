# AI-Powered Interview Platform (LineupX Replica)

A next-generation recruitment platform leveraging AI for resume analysis, smart job matching, and automated video interviews.

## 🚀 Features

- **Students:** Profile management, AI resume parsing, automated job matching, and interactive interview simulations.
- **Employers:** Company profiles, job postings, candidate tracking, and AI-driven screening.
- **AI Engine:** GPT-4 powered resume parsing, contextual job match scoring, and automated interview question generation.
- **Interview System:** Premium WebRTC interview room with live-coding, recording, and real-time AI objectives.

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Frontend:** React, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** Node.js API Routes, Prisma ORM
- **Database:** PostgreSQL (Supabase/Neon recommended)
- **Auth:** NextAuth.js
- **AI:** OpenAI GPT-4
- **Real-time:** WebRTC / Twilio Video

## 🛠 Setup Instructions

### 1. Installation
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env` and fill in your credentials:
- `DATABASE_URL`: Your PostgreSQL connection string.
- `NEXTAUTH_SECRET`: Random string for JWT signing.
- `OPENAI_API_KEY`: Your OpenAI API key.

### 3. Database Initialization
```bash
npx prisma db push
npx prisma generate
```

### 4. Running the Development Server
```bash
npm run dev
```

## 🏗 Project Architecture

- `src/app`: App router pages and layouts.
- `src/components`: UI library and reusable features.
- `src/services`: Business logic and AI integrations.
- `src/lib`: Core utilities (Prisma, NextAuth, help functions).
- `prisma`: Database schema and migrations.
- `public`: Static assets including generated images and logos.

## 🎨 UI & Design

The platform uses a premium design system featuring:
- **Glass-morphism:** Modern blurred backgrounds for overlays and cards.
- **Premium Color Palette:** Custom HSL-based primary and secondary colors.
- **Responsive Layouts:** Mobile-first approach for all major portals.
- **Animations:** Smooth transitions and micro-interactions using Framer Motion.

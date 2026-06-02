# FANs (Formerly ULTRA_FAN)

The ultimate global football fan community platform built for the FIFA World Cup 2026. Experience the intensity of the beautiful game by tracking live match telemetry, joining active community chat channels, locking in your predictions, and dominating the global leaderboard.

![Project Preview](https://images.unsplash.com/photo-1518605368461-1e1252281136?q=80&w=2000&auto=format&fit=crop)

## 🌟 Key Features

- **Match Center (Live & Upcoming):** Real-time telemetry, live scores, and upcoming fixtures fetched directly from football-data APIs.
- **Community Chat Rooms:** Dedicated global region chats (e.g., Brazil Fans, France Fans) with live typing, active fan counts, and interactive match event feeds.
- **Global Fan Wall:** An intelligence feed to share opinions, trends (`#WorldCupFinal`, `#ViniJrGoal`), and interact with thousands of fans globally.
- **Predictions & Leaderboards:** Make accurate predictions on live matches, earn XP, unlock custom badges, and climb the global fan rankings.
- **User Profiles:** Personalized dashboards featuring a GitHub-style prediction activity grid, collected badges, and overall accuracy stats.
- **Authentication:** Secure Google OAuth and Email/Password authentication using Appwrite, complete with protected routing.

## 🛠 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + Custom CSS Variables
- **Backend & Auth:** [Appwrite Cloud](https://appwrite.io/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)

## 📂 Project Structure

```text
ultrafan/
├── app/
│   ├── api/matches/       # API route for fetching live football telemetry
│   ├── auth/callback/     # Appwrite OAuth redirect handler
│   ├── community/         # Community chat and live forums
│   ├── fanwall/           # Global posts and trending feeds
│   ├── predictions/       # Match prediction boards
│   ├── profile/           # User profile and stats dashboard
│   ├── watch/             # Live Match Center
│   ├── layout.tsx         # Root layout with Navbar and AuthProvider
│   └── page.tsx           # Landing page hero
├── components/
│   ├── ui/                # Reusable micro-components (animations, patterns)
│   ├── AuthGuard.tsx      # Route protection higher-order component
│   ├── AuthModal.tsx      # Unified Login/Registration interface
│   ├── MatchCard.tsx      # Live match display card with goal flash states
│   └── Navbar.tsx         # Main global navigation
├── context/
│   └── AuthContext.tsx    # Appwrite session management and global user state
├── hooks/
│   └── useLiveMatches.ts  # Real-time match data hook with AbortController
├── lib/
│   └── appwrite.ts        # Appwrite SDK initialization and user schemas
└── public/                # Static assets
```

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn

### 2. Environment Setup
Create a `.env.local` file in the root directory and add your keys:

```env
# Appwrite Configuration
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_DATABASE_ID=ultrafan_db
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=users
NEXT_PUBLIC_APPWRITE_POSTS_COLLECTION=fanposts

# External Data API
FOOTBALL_API_KEY=your_football_data_api_key
```

### 3. Database Schema Setup (Appwrite)
Ensure your `users` collection in Appwrite matches this exact schema with Document Security enabled:
- `userId` (String, Required)
- `name` (String, Required)
- `email` (String, Required)
- `avatar` (URL/String, Optional)
- `favoriteTeam` (String, Optional)
- `fanPoints` (Integer, Default 0)
- `globalRank` (Integer, Default 0)
- `badges` (String Array, Optional)
- `createdAt` (Datetime, Required)

### 4. Installation & Running Locally

Install the project dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🛡️ Security & Route Protection
The project utilizes a client-side `<AuthGuard>` wrapper. If a user attempts to access protected routes (`/community`, `/predictions`, `/profile`) without an active Appwrite session, they will automatically be presented with the `AuthModal` to log in, preventing unauthorized access.

## 🎨 Design Philosophy
The platform is designed with a premium, cyberpunk-inspired aesthetic. Key design tokens include:
- Background: `#0D1117`
- Accent / Neon Glow: `#00FF87`
- Typography: `Orbitron` (Headers) and `Inter` (Body)
- Accents: Glassmorphism backdrops, pulse animations, and gradient glows.

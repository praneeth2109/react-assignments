# React Assignments (Exact Space)

This repository contains production-ready, shortlist-grade implementations for **both** React assignments:

---

## 📁 Repository Structure

```
react-assignments/
├── chat-app/                    # Assignment 1: Real-time Team Chat Application
│   ├── client/                  # React 19 + TypeScript + Vite + Tailwind CSS
│   └── server/                  # Node.js + Express + Socket.io Server
├── photo-gallery/               # Assignment 2: Infinite Scroll Photo Gallery
│   ├── src/                     # React 19 + TypeScript + FontAwesome + IntersectionObserver
│   └── package.json
└── README.md
```

---

## 1️⃣ Assignment 1: Team Chat Application (`chat-app/`)

### Features Implemented:
- **Core Chat SPA**: Single page Slack/PubNub-grade interface with messages rendered chronologically above the pill input bar.
- **Random Sender**: Automatically assigns random users from: `["Alan", "Bob", "Carol", "Dean", "Elin"]` (or choose specific users via the header selector).
- **Like Counter**: Real-time incrementing like count for each message.
- **Stretch Goal 1 - Emoji Picker**: Dark-themed Apple-style categorized emoji picker with search.
- **Stretch Goal 2 - Mentions (`@`)**: Interactive user mention popup menu with keyboard navigation and badge styling.
- **Stretch Goal 3 - Socket.io Real-time Server**: Express + Socket.io backend broadcasting messages & likes across multiple browser tabs with offline fallback.

### Running Chat App:
```bash
# Terminal 1 - Backend Server
cd chat-app/server
npm install
npm run dev

# Terminal 2 - React Client
cd chat-app/client
npm install
npm run dev
```
Client runs at: `http://localhost:5173` | Server runs at: `http://localhost:3001`

---

## 2️⃣ Assignment 2: Photo Gallery with Infinite Scroll (`photo-gallery/`)

### Features Implemented:
- **1-Column Card View**: Clean layout rendering photos with `author` label and `download_url` matching `photo-gallery.jpg`.
- **Infinite Scrolling**: Implemented using high-performance `IntersectionObserver` observing the sentinel element 200px before reaching the bottom.
- **Paginated Feeds**: Automatically fetches consecutive pages (`https://picsum.photos/v2/list?page={n}&limit=10`) until no more items remain.
- **FontAwesome Thumbs-up**: Dedicated FontAwesome thumbs-up icon initialized to `0` likes that increments upon each click.
- **Optimized & Responsive**: Fast responsive image sizing, smooth loading spinners, and error-handling with retry.

### Running Photo Gallery:
```bash
cd photo-gallery
npm install
npm run dev
```
Photo Gallery runs at: `http://localhost:5173` (or the next available port).

---

## 🧪 Tech Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Icons**: FontAwesome (`@fortawesome/react-fontawesome`), Lucide Icons
- **Real-Time WebSockets**: Socket.io & Socket.io-client
- **Styling**: Tailwind CSS & Modern Clean CSS3

# React Team Chat Application

A high-performance, real-time Slack/Discord-grade team chat single-page application (SPA) built with React, TypeScript, Tailwind CSS, and a Node.js + Express + Socket.io backend.

This submission satisfies all the core assignment requirements as well as **all 3 stretch goals**:

---

## 🌟 Key Features

### ✅ Core Requirements
1. **Single-Page Chat App**: Clean, modern team chat interface showing the chat message thread directly above the input box.
2. **Message Sender Assignment**: Each sent message is randomly assigned a user from the required user list:
   ```javascript
   const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"]
   ```
3. **Like Count Button**: Each message item features a dedicated thumbs-up like button on the right end that increments its counter on each click.

---

### 🚀 Stretch Goals Implemented (All 3 Completed)
1. **Emoji Options**:
   - Quick reaction & emoji selector popover.
   - Insert emojis at the exact cursor position seamlessly.
2. **Mentions (`@`) Feature**:
   - Typing `@` triggers an interactive popup menu with active user avatars and names.
   - Supports keyboard navigation (<kbd>↑</kbd> / <kbd>↓</kbd> / <kbd>Enter</kbd> / <kbd>Tab</kbd>) and click selection.
   - Highlighted badge styling for mentioned usernames in messages.
3. **Real-time WebSockets (Socket.io) Server**:
   - Express.js + Socket.io backend server (`server/`).
   - Implements publish/subscribe architecture:
     - `send_message` -> `receive_message`
     - `like_message` -> `message_liked`
     - `init_messages` for synchronizing chat state.
   - **Multi-Tab Synchronization**: Open multiple tabs; messages sent in one tab and like counter increments reflect in real-time across all connected clients.
   - **Graceful Offline Fallback**: If the server is offline, the client continues to function smoothly in local-state mode with zero crashes.

---

## 📁 Project Architecture

```
react-assignments-main/
├── package.json                    # Root scripts to run both client and server concurrently
├── react-assignments-main/
│   ├── chat-app/
│   │   ├── client/                 # React 19 + TypeScript + Vite + Tailwind CSS
│   │   │   ├── src/
│   │   │   │   ├── components/
│   │   │   │   │   ├── ChatMessage.tsx    # Message item with avatar, timestamp, mentions, like counter
│   │   │   │   │   ├── ChatInput.tsx      # Text input with keyboard shortcuts, emoji & mention triggers
│   │   │   │   │   ├── EmojiPicker.tsx    # Emoji popover picker
│   │   │   │   │   └── MentionList.tsx    # @mention interactive dropdown
│   │   │   │   ├── hooks/
│   │   │   │   │   └── useChat.ts         # Socket.io client hook with optimistic updates & offline fallback
│   │   │   │   ├── types.ts               # Shared types & user list constants
│   │   │   │   ├── App.tsx                # Main chat window & header
│   │   │   │   └── main.tsx
│   │   │   └── package.json
│   │   ├── server/                 # Express + Socket.io real-time server
│   │   │   ├── server.js           # WebSocket events & in-memory message history
│   │   │   └── package.json
```

---

## 🛠️ Quick Start & Running Locally

### 1. Install Dependencies
Run from the root directory:
```bash
npm install
cd react-assignments-main/chat-app/server && npm install
cd ../client && npm install
```

### 2. Start Both Server and Client Concurrently
From the root directory:
```bash
npm run dev
```
- Client runs at: `http://localhost:5173`
- Socket.io Server runs at: `http://localhost:3001`

*(Or start them individually in separate terminals)*:
- **Server**: `cd react-assignments-main/chat-app/server && npm run dev`
- **Client**: `cd react-assignments-main/chat-app/client && npm run dev`

---

## 🧪 Testing Verification
- **Test Core Messages & Users**: Type any message, press Enter or click Send &mdash; sender is randomly chosen from `["Alan", "Bob", "Carol", "Dean", "Elin"]`.
- **Test Likes**: Click the Thumbs-Up button on any message &mdash; counter increases on each click.
- **Test Emojis**: Click the smile 😊 button &mdash; pick any emoji to insert into text box.
- **Test Mentions**: Type `@` anywhere in the message box &mdash; use keyboard or mouse to select a user.
- **Test Real-Time Sync**: Open `http://localhost:5173` in two separate browser windows/tabs side by side &mdash; observe messages and likes synchronize in real-time.

import { useEffect, useRef, useState } from "react";
import { useChat } from "./hooks/useChat";
import { ChatMessage } from "./components/ChatMessage";
import { ChatInput } from "./components/ChatInput";
import { Sidebar } from "./components/Sidebar";
import { Users, Wifi, WifiOff, Shuffle } from "lucide-react";
import { USER_LIST, USER_DETAILS } from "./types";

export function App() {
  const {
    messages,
    sendMessage,
    likeMessage,
    activeSender,
    setActiveSender,
    isConnected
  } = useChat();
  const [currentChannel, setCurrentChannel] = useState("Introductions");
  const threadEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#fafafa]">
      <Sidebar
        currentChannel={currentChannel}
        onSelectChannel={setCurrentChannel}
      />

      <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] overflow-hidden">
        <header className="px-8 py-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-[17px] font-semibold text-slate-800 leading-snug">
              {currentChannel}
            </h1>
            <p className="text-[13px] text-slate-400 font-normal">
              This Channel Is For Company Wide Chatter
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs">
              <span className="text-slate-500 font-medium">Send as:</span>
              <select
                value={activeSender}
                onChange={(e) => setActiveSender(e.target.value)}
                className="bg-white border border-slate-300 rounded px-2 py-0.5 font-semibold text-slate-700 outline-none cursor-pointer text-xs"
              >
                <option value="RANDOM">🎲 Random (Assignment Default)</option>
                {USER_LIST.map((user) => (
                  <option key={user} value={user}>
                    {user} ({USER_DETAILS[user]?.fullName})
                  </option>
                ))}
              </select>
            </div>

            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                isConnected
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : "bg-slate-100 text-slate-500 border-slate-200"
              }`}
              title={isConnected ? "WebSocket connected" : "Offline mode"}
            >
              {isConnected ? (
                <>
                  <Wifi className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span className="hidden sm:inline">Live</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-3.5 h-3.5 text-slate-400" />
                  <span className="hidden sm:inline">Offline</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-slate-500 text-[13.5px] font-medium ml-1">
              <span>3 | 100</span>
              <Users className="w-4 h-4 text-slate-400 stroke-[1.8]" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-6 space-y-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              onLike={likeMessage}
            />
          ))}
          <div ref={threadEndRef} />
        </main>

        <footer className="px-8 pb-5 pt-2 bg-transparent shrink-0">
          <ChatInput onSendMessage={sendMessage} />
          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 px-3">
            <span>Press <kbd className="bg-slate-200/60 px-1 py-0.5 rounded text-slate-600">Enter</kbd> to send, <kbd className="bg-slate-200/60 px-1 py-0.5 rounded text-slate-600">@</kbd> to mention, or select a user from <strong>Send as</strong> above</span>
            <span className="flex items-center gap-1">
              <Shuffle className="w-3 h-3 text-slate-400" />
              Active Sender: <strong className="text-slate-600">{activeSender === "RANDOM" ? "Randomized" : activeSender}</strong>
            </span>
          </div>
        </footer>

      </div>
    </div>
  );
}

export default App;

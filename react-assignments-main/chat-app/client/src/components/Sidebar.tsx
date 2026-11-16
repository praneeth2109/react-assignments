import React from "react";
import { Plus, Hash } from "lucide-react";

interface SidebarProps {
  currentChannel: string;
  onSelectChannel: (channel: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentChannel, onSelectChannel }) => {
  const channels = [
    { id: "poland", name: "Poland Office" },
    { id: "introductions", name: "Introductions" },
    { id: "india", name: "India Office" },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-200/80 flex flex-col shrink-0 select-none">
      {/* Current User Profile Header */}
      <div className="p-6 flex items-center gap-3.5">
        <div className="relative">
          {/* Salmon pink avatar with RR initials */}
          <div className="w-13 h-13 rounded-full bg-[#e59995] text-white flex items-center justify-center font-medium text-lg shadow-xs">
            RR
          </div>
          {/* Online green indicator badge */}
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#51cf66] border-2 border-white rounded-full"></span>
        </div>
        <div>
          <h2 className="text-[15px] font-bold text-slate-800 leading-tight">Rolande Raimondi</h2>
          <p className="text-xs text-slate-400 font-normal mt-0.5">Research Nurse</p>
        </div>
      </div>

      {/* Conversations Section */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between text-slate-600">
        <span className="text-[13px] font-medium tracking-tight">Conversations</span>
        <button
          type="button"
          title="New conversation"
          className="w-5 h-5 rounded-full border border-slate-300 text-slate-400 hover:text-slate-700 hover:border-slate-500 flex items-center justify-center transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* Channels List */}
      <nav className="px-3 py-2 space-y-2 flex-1">
        {channels.map((ch) => {
          const isActive = ch.name === currentChannel;
          return (
            <button
              key={ch.id}
              onClick={() => onSelectChannel(ch.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? "bg-[#5c94fa] text-white shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/70"
              }`}
            >
              <div
                className={`w-7 h-7 rounded flex items-center justify-center text-xs ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"
                }`}
              >
                <Hash className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
              <span className="truncate">{ch.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

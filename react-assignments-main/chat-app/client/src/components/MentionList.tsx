import React from "react";
import { USER_DETAILS } from "../types";

interface MentionListProps {
  users: readonly string[];
  selectedIndex: number;
  onSelectUser: (user: string) => void;
}

export const MentionList: React.FC<MentionListProps> = ({
  users,
  selectedIndex,
  onSelectUser
}) => {
  if (users.length === 0) return null;

  return (
    <div className="absolute bottom-full mb-2 left-2 z-50 bg-white border border-slate-200 rounded-xl shadow-xl w-64 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-2 bg-slate-50 border-b border-slate-100">
        Mention Member
      </div>
      <div className="max-h-48 overflow-y-auto py-1">
        {users.map((user, idx) => {
          const detail = USER_DETAILS[user] || {
            fullName: user,
            initials: user.substring(0, 2).toUpperCase(),
            bg: "bg-slate-200",
            text: "text-slate-700"
          };
          const isSelected = idx === selectedIndex;
          return (
            <button
              key={user}
              type="button"
              onClick={() => onSelectUser(user)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                isSelected ? "bg-blue-50 text-blue-900" : "hover:bg-slate-50 text-slate-800"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${detail.bg} ${detail.text}`}
              >
                {detail.initials}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-xs leading-none">@{user}</span>
                <span className="text-[11px] text-slate-400 mt-0.5">{detail.fullName}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

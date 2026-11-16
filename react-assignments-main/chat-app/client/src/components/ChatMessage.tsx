import React from "react";
import type { Message } from "../types";
import { USER_DETAILS } from "../types";
import { ThumbsUp } from "lucide-react";

interface ChatMessageProps {
  message: Message;
  onLike: (id: string) => void;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, onLike }) => {
  const userDetail = USER_DETAILS[message.user] || {
    fullName: message.user,
    initials: message.user.substring(0, 2).toUpperCase(),
    bg: "bg-[#e59995]",
    text: "text-white"
  };

  const renderFormattedText = (text: string) => {
    const parts = text.split(/(@\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <span
            key={index}
            className="inline-block bg-blue-50 text-blue-600 font-semibold px-1 py-0.5 rounded text-[13px] mx-0.5 cursor-pointer hover:underline"
          >
            {part}
          </span>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="flex items-start gap-3 group py-1.5 px-2 hover:bg-slate-50/50 rounded-lg transition-colors">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-[13px] shrink-0 select-none shadow-xs ${userDetail.bg} ${userDetail.text}`}
      >
        {userDetail.initials}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-slate-800 text-[13.5px]">
            {userDetail.fullName}
          </span>
          <span className="text-xs text-slate-400 font-normal">
            {message.timestamp}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-sm px-4 py-2.5 text-[14px] text-slate-700 shadow-[0_2px_8px_rgba(0,0,0,0.04)] max-w-[85%] break-words leading-relaxed">
            {renderFormattedText(message.text)}
          </div>

          <button
            onClick={() => onLike(message.id)}
            title="Like message"
            className="flex items-center gap-1 px-2 py-1 rounded-full text-slate-400 hover:text-blue-500 hover:bg-white border border-transparent hover:border-slate-200 transition-all opacity-80 group-hover:opacity-100 cursor-pointer text-xs"
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${message.likes > 0 ? "fill-blue-500 text-blue-500" : ""}`} />
            <span className="font-semibold text-[11px] text-slate-500">{message.likes}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

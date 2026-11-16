import React, { useState, useRef, useEffect } from "react";
import { Smile, Send } from "lucide-react";
import { USER_LIST } from "../types";
import { EmojiPicker } from "./EmojiPicker";
import { MentionList } from "./MentionList";

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const [selectedMentionIndex, setSelectedMentionIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredUsers = USER_LIST.filter((user) =>
    user.toLowerCase().startsWith(mentionFilter.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false);
        setShowMentions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setText(val);

    const cursorPosition = e.target.selectionStart || val.length;
    const textBeforeCursor = val.slice(0, cursorPosition);
    const lastAtMatch = textBeforeCursor.match(/@(\w*)$/);

    if (lastAtMatch) {
      setShowMentions(true);
      setMentionFilter(lastAtMatch[1]);
      setSelectedMentionIndex(0);
    } else {
      setShowMentions(false);
    }
  };

  const handleSelectMention = (user: string) => {
    if (!inputRef.current) return;
    const cursorPosition = inputRef.current.selectionStart || text.length;
    const textBeforeCursor = text.slice(0, cursorPosition);
    const textAfterCursor = text.slice(cursorPosition);

    const updatedBefore = textBeforeCursor.replace(/@\w*$/, `@${user} `);
    setText(updatedBefore + textAfterCursor);
    setShowMentions(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const nextPos = updatedBefore.length;
        inputRef.current.setSelectionRange(nextPos, nextPos);
      }
    }, 10);
  };

  const handleSelectEmoji = (emoji: string) => {
    if (!inputRef.current) {
      setText((prev) => prev + emoji);
      return;
    }
    const cursorPosition = inputRef.current.selectionStart || text.length;
    const textBeforeCursor = text.slice(0, cursorPosition);
    const textAfterCursor = text.slice(cursorPosition);

    setText(textBeforeCursor + emoji + textAfterCursor);
    setShowEmojiPicker(false);

    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        const nextPos = cursorPosition + emoji.length;
        inputRef.current.setSelectionRange(nextPos, nextPos);
      }
    }, 10);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMentions && filteredUsers.length > 0) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedMentionIndex((prev) => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        return;
      }
      if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        handleSelectMention(filteredUsers[selectedMentionIndex]);
        return;
      }
      if (e.key === "Escape") {
        setShowMentions(false);
        return;
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text.trim());
      setText("");
      setShowEmojiPicker(false);
      setShowMentions(false);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {showMentions && filteredUsers.length > 0 && (
        <MentionList
          users={filteredUsers}
          selectedIndex={selectedMentionIndex}
          onSelectUser={handleSelectMention}
        />
      )}

      {showEmojiPicker && (
        <EmojiPicker
          onSelectEmoji={handleSelectEmoji}
          onClose={() => setShowEmojiPicker(false)}
        />
      )}

      <div className="flex items-center w-full bg-[#f1f3f5] hover:bg-[#e9ecef] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-400 border border-transparent focus-within:border-blue-400 rounded-full px-4 py-2 transition-all shadow-inner/10">
        <input
          ref={inputRef}
          type="text"
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          placeholder="Type Message"
          className="flex-1 bg-transparent border-none outline-none text-slate-800 placeholder-slate-400 text-[14px]"
        />

        <div className="flex items-center gap-1 ml-2">
          <button
            type="button"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
            title="Emoji / Reactions"
            className="text-slate-400 hover:text-slate-700 p-1 rounded-full transition-colors cursor-pointer"
          >
            <Smile className="w-5 h-5 stroke-[1.75]" />
          </button>

          <button
            type="button"
            onClick={handleSend}
            disabled={!text.trim()}
            title="Send"
            className="p-1 rounded-full text-slate-400 hover:text-blue-500 disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 stroke-[2]" />
          </button>
        </div>
      </div>
    </div>
  );
};

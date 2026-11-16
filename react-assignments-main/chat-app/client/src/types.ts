export interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: string;
  likes: number;
  mentions?: string[];
}

export const USER_LIST = ["Ragav", "Praneeth", "sneha", "Dean", "Elin"] as const;
export type UserType = typeof USER_LIST[number];

// Full names matching the PubNub / Team Chat style in the reference image
export const USER_DETAILS: Record<string, { fullName: string; initials: string; bg: string; text: string }> = {
  Ragav: { fullName: "Ragav", initials: "RA", bg: "bg-[#5c7cfa]", text: "text-white" },
  Bob: { fullName: "Bob Martin", initials: "BM", bg: "bg-[#20c997]", text: "text-white" },
  Carol: { fullName: "Carol Danvers", initials: "CD", bg: "bg-[#b197fc]", text: "text-white" },
  Dean: { fullName: "Dean Winchester", initials: "DW", bg: "bg-[#fcc419]", text: "text-slate-900" },
  Elin: { fullName: "Elin Emmanuel", initials: "EE", bg: "bg-[#ff8787]", text: "text-white" },
};

export const COMMON_EMOJIS = [
  "👍", "❤️", "🔥", "🚀", "🎉", "😄", "😂", "✨",
  "🙌", "💡", "💯", "👏", "🤔", "👀", "⭐", "☕",
  "👋", "🙏", "🍕", "🥳"
];

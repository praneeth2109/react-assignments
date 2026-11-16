import React from "react";
import EmojiPickerReact, { Theme, EmojiStyle, SuggestionMode } from "emoji-picker-react";

interface EmojiPickerProps {
  onSelectEmoji: (emoji: string) => void;
  onClose: () => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelectEmoji }) => {
  return (
    <div className="absolute bottom-full mb-3 right-0 z-50 shadow-2xl rounded-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-neutral-800">
      <EmojiPickerReact
        theme={Theme.DARK}
        emojiStyle={EmojiStyle.APPLE}
        onEmojiClick={(emojiData) => {
          onSelectEmoji(emojiData.emoji);
        }}
        autoFocusSearch={false}
        searchPlaceHolder="Search"
        suggestedEmojisMode={SuggestionMode.FREQUENT}
        width={340}
        height={430}
        previewConfig={{
          showPreview: false,
        }}
      />
    </div>
  );
};

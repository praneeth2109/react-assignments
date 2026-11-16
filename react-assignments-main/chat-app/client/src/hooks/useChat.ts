import { useEffect, useState, useRef, useCallback } from "react";
import { io, type Socket } from "socket.io-client";
import type { Message } from "../types";
import { USER_LIST } from "../types";

const SERVER_URL = "http://localhost:3001";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "seed-bot",
      user: "PubNub Bot",
      text: "Welcome to Team Chat. 👏👏 Send a message now to start interacting with other users in the app. ⬇️",
      timestamp: "12:16",
      likes: 1
    },
    {
      id: "seed-gregory",
      user: "Alan",
      text: "Hey everyone!",
      timestamp: "17:28",
      likes: 0
    },
    {
      id: "seed-elin",
      user: "Elin",
      text: "Oh hi, Gregory! Rolande is around, too...",
      timestamp: "17:30",
      likes: 2
    }
  ]);

  // Active sender: defaults to "Random (Auto)", or the user can select an explicit user!
  const [activeSender, setActiveSender] = useState<string>("RANDOM");
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SERVER_URL, {
      reconnectionAttempts: 5,
      timeout: 3000,
      autoConnect: true
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("[useChat] Connected to WebSocket server:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("[useChat] Disconnected from WebSocket server");
      setIsConnected(false);
    });

    socket.on("connect_error", () => {
      setIsConnected(false);
    });

    socket.on("init_messages", (initialMessages: Message[]) => {
      if (Array.isArray(initialMessages) && initialMessages.length > 0) {
        setMessages(initialMessages);
      }
    });

    socket.on("receive_message", (newMsg: Message) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === newMsg.id)) {
          return prev;
        }
        return [...prev, newMsg];
      });
    });

    socket.on("message_liked", ({ messageId, likes }: { messageId: string; likes: number }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === messageId ? { ...msg, likes } : msg))
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = useCallback((text: string, customSender?: string) => {
    // If a customSender is provided or activeSender is selected, use it.
    // Otherwise, pick randomly from USER_LIST as per assignment requirement!
    let senderName = customSender || (activeSender !== "RANDOM" ? activeSender : null);
    if (!senderName) {
      senderName = USER_LIST[Math.floor(Math.random() * USER_LIST.length)];
    }

    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      user: senderName,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false }),
      likes: 0
    };

    if (socketRef.current && isConnected) {
      socketRef.current.emit("send_message", newMessage);
    } else {
      setMessages((prev) => [...prev, newMessage]);
    }
  }, [activeSender, isConnected]);

  const likeMessage = useCallback((messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );

    if (socketRef.current && isConnected) {
      socketRef.current.emit("like_message", { messageId });
    }
  }, [isConnected]);

  return {
    messages,
    sendMessage,
    likeMessage,
    activeSender,
    setActiveSender,
    isConnected
  };
}

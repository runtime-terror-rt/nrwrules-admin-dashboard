"use client";

import { useState } from "react";
import { Chat, Message, Project } from "@/types/chat";
import Cookies from "js-cookie";
import { toast } from "sonner";

function uid() {
  return Math.random().toString(36).slice(2);
}

// API Response Types
interface AIResponse {
  success: boolean;
  message: string;
  data: {
    chat_id: string;
    mode: string;
    pregnancy_week: number;
    postpartum_day: number;
    delivery_type: string;
    language: string;
    country: string;
    tone_of_ai: string;
    support_type: string;
    dietary_preferences: string;
    user_message: string;
    ai_response: string;
    is_emergency: boolean;
    quota_exceeded: boolean;
    used_today: number;
    daily_query_limit: number;
    image_path: string | null;
    file_path: string | null;
    user_id: number;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

// Chat Settings / Context
interface ChatSettings {
  language: string;
  country: string;
  mode: string;
  pregnancy_week: string;
  postpartum_day: string;
  delivery_type: string;
  tone_of_ai: string;
  support_type: string;
  dietary_preferences: string;
}

const DEFAULT_SETTINGS: ChatSettings = {
  language: "en",
  country: "bd",
  mode: "pregnancy",
  pregnancy_week: "3",
  postpartum_day: "0",
  delivery_type: "vaginal",
  tone_of_ai: "empathetic",
  support_type: "emotional",
  dietary_preferences: "no_restriction",
};

export function useChatStore() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "p1",
      name: "Default Project",
      chats: [],
    },
  ]);

  // Standalone chats (History)
  const [history, setHistory] = useState<Chat[]>([
    {
      id: "h1",
      title: "You Could Use Some of Your Equity...",
      messages: [],
      createdAt: 1737517000000,
    },
    {
      id: "h2",
      title: "More Homes for Sale Isn't a Warning...",
      messages: [],
      createdAt: 1737417000000,
    },
  ]);

  // Loading state for messages
  const [isLoading, setIsLoading] = useState(false);

  // Chat Settings
  const [chatSettings, setChatSettings] =
    useState<ChatSettings>(DEFAULT_SETTINGS);

  // If null, we are in History mode. If string, we are in Project mode.
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeProject = activeProjectId
    ? projects.find((p) => p.id === activeProjectId) || null
    : null;

  const activeChat = activeProjectId
    ? activeProject?.chats.find((c) => c.id === activeChatId) || null
    : history.find((c) => c.id === activeChatId) || null;

  function createProject(name: string) {
    const newProject = { id: uid(), name, chats: [] };
    setProjects((p) => [...p, newProject]);
  }

  function deleteProject(projectId: string) {
    setProjects((p) => p.filter((x) => x.id !== projectId));
    if (projectId === activeProjectId) {
      setActiveProjectId(null);
      setActiveChatId(null);
    }
  }

  /**
   * Create a chat in specific context.
   * If projectId is provided, create in that project.
   * If null/undefined, create in history.
   */
  function createChat(targetProjectId?: string | null) {
    const newChat: Chat = {
      id: uid(),
      title: "New Chat",
      messages: [],
      createdAt: Date.now(),
    };

    // If targetProjectId is explicitly null, use history.
    // If undefined, use current activeProjectId.
    const pid =
      targetProjectId !== undefined ? targetProjectId : activeProjectId;

    if (pid) {
      // Add to Project
      setProjects((prev) =>
        prev.map((p) =>
          p.id === pid ? { ...p, chats: [newChat, ...p.chats] } : p,
        ),
      );
      setActiveProjectId(pid);
    } else {
      // Add to History
      setHistory((prev) => [newChat, ...prev]);
      setActiveProjectId(null);
    }

    setActiveChatId(newChat.id);
  }

  function deleteChat(chatId: string) {
    if (activeProjectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeProjectId
            ? { ...p, chats: p.chats.filter((c) => c.id !== chatId) }
            : p,
        ),
      );
    } else {
      setHistory((prev) => prev.filter((c) => c.id !== chatId));
    }

    if (chatId === activeChatId) {
      setActiveChatId(null);
    }
  }

  function updateChatSettings(newSettings: Partial<ChatSettings>) {
    setChatSettings((prev) => ({ ...prev, ...newSettings }));
  }

  /**
   * Send message to AI Chat API
   * Supports text, image, and file uploads
   */
  async function sendMessageToAPI({
    token,
    chat_id,
    message,
    image,
    file,
  }: {
    token: string;
    chat_id: string;
    message: string;
    image?: File;
    file?: File;
  }): Promise<AIResponse> {
    const formData = new FormData();

    // Required fields
    formData.append("chat_id", chat_id);
    formData.append("message", message);

    // Dynamic fields from settings
    formData.append("language", chatSettings.language);
    formData.append("country", chatSettings.country);
    formData.append("mode", chatSettings.mode);
    formData.append("pregnancy_week", chatSettings.pregnancy_week);
    formData.append("postpartum_day", chatSettings.postpartum_day);
    formData.append("delivery_type", chatSettings.delivery_type);
    formData.append("tone_of_ai", chatSettings.tone_of_ai);
    formData.append("support_type", chatSettings.support_type);
    formData.append("dietary_preferences", chatSettings.dietary_preferences);

    // Add files if provided
    if (image) {
      formData.append("image", image);
    }
    if (file) {
      formData.append("file", file);
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ai-chat-logs`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(
        errorData.message || `API Error: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  }

  /**
   * Helper to add message to the chat
   */
  const addMessageToChat = (
    chatId: string,
    role: "user" | "ai",
    content: string,
    metadata?: Message["metadata"],
  ) => {
    const msg: Message = {
      id: uid(),
      role,
      text: content,
      createdAt: Date.now(),
      metadata,
    };

    if (activeProjectId) {
      setProjects((prev) =>
        prev.map((p) =>
          p.id === activeProjectId
            ? {
                ...p,
                chats: p.chats.map((c) =>
                  c.id === chatId
                    ? { ...c, messages: [...c.messages, msg] }
                    : c,
                ),
              }
            : p,
        ),
      );
    } else {
      setHistory((prev) =>
        prev.map((c) =>
          c.id === chatId ? { ...c, messages: [...c.messages, msg] } : c,
        ),
      );
    }
    return msg;
  };

  /**
   * Send a message (text only for now)
   */
  async function sendMessage(
    text: string,
    options?: { image?: File; file?: File },
  ) {
    if (!activeChatId) {
      toast.error("No active chat. Please create a chat first.");
      return;
    }

    const chatId = activeChatId;

    // Get token from cookies
    const token = Cookies.get("token");
    if (!token) {
      toast.error("Authentication required. Please log in.");
      return;
    }

    // Add user message immediately
    addMessageToChat(chatId, "user", text);

    // Set loading state
    setIsLoading(true);

    try {
      // Call API
      const response = await sendMessageToAPI({
        token,
        chat_id: chatId,
        message: text,
        image: options?.image,
        file: options?.file,
      });

      // Check if successful
      if (!response.success) {
        throw new Error(response.message || "Failed to get AI response");
      }

      // Check quota
      if (response.data.quota_exceeded) {
        toast.warning(
          `Daily query limit reached (${response.data.used_today}/${response.data.daily_query_limit})`,
        );
      }

      // Check emergency
      if (response.data.is_emergency) {
        toast.error(
          "⚠️ Emergency detected! Please call 112 or seek immediate medical attention.",
          { duration: 10000 },
        );
      }

      // Add AI response with metadata
      addMessageToChat(chatId, "ai", response.data.ai_response, {
        is_emergency: response.data.is_emergency,
        quota_exceeded: response.data.quota_exceeded,
        used_today: response.data.used_today,
        daily_query_limit: response.data.daily_query_limit,
      });

      // Show quota info if close to limit
      const remaining =
        response.data.daily_query_limit - response.data.used_today;
      if (remaining <= 2 && remaining > 0) {
        toast.info(`${remaining} queries remaining today`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to send message";
      toast.error(errorMessage);

      // Add error message to chat
      addMessageToChat(
        chatId,
        "ai",
        "Sorry, I encountered an error. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    projects,
    history,
    activeProjectId,
    activeChatId,
    activeProject,
    activeChat,
    isLoading,
    chatSettings,
    setActiveProjectId,
    setActiveChatId,
    createProject,
    deleteProject,
    createChat,
    deleteChat,
    sendMessage,
    updateChatSettings,
  };
}

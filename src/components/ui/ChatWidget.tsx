"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Wrench } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function ChatWidget() {
  // Configuration - Update this URL with your n8n webhook
  const webhookUrl = process.env.NEXT_PUBLIC_CHAT_WEBHOOK_URL || "https://internal.defiantintegration.com/webhook/adirondack-chat";

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize session
  useEffect(() => {
    let storedSessionId = localStorage.getItem("adkChat_sessionId");
    if (!storedSessionId) {
      storedSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("adkChat_sessionId", storedSessionId);
    }
    setSessionId(storedSessionId);

    // Load conversation history
    const savedHistory = localStorage.getItem("adkChat_history");
    if (savedHistory) {
      try {
        setMessages(JSON.parse(savedHistory));
      } catch {
        setMessages([]);
      }
    }
  }, []);

  // Show welcome message for new conversations
  useEffect(() => {
    if (sessionId && messages.length === 0) {
      const timer = setTimeout(() => {
        const welcomeMessage: Message = {
          role: "assistant",
          content: "Hey there! What can we help you with today?",
        };
        setMessages([welcomeMessage]);
        localStorage.setItem("adkChat_history", JSON.stringify([welcomeMessage]));
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [sessionId, messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const saveHistory = (newMessages: Message[]) => {
    localStorage.setItem("adkChat_history", JSON.stringify(newMessages.slice(-30)));
  };

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");

    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    saveHistory(newMessages);

    setIsLoading(true);

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (data.success && (data.response || data.message)) {
        const assistantMessage: Message = { role: "assistant", content: data.response || data.message };
        const updatedMessages = [...newMessages, assistantMessage];
        setMessages(updatedMessages);
        saveHistory(updatedMessages);
      } else {
        // Fallback message
        const fallbackMessage: Message = {
          role: "assistant",
          content: "Thanks! Owen will be in touch soon. Feel free to call or text 518-921-2971 if you need anything sooner!",
        };
        const updatedMessages = [...newMessages, fallbackMessage];
        setMessages(updatedMessages);
        saveHistory(updatedMessages);
      }
    } catch (error) {
      // Error fallback - but be optimistic, they probably got through
      console.error("Chat error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Thanks for your info! Owen will reach out soon. You can also call or text him at 518-921-2971.",
      };
      const updatedMessages = [...newMessages, errorMessage];
      setMessages(updatedMessages);
      saveHistory(updatedMessages);
    }

    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-forest hover:bg-forest-dark transition-colors shadow-lg shadow-black/30 z-50 flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-cream" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6 text-cream" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-5 w-[380px] max-w-[calc(100vw-40px)] h-[520px] max-h-[calc(100vh-120px)] bg-dark-lighter rounded-2xl shadow-2xl shadow-black/30 z-50 flex flex-col overflow-hidden border border-dark-border"
          >
            {/* Header */}
            <div className="bg-forest px-5 py-4 flex items-center gap-3">
              <div className="w-11 h-11 bg-amber rounded-full flex items-center justify-center">
                <Wrench className="w-5 h-5 text-forest" />
              </div>
              <div>
                <h3 className="font-semibold text-cream text-base">Adirondack Handyman</h3>
                <p className="text-cream/80 text-xs">Typically replies instantly</p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-dark">
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-forest text-cream ml-auto rounded-br-sm"
                      : "bg-dark-lighter text-charcoal border border-dark-border rounded-bl-sm"
                  }`}
                >
                  {msg.content}
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-[85%] px-4 py-3 rounded-2xl rounded-bl-sm bg-dark-lighter border border-dark-border"
                >
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-forest rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-forest rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-forest rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-dark-lighter border-t border-dark-border flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 bg-dark border border-dark-border rounded-full text-charcoal text-sm placeholder:text-charcoal-light/50 focus:outline-none focus:border-forest transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !message.trim()}
                className="w-11 h-11 bg-forest hover:bg-forest-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center transition-colors"
              >
                <Send className="w-5 h-5 text-cream" />
              </button>
            </div>

            {/* Footer */}
            <div className="px-3 py-2 bg-dark text-center text-xs text-charcoal-light/60 border-t border-dark-border">
              Questions? Call <a href="tel:5189212971" className="text-forest hover:underline">518-921-2971</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

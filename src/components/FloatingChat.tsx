"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Message {
  sender: "bot" | "user";
  text: string;
  link?: string;
}

const projects = [
  "Advanced Billing System 2024",
  "AGI Virtual Assistant 2023",
  "Smart Mechanic 2023",
];

const techJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why did the robot go on vacation? It needed to recharge!",
  "Why did the developer go broke? Because he used up all his cache!",
  "Why do Java developers wear glasses? Because they don't C#!",
  "Why did the programmer quit his job? Because he didn't get arrays.",
  "Why do coders hate nature? Too many bugs.",
];

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = (text: string, link?: string) => {
    setMessages((prev) => [...prev, { sender: "bot", text, link }]);
  };

  const generateReply = (text: string) => {
    const msg = text.toLowerCase();

    if (msg.includes("name"))
      return addBotMessage("Bhavyarajsinh Raulji — AI Engineer.");

    if (msg.includes("email"))
      return addBotMessage(
        "bhavyarajsinh.career@gmail.com",
        "mailto:bhavyarajsinh.career@gmail.com"
      );

    if (msg.includes("phone"))
      return addBotMessage("+91 8153886480", "tel:+918153886480");

    if (msg.includes("linkedin"))
      return addBotMessage(
        "LinkedIn Profile",
        "https://www.linkedin.com/in/bhavyarajsinh1815/"
      );

    if (msg.includes("github"))
      return addBotMessage(
        "GitHub Profile",
        "https://github.com/Bhavyarajsinh1815"
      );

    if (msg.includes("projects"))
      return addBotMessage(projects.join("\n"));

    if (msg.includes("joke"))
      return addBotMessage(
        techJokes[Math.floor(Math.random() * techJokes.length)]
      );

    addBotMessage("Command not recognized.");
  };

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { sender: "user", text }]);
    setInput("");
    generateReply(text);
  };

  const openOnPress = (url?: string) => {
    if (url) window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#222222] flex items-center justify-center hover:scale-105 transition"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-[#F8F8F8]" />
        ) : (
          <MessageCircle className="w-6 h-6 text-[#F8F8F8]" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="mt-4 w-80 md:w-96 h-[500px] bg-[#F8F8F8] border border-[#E5E5E5] shadow-xl flex flex-col"
          >

            {/* Header */}
            <div className="p-6 border-b border-[#E5E5E5]">
              <h3 className="text-lg font-medium text-[#222222]">
                Assistant
              </h3>
              <p className="text-sm text-[#7B7B7B]">
                Ask about contact, projects or a joke.
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-6 overflow-y-auto space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`max-w-[80%] ${
                    msg.sender === "user"
                      ? "ml-auto text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    onMouseDown={() => openOnPress(msg.link)}
                    className={`inline-block cursor-pointer transition-all duration-300 ${
                      msg.sender === "user"
                        ? "text-[#222222]"
                        : "text-[#7B7B7B] hover:text-[#222222]"
                    }`}
                  >
                    {msg.text.split("\n").map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Commands */}
            <div className="px-6 pb-4 flex flex-wrap gap-3 text-sm text-[#7B7B7B]">
              {["Email", "Phone", "LinkedIn", "GitHub", "Projects", "Joke"].map(
                (cmd, i) => (
                  <button
                    key={i}
                    onClick={() => handleUserMessage(cmd)}
                    className="border-b border-[#E5E5E5] hover:border-[#222222] hover:text-[#222222] transition"
                  >
                    {cmd}
                  </button>
                )
              )}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-[#E5E5E5] flex gap-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleUserMessage(input)
                }
                placeholder="Type here"
                className="flex-1 border-b border-[#E5E5E5] outline-none focus:border-[#222222] text-[#222222]"
              />
              <button
                onClick={() => handleUserMessage(input)}
                className="text-[#7B7B7B] hover:text-[#222222] transition"
              >
                Send
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingChat;

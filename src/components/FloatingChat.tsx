import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";

interface Message {
  sender: "bot" | "user";
  text: string;
}

const projects = [
  "Advanced Billing System 2024",
  "AGI Virtual Assistant 2023",
  "Smart Mechanic 2023"
];

const techJokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs!",
  "Why did the robot go on vacation? It needed to recharge!",
  "Why did the developer go broke? Because he used up all his cache!",
  "Why was the JavaScript developer sad? Because he didn’t know how to 'null' his feelings!",
  "Why do Java developers wear glasses? Because they don't C#!",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "Why do Python programmers have low self-esteem? Because they're constantly comparing themselves to others.",
  "Why was the computer cold? It left its Windows open!",
  "Why did the AI cross the road? To optimize the other side!",
  "Why did the developer go broke? He lost his domain in a bet!",
  "Why do robots love winter? Because they can chill their circuits!",
  "Why did the programmer quit his job? Because he didn't get arrays.",
  "Why do coders always mix up Christmas and Halloween? Because Oct 31 equals Dec 25.",
  "Why did the computer show up at work late? It had a hard drive.",
  "Why did the developer go to therapy? To resolve his inner conflicts.",
  "Why was the robot angry? Because someone kept pushing its buttons.",
  "Why did the AI become a chef? It wanted to byte into everything.",
  "Why do coders hate nature? Too many bugs.",
  "Why did the robot fail school? It kept taking things literally.",
  "Why did the computer go to art school? To learn to draw its GUI."
];

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate bot reply for normal user messages
  const generateBotReply = (text: string) => {
    setTimeout(() => {
      let reply = "Sorry, I don’t understand that yet!";
      const msgLower = text.toLowerCase();

      if (msgLower.includes("name")) reply = "I am Bhavyarajsinh Raulji, Aspiring AI Engineer.";
      else if (msgLower.includes("email")) reply = "You can email me at bhavyarajsinh.career@gmail.com";
      else if (msgLower.includes("phone")) reply = "You can call me at +91 8153886480";
      else if (msgLower.includes("linkedin")) reply = "LinkedIn: https://www.linkedin.com/in/bhavyarajsinh1815/";
      else if (msgLower.includes("github")) reply = "GitHub: https://github.com/Bhavya1815";
      else if (msgLower.includes("projects")) reply = `My projects include:\n${projects.join("\n")}`;
      else if (msgLower.includes("joke") || msgLower.includes("funny")) {
        const randomIndex = Math.floor(Math.random() * techJokes.length);
        reply = techJokes[randomIndex];
      }

      const botMsg: Message = { sender: "bot", text: reply };
      setMessages(prev => [...prev, botMsg]);
      toast.success("AI replied!", { duration: 1000 }); // 1000ms = 1 second
    }, 800);
  };

  const handleUserMessage = (text: string, isGreeting = false) => {
    if (!text.trim()) return;

    const newMsg: Message = { sender: "user", text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    if (!isGreeting) {
      generateBotReply(text);
    }
  };

  const handleQuickClick = (text: string) => handleUserMessage(text);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen)
            handleUserMessage("Hello! 👋 How can I assist you today?", true);
        }}
        className="p-4 bg-gradient-to-tr from-green-400 via-blue-500 to-purple-500 rounded-full shadow-xl hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80 md:w-96 h-[450px] bg-gradient-to-b from-gray-900/90 to-gray-800/90 backdrop-blur-lg shadow-2xl rounded-xl flex flex-col overflow-hidden mt-4"
          >
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] break-words whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-blue-500/80 self-end text-white"
                      : "bg-gray-700/70 self-start text-gray-200"
                  }`}
                >
                  {msg.text.split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Buttons */}
            <div className="flex flex-wrap gap-2 p-2 border-t border-gray-600">
              {["Email", "Phone", "LinkedIn", "GitHub", "Projects", "Joke"].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickClick(btn)}
                  className="flex-1 py-1 px-2 rounded-md bg-blue-600/30 text-white hover:bg-blue-600/60 transition"
                >
                  {btn}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-2 border-t border-gray-600 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUserMessage(input)}
                placeholder="Type your question..."
                className="flex-1 p-2 rounded-md bg-gray-900/50 text-sm text-white focus:outline-none"
              />
              <button
                onClick={() => handleUserMessage(input)}
                className="bg-blue-600/40 px-3 rounded-md hover:bg-blue-600/70 transition"
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

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

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleUserMessage = (text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = { sender: "user", text };
    setMessages(prev => [...prev, newMsg]);
    setInput("");

    setTimeout(() => {
      let reply = "Sorry, I don’t understand that yet!";
      const msgLower = text.toLowerCase();

      if (msgLower.includes("name")) reply = "I am Bhavyarajsinh Raulji, Aspiring AI Engineer.";
      else if (msgLower.includes("email")) reply = "You can email me at bhavyarajsinh.career@gmail.com";
      else if (msgLower.includes("phone")) reply = "You can call me at +91 8153886480";
      else if (msgLower.includes("linkedin")) reply = "LinkedIn: https://www.linkedin.com/in/bhavyarajsinh1815/";
      else if (msgLower.includes("github")) reply = "GitHub: https://github.com/Bhavya1815";
      else if (msgLower.includes("projects")) reply = `My projects include:\n${projects.join("\n")}`;

      setMessages(prev => [...prev, { sender: "bot", text: reply }]);
      toast.success("AI replied!");
    }, 800);
  };

  const handleQuickClick = (text: string) => handleUserMessage(text);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 bg-gradient-accent rounded-full shadow-lg hover:scale-110 transition-transform"
      >
        {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="w-80 md:w-96 h-[400px] bg-white/95 backdrop-blur-lg shadow-xl rounded-xl flex flex-col overflow-hidden mt-4"
          >
            <div className="flex-1 p-4 overflow-y-auto space-y-2">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] ${
                    msg.sender === "user"
                      ? "bg-primary/30 self-end text-white"
                      : "bg-accent/20 self-start text-foreground"
                  }`}
                >
                  {msg.text.split("\n").map((line, idx) => <p key={idx}>{line}</p>)}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="flex flex-wrap gap-2 p-2 border-t border-accent/20">
              {["Email", "Phone", "LinkedIn", "GitHub", "Projects"].map((btn, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickClick(btn)}
                  className="flex-1 py-1 px-2 rounded-md bg-primary/20 text-white hover:bg-primary/40 transition"
                >
                  {btn}
                </button>
              ))}
            </div>

            <div className="p-2 border-t border-accent/20 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUserMessage(input)}
                placeholder="Type your question..."
                className="flex-1 p-2 rounded-md bg-background/50 focus:outline-none text-sm"
              />
              <button
                onClick={() => handleUserMessage(input)}
                className="bg-accent/30 px-3 rounded-md hover:bg-accent/50 transition"
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

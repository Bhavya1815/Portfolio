import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import emailjs from "emailjs-com";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Send,
  MessageCircle,
} from "lucide-react";

// ✅ Your EmailJS keys
const SERVICE_ID = "bhavya18";
const TEMPLATE_ID = "template_dk6quie";
const PUBLIC_KEY = "A-YgXJY3pSFSRuFhO";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [alert, setAlert] = useState<{
    type: "success" | "error" | "info";
    message: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setAlert({ type: "error", message: "All fields are required." });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({ type: "error", message: "Please enter a valid email." });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setAlert({ type: "info", message: "Sending message..." });

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setAlert({ type: "success", message: "Message sent successfully!" });
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => {
        setAlert({ type: "error", message: "Failed to send message. Try again." });
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setAlert(null), 3000); // Auto-hide alert
      });
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "bhavyarajsinh.career@gmail.com",
      href: "mailto:bhavyarajsinh.career@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+91 8153886480",
      href: "tel:+918153886480",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: "Location",
      value: "Vadodara, Gujarat, India",
      href: "#",
    },
  ];

  const socialLinks = [
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/Bhavyarajsinh1815", 
      color: "hover:text-foreground",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/bhavyarajsinh1815", 
      color: "hover:text-blue-400",
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: "WhatsApp",
      href: "https://wa.me/918153886480",
      color: "hover:text-green-400",
    },
  ];

  return (
    <section id="contact" className="py-20 px-6 bg-secondary/20 font-body">
      <div className="max-w-6xl mx-auto">
        {/* Alerts */}
        {alert && (
          <div
            className={`max-w-md mx-auto mb-6 px-4 py-3 rounded-lg text-center text-white transition-all ${
              alert.type === "success"
                ? "bg-green-500"
                : alert.type === "error"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {alert.message}
          </div>
        )}

        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-body">
            Ready to collaborate on innovative projects? Let's discuss how we can
            work together to create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="glass p-8 hover-lift">
              <h3 className="text-2xl font-heading mb-6 flex items-center gap-3">
                <div className="p-2 bg-gradient-tech rounded-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="p-3 bg-secondary/50 rounded-lg group-hover:bg-gradient-tech group-hover:text-white transition-smooth">
                      {info.icon}
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground font-body">
                        {info.label}
                      </div>
                      <a
                        href={info.href}
                        className="font-medium font-body hover:text-primary transition-smooth"
                      >
                        {info.value}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links */}
            <Card className="glass p-8 hover-lift">
              <h3 className="text-2xl font-heading mb-6">Connect With Me</h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-secondary/50 rounded-lg hover:bg-gradient-tech hover:text-white transition-smooth group flex-1 text-center ${social.color}`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      {social.icon}
                      <span className="text-sm font-body font-medium">{social.label}</span>
                    </div>
                  </a>
                ))}
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="glass p-8 hover-lift">
            <h3 className="text-2xl font-heading mb-6 flex items-center gap-3">
              <div className="p-2 bg-gradient-accent rounded-lg">
                <Send className="w-5 h-5 text-white" />
              </div>
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="font-body"
              />
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="font-body"
              />
              <Input
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="font-body"
              />
              <Textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="font-body"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-tech hover:opacity-90 transition-smooth font-body"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;

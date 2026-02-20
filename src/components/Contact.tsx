"use client";

import { useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import { Github, Linkedin, MessageCircle } from "lucide-react";

const SERVICE_ID = "bhavya18";
const TEMPLATE_ID = "template_dk6quie";
const PUBLIC_KEY = "A-YgXJY3pSFSRuFhO";

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("Sending...");

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(() => {
        setStatus("Message sent successfully.");
        setFormData({ name: "", email: "", subject: "", message: "" });
      })
      .catch(() => setStatus("Failed to send message."))
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus(null), 3000);
      });
  };

  const openOnPress = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-8 bg-[#F8F8F8] text-[#222222]"

    >
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div
        ref={sectionRef}
        className={`max-w-7xl mx-auto transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Header */}
        <div className="grid md:grid-cols-3 gap-16 mb-24">
          <div className="md:col-span-1">
            <p className="text-sm uppercase tracking-[0.3em] text-[#7B7B7B] mb-6">
              Contact
            </p>

            <h2 className="text-4xl md:text-5xl font-light leading-tight">
              Let’s Build
              <br />
              Something Meaningful
            </h2>
          </div>

          <div className="md:col-span-2 flex items-end">
            <div className="h-[1px] w-full bg-[#E5E5E5] relative overflow-hidden">
              <div
                className={`absolute left-0 top-0 h-full bg-[#222222] transition-all duration-1000 ${
                  visible ? "w-full" : "w-0"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-24">

          {/* LEFT COLUMN */}
          <div className="space-y-16">

            {/* Email */}
            <div
              onMouseDown={() =>
                openOnPress("mailto:bhavyarajsinh.career@gmail.com")
              }
              className="cursor-pointer group"
            >
              <p className="text-sm text-[#7B7B7B] mb-2">Email</p>
              <div className="relative pb-3 border-b border-[#E5E5E5]">
                <span className="text-xl font-medium transition-all duration-300 group-hover:translate-x-2">
                  bhavyarajsinh.career@gmail.com
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
              </div>
            </div>

            {/* Phone */}
            <div
              onMouseDown={() => openOnPress("tel:+918153886480")}
              className="cursor-pointer group"
            >
              <p className="text-sm text-[#7B7B7B] mb-2">Phone</p>
              <div className="relative pb-3 border-b border-[#E5E5E5]">
                <span className="text-xl font-medium transition-all duration-300 group-hover:translate-x-2">
                  +91 8153886480
                </span>
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#222222] transition-all duration-700 group-hover:w-full" />
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 pt-6">

              <button
                onMouseDown={() =>
                  window.open("https://github.com/Bhavyarajsinh1815", "_blank")
                }
                className="p-4 border border-[#E5E5E5] rounded-full hover:border-[#222222] hover:-translate-y-1 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-[#222222]" />
              </button>

              <button
                onMouseDown={() =>
                  window.open("https://www.linkedin.com/in/bhavyarajsinh1815", "_blank")
                }
                className="p-4 border border-[#E5E5E5] rounded-full hover:border-[#222222] hover:-translate-y-1 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-[#222222]" />
              </button>

              <button
                onMouseDown={() =>
                  window.open("https://wa.me/918153886480", "_blank")
                }
                className="p-4 border border-[#E5E5E5] rounded-full hover:border-[#222222] hover:-translate-y-1 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 text-[#222222]" />
              </button>

            </div>

          </div>

          {/* RIGHT COLUMN — FORM */}
          <div>

            <form onSubmit={handleSubmit} className="space-y-10">

              <div>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full border-b border-[#E5E5E5] pb-3 outline-none focus:border-[#222222] transition-colors"
                />
              </div>

              <div>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full border-b border-[#E5E5E5] pb-3 outline-none focus:border-[#222222] transition-colors"
                />
              </div>

              <div>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  required
                  className="w-full border-b border-[#E5E5E5] pb-3 outline-none focus:border-[#222222] transition-colors"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  rows={4}
                  required
                  className="w-full border-b border-[#E5E5E5] pb-3 outline-none focus:border-[#222222] transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="relative group pt-6"
              >
                <span className="text-lg font-medium">
                  {isSubmitting ? "Sending..." : "Send Message"}
                </span>
                <div className="mt-2 h-[1px] bg-[#222222] w-0 group-hover:w-32 transition-all duration-500" />
              </button>

              {status && (
                <p className="text-sm text-[#7B7B7B] mt-4">
                  {status}
                </p>
              )}

            </form>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

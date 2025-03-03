"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-[#E1306C]" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-[#1DA1F2]" },
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-[#4267B2]" },
  { name: "Youtube", icon: Youtube, href: "#", color: "hover:text-[#FF0000]" },
];

const contactInfo = [
  { id: "email", icon: Mail, text: "contact@example.com", href: "mailto:contact@example.com" },
  { id: "phone", icon: Phone, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
  { id: "address", icon: MapPin, text: "Los Angeles, CA", href: "https://maps.google.com/?q=Los+Angeles,+CA" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative overflow-hidden">
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-accent opacity-30" />
      <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-[hsl(var(--accent-1))] opacity-5 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-[hsl(var(--accent-3))] opacity-5 blur-3xl" />
      
      <div className="container py-16 md:py-20 relative z-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* ブランド情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-gradient-accent">PORTFOLIO</h3>
            <p className="text-muted-foreground">
              Crafting compelling visual stories and cinematic experiences that captivate audiences and leave lasting impressions.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`text-muted-foreground ${social.color} transition-colors duration-300 hover:scale-110 transform`}
                  aria-label={social.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Navigation</h3>
            <ul className="space-y-3">
              {["Works", "Skills", "Achievements", "Contact"].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item.toLowerCase()}`} 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-0 h-0.5 bg-gradient-accent group-hover:w-2 mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* コンタクト情報 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Contact</h3>
            <ul className="space-y-3">
              {contactInfo.map((item) => (
                <li key={item.id}>
                  <a 
                    href={item.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <item.icon className="w-4 h-4 text-[hsl(var(--accent-2))] group-hover:scale-110 transition-transform duration-300" />
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ニュースレター */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-muted-foreground">Subscribe to receive updates on new projects and events.</p>
            <div className="flex mt-2">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-background/50 border border-border rounded-l-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-[hsl(var(--accent-2))] transition-all duration-300"
              />
              <button 
                type="submit"
                className="bg-gradient-accent text-white px-4 rounded-r-md hover:opacity-90 transition-opacity duration-300"
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 pt-8 border-t border-border/50 text-center text-muted-foreground"
        >
          <p>&copy; {currentYear} PORTFOLIO. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
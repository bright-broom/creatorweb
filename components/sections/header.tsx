"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import type { FC } from "react";

// =============================
// 型定義
// =============================
interface NavItem {
  name: string;
  href: string;
}

// =============================
// ナビゲーションリスト（データ化）
// =============================
const navigation: NavItem[] = [
  { name: "Works", href: "#works" },
  { name: "Skills", href: "#skills" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

// =============================
// ヘッダーコンポーネント
// =============================
export const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  // スクロールイベントの処理
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-effect shadow-sm" : ""}`}
    >
      <nav className="container py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <Logo />

          {/* デスクトップナビゲーション */}
          <DesktopNav />

          {/* モバイルメニュー & ダークモード切り替え */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggleButton theme={theme} setTheme={setTheme} />
            <MobileMenuButton isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          </div>
        </div>

        {/* モバイルナビゲーション */}
        <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
      </nav>
    </motion.header>
  );
};

// =============================
// ロゴコンポーネント
// =============================
const Logo: FC = () => (
  <motion.a
    href="#hero"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="text-xl font-bold tracking-tighter relative group"
  >
    <span className="text-gradient-accent">PORTFOLIO</span>
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
  </motion.a>
);

// =============================
// デスクトップナビゲーション
// =============================
const DesktopNav: FC = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="hidden md:flex items-center space-x-8">
      {navigation.map((item) => (
        <NavLink key={item.name} name={item.name} href={item.href} />
      ))}
      <ThemeToggleButton theme={theme} setTheme={setTheme} />
    </div>
  );
};

// =============================
// ナビゲーションリンクコンポーネント
// =============================
const NavLink: FC<{ name: string; href: string }> = ({ name, href }) => (
  <a href={href} className="text-muted-foreground hover:text-foreground transition-colors relative group py-1">
    {name}
    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-full transition-all duration-300" />
  </a>
);

// =============================
// ダークモード切り替えボタン
// =============================
const ThemeToggleButton: FC<{ theme: string | undefined; setTheme: (theme: string) => void }> = ({ theme, setTheme }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    className="rounded-full hover:bg-accent/50"
    aria-label="Toggle theme"
  >
    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
  </Button>
);

// =============================
// モバイルメニューボタン
// =============================
const MobileMenuButton: FC<{ isOpen: boolean; setIsOpen: (open: boolean) => void }> = ({ isOpen, setIsOpen }) => (
  <Button
    variant="ghost"
    size="icon"
    onClick={() => setIsOpen(!isOpen)}
    className="rounded-full hover:bg-accent/50"
    aria-label="Toggle menu"
  >
    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
  </Button>
);

// =============================
// モバイルナビゲーションメニュー
// =============================
const MobileMenu: FC<{ isOpen: boolean; setIsOpen: (open: boolean) => void }> = ({ isOpen, setIsOpen }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden pt-4 pb-3 overflow-hidden"
      >
        <div className="flex flex-col space-y-4">
          {navigation.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="py-2 text-muted-foreground hover:text-foreground transition-colors relative group"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center">{item.name}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-accent group-hover:w-1/4 transition-all duration-300" />
            </motion.a>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

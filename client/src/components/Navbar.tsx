import { Link, useLocation } from "wouter";
import logo from "@assets/614861261_1188486870141866_8515750531569483211_n_1768639878245.png";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "#", label: "Portfolio" },
    { href: "#", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center group cursor-pointer ml-4">
            <img 
              src={logo} 
              alt="Fast Signs & Wraps" 
              className="h-20 w-auto transition-transform group-hover:scale-105" 
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary uppercase tracking-widest relative py-1",
                  location === link.href ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:shadow-[0_0_8px_hsl(var(--primary))]" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="default" className="bg-primary text-background font-bold hover:bg-primary/90 hover:shadow-[0_0_15px_hsl(var(--primary)/0.5)] transition-all cursor-default">
              GET A QUOTE
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors p-2"
            >
              {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-xl border-b border-border animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 text-base font-bold uppercase tracking-wider rounded-md",
                  location === link.href ? "bg-primary/10 text-primary border-l-4 border-primary" : "text-foreground hover:bg-secondary/50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button className="w-full bg-primary text-background font-bold h-12 cursor-default">
                GET A QUOTE
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

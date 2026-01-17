import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden clip-diagonal">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40 z-10" />
        {/* Unsplash image: sleek sports car being wrapped or customized, dark moody lighting */}
        <img
          src="https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Car Wrap"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-3 py-0.5 mb-4 border border-primary/30 rounded-full bg-primary/10 backdrop-blur-sm">
              <span className="text-primary font-bold tracking-widest text-xs uppercase">Premium Design Agency</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
              TRANSFORM YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600 text-glow">
                VISION
              </span> INTO REALITY
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground mb-6 max-w-md font-light">
              We create custom, high-impact designs for commercial fleets, color changes, and exotic vehicles. 
              <strong className="text-white font-semibold block mt-1">Design Only. No Print. No Install. Just Art.</strong>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/portfolio">
                <Button size="default" className="bg-primary text-background hover:bg-primary/90 hover:scale-105 transition-all duration-300 font-bold px-6 h-11 text-base shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                  VIEW PORTFOLIO
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="default" className="border-white/20 hover:bg-white/10 hover:border-white text-white font-semibold px-6 h-11 text-base">
                  START A PROJECT <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
             {/* Decorative element or secondary image */}
             <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
               {/* Unsplash image: close up of vinyl wrap texture or abstract automotive design */}
               <img 
                 src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2070&auto=format&fit=crop" 
                 alt="Detail Wrap" 
                 className="w-full h-auto object-cover opacity-80"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
             </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckCircle2 } from "lucide-react";

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    "Elite Vehicle Wrap Designs",
    "Commercial Fleet Branding",
    "Custom Racing Liveries",
    "High-Detail Itasha Art",
  ];

  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-display text-4xl md:text-5xl font-bold text-white mb-6">
              WE DON'T JUST DESIGN.<br />
              <span className="text-primary">WE CREATE ART.</span>
            </h2>
            <p className="text-body text-lg text-muted-foreground mb-8">
              At Elkostart, we specialize in high-end vehicle wrap designs that push the boundaries of automotive aesthetics. Based in the USA, our focus is purely on the creative process—delivering ready-to-print files for designers, businesses, and car enthusiasts who demand nothing but the best.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="text-primary h-5 w-5" />
                  <span className="text-white font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="p-6 border border-primary/20 bg-primary/5 rounded-xl">
              <p className="text-primary font-bold italic">
                "Our mission is to provide the highest quality design files that make the installation process seamless and the final result breathtaking."
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2070&auto=format&fit=crop" 
                alt="Automotive Design" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
            {/* Decorative backgrounds */}
            <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-0" />
            <div className="absolute -bottom-4 -left-4 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -z-0" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

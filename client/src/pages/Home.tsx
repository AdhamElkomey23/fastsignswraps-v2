import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Palette, PenTool, Monitor } from "lucide-react";

export default function Home() {
  const { data: projects, isLoading } = useProjects();
  
  // Show only first 3 projects on home
  const featuredProjects = projects?.slice(0, 3);

  const services = [
    {
      icon: <PenTool className="w-10 h-10 text-primary" />,
      title: "Concept Creation",
      desc: "From rough sketches to polished vector art, we visualize your ideas."
    },
    {
      icon: <Monitor className="w-10 h-10 text-primary" />,
      title: "3D Rendering",
      desc: "See exactly how the wrap will look on your specific vehicle model."
    },
    {
      icon: <Palette className="w-10 h-10 text-primary" />,
      title: "Print Files",
      desc: "Production-ready files delivered directly to your installer of choice."
    }
  ];

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 bg-card relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-12 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              WHAT WE <span className="text-primary">DO</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We specialize in the artistic side of vehicle customization. 
              We don't print. We don't install. We design masterpieces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div key={i} className="bg-background/50 border border-white/5 p-8 rounded-2xl hover:border-primary/30 transition-all hover:-translate-y-1 duration-300">
                <div className="mb-6 p-4 bg-primary/10 rounded-xl inline-block">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold font-display mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-2">
              LATEST <span className="text-primary">WORKS</span>
            </h2>
            <div className="h-1 w-20 bg-primary rounded-full mt-4" />
          </div>
          <Link href="/portfolio">
            <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary/80 hover:bg-primary/10">
              VIEW ALL PROJECTS <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-96 bg-secondary/30 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center sm:hidden">
          <Link href="/portfolio">
            <Button className="w-full bg-secondary hover:bg-secondary/80">
              VIEW ALL PROJECTS
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-cyan-400 opacity-90" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-background mb-6">
            READY TO STAND OUT?
          </h2>
          <p className="text-background/80 text-xl font-medium mb-8 max-w-2xl mx-auto">
            Your vehicle is a blank canvas. Let's create something that turns heads at every stoplight.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-background text-primary hover:bg-background/90 font-bold px-10 h-16 text-lg shadow-xl">
              GET YOUR CUSTOM DESIGN
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p className="mb-4 font-display text-xl text-white">FAST<span className="text-primary">SIGNS</span>&WRAPS</p>
          <p>&copy; {new Date().getFullYear()} Fast Signs & Wraps. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

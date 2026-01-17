import { Project } from "@shared/schema";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.id}`}>
        <Card className="group relative overflow-hidden rounded-xl bg-card border-border/50 hover:border-primary/50 transition-all duration-300 h-full cursor-pointer">
          {/* Image Container */}
          <div className="aspect-[4/3] overflow-hidden relative">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10" />
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="secondary" className="bg-black/70 backdrop-blur text-white border border-white/10 uppercase tracking-wider text-xs font-bold">
                {project.category}
              </Badge>
            </div>
          </div>

          {/* Content Overlay */}
          <div className="p-6 relative z-20 bg-card border-t border-border/30">
            <h3 className="text-xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors truncate">
              {project.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 text-sm">
              {project.description}
            </p>
            
            <div className="mt-4 flex items-center text-primary text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              View Details <ExternalLink className="ml-2 w-4 h-4" />
            </div>
          </div>
          
          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-xl ring-2 ring-primary/0 group-hover:ring-primary/50 transition-all duration-500 pointer-events-none" />
        </Card>
      </Link>
    </motion.div>
  );
}

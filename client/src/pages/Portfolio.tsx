import { Navbar } from "@/components/Navbar";
import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen bg-background font-body">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold mb-6"
          >
            OUR <span className="text-primary text-glow">PORTFOLIO</span>
          </motion.h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Browse our collection of custom vehicle wrap designs. From commercial fleets to exotic color changes.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
            
            {projects?.length === 0 && (
              <div className="col-span-full text-center py-20 text-muted-foreground">
                No projects found. Check back soon!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

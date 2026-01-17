import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { useInquiries } from "@/hooks/use-inquiries";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const mutation = useInquiries();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: InsertInquiry) {
    try {
      await mutation.mutateAsync(data);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you within 24 hours with a quote.",
        className: "bg-primary text-primary-foreground border-none",
      });
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: (error as Error).message,
      });
    }
  }

  return (
    <div className="min-h-screen bg-background font-body relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-screen bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      
      <Navbar />
      
      <div className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              LET'S START A <br />
              <span className="text-primary text-glow">PROJECT</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-12 leading-relaxed">
              Ready to transform your vehicle? Fill out the form below or contact us directly. 
              We'll discuss your vision, timeline, and pricing.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <div className="bg-card p-4 rounded-xl border border-border group-hover:border-primary/50 transition-colors">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <p className="text-muted-foreground">design@fastsignswraps.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 group">
                <div className="bg-card p-4 rounded-xl border border-border group-hover:border-primary/50 transition-colors">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-muted-foreground">+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <div className="bg-card p-4 rounded-xl border border-border group-hover:border-primary/50 transition-colors">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-muted-foreground">Based in USA<br/>Serving Clients Nationwide</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-cyan-400 to-blue-600" />
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 font-bold uppercase tracking-wider text-xs">Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your Name" 
                          {...field} 
                          className="bg-background border-input focus:border-primary h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 font-bold uppercase tracking-wider text-xs">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="your@email.com" 
                          {...field} 
                          className="bg-background border-input focus:border-primary h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground/80 font-bold uppercase tracking-wider text-xs">Project Details</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your vehicle and vision..." 
                          className="bg-background border-input focus:border-primary min-h-[150px] resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-background font-bold h-12 text-lg hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
                    </>
                  ) : (
                    "SEND INQUIRY"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

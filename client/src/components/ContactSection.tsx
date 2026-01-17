import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertInquirySchema, type InsertInquiry } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useInquiries } from "@/hooks/use-inquiries";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ContactSection() {
  const { mutate: createInquiry, isPending } = useInquiries();
  const { toast } = useToast();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertInquiry) => {
    createInquiry(data, {
      onSuccess: () => {
        toast({
          title: "Inquiry Sent",
          description: "We'll get back to you as soon as possible!",
        });
        form.reset();
      },
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <section id="contact-section" className="py-24 bg-card relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-display text-4xl md:text-5xl font-bold text-white mb-4">
            GET IN <span className="text-primary">TOUCH</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your vehicle? Send us a message and we'll provide the best offer for your custom design.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-background/50 border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-semibold flex items-center gap-2">
                          <User className="w-4 h-4 text-primary" /> Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="John Doe" 
                            className="bg-background/50 border-white/10 focus:border-primary/50" 
                            {...field} 
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
                        <FormLabel className="text-white font-semibold flex items-center gap-2">
                          <Mail className="w-4 h-4 text-primary" /> Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@example.com" 
                            className="bg-background/50 border-white/10 focus:border-primary/50" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-semibold flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-primary" /> Message
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your project..." 
                          className="bg-background/50 border-white/10 focus:border-primary/50 min-h-[150px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="w-full bg-primary text-background font-bold h-12 text-lg hover:scale-[1.02] transition-transform"
                >
                  {isPending ? "SENDING..." : (
                    <>
                      SEND MESSAGE <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
      
      {/* Background Accents */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-0 translate-x-1/3 translate-y-1/3" />
    </section>
  );
}

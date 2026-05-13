"use client";

import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail, MapPin, MessageSquare, Clock, ShieldCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Our medical specialists will contact you shortly.",
      });
      setIsSubmitting(false);
      // Reset form logic would go here
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-headline font-bold mb-6">How Can We <span className="text-primary">Help You?</span></h1>
            <p className="text-muted-foreground text-lg">
              Whether you have questions about equipment specifications, insurance coverage, or order status, our specialized team is here to assist.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none bg-accent/5 rounded-none">
                <CardContent className="p-8 space-y-8">
                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Call Us</h4>
                      <p className="text-muted-foreground">+1 (800) RESPIRA</p>
                      <p className="text-xs text-muted-foreground mt-1">Mon-Fri: 8am - 8pm EST</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Email Support</h4>
                      <p className="text-muted-foreground">support@respiramed.com</p>
                      <p className="text-xs text-muted-foreground mt-1">24hr Average response time</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Clinical Plaza</h4>
                      <p className="text-muted-foreground leading-tight">123 Medical Center Way<br/>New York, NY 10001</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border-primary/20 border rounded-none">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-2 text-primary font-bold">
                    <ShieldCheck className="h-5 w-5" />
                    Official Authorized Dealer
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We are certified providers for ResMed, Philips, Fisher & Paykel, and more. All technical support is provided by factory-trained technicians.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none clinical-shadow bg-card overflow-hidden rounded-none">
                <div className="bg-primary p-8 text-white">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <MessageSquare className="h-6 w-6" />
                    Send a Message
                  </h3>
                  <p className="text-primary-foreground/80 mt-2">Required medical consultations can also be initiated here.</p>
                </div>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-[10px]">Full Name</label>
                      <Input placeholder="John Doe" className="rounded-none h-12" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-[10px]">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="rounded-none h-12" required />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-[10px]">Subject / Inquiry Type</label>
                      <Input placeholder="Equipment Question, Prescription Review, etc." className="rounded-none h-12" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-[10px]">Your Message</label>
                      <Textarea placeholder="How can we assist you today?" className="min-h-[150px] rounded-none" required />
                    </div>
                    <div className="md:col-span-2 pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-primary text-white py-8 text-sm font-bold uppercase tracking-[0.2em] rounded-none hover:bg-primary/90 transition-all flex items-center justify-center"
                      >
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send Secure Message"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
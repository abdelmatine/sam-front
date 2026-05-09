import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Image from 'next/image';
import { CheckCircle2, Heart, Award, Users, ShieldCheck } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Header */}
      <section className="pt-32 pb-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-6">Our Mission is <span className="text-primary">Breath</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            At RespiraMed Solutions, we bridge the gap between clinical excellence and home care. We are dedicated to providing life-changing respiratory technology to those who need it most.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden medical-shadow">
              <Image 
                src="https://picsum.photos/seed/about1/800/1000" 
                alt="Our Medical Facility" 
                fill 
                className="object-cover"
                data-ai-hint="medical laboratory"
              />
            </div>
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-headline font-bold">Leading the Way in <span className="text-primary">Respiratory Health</span></h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded in 2010 by a team of pulmonary specialists and medical engineers, RespiraMed began with a simple goal: to make advanced oxygen and sleep therapy equipment accessible, affordable, and easy to use.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we serve over 15,000 patients globally, partnering with top-tier brands like ResMed, Philips, and Omron to ensure every device we ship meets the highest clinical standards.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: Award, title: "FDA Certified", desc: "All our products are rigorously tested and approved." },
                  { icon: Users, title: "Patient-First", desc: "Dedicated support team available 24/7 for technical aid." },
                  { icon: Heart, title: "Compassionate Care", desc: "We understand the importance of reliable equipment." },
                  { icon: ShieldCheck, title: "Trusted Globally", desc: "Partnerships with 500+ clinics worldwide." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="shrink-0">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15k+</div>
              <div className="text-primary-foreground/80 text-sm">Patients Served</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">12+</div>
              <div className="text-primary-foreground/80 text-sm">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <div className="text-primary-foreground/80 text-sm">Clinical Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
              <div className="text-primary-foreground/80 text-sm">Patient Satisfaction</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

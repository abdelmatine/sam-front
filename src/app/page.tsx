import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/home/Hero';
import CategoriesSection from '@/components/home/CategoriesSection';
import ProductCard from '@/components/shared/ProductCard';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Award, Truck, PhoneCall } from 'lucide-react';

const featuredProducts = [
  {
    id: '1',
    name: 'AirSense 10 AutoSet CPAP',
    price: 899,
    brand: 'ResMed',
    imageUrl: 'https://picsum.photos/seed/p1/600/600',
    category: 'respiratory',
    rating: 4.8,
    inStock: true,
    isNew: true
  },
  {
    id: '2',
    name: 'SimplyGo Mini Oxygen Concentrator',
    price: 2450,
    brand: 'Philips Respironics',
    imageUrl: 'https://picsum.photos/seed/p2/600/600',
    category: 'oxygen',
    rating: 4.9,
    inStock: true
  },
  {
    id: '3',
    name: 'DreamWear Silicone Nasal Mask',
    price: 109,
    brand: 'Philips',
    imageUrl: 'https://picsum.photos/seed/p3/600/600',
    category: 'accessories',
    rating: 4.5,
    inStock: true
  },
  {
    id: '4',
    name: 'Premium Finger Pulse Oximeter',
    price: 45,
    brand: 'Wellue',
    imageUrl: 'https://picsum.photos/seed/p4/600/600',
    category: 'monitoring',
    rating: 4.7,
    inStock: false
  }
];

const benefits = [
  {
    icon: Award,
    title: "Authorized Dealer",
    desc: "100% original products from world-leading medical brands."
  },
  {
    icon: CheckCircle2,
    title: "Clinical Excellence",
    desc: "Every device is pre-inspected by our medical technicians."
  },
  {
    icon: Truck,
    title: "Express Logistics",
    desc: "Confidential and safe doorstep delivery globally."
  },
  {
    icon: PhoneCall,
    title: "Medical Support",
    desc: "Direct access to respiratory specialists for setup support."
  }
];

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <CategoriesSection />

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Best Selling <span className="text-primary">Equipment</span></h2>
              <p className="text-muted-foreground">Top-rated solutions chosen by medical professionals and patients alike.</p>
            </div>
            <Link href="/shop" className="hidden sm:block">
              <Button variant="outline" className="rounded-xl">View Catalog</Button>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 text-center sm:hidden">
            <Link href="/shop">
              <Button variant="outline" className="w-full py-6 rounded-xl">View All Products</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Why Choose <span className="text-primary">RespiraMed</span></h2>
            <p className="text-muted-foreground">We combine medical expertise with world-class technology to provide seamless healthcare solutions.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border medical-shadow flex flex-col items-center text-center gap-4 group hover:border-primary/50 transition-colors">
                <div className="bg-primary/10 p-4 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold">{benefit.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-headline font-bold mb-6">Need Professional Assistance?</h2>
              <p className="text-white/80 text-lg mb-8 leading-relaxed">
                Our team of respiratory therapists is ready to help you choose the right equipment and setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-primary hover:bg-white/90 px-8 py-6 rounded-xl text-lg font-bold">
                  Live Chat Now
                </Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 rounded-xl text-lg">
                  Browse FAQs
                </Button>
              </div>
            </div>
            {/* Background Accents */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/5 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6">
                <div className="bg-primary rounded-lg p-1.5">
                  <CheckCircle2 className="h-6 w-6 text-white" />
                </div>
                <span className="font-headline font-bold text-2xl">RespiraMed</span>
              </Link>
              <p className="text-muted-foreground max-w-sm mb-6 leading-relaxed">
                Global leader in providing high-precision respiratory care and clinical monitoring equipment. Trusted by 15,000+ patients worldwide.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Quick Links</h4>
              <ul className="flex flex-col gap-4 text-muted-foreground">
                <li><Link href="/shop" className="hover:text-primary transition-colors">Shop All</Link></li>
                <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
                <li><Link href="/faq" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Categories</h4>
              <ul className="flex flex-col gap-4 text-muted-foreground">
                <li><Link href="/shop" className="hover:text-primary transition-colors">CPAP Devices</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Concentrators</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Masks & Tubes</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Cleaning Kits</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Contact</h4>
              <ul className="flex flex-col gap-4 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-4 w-4 text-primary" />
                  +1 (800) RESPIRA
                </li>
                <li>support@respiramed.com</li>
                <li>123 Medical Center Way, Clinical Plaza, NY 10001</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} RespiraMed Solutions. All medical devices are FDA approved.
            </p>
            <div className="flex gap-6">
              <span className="text-xs text-muted-foreground cursor-pointer hover:text-primary">Terms of Service</span>
              <span className="text-xs text-muted-foreground cursor-pointer hover:text-primary">Privacy Policy</span>
              <span className="text-xs text-muted-foreground cursor-pointer hover:text-primary">Returns Policy</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
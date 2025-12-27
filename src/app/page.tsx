import {
  Navbar,
  Hero,
  Features,
  Analytics,
  Pricing,
  CTA,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Analytics />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}

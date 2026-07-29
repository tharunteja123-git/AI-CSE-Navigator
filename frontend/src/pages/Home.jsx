/*import MainLayout from '../layouts/MainLayout'
import Hero from '../components/home/Hero'
import CareerSection from '../components/home/CareerSection'
import Features from '../components/home/Features'
import Stats from '../components/home/Stats'

export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Stats />
      <CareerSection />
      <Features />
    </MainLayout>
  )
}*/


import MainLayout from "../layouts/MainLayout";
import Hero from "../components/home/Hero";
import Stats from "../components/home/Stats";
import CareerSection from "../components/home/CareerSection";
import Features from "../components/home/Features";

// NEW
import CyberneticBentoGrid from "../components/ui/CyberneticBentoGrid";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <Hero />

      {/* Statistics */}
      <Stats />

      {/* AI Features Grid */}
      <CyberneticBentoGrid />

      {/* Career Section */}
      <CareerSection />

      {/* Features */}
      <Features />
    </MainLayout>
  );
}

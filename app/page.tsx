 
 
import HeroSection from '@/components/HeroSection'
import {
  WhyUsBar,
  TeamSection,
  MediaSection,
  TestimonialsSection,
  ClientsSection,
  VideoConsultStrip,
  ContactSection,
} from '@/components/Othersections'
import IndustriesSection from '@/components/Industriessection'
import ServiceSections from '@/components/Servicessection'
import Footer from '@/components/shared/Footer'
import Header from '@/components/shared/WebHeader'
import StatsSection from '@/components/Statssection'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServiceSections />
        {/* <StatsSection /> */}
        <IndustriesSection />
        <WhyUsBar />
        <TeamSection />
        <MediaSection />
        <TestimonialsSection />
        <ClientsSection />
        {/* <VideoConsultStrip /> */}
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
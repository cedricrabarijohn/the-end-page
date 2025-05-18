import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Navigation from '@/components/organisms/landing-page/Navigation'
import HeroSection from '@/components/organisms/landing-page/HeroSection'
import FeaturesSection from '@/components/organisms/landing-page/FeaturesSection'
import ToneOptions from '@/components/organisms/landing-page/ToneOptions'
import ExamplesSection from '@/components/organisms/landing-page/ExamplesSection'
import HowItWorks from '@/components/organisms/landing-page/HowItWorks'
import CtaSection from '@/components/organisms/landing-page/CtaSection'
import Footer from '@/components/organisms/landing-page/Footer'
import { useUserStore } from '@/stores/useUserStore'
import { PAGES_ROUTES } from '@/globals'

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const examplesRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  const { user, isUserDataLoading, fetchUserData } = useUserStore();

  useEffect(() => {
    // Check if already authenticated in localStorage
    const storedAuth = localStorage.getItem('xxxxxxxllllll')

    if (storedAuth === 'true') {
      setIsAuthenticated(true)
      return
    }

    const username = prompt('Please enter your username:')
    const password = prompt('Please enter your password:')

    if (username !== 'test' || password !== 'lelena') {
      alert('Authentication failed. You are not authorized to access this page.')
    } else {
      setIsAuthenticated(true)
      localStorage.setItem('xxxxxxxllllll', 'true')
    }
  }, []);

  useEffect(() => {
    if (!user && isUserDataLoading) {
      fetchUserData();
    }
  }, [user, isUserDataLoading]);

  if (user) {
    window.location.href = PAGES_ROUTES.DASHBOARD.ROOT;
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Head>
        <title>TheEnd.page - Create Your Dramatic Exit</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Navigation
        onFeaturesClick={() => scrollToSection(featuresRef)}
        onExamplesClick={() => scrollToSection(examplesRef)}
        onHowItWorksClick={() => scrollToSection(howItWorksRef)}
        onCtaClick={() => scrollToSection(ctaRef)}
      />

      <HeroSection
        onCtaClick={() => scrollToSection(ctaRef)}
        onExamplesClick={() => scrollToSection(examplesRef)}
      />

      <FeaturesSection ref={featuresRef} />

      <ToneOptions />

      <ExamplesSection ref={examplesRef} />

      <HowItWorks ref={howItWorksRef} />

      <CtaSection ref={ctaRef} />

      <Footer />
    </>
  )
}

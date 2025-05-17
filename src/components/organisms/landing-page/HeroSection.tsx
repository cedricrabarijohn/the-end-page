import { PAGES_ROUTES } from '@/globals';
import React from 'react';

interface HeroSectionProps {
  onCtaClick: () => void;
  onExamplesClick: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onCtaClick, onExamplesClick }) => {
  return (
    <section className="hero-gradient text-white">
      <div className="container mx-auto text-center h-[100vh] flex flex-col justify-center items-center">
        <h1 className="title-font text-4xl md:text-6xl font-bold mb-6">Make Your Exit Unforgettable</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-10 opacity-90">
          Because if it's the end, make it dramatic, make it clickable, make it <span className="italic">yours</span>.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <button 
            onClick={() => {
              window.location.href = PAGES_ROUTES.AUTH.LOGIN;
            }} 
            className="cta-gradient hover:opacity-90 text-black font-bold py-4 px-8 rounded-full text-lg transition transform hover:scale-105"
          >
            Create Your Exit Page <i className="fas fa-arrow-right ml-2"></i>
          </button>
          <button 
            onClick={onExamplesClick} 
            className="bg-white hover:bg-gray-100 text-black font-bold py-4 px-8 rounded-full text-lg transition"
          >
            See Examples
          </button>
        </div>
      </div>
    </section>
  )
}

export default HeroSection;

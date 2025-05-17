import React from 'react';

interface NavigationProps {
  onFeaturesClick: () => void;
  onExamplesClick: () => void;
  onHowItWorksClick: () => void;
  onCtaClick: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  onFeaturesClick,
  onExamplesClick,
  onHowItWorksClick,
  onCtaClick
}) => {
  return (
    <nav className="bg-black text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="title-font text-2xl md:text-3xl font-bold">The<span className="text-red-500">End</span>.page</h1>
        </div>
        <div className="hidden md:flex space-x-8">
          <button onClick={onFeaturesClick} className="hover:text-red-400 transition">Features</button>
          <button onClick={onExamplesClick} className="hover:text-red-400 transition">Examples</button>
          <button onClick={onHowItWorksClick} className="hover:text-red-400 transition">How It Works</button>
        </div>
        <div>
          <button onClick={onCtaClick} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full transition">
            Create Yours
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation;

import React, { forwardRef } from 'react';

const FeaturesSection = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <section ref={ref} id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="title-font text-3xl md:text-4xl font-bold mb-4">The Perfect Goodbye</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether it's a job, relationship, or just a phase in your life - say goodbye with style.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon="fas fa-theater-masks" 
            iconBg="bg-red-100" 
            iconColor="text-red-500"
            title="Choose Your Tone"
            description="Dramatic, ironic, cringe-worthy or classy - pick the perfect vibe for your exit."
          />
          
          <FeatureCard 
            icon="fas fa-paint-brush" 
            iconBg="bg-blue-100" 
            iconColor="text-blue-500"
            title="Custom Design"
            description="Backgrounds, colors, GIFs, videos - make it visually unforgettable."
          />
          
          <FeatureCard 
            icon="fas fa-share-alt" 
            iconBg="bg-purple-100" 
            iconColor="text-purple-500"
            title="One-Click Share"
            description="Share your dramatic exit with a single link. Burn bridges in style."
          />
        </div>
      </div>
    </section>
  )
})

FeaturesSection.displayName = 'FeaturesSection';

interface FeatureCardProps {
  icon: string;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, iconBg, iconColor, title, description }) => {
  return (
    <div className="feature-card bg-gray-50 p-8 rounded-xl shadow-md transition">
      <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mb-6`}>
        <i className={`${icon} ${iconColor} text-2xl`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}

export default FeaturesSection;

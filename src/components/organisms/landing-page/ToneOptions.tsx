import React from 'react';

interface ToneOptionProps {
  from: string;
  to: string;
  text: string;
}

const ToneOption: React.FC<ToneOptionProps> = ({ from, to, text }) => {
  // Using inline styles for gradients instead of Tailwind classes
  const gradientStyle = {
    background: `linear-gradient(to right, ${from}, ${to})`,
  };

  return (
    <span 
      className="tone-pill text-white px-4 py-2 rounded-full text-sm font-medium"
      style={gradientStyle}
    >
      {text}
    </span>
  )
}

const ToneOptions: React.FC = () => {
  const toneOptions = [
    { from: '#ef4444', to: '#eab308', text: 'Dramatic' },
    { from: '#60a5fa', to: '#2563eb', text: 'Ironic' },
    { from: '#a855f7', to: '#ec4899', text: 'Cringe' },
    { from: '#374151', to: '#111827', text: 'Classy' },
    { from: '#4ade80', to: '#3b82f6', text: 'Touching' },
    { from: '#eab308', to: '#ef4444', text: 'Absurd' },
    { from: '#7c3aed', to: '#312e81', text: 'Passive-Aggressive' },
    { from: '#1e3a8a', to: '#2dd4bf', text: 'Just Honest' },
  ];

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="title-font text-3xl font-bold mb-4">Find Your Exit Vibe</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From tear-jerking to bridge-burning, we've got tones for every type of exit.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          {toneOptions.map((option, index) => (
            <ToneOption 
              key={index}
              from={option.from}
              to={option.to}
              text={option.text}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToneOptions;

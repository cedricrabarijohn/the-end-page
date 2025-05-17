import React from 'react';

interface ToneOptionProps {
  from: string;
  to: string;
  text: string;
}

const ToneOption: React.FC<ToneOptionProps> = ({ from, to, text }) => {
  return (
    <span className={`tone-pill bg-gradient-to-r from-${from} to-${to} text-white px-4 py-2 rounded-full text-sm font-medium`}>
      {text}
    </span>
  )
}

const ToneOptions: React.FC = () => {
  const toneOptions = [
    { from: 'red-500', to: 'yellow-500', text: 'Dramatic' },
    { from: 'blue-400', to: 'blue-600', text: 'Ironic' },
    { from: 'purple-500', to: 'pink-500', text: 'Cringe' },
    { from: 'gray-700', to: 'gray-900', text: 'Classy' },
    { from: 'green-400', to: 'blue-500', text: 'Touching' },
    { from: 'yellow-500', to: 'red-500', text: 'Absurd' },
    { from: 'purple-600', to: 'indigo-900', text: 'Passive-Aggressive' },
    { from: 'blue-900', to: 'teal-400', text: 'Just Honest' },
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

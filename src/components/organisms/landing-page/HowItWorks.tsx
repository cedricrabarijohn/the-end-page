import React, { forwardRef } from 'react';

interface StepProps {
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ number, title, description }) => {
  return (
    <div className="text-center">
      <div className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">{number}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  )
}

const HowItWorks = forwardRef<HTMLDivElement>((_props, ref) => {
  const steps = [
    {
      number: 1,
      title: 'Choose Your Tone',
      description: 'Pick from dramatic, ironic, cringe, or create your own vibe.'
    },
    {
      number: 2,
      title: 'Tell Your Story',
      description: 'Write your message, add media, and customize the design.'
    },
    {
      number: 3,
      title: 'Share & Burn Bridges',
      description: 'Get your unique link and share it with the world (or just them).'
    }
  ];

  return (
    <section ref={ref} id="how-it-works" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="title-font text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Create your dramatic exit in just 3 simple steps.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <Step 
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
})

HowItWorks.displayName = 'HowItWorks';

export default HowItWorks;

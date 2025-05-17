import React, { forwardRef } from 'react';

interface ExampleCardProps {
  gradient: string;
  title: string;
  description: string;
}

const ExampleCard: React.FC<ExampleCardProps> = ({ gradient, title, description }) => {
  return (
    <div className={`exit-example ${gradient} text-white p-8 rounded-xl shadow-lg h-64 flex flex-col justify-end`}>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm opacity-80 mb-4">{description}</p>
      <a href="#" className="text-white font-medium hover:underline self-start">View Exit →</a>
    </div>
  )
}

const ExamplesSection = forwardRef<HTMLDivElement>((_props, ref) => {
  const examples = [
    {
      gradient: 'bg-gradient-to-br from-purple-600 to-indigo-900',
      title: '"Why I\'m Leaving Google"',
      description: 'A classy resignation letter from a FAANG employee'
    },
    {
      gradient: 'bg-gradient-to-br from-red-500 to-yellow-500',
      title: '"Our Love is Dead"',
      description: 'A dramatic breakup with GIFs and music'
    },
    {
      gradient: 'bg-gradient-to-br from-blue-400 to-blue-600',
      title: '"Bye Bye Startup Life"',
      description: 'An ironic take on startup culture'
    }
  ];

  return (
    <section ref={ref} id="examples" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="title-font text-3xl md:text-4xl font-bold mb-4">Exit With Flair</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how others have made their dramatic exits.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, index) => (
            <ExampleCard 
              key={index}
              gradient={example.gradient}
              title={example.title}
              description={example.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
})

ExamplesSection.displayName = 'ExamplesSection';

export default ExamplesSection;

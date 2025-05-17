import React, { forwardRef } from 'react';

const CtaSection = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <section ref={ref} id="cta" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="title-font text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Exit?</h2>
        <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10">
          Create your unforgettable goodbye page in minutes. No regrets, just drama.
        </p>
        <button className="cta-gradient hover:opacity-90 text-black font-bold py-4 px-8 rounded-full text-lg inline-block transition transform hover:scale-105">
          Create Your Exit Page <i className="fas fa-fire ml-2"></i>
        </button>
      </div>
    </section>
  )
})

CtaSection.displayName = 'CtaSection';

export default CtaSection;

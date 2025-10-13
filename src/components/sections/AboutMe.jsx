import React from 'react';

function AboutMe() {
return (
<section id="aboutme" className="py-20 bg-base-200">
<div className="container mx-auto px-4">
<h1 className="text-4xl font-bold text-center mb-12 relative">
<span className="inline-block relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
About Me
</span>
<div className="absolute w-24 h-1 bg-primary bottom-0 left-1/2 transform -translate-x-1/2 rounded-full"></div>
</h1>
<div className="card bg-base-100 shadow-xl max-w-4xl mx-auto">
      <div className="card-body p-8 md:p-10">
        <h3 className="card-title text-2xl mb-4 text-primary">A Hybrid Problem-Solver</h3>
        
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-lg border-l-4 border-primary mb-6">
          <p className="font-medium text-base-content">
            I’m a hybrid builder — a Technical Lead who combines real-world business leadership with deep, self-taught expertise in AI and full-stack development.
          </p>
        </div>
        
        <div className="space-y-4 text-base-content/80 leading-relaxed">
          <p>
            Before entering tech, I spent nearly a decade managing people, systems, and processes for multi-million-dollar operations. That experience gave me an instinct for how technology succeeds or fails in real environments — and a clear sense of what users actually need.
          </p>

          <p>
            My journey into software began as a way to solve those inefficiencies directly. I’ve since developed a strong track record of designing AI-assisted systems, building production-ready applications, and leading projects from concept to deployment.
          </p>

          <p>
            Today, I’m focused on <strong className="text-secondary">Axion</strong> — a venture framework exploring how small, cross-functional teams can use AI collaboration to prototype and scale startups more intelligently. Under Axion, I’m currently developing projects such as:
          </p>
          
          <ul className="list-disc list-inside ml-4 space-y-2">
              <li><strong className="text-primary">SPARC:</strong> An AI-assisted system that accelerates development lifecycles while preserving code quality and documentation.</li>
              <li><strong className="text-primary">Nexus:</strong> A financial wellness platform for couples that rethinks how shared money management works in relationships.</li>
          </ul>

          <p className="font-medium pt-4">
            My goal is to build systems that scale ethically, intelligently, and collaboratively — combining human insight with machine capability to deliver meaningful real-world results.
          </p>
        </div>
        
        <p className="text-xs text-base-content/60 mt-8 italic text-center">
          This portfolio and its written content were collaboratively drafted using a human-in-the-loop workflow between Ethan, ChatGPT, and Gemini — part of the Axion transparency model for AI-assisted creation.
        </p>
        
        <div className="card-actions justify-end mt-6">
          <a href="#projects" className="btn btn-primary">
            See my work in action <i className="bx bx-right-arrow-alt ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

);
}

export default AboutMe;
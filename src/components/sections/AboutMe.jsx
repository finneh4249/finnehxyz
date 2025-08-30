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
                I am a Technical Lead who bridges the critical gap between real-world business problems and elegant technical solutions. My unique value comes from combining a decade of hands-on management experience with deep, self-taught expertise in AI and full-stack development.
              </p>
            </div>
            
            <div className="space-y-4 text-base-content/80 leading-relaxed">
              <p>
                For over nine years, I managed teams and systems for a multi-million dollar business. This wasn't just about operations; it was a front-row seat to the inefficiencies, technical failures, and urgent customer needs that businesses face every day. I became the on-site technical owner, measurably improving uptime and reducing support costs, which solidified my understanding of business impact.
              </p>

              <p>
                This experience became the 'why' behind my transition into technology. My passion for solving these problems led me to co-found MagnetLab, an R&D lab where I architected and built a powerful suite of AI-native systems. My 13 years of open-source experience provided the discipline and foundation for this work.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold flex items-center">
                      <i className="bx bx-rocket text-primary mr-2"></i> The "Why": Business Acumen
                    </h4>
                    <p className="text-sm">My management background gives me a deep understanding of operational challenges and what users truly need from a technical solution.</p>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold flex items-center">
                      <i className="bx bx-code-alt text-secondary mr-2"></i> The "How": Technical Leadership
                    </h4>
                    <p className="text-sm">As a hands-on developer, I build the systems that solve those challenges, leading projects from concept to deployment.</p>
                  </div>
                </div>
              </div>

              <p>
                At MagnetLab, I developed the <strong className="text-secondary">SPARC framework</strong>, an AI-assisted system that automates the software development lifecycle. This allows me to build and deploy production-ready, fully-documented websites in a fraction of the traditional time.
              </p>

              <p className="font-medium">
                I'm not just a developer who writes code. I'm a partner in building value, creating technical assets that are designed from the ground up to solve business problems and drive growth.
              </p>
            </div>
            
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

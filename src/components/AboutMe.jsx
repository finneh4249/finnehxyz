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
            <h3 className="card-title text-2xl mb-4 text-primary">My Unique Approach</h3>
            
            {/* USP Highlight Box */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5 rounded-lg border-l-4 border-primary mb-6">
              <p className="font-medium text-base-content">
                I bring a rare combination of <span className="text-primary">customer-focused management experience</span> and 
                <span className="text-secondary"> technical development skills</span> that allows me to build solutions 
                with both the end-user and business objectives in mind.
              </p>
            </div>
            
            <div className="space-y-4 text-base-content/80 leading-relaxed">
              <p>
                I'm a dedicated professional with a vibrant background in restaurant
                management and a burgeoning passion for all things tech. Currently,
                I'm diving deep into the world of web development, pursuing a
                diploma in Information Technology at Coder Academy.
              </p>

              <p>
                My journey began in the bustling environment of McDonald's, where I
                climbed the ranks from a Crew Member to a Department Manager. This path taught me 
                invaluable skills that translate directly to web development:
              </p>
              
              {/* Skills Translation Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold flex items-center">
                      <i className="bx bx-group text-primary mr-2"></i> Team Leadership
                    </h4>
                    <p className="text-sm">Coordinating cross-functional teams translates to managing development workflows and stakeholder expectations.</p>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold flex items-center">
                      <i className="bx bx-target-lock text-primary mr-2"></i> Operational Excellence
                    </h4>
                    <p className="text-sm">Implementing efficient processes in high-pressure environments is similar to optimizing code for performance and scalability.</p>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold flex items-center">
                      <i className="bx bx-user-voice text-primary mr-2"></i> Customer Insight
                    </h4>
                    <p className="text-sm">Years of direct customer interaction provides deep understanding of user needs and experience design.</p>
                  </div>
                </div>
                
                <div className="card bg-base-200 shadow-sm">
                  <div className="card-body p-4">
                    <h4 className="text-lg font-semibold flex items-center">
                      <i className="bx bx-bulb text-primary mr-2"></i> Problem Solving
                    </h4>
                    <p className="text-sm">Adapting to rapidly changing situations aligns with the iterative nature of development and debugging.</p>
                  </div>
                </div>
              </div>

              <p>
                After a fulfilling stint at Taco Bell Australia as an Assistant
                Restaurant Manager, I decided it was time to switch gears. The tech
                world called to me, and I answered by enrolling in a rigorous
                program focused on web development. It's a thrilling new chapter
                where I get to blend my analytical skills with creative
                problem-solving.
              </p>

              <p className="font-medium">
                What makes me different? I don't just build applications – I create solutions with the end-to-end 
                perspective of someone who has managed real-world operations and understands what makes teams 
                and customers tick.
              </p>
            </div>
            
            <div className="card-actions justify-end mt-6">
              <a href="#skills" className="btn btn-primary">
                Check out my skills <i className="bx bx-right-arrow-alt ml-2"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;

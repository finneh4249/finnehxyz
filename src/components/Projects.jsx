import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProjectModal from './projects/ProjectModal';
import projectsData from '../data/projects.json';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Reusable ProjectCard component with responsive tag layout
const ProjectCard = ({ project, onClick }) => {
  const { title, description, image, githubUrl, liveDemoUrl, tags } = project;
  
  return (
    <motion.div 
      className="card bg-white dark:bg-emerald-950 dark:!bg-emerald-950 shadow-lg hover:shadow-xl transition-shadow rounded-lg overflow-hidden"
      style={{ backgroundColor: 'var(--bg-card-color, white)' }}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => onClick(project)}
    >
      <figure className="px-0 pt-0 cursor-pointer">
        <img
          src={image}
          alt={`${title} Preview`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/e2e8f0/1e293b?text=${encodeURIComponent(title)}`;
          }}
        />
      </figure>
      <div className="card-body p-6">
        <div className="flex flex-col">
          <h2 className="card-title mb-2 text-gray-900 dark:text-white">{title}</h2>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag, index) => (
              <div key={index} className={`badge ${tag.badgeClass}`}>{tag.name}</div>
            ))}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        <div className="card-actions justify-end mt-4 flex gap-3">
          {liveDemoUrl && (
            <a href={liveDemoUrl} 
              className="btn btn-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:opacity-90"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}>
              <i className="bx bx-play-circle mr-2"></i>Live Demo
            </a>
          )}
          <a href={githubUrl} 
            className="btn btn-sm btn-outline border-emerald-500 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/10"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}>
            <i className="bx bxl-github mr-2"></i>GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Featured Project Card for Carousel
const FeaturedProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden h-[400px] cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      onClick={() => onClick(project)}
    >
      <img 
        src={project.image} 
        alt={`${project.title} Preview`}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/1200x600/e2e8f0/1e293b?text=${encodeURIComponent(project.title)}`;
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-8">
        <h2 className="text-white text-3xl font-bold mb-3">{project.title}</h2>
        <p className="text-gray-200 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-white/20 text-white px-3 py-1 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} 
              className="btn btn-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:opacity-90"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}>
              <i className="bx bx-play-circle mr-2"></i>Live Demo
            </a>
          )}
          <a href={project.githubUrl} 
            className="btn btn-sm btn-outline border-white text-white hover:bg-white/20"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}>
            <i className="bx bxl-github mr-2"></i>View on GitHub
          </a>
          <button 
            className="btn btn-sm btn-outline border-white text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              onClick(project);
            }}>
            <i className="bx bx-info-circle mr-2"></i>Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

function Projects() {
  // State for active modal
  const [activeProject, setActiveProject] = useState(null);
  const featuredProjects = projectsData.filter(project => project.featured);
  
  // Open modal with project details
  const openProjectModal = (project) => {
    setActiveProject(project);
  };
  
  // Close modal
  const closeProjectModal = () => {
    setActiveProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-emerald-50/50 dark:bg-emerald-950/90">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-emerald-300/30 relative">
          <span className="relative z-10 px-4 text-gray-800 dark:text-white">
            Projects
          </span>
          <div className="absolute h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-500 left-1/2 -translate-x-1/2 bottom-0"></div>
        </h1>
        
        {/* Featured Projects Carousel */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
              Featured Projects
            </h2>
            
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="rounded-xl overflow-hidden"
            >
              {featuredProjects.map((project, index) => (
                <SwiperSlide key={index}>
                  <FeaturedProjectCard project={project} onClick={openProjectModal} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
        
        {/* All Projects Grid */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-gray-100">
            All Projects
          </h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            {projectsData.map((project, index) => (
              <ProjectCard 
                key={index}
                project={project}
                onClick={openProjectModal}
              />
            ))}
          </motion.div>
        </div>
        
        {/* Project Detail Modal */}
        {activeProject && (
          <ProjectModal 
            project={activeProject}
            onClose={closeProjectModal}
          />
        )}
      </div>
    </section>
  );
}

export default Projects;

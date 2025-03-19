import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
  // Prevent closing when clicking inside the modal content
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div 
          className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto"
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          onClick={handleContentClick}
        >
          {/* Modal Header with Image */}
          <div className="relative h-72">
            <img 
              src={project.image} 
              alt={`${project.title} Preview`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/1200x600/e2e8f0/1e293b?text=${encodeURIComponent(project.title)}`;
              }}
            />
            <div className="absolute top-0 right-0 p-4">
              <button 
                className="bg-black/50 text-white hover:bg-black/70 p-2 rounded-full"
                onClick={onClose}
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-3xl font-bold text-white">{project.title}</h2>
            </div>
          </div>
          
          {/* Modal Content */}
          <div className="p-6">
            {/* Tags/Technologies */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies?.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">About this project</h3>
              <p className="text-gray-700 dark:text-gray-300">
                {project.detailedDescription || project.description}
              </p>
            </div>
            
            {/* Links */}
            <div className="flex flex-wrap gap-4">
              {project.liveDemoUrl && (
                <a 
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-none hover:opacity-90"
                >
                  <i className="bx bx-play-circle mr-2"></i>Live Demo
                </a>
              )}
              <a 
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline border-emerald-500 text-emerald-600 dark:text-emerald-300 hover:bg-emerald-500/10"
              >
                <i className="bx bxl-github mr-2"></i>View on GitHub
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;

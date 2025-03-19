import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ProjectModal({ project, isOpen, onClose }) {
  // Don't even attempt to render if there's no project or the modal is closed
  if (!isOpen) return null;
  
  // Safely handle the case where project might be null/undefined, even though modal is open
  const safeProject = project || {};
  
  // Destructure with defaults for everything
  const {
    title = 'Project Details',
    description = '',
    image = '',
    technologies = [],
    features = [],
    githubUrl = '',
    liveDemoUrl = '',
    longDescription = ''
  } = safeProject;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header image */}
              <div className="relative h-64 sm:h-80 w-full">
                {image ? (
                  <img
                    src={image}
                    alt={`${title} Preview`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/1200x600/e2e8f0/1e293b?text=${encodeURIComponent(title || 'Project')}`;
                    }}
                  />
                ) : (
                  // Placeholder when no image is available
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No image available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                >
                  <i className="bx bx-x text-2xl"></i>
                </button>
              </div>
              
              {/* Content */}
              <div className="p-6 sm:p-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
                
                {technologies && technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {technologies.map((tech, index) => (
                      <span key={index} className="bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                
                <p className="text-gray-700 dark:text-gray-300 mb-8">{longDescription || description}</p>
                
                {/* Project features */}
                {features && features.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Key Features</h3>
                    <ul className="space-y-2">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <i className="bx bx-check-circle text-emerald-500 text-xl mr-2 mt-0.5"></i>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4 mt-6">
                  {liveDemoUrl && (
                    <a 
                      href={liveDemoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <i className="bx bx-play-circle mr-2"></i>
                      Live Demo
                    </a>
                  )}
                  
                  {githubUrl && (
                    <a 
                      href={githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn btn-outline"
                    >
                      <i className="bx bxl-github mr-2"></i>
                      View on GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default ProjectModal;

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import ProjectModal from '../projects/ProjectModal';
import SearchFilter from '../ui/SearchFilter';
import { fetchData } from '../../utils/dataFetcher';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Reusable ProjectCard component with neo-brutalist design
const ProjectCard = ({ project, onClick, index = 0 }) => {
  const { title, description, image, githubUrl, liveDemoUrl, tags, date } = project;
  
  const formattedDate = date ? new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short'
  }) : null;
  
  const colors = ['bg-neo-yellow', 'bg-neo-pink', 'bg-neo-blue', 'bg-neo-green', 'bg-neo-purple', 'bg-neo-orange'];
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
  const rotation = rotations[index % rotations.length];
  
  return (
    <motion.div 
      className={`brutal-card cursor-pointer ${rotation} hover:rotate-0 transition-all`}
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 400 }}
      onClick={() => onClick(project)}
    >
      <figure className="border-b-brutal border-black relative">
        <img
          src={image}
          alt={`${title} Preview`}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://placehold.co/600x400/FFE600/000000?text=${encodeURIComponent(title)}`;
          }}
        />
        {/* Decorative corner */}
        <div className={`absolute top-2 right-2 w-12 h-12 ${colors[index % colors.length]} border-brutal border-black rotate-45`}></div>
      </figure>
      <div className="p-6 bg-white dark:bg-base-200 relative">
        <h2 className="text-2xl font-bold uppercase mb-3">{title}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, idx) => (
            <div 
              key={idx} 
              className={`${colors[idx % colors.length]} border-2 border-black px-3 py-1 font-bold uppercase text-sm rotate-1`}
            >
              {tag.name}
            </div>
          ))}
        </div>
        {formattedDate && (
          <div className="text-sm font-bold mb-3">
            📅 {formattedDate}
          </div>
        )}
        <p className="text-base mb-4 font-medium">{description}</p>
        <div className="flex flex-wrap gap-3 mt-4">
          {liveDemoUrl && (
            <a href={liveDemoUrl} 
              className="brutal-btn brutal-blue px-4 py-2 text-sm rotate-1"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}>
              Live Demo
            </a>
          )}
          <a href={githubUrl} 
            className="brutal-btn bg-black text-white px-4 py-2 text-sm -rotate-1"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}>
            GitHub
          </a>
        </div>
        {/* Decorative accent */}
        <div className={`absolute -bottom-2 -right-2 w-8 h-8 ${colors[(index + 2) % colors.length]} border-brutal border-black -rotate-12 z-0`}></div>
      </div>
    </motion.div>
  );
};

// Featured Project Card for Carousel - Neo-brutalist style
const FeaturedProjectCard = ({ project, onClick }) => {
  return (
    <motion.div 
      className="relative h-[400px] cursor-pointer brutal-card overflow-hidden"
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
          e.target.src = `https://placehold.co/1200x600/FF006E/FFFFFF?text=${encodeURIComponent(project.title)}`;
        }}
      />
      <div className="absolute inset-0 bg-black/80 flex flex-col justify-end p-8">
        <div className="bg-neo-yellow border-brutal border-black shadow-brutal p-4 mb-4 inline-block">
          <h2 className="text-3xl font-bold uppercase">{project.title}</h2>
        </div>
        <p className="text-white text-lg mb-4 font-medium">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span key={index} className="bg-white text-black border-2 border-white px-3 py-1 font-bold uppercase text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} 
              className="brutal-btn brutal-blue px-4 py-2"
              target="_blank" 
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}>
              Live Demo
            </a>
          )}
          <a href={project.githubUrl} 
            className="brutal-btn bg-white px-4 py-2"
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}>
            GitHub
          </a>
          <button 
            className="brutal-btn brutal-pink px-4 py-2"
            onClick={(e) => {
              e.stopPropagation();
              onClick(project);
            }}>
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

function Projects() {
  // Initialize selectedProject as null but pass a safe empty object to the modal initially
  const [selectedProject, setSelectedProject] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch project data
  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchData('/data/projects.json');
        if (data) {
          setProjects(data);
          setFilteredProjects(data.filter(project => !project.featured));
        } else {
          throw new Error('Failed to load projects data');
        }
      } catch (err) {
        console.error("Failed to load projects data:", err);
        throw err; // Propagate to ErrorBoundary
      } finally {
        setLoading(false);
      }
    }
    
    loadProjects();
  }, []);

  const handleProjectClick = (project) => {
    if (!project) {
      console.warn("Attempted to open modal with null project");
      return; // Don't open modal if project is null
    }
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Extract unique tags for filter options
  const getAllTags = () => {
    const tagSet = new Set();
    projects.forEach(project => {
      if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => {
          if (tag.name) tagSet.add(tag.name);
        });
      }
    });
    return Array.from(tagSet).sort().map(tag => ({ value: tag, label: tag }));
  };

  // Define sort options
  const sortOptions = [
    { value: 'latest', label: 'Latest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'nameAsc', label: 'Name (A-Z)' },
    { value: 'nameDesc', label: 'Name (Z-A)' }
  ];

  // Handle filter changes
  const handleFilterChange = ({ searchTerm, sortBy, filterBy }) => {
    let filtered = projects.filter(project => !project.featured);
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) ||
        (project.technologies && project.technologies.some(tech => tech.toLowerCase().includes(term))) ||
        (project.tags && project.tags.some(tag => tag.name.toLowerCase().includes(term)))
      );
    }
    
    // Apply tag filter
    if (filterBy) {
      filtered = filtered.filter(project => 
        project.tags && project.tags.some(tag => tag.name === filterBy)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'latest':
        filtered.sort((a, b) => (b.date || 0) - (a.date || 0));
        break;
      case 'oldest':
        filtered.sort((a, b) => (a.date || 0) - (b.date || 0));
        break;
      case 'nameAsc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameDesc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
    
    setFilteredProjects(filtered);
  };

  if (loading) {
    return <div className="py-20 text-center">Loading projects information...</div>;
  }

  // Find featured projects
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="py-20 bg-neo-pink relative overflow-hidden">
      {/* Wild chaotic decorative elements */}
      <div className="absolute top-10 right-10 w-48 h-32 bg-neo-yellow border-brutal-thick border-black shadow-brutal-lg rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-32 h-52 bg-neo-green border-brutal border-black shadow-brutal -rotate-6"></div>
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-neo-blue border-brutal-thick border-black shadow-brutal rotate-45"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-28 bg-neo-purple border-brutal border-black shadow-brutal -rotate-12"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
            <div className="brutal-btn brutal-green px-6 py-3 -rotate-2">
              MY WORK
            </div>
            <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tight rotate-1">
              Projects
            </h2>
          </div>
          <div className="h-3 w-56 bg-black mx-auto rotate-1"></div>
        </motion.div>

        {/* Featured projects carousel */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 1 },
                1024: { slidesPerView: 1 },
              }}
              className="featured-projects-swiper"
            >
              {featuredProjects.map((project, index) => (
                <SwiperSlide key={index}>
                  <FeaturedProjectCard
                    project={project}
                    onClick={handleProjectClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* Regular projects grid */}
                {/* All projects grid - Masonry-style */}
        <div>
          <h3 className="text-3xl md:text-4xl font-bold uppercase mb-8 -rotate-1 inline-block">
            All Projects
            <div className="h-2 w-full bg-neo-yellow border-brutal border-black mt-2 rotate-1"></div>
          </h3>
          
          {/* Search and Filter with brutal styling */}
          <div className="mb-8">
            <SearchFilter 
              onFilterChange={handleFilterChange}
              sortOptions={sortOptions}
              filterOptions={getAllTags()}
            />
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard 
                  key={index}
                  project={project}
                  onClick={handleProjectClick}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="brutal-card bg-white dark:bg-base-200 p-12 text-center rotate-1">
              <p className="text-2xl font-bold uppercase">No projects found 😢</p>
              <p className="text-base mt-4">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Project detail modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
    </section>
  );
}

export default Projects;

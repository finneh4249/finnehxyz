import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ToolCard from '../skills/ToolCard';
import SkillCard from '../skills/SkillCard';
import SearchFilter from '../ui/SearchFilter';
import { fetchData } from '../../utils/dataFetcher';

// Category filter component with neo-brutalist styling
const CategoryFilters = ({ categories, activeCategory, onCategoryChange }) => {
  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];
  
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category, index) => {
        const rotation = rotations[index % rotations.length];
        return (
          <motion.button
            key={category}
            className={`brutal-btn px-5 py-3 text-sm ${rotation} hover:rotate-0 transition-all ${
              activeCategory === category 
                ? 'brutal-yellow' 
                : 'bg-white dark:bg-base-200'
            }`}
            onClick={() => onCategoryChange(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        );
      })}
    </div>
  );
};

function Skills() {
  // State for filters and search
  const [activeToolCategory, setActiveToolCategory] = useState("All");
  const [activeSkillCategory, setActiveSkillCategory] = useState("All");
  const [toolSearch, setToolSearch] = useState("");
  const [skillSearch, setSkillSearch] = useState("");
  const [proficiencyLevel, setProficiencyLevel] = useState(0);
  
  // State for fetched data
  const [skillsData, setSkillsData] = useState(null);
  const [filteredTools, setFilteredTools] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [toolCategories, setToolCategories] = useState(["All"]);
  const [skillCategories, setSkillCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Load skills data
  useEffect(() => {
    async function loadSkills() {
      try {
        const data = await fetchData('/data/skills.json');
        if (data) {
          setSkillsData(data);
          
          // Extract tools and skills
          const toolsData = data.tools || [];
          const skillsData2 = data.skills || [];
          
          // Set initial filtered data
          setFilteredTools(toolsData);
          setFilteredSkills(skillsData2);
          
          // Extract unique categories
          setToolCategories(["All", ...new Set(toolsData.map(tool => tool.category))]);
          setSkillCategories(["All", ...new Set(skillsData2.map(skill => skill.category))]);
        } else {
          throw new Error('Failed to load skills data');
        }
      } catch (err) {
        console.error("Failed to load skills data:", err);
        throw err; // Propagate to ErrorBoundary
      } finally {
        setLoading(false);
      }
    }
    
    loadSkills();
  }, []);

  // Update filtered tools when filters change
  useEffect(() => {
    if (!skillsData) return;
    
    const toolsData = skillsData.tools || [];
    const filtered = toolsData.filter(tool => {
      const matchesCategory = activeToolCategory === "All" || tool.category === activeToolCategory;
      const matchesSearch = tool.name.toLowerCase().includes(toolSearch.toLowerCase());
      const matchesProficiency = (tool.proficiency || 0) >= proficiencyLevel;
      
      return matchesCategory && matchesSearch && matchesProficiency;
    });
    setFilteredTools(filtered);
  }, [activeToolCategory, toolSearch, proficiencyLevel, skillsData]);

  // Update filtered skills when filters change
  useEffect(() => {
    if (!skillsData) return;
    
    const skillsData2 = skillsData.skills || [];
    const filtered = skillsData2.filter(skill => {
      const matchesCategory = activeSkillCategory === "All" || skill.category === activeSkillCategory;
      const matchesSearch = 
        skill.title.toLowerCase().includes(skillSearch.toLowerCase()) || 
        skill.description.toLowerCase().includes(skillSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredSkills(filtered);
  }, [activeSkillCategory, skillSearch, skillsData]);

  // Handle tool filter change from SearchFilter component
  const handleToolFilterChange = ({ searchTerm, filterBy, proficiencyRange }) => {
    setToolSearch(searchTerm);
    
    if (proficiencyRange !== undefined) {
      setProficiencyLevel(proficiencyRange);
    }
  };

  // Handle skill filter change from SearchFilter component
  const handleSkillFilterChange = ({ searchTerm }) => {
    setSkillSearch(searchTerm);
  };

  if (loading) {
    return <div className="py-20 text-center">Loading skills information...</div>;
  }

  return (
    <section id="skills" className="py-20 bg-neo-purple relative overflow-hidden">
      {/* Chaotic decorative elements */}
      <div className="absolute top-10 right-10 w-48 h-36 bg-neo-orange border-brutal-thick border-black shadow-brutal-lg rotate-12"></div>
      <div className="absolute bottom-20 left-10 w-32 h-52 bg-neo-yellow border-brutal border-black shadow-brutal -rotate-6"></div>
      <div className="absolute top-1/3 left-1/4 w-28 h-28 bg-neo-pink border-brutal-thick border-black shadow-brutal rotate-45"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-24 bg-neo-blue border-brutal border-black shadow-brutal -rotate-12"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Languages & Tools Section */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
              <div className="brutal-btn brutal-orange px-6 py-3 -rotate-2">
                TOOLS
              </div>
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight rotate-1">
                Languages & Tools
              </h1>
            </div>
            <div className="h-3 w-56 bg-black mx-auto -rotate-1"></div>
          </motion.div>
          
          <div className="text-center mb-6 brutal-btn brutal-yellow px-6 py-3 inline-block rotate-2 text-base">
            HOVER TO SEE PROFICIENCY LEVELS
          </div>
          
          <SearchFilter 
            placeholder="Search tools..."
            onFilterChange={handleToolFilterChange}
            className="mb-8"
            purpleTheme={true}
            includeRangeSlider={true}
          />
          
          <CategoryFilters 
            categories={toolCategories} 
            activeCategory={activeToolCategory}
            onCategoryChange={setActiveToolCategory} 
          />
          
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-stretch">
              {filteredTools.map((tool, index) => {
                // Create chaotic positioning by varying card sizes and rotations
                const rotations = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1', 'rotate-3', '-rotate-3'];
                const rotation = rotations[index % rotations.length];
                
                return (
                  <div key={index} className={`${rotation}`} style={{ 
                    gridColumn: index % 7 === 0 ? 'span 2' : 'span 1',
                  }}>
                    <ToolCard
                      icon={tool.icon}
                      name={tool.name}
                      color={tool.color}
                      category={tool.category}
                      proficiency={tool.proficiency || 50}
                      description={tool.description || ""}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 brutal-card bg-white dark:bg-base-200 rotate-1">
              <p className="text-xl font-bold uppercase mb-4">No matching tools found.</p>
              <motion.button 
                className="brutal-btn brutal-yellow px-6 py-3 -rotate-2"
                onClick={() => {
                  setToolSearch("");
                  setActiveToolCategory("All");
                  setProficiencyLevel(0);
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center justify-center gap-6 flex-wrap mb-6">
              <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tight -rotate-1">
                Skills
              </h1>
              <div className="brutal-btn brutal-pink px-6 py-3 rotate-3">
                EXPERTISE
              </div>
            </div>
            <div className="h-3 w-48 bg-black mx-auto rotate-1"></div>
          </motion.div>
          
          <SearchFilter 
            placeholder="Search skills..."
            onFilterChange={handleSkillFilterChange}
            className="mb-8"
            purpleTheme={true}
          />
          
          <CategoryFilters 
            categories={skillCategories} 
            activeCategory={activeSkillCategory}
            onCategoryChange={setActiveSkillCategory} 
          />
          
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => {
                // Chaotic layout - some cards span multiple columns
                const rotations = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];
                const rotation = rotations[index % rotations.length];
                const isWide = index % 5 === 0; // Every 5th card is wide
                
                return (
                  <div 
                    key={index} 
                    className={`${rotation} ${isWide ? 'md:col-span-2 lg:col-span-2' : ''}`}
                  >
                    <SkillCard
                      icon={skill.icon}
                      title={skill.title}
                      description={skill.description}
                      color={skill.color}
                      category={skill.category}
                    />
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 brutal-card bg-white dark:bg-base-200 -rotate-1">
              <p className="text-xl font-bold uppercase mb-4">No matching skills found.</p>
              <motion.button 
                className="brutal-btn brutal-yellow px-6 py-3 rotate-2"
                onClick={() => {
                  setSkillSearch("");
                  setActiveSkillCategory("All");
                }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset Filters
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;

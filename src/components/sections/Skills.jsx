import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ToolCard from '../skills/ToolCard';
import SkillCard from '../skills/SkillCard';
import SearchFilter from '../ui/SearchFilter';
import { fetchData } from '../../utils/dataFetcher';

// Category filter component with animations
const CategoryFilters = ({ categories, activeCategory, onCategoryChange }) => (
  <div className="flex flex-wrap justify-center gap-2 mb-8">
    {categories.map(category => (
      <motion.button
        key={category}
        className={`btn btn-sm ${
          activeCategory === category 
            ? 'bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white border-none' 
            : 'btn-outline border-purple-400 text-purple-700 dark:text-purple-300'
        }`}
        onClick={() => onCategoryChange(category)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {category}
      </motion.button>
    ))}
  </div>
);

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
    <section id="skills" className="py-20 bg-purple-50/70 dark:bg-purple-950/90">
      <div className="container mx-auto px-4 md:px-6">
        {/* Languages & Tools Section */}
        <div className="mb-20">
          <h1 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-purple-300/30 relative">
            <span className="relative z-10 px-4 text-gray-800 dark:text-white">
              Languages & Tools
            </span>
            <div className="absolute h-1 w-24 bg-gradient-to-r from-purple-500 to-fuchsia-500 left-1/2 -translate-x-1/2 bottom-0"></div>
          </h1>
          
          <div className="text-center mb-6 text-sm text-gray-600 dark:text-gray-300">
            <p>Hover over the cards to see proficiency levels and details</p>
          </div>
          
          {/* Add SearchFilter with proficiency range slider */}
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
          
          {/* Display tools */}
          {filteredTools.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 items-stretch">
              {filteredTools.map((tool, index) => (
                <ToolCard
                  key={index}
                  icon={tool.icon}
                  name={tool.name}
                  color={tool.color}
                  category={tool.category}
                  proficiency={tool.proficiency || 50}
                  description={tool.description || ""}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 dark:text-gray-300">No matching tools found.</p>
              <motion.button 
                className="btn btn-sm border-purple-400 text-purple-700 dark:border-purple-500 dark:text-purple-200 mt-4"
                onClick={() => {
                  setToolSearch("");
                  setActiveToolCategory("All");
                  setProficiencyLevel(0);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset filters
              </motion.button>
            </div>
          )}
        </div>

        {/* Skills Section */}
        <div>
          <h1 className="text-3xl font-bold text-center mb-12 pb-4 border-b-2 border-purple-300/30 relative">
            <span className="relative z-10 px-4 text-gray-800 dark:text-white">
              Skills
            </span>
            <div className="absolute h-1 w-24 bg-gradient-to-r from-purple-500 to-fuchsia-500 left-1/2 -translate-x-1/2 bottom-0"></div>
          </h1>
          
          {/* SearchFilter for skills */}
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
          
          {/* Display skills */}
          {filteredSkills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <SkillCard
                  key={index}
                  icon={skill.icon}
                  title={skill.title}
                  description={skill.description}
                  color={skill.color}
                  category={skill.category}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-lg text-base-content/60">No matching skills found.</p>
              <motion.button 
                className="btn btn-sm border-purple-400 text-purple-700 dark:text-purple-300 mt-4"
                onClick={() => {
                  setSkillSearch("");
                  setActiveSkillCategory("All");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset filters
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Skills;

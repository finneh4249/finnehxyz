import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ToolCard from './skills/ToolCard';
import SkillCard from './skills/SkillCard';
import skillsData from '../data/skills.json';

// Extract tools and skills from imported data
const toolsData = skillsData.tools;
const skillsData2 = skillsData.skills;

// Extract unique categories
const toolCategories = ["All", ...new Set(toolsData.map(tool => tool.category))];
const skillCategories = ["All", ...new Set(skillsData2.map(skill => skill.category))];

// Search input component
const SearchInput = ({ placeholder, value, onChange }) => (
  <div className="form-control w-full max-w-xs mx-auto mb-6">
    <div className="input-group flex justify-around">
      <input 
        type="text" 
        placeholder={placeholder} 
        className="input input-bordered w-full bg-white dark:bg-purple-900 dark:text-white dark:placeholder-gray-400" 
        value={value} 
        onChange={onChange} 
      />
      <button className="btn btn-square bg-gradient-to-r from-purple-500 to-fuchsia-500 border-none">
        <i className="bx bx-search text-xl text-white"></i>
      </button>
    </div>
  </div>
);

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
  
  // Filtered data based on category and search
  const [filteredTools, setFilteredTools] = useState(toolsData);
  const [filteredSkills, setFilteredSkills] = useState(skillsData2);

  // Update filtered tools when filters change
  useEffect(() => {
    const filtered = toolsData.filter(tool => {
      const matchesCategory = activeToolCategory === "All" || tool.category === activeToolCategory;
      const matchesSearch = tool.name.toLowerCase().includes(toolSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredTools(filtered);
  }, [activeToolCategory, toolSearch]);

  // Update filtered skills when filters change
  useEffect(() => {
    const filtered = skillsData2.filter(skill => {
      const matchesCategory = activeSkillCategory === "All" || skill.category === activeSkillCategory;
      const matchesSearch = 
        skill.title.toLowerCase().includes(skillSearch.toLowerCase()) || 
        skill.description.toLowerCase().includes(skillSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
    setFilteredSkills(filtered);
  }, [activeSkillCategory, skillSearch]);

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
          
          {/* Search and filter for tools */}
          <SearchInput 
            placeholder="Search tools..." 
            value={toolSearch} 
            onChange={(e) => setToolSearch(e.target.value)} 
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
          
          {/* Search and filter for skills */}
          <SearchInput 
            placeholder="Search skills..." 
            value={skillSearch} 
            onChange={(e) => setSkillSearch(e.target.value)} 
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

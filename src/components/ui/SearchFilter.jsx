import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function SearchFilter({ 
  onFilterChange, 
  placeholder = "Search...",
  sortOptions = [],
  filterOptions = [],
  className = "",
  purpleTheme = false,
  includeRangeSlider = false
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState(sortOptions.length > 0 ? sortOptions[0].value : '');
  const [filterBy, setFilterBy] = useState('');
  const [proficiencyRange, setProficiencyRange] = useState(0);
  const [isSliderActive, setIsSliderActive] = useState(false);

  // Determine theme colors based on prop
  const themeColors = purpleTheme ? {
    border: "border-purple-300 dark:border-purple-700",
    bg: "bg-white dark:bg-purple-900",
    focus: "focus:ring-purple-500",
    slider: "bg-purple-500"
  } : {
    border: "border-emerald-300 dark:border-emerald-700",
    bg: "bg-white dark:bg-emerald-900",
    focus: "focus:ring-emerald-500",
    slider: "bg-emerald-500"
  };
  
  // Get color for slider based on proficiency level
  const getSliderColor = (value) => {
    if (value < 50) return purpleTheme ? '#c084fc' : '#f59e0b';
    if (value < 75) return purpleTheme ? '#a855f7' : '#10b981';
    return purpleTheme ? '#7c3aed' : '#059669';
  };
  
  // Get proficiency label based on value
  const getProficiencyLabel = (value) => {
    if (value === 0) return "All";
    if (value < 50) return "Beginner+";
    if (value < 75) return "Intermediate+";
    return "Advanced+";
  };

  useEffect(() => {
    // Debounce search to avoid excessive updates
    const timer = setTimeout(() => {
      onFilterChange({
        searchTerm,
        sortBy,
        filterBy,
        proficiencyRange: includeRangeSlider ? proficiencyRange : undefined
      });
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchTerm, sortBy, filterBy, proficiencyRange, onFilterChange, includeRangeSlider]);
  
  // Handle proficiency preset selection
  const handleProficiencyPreset = (value) => {
    setProficiencyRange(value);
  };
  
  return (
    <motion.div 
      className={`flex flex-col gap-4 mb-6 ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input
            type="text"
            className={`w-full px-4 py-2 pl-10 rounded-lg ${themeColors.border} ${themeColors.bg} text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${themeColors.focus}`}
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <i className="bx bx-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400"></i>
        </div>
        
        {/* Sort Options */}
        {sortOptions.length > 0 && (
          <div className="w-full md:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${themeColors.border} ${themeColors.bg} text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${themeColors.focus}`}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
        
        {/* Filter Options */}
        {filterOptions.length > 0 && (
          <div className="w-full md:w-48">
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg ${themeColors.border} ${themeColors.bg} text-gray-800 dark:text-white focus:outline-none focus:ring-2 ${themeColors.focus}`}
            >
              <option value="">All Categories</option>
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
      
      {/* Neo-Brutal Proficiency Range Slider */}
      {includeRangeSlider && (
        <motion.div 
          className="w-full brutal-card bg-white dark:bg-base-200 p-6 shadow-brutal-lg -rotate-1"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4">
            <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
              <span className="font-bold text-lg uppercase tracking-tight">
                Proficiency Level: 
                <span className={`ml-2 brutal-btn px-4 py-2 text-sm inline-block rotate-2 ${
                  proficiencyRange === 0 ? 'brutal-yellow' :
                  proficiencyRange < 50 ? 'bg-neo-orange border-brutal border-black' :
                  proficiencyRange < 75 ? 'brutal-green' :
                  'bg-neo-blue border-brutal border-black'
                }`}>
                  {getProficiencyLabel(proficiencyRange)}
                </span>
              </span>
              {proficiencyRange > 0 && (
                <motion.button 
                  onClick={() => setProficiencyRange(0)} 
                  className="brutal-btn brutal-pink px-4 py-2 text-sm -rotate-2"
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  RESET
                </motion.button>
              )}
            </div>
            
            {/* Quick selection buttons - Neo-brutal */}
            <div className="flex flex-wrap gap-3 mb-6">
              {[
                { label: "All", value: 0, color: 'brutal-yellow', rotation: 'rotate-1' },
                { label: "Beginner+", value: 25, color: 'bg-neo-orange border-brutal border-black', rotation: '-rotate-2' },
                { label: "Intermediate+", value: 50, color: 'brutal-green', rotation: 'rotate-2' },
                { label: "Advanced+", value: 75, color: 'bg-neo-blue border-brutal border-black', rotation: '-rotate-1' },
                { label: "Expert", value: 90, color: 'bg-neo-purple border-brutal border-black', rotation: 'rotate-3' }
              ].map((preset, idx) => (
                <motion.button
                  key={preset.value}
                  onClick={() => handleProficiencyPreset(preset.value)}
                  className={`brutal-btn px-4 py-2 text-sm font-bold uppercase ${preset.rotation} ${
                    proficiencyRange === preset.value
                      ? preset.color + ' shadow-brutal'
                      : 'bg-white dark:bg-base-300 border-brutal border-black opacity-70'
                  }`}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {preset.label}
                </motion.button>
              ))}
            </div>
          </div>
          
          {/* Neo-brutal slider */}
          <div className="relative mb-6 px-2">
            <div className="brutal-card bg-white dark:bg-base-300 p-4 rotate-1">
              {/* Enhanced slider */}
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={proficiencyRange}
                onChange={(e) => setProficiencyRange(parseInt(e.target.value, 10))}
                onMouseDown={() => setIsSliderActive(true)}
                onMouseUp={() => setIsSliderActive(false)}
                onTouchStart={() => setIsSliderActive(true)}
                onTouchEnd={() => setIsSliderActive(false)}
                className="w-full h-3 appearance-none cursor-pointer border-brutal border-black"
                style={{
                  background: `linear-gradient(to right, ${getSliderColor(proficiencyRange)} ${proficiencyRange}%, #FFE600 ${proficiencyRange}%)`,
                }}
                aria-label="Proficiency level filter"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={proficiencyRange}
                aria-valuetext={`${proficiencyRange}% proficiency and above`}
              />
              
              {/* Tooltip when slider is active */}
              {isSliderActive && (
                <motion.div 
                  className="absolute -mt-16 brutal-btn brutal-pink px-3 py-2 text-sm font-bold transform -translate-x-1/2 -rotate-6"
                  style={{ left: `${proficiencyRange}%` }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {proficiencyRange}%
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Proficiency level descriptions - Neo-brutal */}
          <div className="flex justify-between flex-wrap gap-2 text-xs font-bold uppercase">
            <span className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 border-brutal border-black bg-neo-orange shadow-brutal-sm"></span>
              Beginner
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 border-brutal border-black bg-neo-yellow shadow-brutal-sm"></span>
              Basic
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 border-brutal border-black bg-neo-green shadow-brutal-sm"></span>
              Intermediate
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 border-brutal border-black bg-neo-blue shadow-brutal-sm"></span>
              Advanced
            </span>
            <span className="flex flex-col items-center gap-1">
              <span className="w-6 h-6 border-brutal border-black bg-neo-purple shadow-brutal-sm"></span>
              Expert
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SearchFilter;

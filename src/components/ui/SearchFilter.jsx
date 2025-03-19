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
      
      {/* Improved Proficiency Range Slider */}
      {includeRangeSlider && (
        <motion.div 
          className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-2">
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-sm text-gray-700 dark:text-gray-300">
                Proficiency Level: 
                <span className={`ml-2 font-bold ${
                  proficiencyRange === 0 ? 'text-gray-500' :
                  proficiencyRange < 50 ? 'text-amber-500' :
                  proficiencyRange < 75 ? 'text-emerald-500' :
                  'text-indigo-500'
                }`}>
                  {getProficiencyLabel(proficiencyRange)}
                </span>
              </span>
              {proficiencyRange > 0 && (
                <button 
                  onClick={() => setProficiencyRange(0)} 
                  className={`text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors ${
                    purpleTheme ? 'text-purple-500' : 'text-emerald-500'
                  }`}
                >
                  Reset
                </button>
              )}
            </div>
            
            {/* Quick selection buttons */}
            <div className="flex flex-wrap gap-2 mb-3">
              {[
                { label: "All", value: 0 },
                { label: "Beginner+", value: 25 },
                { label: "Intermediate+", value: 50 },
                { label: "Advanced+", value: 75 },
                { label: "Expert", value: 90 }
              ].map(preset => (
                <button
                  key={preset.value}
                  onClick={() => handleProficiencyPreset(preset.value)}
                  className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                    proficiencyRange === preset.value
                      ? purpleTheme 
                        ? 'bg-purple-500 text-white' 
                        : 'bg-emerald-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Custom slider with markers */}
          <div className="relative mt-6 mb-2 px-2">
      
            
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
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${getSliderColor(proficiencyRange)} ${proficiencyRange}%, #e5e7eb ${proficiencyRange}%)`,
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
                className="absolute -mt-12 px-2 py-1 rounded bg-gray-800 text-white text-xs transform -translate-x-1/2"
                style={{ left: `${proficiencyRange}%` }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {proficiencyRange}%
              </motion.div>
            )}
          </div>
          
          {/* Proficiency level descriptions */}
          <div className="flex justify-between mt-2 text-[11px] text-gray-500">
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-orange-400 mb-1"></span>
              Beginner
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-yellow-400 mb-1"></span>
              Basic
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-lime-400 mb-1"></span>
              Intermediate
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-green-400 mb-1"></span>
              Advanced
            </span>
            <span className="flex flex-col items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-600 mb-1"></span>
              Expert
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default SearchFilter;

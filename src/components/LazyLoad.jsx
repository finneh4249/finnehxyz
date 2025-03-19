import React, { Suspense, lazy, memo } from 'react';

// Enhanced loading spinner with progress indication
const EnhancedLoading = memo(({ componentName }) => (
  <div className="flex flex-col justify-center items-center py-12">
    <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mb-2"></div>
    <p className="text-sm text-gray-500 dark:text-gray-400">Loading {componentName}...</p>
  </div>
));

/**
 * Simplified lazy loading component
 * Instead of dynamic path construction, this uses component mapping
 * @param {string} componentKey - The key of the component to load
 * @param {string} componentName - Display name for loading state
 */
const LazyLoad = ({ componentKey, componentName, ...props }) => {
  // Define a mapping of component keys to lazy-loaded components
  const componentMap = {
    // Add your components here
    Projects: lazy(() => import('../components/sections/Projects')),
    ProfessionalExperience: lazy(() => import('../components/sections/ProfessionalExperience')),
    Education: lazy(() => import('../components/sections/Education')),
    Skills: lazy(() => import('../components/sections/Skills')),
    Contact: lazy(() => import('../components/sections/Contact')),
  };

  // Get the requested component or use a fallback
  const Component = componentMap[componentKey] || (() => <div>Component not found</div>);

  return (
    <div className="lazy-load-container">
      <Suspense fallback={<EnhancedLoading componentName={componentName} />}>
        <Component {...props} />
      </Suspense>
    </div>
  );
};

export default memo(LazyLoad);

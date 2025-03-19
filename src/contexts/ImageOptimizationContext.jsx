import React, { createContext, useState, useContext, useMemo } from 'react';

const ImageOptimizationContext = createContext();

export const useImageOptimization = () => useContext(ImageOptimizationContext);

export const ImageOptimizationProvider = ({ children }) => {
  const [priorityImages, setPriorityImages] = useState(new Set());

  const addPriorityImage = (imageId) => {
    setPriorityImages(prev => new Set([...prev, imageId]));
  };

  const removePriorityImage = (imageId) => {
    setPriorityImages(prev => {
      const next = new Set([...prev]);
      next.delete(imageId);
      return next;
    });
  };

  const isPriorityImage = (imageId) => {
    return priorityImages.has(imageId);
  };

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    addPriorityImage,
    removePriorityImage,
    isPriorityImage,
  }), [priorityImages]);

  return (
    <ImageOptimizationContext.Provider value={contextValue}>
      {children}
    </ImageOptimizationContext.Provider>
  );
};

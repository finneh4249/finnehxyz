import React from 'react';

function CompanyRole({ title, period, description, isCurrent = false, isLast = false }) {
  // Function to render description with proper formatting
  const renderFormattedDescription = (text) => {
    if (!text) return null;
    
    // Split the text by newlines
    const lines = text.split('\n');
    
    return (
      <div className="space-y-1.5">
        {lines.map((line, index) => {
          // Check if the line starts with "- " to render as bullet point
          if (line.startsWith('- ')) {
            return (
              <div key={index} className="flex">
                <span className="mr-2 text-primary">•</span>
                <span>{line.substring(2)}</span>
              </div>
            );
          }
          // Regular paragraph
          return <p key={index}>{line}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="role relative pl-7 pb-2 group">
      {/* Role dot indicator with pulsing effect for current role */}
      <div className={`absolute left-0 top-3 w-4 h-4 rounded-full border-2 ${
        isCurrent 
          ? "bg-accent border-accent-focus animate-pulse" 
          : "bg-base-100 border-primary"
      }`}>
        {/* Inner dot for current role */}
        {isCurrent && (
          <span className="absolute inset-0.5 rounded-full bg-accent-content/30"></span>
        )}
      </div>
      
      {/* Connector line between roles - simplified to solid color */}
      {!isLast && (
        <div className="absolute left-2 top-7 bottom-0 w-0.5 bg-primary/30"></div>
      )}
      
      <div className="card bg-base-100 shadow-sm hover:shadow-md transition-all duration-200 group-hover:translate-x-1">
        <div className="card-body p-4">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h4 className="font-semibold text-lg text-base-content">{title}</h4>
            
            <div className="flex items-center flex-wrap gap-2">
              {isCurrent && (
                <span className="badge badge-accent text-accent-content text-xs font-medium">Current</span>
              )}
              <p className={`text-sm ${isCurrent ? "text-accent-focus font-medium" : "text-base-content/70"}`}>
                {period}
              </p>
            </div>
          </div>
          
          {/* Role description with better typography */}
          {description && (
            <div className="mt-2 text-sm text-base-content/80 border-t border-base-300 pt-2 leading-relaxed">
              {renderFormattedDescription(description)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyRole;

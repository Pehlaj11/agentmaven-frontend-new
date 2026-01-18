import React from 'react';

const CallQualityIndicator = ({ quality }) => {
  // Quality levels: poor, fair, good, excellent
  const getQualityColor = (quality) => {
    switch (quality) {
      case 'excellent':
        return 'bg-green-500';
      case 'good':
        return 'bg-green-400';
      case 'fair':
        return 'bg-yellow-500';
      case 'poor':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const getQualityText = (quality) => {
    switch (quality) {
      case 'excellent':
        return 'Excellent';
      case 'good':
        return 'Good';
      case 'fair':
        return 'Fair';
      case 'poor':
        return 'Poor';
      default:
        return 'Unknown';
    }
  };

  const qualityLevels = ['poor', 'fair', 'good', 'excellent'];
  const currentLevelIndex = qualityLevels.indexOf(quality);

  return (
    <div className="flex items-center">
      <div className="flex space-x-1 mr-2">
        {qualityLevels.map((level, index) => (
          <div
            key={level}
            className={`w-2 h-2 rounded-full ${
              index <= currentLevelIndex ? getQualityColor(level) : 'bg-gray-200 dark:bg-gray-700'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
        {getQualityText(quality)}
      </span>
    </div>
  );
};

export default CallQualityIndicator;
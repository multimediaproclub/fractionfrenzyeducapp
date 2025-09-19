import React from 'react';

interface FractionVisualProps {
  numerator: number;
  denominator: number;
  size?: number;
}

const FractionVisual: React.FC<FractionVisualProps> = ({ 
  numerator, 
  denominator, 
  size = 120 
}) => {
  const radius = size / 2 - 10;
  const center = size / 2;
  const anglePerPart = (2 * Math.PI) / denominator;
  
  const parts = Array.from({ length: denominator }, (_, i) => {
    const startAngle = i * anglePerPart - Math.PI / 2;
    const endAngle = (i + 1) * anglePerPart - Math.PI / 2;
    
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(endAngle);
    const y2 = center + radius * Math.sin(endAngle);
    
    const largeArcFlag = anglePerPart > Math.PI ? 1 : 0;
    
    const pathData = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    const isFilled = i < numerator;
    
    return (
      <path
        key={i}
        d={pathData}
        fill={isFilled ? '#3B82F6' : '#E5E7EB'}
        stroke="#FFFFFF"
        strokeWidth="2"
      />
    );
  });

  return (
    <div className="flex flex-col items-center space-y-3">
      <svg width={size} height={size} className="drop-shadow-md">
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#D1D5DB"
          strokeWidth="2"
        />
        {parts}
      </svg>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-800">
          <span className="text-blue-600">{numerator}</span>
          <span className="mx-1">/</span>
          <span className="text-gray-600">{denominator}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1">
          {numerator} out of {denominator} parts
        </div>
      </div>
    </div>
  );
};

export default FractionVisual;
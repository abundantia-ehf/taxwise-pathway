
import React from 'react';

interface TaxDocumentProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const TaxDocument: React.FC<TaxDocumentProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Document outline */}
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      
      {/* TAX text */}
      <path d="M8 13h8" />
      <path d="M8 17h5" />
      
      {/* TAX text at the top of the document */}
      <text 
        x="9" 
        y="11" 
        fill="none" 
        stroke={color} 
        strokeWidth={strokeWidth * 0.8} 
        fontSize="4px" 
        fontWeight="bold"
      >
        TAX
      </text>
    </svg>
  );
};

export default TaxDocument;

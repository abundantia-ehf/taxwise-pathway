
import React from 'react';

interface CustomHomeIconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const CustomHomeIcon: React.FC<CustomHomeIconProps> = ({
  size = 24,
  color = 'currentColor',
  strokeWidth = 2,
  className = '',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* House outline (same as original Home icon) */}
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      
      {/* Single vertical line for door instead of door outline */}
      <line x1="12" y1="15" x2="12" y2="22" />
    </svg>
  );
};

export default CustomHomeIcon;

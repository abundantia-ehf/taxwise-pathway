
import React from 'react';

const PolishZlotyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 5h-5.5C6.5 5 5 6.5 5 8.5S6.5 12 8.5 12H10" />
    <path d="M10 12h2.5c2 0 3.5 1.5 3.5 3.5S14.5 19 12.5 19H7" />
    <line x1="8" y1="8" x2="16" y2="8" />
  </svg>
);

export default PolishZlotyIcon;

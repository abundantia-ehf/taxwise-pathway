
import React from 'react';

const ThaiBahtIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M12 4v16" />
    <path d="M8 7.5a4 4 0 1 1 8 0v0a4 4 0 1 1-8 0v0z" />
    <path d="M8 16.5a4 4 0 1 0 8 0v0a4 4 0 1 0-8 0v0z" />
  </svg>
);

export default ThaiBahtIcon;

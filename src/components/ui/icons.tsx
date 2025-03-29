
import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const defaultProps = {
  size: 24,
  className: '',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  fill: 'none',
};

// Home icon - simplified house shape
export const HomeIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M5 12v7h14v-7" strokeLinecap="round" />
    <path d="M3 12l9-9 9 9" strokeLinecap="round" />
  </svg>
);

// Book icon - simplified open book
export const BookIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M4 6v12h16V6" strokeLinecap="round" />
    <path d="M12 6v12" strokeLinecap="round" />
    <path d="M4 18c3-2 5-2 8-2 3 0 5 0 8 2" strokeLinecap="round" />
    <path d="M4 6c3 2 5 2 8 2 3 0 5 0 8-2" strokeLinecap="round" />
  </svg>
);

// Message icon - simplified chat bubble
export const MessageIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M5 18l3-3h8a3 3 0 003-3V7a3 3 0 00-3-3H8a3 3 0 00-3 3v8z" strokeLinecap="round" />
  </svg>
);

// Database icon - simplified cylindrical database
export const DatabaseIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <ellipse cx="12" cy="6" rx="8" ry="3" strokeLinecap="round" />
    <path d="M4 6v12c0 1.657 3.582 3 8 3s8-1.343 8-3V6" strokeLinecap="round" />
  </svg>
);

// Settings icon - simplified gear
export const SettingsIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="12" r="3" strokeLinecap="round" />
    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" />
  </svg>
);

// Moon icon - simplified moon shape
export const MoonIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M12 3a9 9 0 109 9 9.6 9.6 0 00-9-9z" strokeLinecap="round" />
  </svg>
);

// Sun icon - simplified sun with rays
export const SunIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="12" r="4" strokeLinecap="round" />
    <line x1="12" y1="4" x2="12" y2="4.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="20" x2="12" y2="20.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="4" y1="12" x2="4.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="20" y1="12" x2="20.01" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6.34" y1="6.34" x2="6.35" y2="6.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="17.66" y1="17.66" x2="17.67" y2="17.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6.34" y1="17.66" x2="6.35" y2="17.67" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="17.66" y1="6.34" x2="17.67" y2="6.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Arrow right icon - simplified arrow
export const ArrowRightIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M5 12h14" strokeLinecap="round" />
    <path d="M15 6l6 6-6 6" strokeLinecap="round" />
  </svg>
);

// Arrow down icon - simplified down arrow
export const ArrowDownIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M12 5v14" strokeLinecap="round" />
    <path d="M6 15l6 6 6-6" strokeLinecap="round" />
  </svg>
);

// User icon - simplified person
export const UserIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="8" r="5" strokeLinecap="round" />
    <path d="M3 21v-2a7 7 0 0114 0v2" strokeLinecap="round" />
  </svg>
);

// Clock icon - simplified clock
export const ClockIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="12" r="9" strokeLinecap="round" />
    <polyline points="12 6 12 12 16 14" strokeLinecap="round" />
  </svg>
);

// Dollar icon - simplified dollar sign
export const DollarIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M12 2v20" strokeLinecap="round" />
    <path d="M17 5H9.5C7.01 5 5 7.01 5 9.5S7.01 14 9.5 14H14.5C16.99 14 19 16.01 19 18.5S16.99 21 14.5 21H6" strokeLinecap="round" />
  </svg>
);

// Bell icon - simplified notification bell
export const BellIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M12 4v1" strokeLinecap="round" />
    <path d="M18 10v6l2 2H4l2-2v-6a6 6 0 0112 0" strokeLinecap="round" />
    <path d="M9 18a3 3 0 006 0" strokeLinecap="round" />
  </svg>
);

// Lock icon - simplified padlock
export const LockIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" />
    <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" />
  </svg>
);

// Logout icon - simplified exit door
export const LogoutIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M16 17l5-5-5-5" strokeLinecap="round" />
    <path d="M21 12H9" strokeLinecap="round" />
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeLinecap="round" />
  </svg>
);

// Check icon - simplified checkmark
export const CheckIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <polyline points="5 12 10 17 19 8" strokeLinecap="round" />
  </svg>
);

// Info icon - simplified info circle
export const InfoIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="12" r="9" strokeLinecap="round" />
    <line x1="12" y1="8" x2="12" y2="8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Play icon - simplified play button
export const PlayIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <polygon points="7 5 19 12 7 19" strokeLinecap="round" />
  </svg>
);

// Mail icon - simplified envelope
export const MailIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <rect x="3" y="5" width="18" height="14" rx="1" strokeLinecap="round" />
    <polyline points="3 5 12 14 21 5" strokeLinecap="round" />
  </svg>
);

// Send icon - simplified paper plane
export const SendIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M22 2L11 13" strokeLinecap="round" />
    <path d="M22 2L15 22l-4-9-9-4 20-7z" strokeLinecap="round" />
  </svg>
);

// Bot icon - simplified robot face
export const BotIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <rect x="3" y="7" width="18" height="14" rx="2" strokeLinecap="round" />
    <rect x="8" y="12" width="2" height="2" rx="1" fill="currentColor" />
    <rect x="14" y="12" width="2" height="2" rx="1" fill="currentColor" />
    <path d="M8 17h8" strokeLinecap="round" />
    <path d="M12 3v4" strokeLinecap="round" />
    <path d="M8 3h8" strokeLinecap="round" />
  </svg>
);

// Help circle icon - simplified question mark in circle
export const HelpCircleIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="12" r="9" strokeLinecap="round" />
    <path d="M9 10a3 3 0 016 0c0 1.5-2.5 2.5-3 4" strokeLinecap="round" />
    <circle cx="12" cy="17" r="0.5" fill="currentColor" />
  </svg>
);

// File text icon - simplified document
export const FileTextIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" />
    <polyline points="14 2 14 8 20 8" strokeLinecap="round" />
    <line x1="8" y1="13" x2="16" y2="13" strokeLinecap="round" />
    <line x1="8" y1="17" x2="16" y2="17" strokeLinecap="round" />
    <line x1="8" y1="9" x2="12" y2="9" strokeLinecap="round" />
  </svg>
);

// Refresh icon - simplified circular arrow
export const RefreshIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <path d="M21 12a9 9 0 01-9 9 9 9 0 01-9-9 9 9 0 019-9c2.39 0 4.68.94 6.4 2.6L21 8" strokeLinecap="round" />
    <path d="M21 3v5h-5" strokeLinecap="round" />
  </svg>
);

// Star icon - simplified star shape
export const StarIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" strokeLinecap="round" />
  </svg>
);

// X icon - simplified close/X
export const XIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <line x1="18" y1="6" x2="6" y2="18" strokeLinecap="round" />
    <line x1="6" y1="6" x2="18" y2="18" strokeLinecap="round" />
  </svg>
);

// Chevron left icon - simplified left chevron
export const ChevronLeftIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <polyline points="15 18 9 12 15 6" strokeLinecap="round" />
  </svg>
);

// Circle icon - simple circle
export const CircleIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="12" cy="12" r="9" strokeLinecap="round" />
  </svg>
);

// Chevron right icon - simplified right chevron
export const ChevronRightIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <polyline points="9 18 15 12 9 6" strokeLinecap="round" />
  </svg>
);

// Search icon - simplified magnifying glass
export const SearchIcon = ({ size = 24, className = '', ...props }: IconProps) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={className} 
    xmlns="http://www.w3.org/2000/svg"
    {...defaultProps}
    {...props}
  >
    <circle cx="11" cy="11" r="7" strokeLinecap="round" />
    <line x1="21" y1="21" x2="16.5" y2="16.5" strokeLinecap="round" />
  </svg>
);

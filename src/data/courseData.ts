
export interface Video {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  videos: Video[];
}

export const startHereVideo = {
  id: 'start-here',
  title: 'Start Here: Course Overview',
  duration: '10:30',
  completed: false,
  locked: false
};

export const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Groundwork',
    description: 'What you need to know before starting on your low-tax journey',
    progress: 20,
    videos: [
      { id: 'video-1-1', title: 'Disclaimer', duration: '9:45', completed: true, locked: false },
      { id: 'video-1-2', title: 'Don\'t Skip', duration: '12:30', completed: false, locked: false },
      { id: 'video-1-3', title: 'Why Taxation is B.S.', duration: '15:20', completed: false, locked: false },
      { id: 'video-1-4', title: 'Keeping It Legal (Evasion vs. Avoidance)', duration: '18:15', completed: false, locked: false },
      { id: 'video-1-5', title: 'Simplify, Always', duration: '14:10', completed: false, locked: false },
      { id: 'video-1-6', title: 'For Employees', duration: '11:45', completed: false, locked: false },
    ]
  },
  {
    id: 'module-2',
    title: 'Tax Residency',
    description: 'Understanding the key fundamentals that allow you to legally pay low or no taxes.',
    progress: 0,
    videos: [
      { id: 'video-2-1', title: 'Understanding Tax Residency', duration: '14:10', completed: false, locked: true },
      { id: 'video-2-2', title: 'Tax Residency Examples', duration: '17:50', completed: false, locked: true },
      { id: 'video-2-3', title: 'Changing Tax Residency', duration: '13:25', completed: false, locked: true },
      { id: 'video-2-4', title: 'Corporate Tax Residency', duration: '19:30', completed: false, locked: true },
      { id: 'video-2-5', title: 'Controlled Foreign Corporation (CFC) Laws', duration: '12:45', completed: false, locked: true },
    ]
  },
  {
    id: 'module-3',
    title: 'Offshoring',
    description: 'How to set up a legal low tax structure that actually works',
    progress: 0,
    videos: [
      { id: 'video-3-1', title: 'What We Aim To Achieve', duration: '16:30', completed: false, locked: true },
      { id: 'video-3-2', title: 'Offshore Companies', duration: '18:45', completed: false, locked: true },
      { id: 'video-3-3', title: 'Offshore Structure Examples', duration: '15:20', completed: false, locked: true },
      { id: 'video-3-4', title: 'Localize and Disconnect', duration: '14:10', completed: false, locked: true },
      { id: 'video-3-5', title: 'Setting Up An Offshore Company', duration: '12:55', completed: false, locked: true },
      { id: 'video-3-6', title: 'Banking and Payment Processing', duration: '17:40', completed: false, locked: true },
      { id: 'video-3-7', title: 'Legal and Accounting', duration: '14:25', completed: false, locked: true },
      { id: 'video-3-8', title: 'Using and Offramping Profits', duration: '19:15', completed: false, locked: true },
    ]
  },
  {
    id: 'module-4',
    title: 'For U.S. Citizens',
    description: 'Specific information to help U.S. citizens and residents overcome their unique challenges',
    progress: 0,
    videos: [
      { id: 'video-4-1', title: 'The Big U.S. Tax Problem', duration: '19:15', completed: false, locked: true },
      { id: 'video-4-2', title: 'Reducing Personal Tax Liability (FTC and FEIE)', duration: '22:30', completed: false, locked: true },
      { id: 'video-4-3', title: 'GILTI, Subpart F, CFC Laws', duration: '17:45', completed: false, locked: true },
      { id: 'video-4-4', title: 'Reducing Corporate Tax Liability', duration: '15:20', completed: false, locked: true },
      { id: 'video-4-5', title: 'The Nuclear Option (Renouncing)', duration: '16:40', completed: false, locked: true },
    ]
  },
];

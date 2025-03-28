import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Lock } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
  videos: Video[];
}

interface Video {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
}

const courseModules: Module[] = [
  {
    id: 'module-1',
    title: 'Groundwork',
    description: 'Learn the basic principles of legal tax reduction strategies',
    progress: 20,
    videos: [
      { id: 'video-1-1', title: '0. Disclaimer', duration: '9:45', completed: true, locked: false },
      { id: 'video-1-2', title: 'I. Don\'t Skip', duration: '12:30', completed: false, locked: false },
      { id: 'video-1-3', title: 'II. Why Taxation is B.S.', duration: '15:20', completed: false, locked: false },
      { id: 'video-1-4', title: 'III. Keeping It Legal (Evasion vs. Avoidance)', duration: '18:15', completed: false, locked: false },
      { id: 'video-1-5', title: 'IV. Simplify, Always', duration: '14:10', completed: false, locked: false },
      { id: 'video-1-6', title: 'V. For Employees', duration: '11:45', completed: false, locked: false },
    ]
  },
  {
    id: 'module-2',
    title: 'Tax Residency',
    description: 'Optimize your business structure to legally minimize taxes',
    progress: 0,
    videos: [
      { id: 'video-2-1', title: 'VI. Understanding Tax Residency', duration: '14:10', completed: false, locked: true },
      { id: 'video-2-2', title: 'VII. Tax Residency Examples', duration: '17:50', completed: false, locked: true },
      { id: 'video-2-3', title: 'VIII. Changing Tax Residency', duration: '13:25', completed: false, locked: true },
      { id: 'video-2-4', title: 'IX. Corporate Tax Residency', duration: '19:30', completed: false, locked: true },
      { id: 'video-2-5', title: 'X. Controlled Foreign Corporation (CFC) Laws', duration: '12:45', completed: false, locked: true },
    ]
  },
  {
    id: 'module-3',
    title: 'Offshoring',
    description: 'Leverage real estate investments for significant tax benefits',
    progress: 0,
    videos: [
      { id: 'video-3-1', title: 'Real Estate Depreciation', duration: '16:30', completed: false, locked: true },
      { id: 'video-3-2', title: '1031 Exchanges Explained', duration: '18:45', completed: false, locked: true },
      { id: 'video-3-3', title: 'Real Estate Professional Status', duration: '15:20', completed: false, locked: true },
      { id: 'video-3-4', title: 'Opportunity Zone Investing', duration: '14:10', completed: false, locked: true },
      { id: 'video-3-5', title: 'Short-Term Rentals', duration: '12:55', completed: false, locked: true },
      { id: 'video-3-6', title: 'Cost Segregation Studies', duration: '17:40', completed: false, locked: true },
    ]
  },
  {
    id: 'module-4',
    title: 'For U.S. Citizens',
    description: 'Global tax optimization strategies for entrepreneurs',
    progress: 0,
    videos: [
      { id: 'video-4-1', title: 'Foreign Earned Income Exclusion', duration: '19:15', completed: false, locked: true },
      { id: 'video-4-2', title: 'Offshore Company Structures', duration: '22:30', completed: false, locked: true },
      { id: 'video-4-3', title: 'International Tax Treaties', duration: '17:45', completed: false, locked: true },
      { id: 'video-4-4', title: 'Puerto Rico Tax Incentives', duration: '15:20', completed: false, locked: true },
      { id: 'video-4-5', title: 'Digital Nomad Taxation', duration: '16:40', completed: false, locked: true },
      { id: 'video-4-6', title: 'Foreign Tax Credits', duration: '14:10', completed: false, locked: true },
      { id: 'video-4-7', title: 'Asset Protection Abroad', duration: '18:55', completed: false, locked: true },
      { id: 'video-4-8', title: 'Exit Tax Planning', duration: '21:20', completed: false, locked: true },
    ]
  },
];

const Learn = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  
  const handleVideoClick = (moduleId: string, videoId: string, locked: boolean) => {
    if (locked) {
      return;
    }
    navigate(`/video/${moduleId}/${videoId}`);
  };
  
  const filteredModules = activeTab === 'all' 
    ? courseModules 
    : courseModules.filter(module => module.id === activeTab);

  return (
    <MobileLayout>
      <Header title="Learn" />
      
      <div className="container p-4">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-auto inline-flex mb-4">
              <TabsTrigger value="all">All Modules</TabsTrigger>
              {courseModules.map(module => (
                <TabsTrigger key={module.id} value={module.id}>
                  {module.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-6">
            {courseModules.map(module => (
              <div key={module.id} className="space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{module.title}</h2>
                  <span className="text-sm text-muted-foreground">{module.progress}% Complete</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">{module.description}</p>
                    <div className="space-y-3">
                      {module.videos.slice(0, 3).map(video => (
                        <div 
                          key={video.id}
                          onClick={() => handleVideoClick(module.id, video.id, video.locked)}
                          className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent"
                        >
                          <div className="flex items-center">
                            <div className="mr-3 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                              {video.locked ? (
                                <Lock className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </div>
                            <div>
                              <p className={`font-medium ${video.completed ? 'line-through opacity-70' : ''}`}>
                                {video.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{video.duration}</p>
                            </div>
                          </div>
                          {video.completed && (
                            <span className="text-xs bg-brand/20 text-black dark:text-white px-2 py-1 rounded-full">
                              Completed
                            </span>
                          )}
                          {video.locked && (
                            <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                              Locked
                            </span>
                          )}
                        </div>
                      ))}
                      {module.videos.length > 3 && (
                        <button 
                          onClick={() => setActiveTab(module.id)}
                          className="w-full text-sm text-center py-2 text-muted-foreground hover:text-foreground"
                        >
                          Show all {module.videos.length} videos
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </TabsContent>
          
          {courseModules.map(module => (
            <TabsContent key={module.id} value={module.id} className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{module.title}</h2>
                  <span className="text-sm text-muted-foreground">{module.progress}% Complete</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
              
              <div className="space-y-3">
                {module.videos.map(video => (
                  <div 
                    key={video.id}
                    onClick={() => handleVideoClick(module.id, video.id, video.locked)}
                    className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      <div className="mr-3 h-10 w-10 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                        {video.locked ? (
                          <Lock className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${video.completed ? 'line-through opacity-70' : ''}`}>
                          {video.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{video.duration}</p>
                      </div>
                    </div>
                    {video.completed && (
                      <span className="text-xs bg-brand/20 text-black dark:text-white px-2 py-1 rounded-full">
                        Completed
                      </span>
                    )}
                    {video.locked && (
                      <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                        Locked
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </MobileLayout>
  );
};

export default Learn;

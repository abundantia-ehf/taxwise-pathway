import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Lock, Info } from 'lucide-react';
import { courseModules, startHereVideo } from '@/data/courseData';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

const Learn = () => {
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();
  const { theme } = useTheme();
  
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
      
      <div className="container p-3">
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2">
            <TabsList className="w-auto inline-flex mb-3">
              <TabsTrigger value="all">All Modules</TabsTrigger>
              {courseModules.map(module => (
                <TabsTrigger key={module.id} value={module.id}>
                  {module.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="all" className="space-y-4">
            {/* Start Here section - only appears in All Modules tab */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold flex items-center">
                  <Info className={cn(
                    "h-4 w-4 mr-2",
                    theme === 'greyscale' ? "text-gray-300" : "text-brand"
                  )} />
                  Start Here
                </h2>
              </div>
              <Card className={cn(
                "border-2",
                theme === 'greyscale' 
                  ? "border-gray-700" 
                  : "border-primary dark:border-brand/30"
              )}>
                <CardContent className="p-3">
                  <p className="text-sm text-muted-foreground mb-3">
                    Get familiar with the app and how to best use the information here effectively
                  </p>
                  <div 
                    onClick={() => handleVideoClick('intro', startHereVideo.id, false)}
                    className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      <div className={cn(
                        "mr-3 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                        theme === 'greyscale' ? "bg-gray-700" : "bg-brand/10"
                      )}>
                        <Play className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{startHereVideo.title}</p>
                        <p className="text-xs text-muted-foreground">{startHereVideo.duration}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Regular modules */}
            {courseModules.map(module => (
              <div key={module.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{module.title}</h2>
                  <span className="text-sm text-muted-foreground">{module.progress}% Complete</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <Card>
                  <CardContent className="p-3">
                    <p className="text-sm text-muted-foreground mb-3">{module.description}</p>
                    <div className="space-y-2">
                      {module.videos.slice(0, 3).map(video => (
                        <div 
                          key={video.id}
                          onClick={() => handleVideoClick(module.id, video.id, video.locked)}
                          className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent"
                        >
                          <div className="flex items-center">
                            <div className={cn(
                              "mr-3 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                              theme === 'greyscale' ? "bg-gray-700" : "bg-brand/10"
                            )}>
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
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              theme === 'greyscale' 
                                ? "bg-gray-700 text-white" 
                                : "bg-brand/20 text-black dark:text-white"
                            )}>
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
            <TabsContent key={module.id} value={module.id} className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">{module.title}</h2>
                  <span className="text-sm text-muted-foreground">{module.progress}% Complete</span>
                </div>
                <Progress value={module.progress} className="h-2" />
                <p className="text-sm text-muted-foreground">{module.description}</p>
              </div>
              
              <div className="space-y-2">
                {module.videos.map(video => (
                  <div 
                    key={video.id}
                    onClick={() => handleVideoClick(module.id, video.id, video.locked)}
                    className="flex items-center justify-between p-3 rounded-lg border cursor-pointer hover:bg-accent"
                  >
                    <div className="flex items-center">
                      <div className={cn(
                        "mr-3 h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                        theme === 'greyscale' ? "bg-gray-700" : "bg-brand/10"
                      )}>
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
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        theme === 'greyscale' 
                          ? "bg-gray-700 text-white" 
                          : "bg-brand/20 text-black dark:text-white"
                      )}>
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

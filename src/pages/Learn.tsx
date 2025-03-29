
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Share2, Play, Lock, Info, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { courseModules, startHereVideo } from '@/data/courseData';

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

  const totalLessons = courseModules.reduce((acc, module) => acc + module.videos.length, 0);
  const completedLessons = courseModules.reduce((acc, module) => 
    acc + module.videos.filter(v => v.completed).length, 0);
  const completionPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <MobileLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mr-4 cursor-pointer",
                theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
              )}
              onClick={() => navigate('/home')}
            >
              <ArrowLeft size={18} className="text-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Learn</h1>
          </div>
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
            )}
          >
            <Share2 size={18} className="text-foreground" />
          </div>
        </div>

        {/* Overall Progress */}
        <div className={cn(
          "p-6 rounded-2xl mb-8",
          theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
        )}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold">Course Progress</h2>
              <p className="text-sm text-muted-foreground">
                {completedLessons} of {totalLessons} lessons completed
              </p>
            </div>
            <div className="text-xl font-bold">{completionPercentage}%</div>
          </div>
          <Progress 
            value={completionPercentage} 
            className={cn(
              "h-2",
              theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
            )} 
          />
        </div>
        
        {/* Module Tabs */}
        <div className="mb-6 overflow-x-auto pb-2 flex">
          <button 
            onClick={() => setActiveTab('all')}
            className={cn(
              "px-4 py-2 rounded-full mr-2 text-sm whitespace-nowrap",
              activeTab === 'all' 
                ? 'bg-brand text-black' 
                : `${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} text-foreground`
            )}
          >
            All Modules
          </button>
          {courseModules.map(module => (
            <button
              key={module.id}
              onClick={() => setActiveTab(module.id)}
              className={cn(
                "px-4 py-2 rounded-full mr-2 text-sm whitespace-nowrap",
                activeTab === module.id 
                  ? 'bg-brand text-black' 
                  : `${theme === 'dark' ? 'bg-zinc-900' : 'bg-white'} text-foreground`
              )}
            >
              {module.title}
            </button>
          ))}
        </div>
        
        <div className="space-y-8">
          {/* Start Here section - only appears in All Modules tab */}
          {activeTab === 'all' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Info size={18} className="text-brand mr-2" />
                  <h2 className="text-xl font-semibold">Start Here</h2>
                </div>
              </div>
              
              <div 
                className={cn(
                  "rounded-2xl overflow-hidden cursor-pointer",
                  theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
                )}
                onClick={() => handleVideoClick('intro', startHereVideo.id, false)}
              >
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mr-4",
                        theme === 'dark' ? 'bg-brand/20' : 'bg-brand/20'
                      )}>
                        <Play size={20} className="text-brand" />
                      </div>
                      <div>
                        <h3 className="font-medium">{startHereVideo.title}</h3>
                        <p className="text-xs text-muted-foreground">{startHereVideo.duration}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Modules */}
          {filteredModules.map(module => (
            <div key={module.id}>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{module.title}</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      {module.videos.filter(v => v.completed).length} of {module.videos.length} completed
                    </span>
                    <span className="text-sm font-medium text-brand">{module.progress}%</span>
                  </div>
                </div>
              </div>
              
              <div className={cn(
                "rounded-2xl overflow-hidden",
                theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
              )}>
                <div className="p-2">
                  {module.videos.map((video, index) => (
                    <div 
                      key={video.id}
                      onClick={() => handleVideoClick(module.id, video.id, video.locked)}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-xl cursor-pointer mb-1",
                        theme === 'dark' ? 'hover:bg-zinc-800' : 'hover:bg-gray-100'
                      )}
                    >
                      <div className="flex items-center">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mr-3",
                          video.locked 
                            ? 'bg-zinc-800' 
                            : video.completed 
                              ? 'bg-brand/20' 
                              : 'bg-brand/20'
                        )}>
                          {video.locked ? (
                            <Lock size={16} className="text-muted-foreground" />
                          ) : video.completed ? (
                            <CheckCircle2 size={16} className="text-brand" />
                          ) : (
                            <Play size={16} className="text-brand" />
                          )}
                        </div>
                        <div>
                          <p className={cn(
                            "font-medium",
                            video.completed ? 'text-muted-foreground' : ''
                          )}>
                            {video.title}
                          </p>
                          <p className="text-xs text-muted-foreground">{video.duration}</p>
                        </div>
                      </div>
                      
                      {video.locked ? (
                        <div className={cn(
                          "text-xs px-3 py-1 rounded-full",
                          theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-200'
                        )}>
                          Locked
                        </div>
                      ) : video.completed ? (
                        <div className="text-xs px-3 py-1 rounded-full bg-brand/20 text-brand">
                          Completed
                        </div>
                      ) : (
                        <ArrowUpRight size={16} className="text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Learn;

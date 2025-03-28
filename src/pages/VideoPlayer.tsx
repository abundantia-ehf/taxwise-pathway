
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, CheckCircle } from 'lucide-react';
import WistiaPlayer from '@/components/video/WistiaPlayer';

// Updated video data model with Wistia support
const getVideoData = (moduleId: string, videoId: string) => {
  return {
    id: videoId,
    title: 'Understanding Tax Brackets',
    description: 'Learn how tax brackets work and strategies to optimize your income to stay in lower brackets.',
    videoUrl: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
    wistiaId: 'abc123xyz', // Example Wistia ID - replace with your actual Wistia video ID
    useWistia: true, // Flag to indicate whether to use Wistia or regular video player
    transcript: `Welcome to the first video in our Untaxable course. Today we're going to be talking about understanding tax brackets. 

Tax brackets are ranges of income that are taxed at specific rates. The U.S. uses a progressive tax system, which means that the tax rate increases as your income increases.

However, many people misunderstand how tax brackets actually work. You don't pay the highest rate on your entire income - only on the portion that falls into that bracket.

Let's look at a simple example. Imagine the tax brackets are:
- 10% for income up to $10,000
- 20% for income between $10,001 and $40,000
- 30% for income over $40,000

If you earn $50,000, you don't pay 30% on the entire amount. You pay:
- 10% on the first $10,000 ($1,000)
- 20% on the next $30,000 ($6,000)
- 30% on the remaining $10,000 ($3,000)

Your total tax would be $10,000, which is an effective tax rate of 20%, not 30%.

Understanding this concept is the foundation of tax planning. In the next videos, we'll explore strategies to keep more of your income in lower brackets.`,
    resources: [
      { title: 'Tax Bracket Calculator', url: '#' },
      { title: 'IRS Tax Tables', url: '#' },
      { title: 'Income Shifting Strategies PDF', url: '#' }
    ],
    nextVideo: {
      id: 'video-1-2',
      title: 'Legal vs. Illegal Tax Avoidance'
    }
  };
};

const VideoPlayer = () => {
  const { moduleId = '', videoId = '' } = useParams();
  const [activeTab, setActiveTab] = useState('video');
  const [videoCompleted, setVideoCompleted] = useState(false);
  const navigate = useNavigate();
  
  const video = getVideoData(moduleId, videoId);
  
  const handleVideoEnd = () => {
    setVideoCompleted(true);
  };
  
  const handleNextVideo = () => {
    navigate(`/video/${moduleId}/${video.nextVideo.id}`);
  };

  return (
    <MobileLayout>
      <Header title={video.title} showBack />
      
      <div className="container p-0">
        {/* Video Player - conditionally render Wistia or standard player */}
        <div className="relative aspect-video bg-black w-full">
          {video.useWistia && video.wistiaId ? (
            <WistiaPlayer 
              videoId={video.wistiaId}
              onEnd={handleVideoEnd}
            />
          ) : (
            <video
              className="w-full h-full object-contain"
              controls
              onEnded={handleVideoEnd}
              poster="/placeholder.svg"
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        
        <div className="p-4">
          <Tabs defaultValue="video" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full">
              <TabsTrigger value="video" className="flex-1">Video</TabsTrigger>
              <TabsTrigger value="transcript" className="flex-1">Transcript</TabsTrigger>
              <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
            </TabsList>
            
            <TabsContent value="video" className="mt-4 space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{video.title}</h2>
                <p className="text-sm text-muted-foreground mt-2">{video.description}</p>
              </div>
              
              {videoCompleted ? (
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="flex items-center"
                    onClick={() => setVideoCompleted(false)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Again
                  </Button>
                  
                  <Button 
                    className="bg-brand text-black hover:bg-brand/90"
                    onClick={handleNextVideo}
                  >
                    Next Video
                  </Button>
                </div>
              ) : (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                        <Play className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">Next: {video.nextVideo.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Continue watching to complete this module
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="transcript" className="mt-4">
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-sm">{video.transcript}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="resources" className="mt-4 space-y-3">
              <h3 className="font-medium">Additional Resources</h3>
              <div className="space-y-2">
                {video.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href={resource.url}
                    className="flex items-center p-3 rounded-lg border hover:bg-accent"
                  >
                    <div className="mr-3 h-8 w-8 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                    <span>{resource.title}</span>
                  </a>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MobileLayout>
  );
};

export default VideoPlayer;

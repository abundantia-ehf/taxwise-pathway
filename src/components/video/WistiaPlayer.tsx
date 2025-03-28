
import React, { useEffect, useRef } from 'react';

interface WistiaPlayerProps {
  videoId: string;
  onEnd?: () => void;
}

declare global {
  interface Window {
    _wq: any[];
  }
}

const WistiaPlayer: React.FC<WistiaPlayerProps> = ({ videoId, onEnd }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Create Wistia script
    const script1 = document.createElement('script');
    script1.src = `https://fast.wistia.com/embed/medias/${videoId}.jsonp`;
    script1.async = true;
    
    const script2 = document.createElement('script');
    script2.src = 'https://fast.wistia.com/assets/external/E-v1.js';
    script2.async = true;
    
    // Append scripts to document
    document.head.appendChild(script1);
    document.head.appendChild(script2);
    
    // Initialize Wistia queue if it doesn't exist
    if (!window._wq) {
      window._wq = [];
    }
    
    // Add video to the queue
    window._wq.push({
      id: videoId,
      onReady: (video: any) => {
        // Prevent multiple initializations
        if (hasInitialized.current) return;
        hasInitialized.current = true;
        
        // Handle video end event
        if (onEnd) {
          video.bind('end', onEnd);
        }
      }
    });
    
    // Cleanup function
    return () => {
      hasInitialized.current = false;
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, [videoId, onEnd]);
  
  return (
    <div className="wistia_responsive_padding w-full h-full" style={{ paddingTop: '56.25%', position: 'relative' }}>
      <div className="wistia_responsive_wrapper" style={{ height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }}>
        <div 
          ref={containerRef} 
          className={`wistia_embed wistia_async_${videoId} videoFoam=true`} 
          style={{ height: '100%', position: 'relative', width: '100%' }}
        >
          &nbsp;
        </div>
      </div>
    </div>
  );
};

export default WistiaPlayer;

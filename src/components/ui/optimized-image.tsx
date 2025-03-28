import React, { useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  loadingHeight?: string | number;
  blurEffect?: boolean;
}

const OptimizedImage = ({
  src,
  alt,
  className,
  fallback,
  loadingHeight = "auto",
  blurEffect = true,
  ...props
}: OptimizedImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Function to get optimized image URL
  const getOptimizedUrl = (url: string): string => {
    // Check if the image is from lovable-uploads (these are already uploaded)
    if (url.includes('lovable-uploads')) {
      return url;
    }
    
    // If it's an external URL, return as is
    if (url.startsWith('http')) {
      return url;
    }
    
    // Otherwise assume it's a local image and return as is
    return url;
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div className={cn("relative overflow-hidden", className)} style={{ height: isLoading ? loadingHeight : 'auto' }}>
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {error && fallback ? (
        <>{fallback}</>
      ) : (
        <img
          src={getOptimizedUrl(src)}
          alt={alt}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            blurEffect && isLoading ? "blur-sm" : "blur-0",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};

export { OptimizedImage };


import React, { useEffect, useRef } from 'react';

interface DigitScrollerProps {
  digit: string;
  previousDigit?: string;
  isChanging: boolean;
}

const DigitScroller = ({ digit, previousDigit, isChanging }: DigitScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChanging && scrollRef.current) {
      scrollRef.current.style.transform = 'translateY(-100%)';
      
      setTimeout(() => {
        if (scrollRef.current) {
          scrollRef.current.style.transition = 'none';
          scrollRef.current.style.transform = 'translateY(0)';
        }
      }, 300);
    } else if (scrollRef.current) {
      scrollRef.current.style.transition = 'transform 300ms ease';
      scrollRef.current.style.transform = 'translateY(0)';
    }
  }, [digit, isChanging]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div 
        ref={scrollRef}
        className="transition-transform duration-300 ease-out"
        style={{
          height: '200%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {isChanging && previousDigit && (
          <div className="h-1/2 flex items-center justify-center">{previousDigit}</div>
        )}
        <div className="h-1/2 flex items-center justify-center">{digit}</div>
      </div>
    </div>
  );
};

export default DigitScroller;

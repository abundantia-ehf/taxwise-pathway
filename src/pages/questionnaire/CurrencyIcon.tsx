
import React, { useEffect, useRef } from 'react';
import { DollarSign, Euro, PoundSterling, JapaneseYen, RussianRuble, PhilippinePeso, SwissFranc } from 'lucide-react';
import { initializeCurrencyHighlighter } from '@/components/questionnaire/CurrencyHighlighter';

const CurrencyIcon = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize the highlighter effect
    const cleanup = initializeCurrencyHighlighter();
    
    // Cleanup on unmount
    return cleanup;
  }, []);

  const icons = [
    { Icon: DollarSign, id: 1 },
    { Icon: Euro, id: 2 },
    { Icon: PoundSterling, id: 3 },
    { Icon: JapaneseYen, id: 4 },
    { Icon: RussianRuble, id: 5 },
    { Icon: PhilippinePeso, id: 6 },
    { Icon: SwissFranc, id: 7 },
    // Duplicate for seamless scrolling
    { Icon: DollarSign, id: 8 },
    { Icon: Euro, id: 9 },
    { Icon: PoundSterling, id: 10 },
    { Icon: JapaneseYen, id: 11 },
    { Icon: RussianRuble, id: 12 },
    { Icon: PhilippinePeso, id: 13 },
    { Icon: SwissFranc, id: 14 }
  ];

  return (
    <div className="w-full overflow-hidden my-4">
      <div className="flex animate-scroll" ref={scrollRef}>
        {icons.map(({ Icon, id }) => (
          <div key={id} className="mx-6 flex-shrink-0 icon-highlight">
            <Icon className="h-10 w-10 text-gray-600 currency-icon" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrencyIcon;

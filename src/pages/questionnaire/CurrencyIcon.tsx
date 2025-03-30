
import React, { useEffect, useRef } from 'react';
import { DollarSign, Euro, PoundSterling, JapaneseYen, RussianRuble, IndianRupee, SwissFranc } from 'lucide-react';
import { initializeCurrencyHighlighter } from '@/components/questionnaire/CurrencyHighlighter';
import SaudiRiyalIcon from '@/components/icons/SaudiRiyalIcon';

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
    { Icon: IndianRupee, id: 6 },
    { Icon: SwissFranc, id: 7 },
    { Icon: SaudiRiyalIcon, id: 8 }, // Using our custom Saudi Riyal icon
    // Duplicate for seamless scrolling
    { Icon: DollarSign, id: 9 },
    { Icon: Euro, id: 10 },
    { Icon: PoundSterling, id: 11 },
    { Icon: JapaneseYen, id: 12 },
    { Icon: RussianRuble, id: 13 },
    { Icon: IndianRupee, id: 14 },
    { Icon: SwissFranc, id: 15 },
    { Icon: SaudiRiyalIcon, id: 16 } // Using our custom Saudi Riyal icon
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

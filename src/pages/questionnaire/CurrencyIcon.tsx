
import React, { useEffect, useState } from 'react';
import { DollarSign, Euro, PoundSterling, JapaneseYen, RussianRuble, IndianRupee, SwissFranc } from 'lucide-react';
import SaudiRiyalIcon from '@/components/icons/SaudiRiyalIcon';

const CurrencyIcon = () => {
  const [currentIconIndex, setCurrentIconIndex] = useState(0);
  
  const icons = [
    { Icon: DollarSign, id: 1 },
    { Icon: Euro, id: 2 },
    { Icon: PoundSterling, id: 3 },
    { Icon: JapaneseYen, id: 4 },
    { Icon: RussianRuble, id: 5 },
    { Icon: IndianRupee, id: 6 },
    { Icon: SwissFranc, id: 7 },
    { Icon: SaudiRiyalIcon, id: 8 }
  ];

  useEffect(() => {
    // Set up a timer to cycle through icons
    const timer = setInterval(() => {
      setCurrentIconIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2000); // Change icon every 2 seconds
    
    return () => clearInterval(timer); // Cleanup on unmount
  }, [icons.length]);

  const Icon = icons[currentIconIndex].Icon;

  return (
    <div className="w-full overflow-hidden my-4">
      <div className="flex justify-center items-center py-4">
        <div className="icon-highlight">
          <Icon className="h-12 w-12 text-brand currency-icon animate-pulse" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
};

export default CurrencyIcon;


import React, { useEffect, useState } from 'react';
import { DollarSign, Euro, PoundSterling, JapaneseYen, RussianRuble, IndianRupee, SwissFranc } from 'lucide-react';
import SaudiRiyalIcon from '@/components/icons/SaudiRiyalIcon';
import UkrainianHryvniaIcon from '@/components/icons/UkrainianHryvniaIcon';
import TurkishLiraIcon from '@/components/icons/TurkishLiraIcon';
import PolishZlotyIcon from '@/components/icons/PolishZlotyIcon';
import ThaiBahtIcon from '@/components/icons/ThaiBahtIcon';
import IsraeliShekelIcon from '@/components/icons/IsraeliShekelIcon';
import KazakhTengeIcon from '@/components/icons/KazakhTengeIcon';
import SouthKoreanWonIcon from '@/components/icons/SouthKoreanWonIcon';

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
    { Icon: SaudiRiyalIcon, id: 8 },
    { Icon: UkrainianHryvniaIcon, id: 9 },
    { Icon: TurkishLiraIcon, id: 10 },
    { Icon: PolishZlotyIcon, id: 11 },
    { Icon: ThaiBahtIcon, id: 12 },
    { Icon: IsraeliShekelIcon, id: 13 },
    { Icon: KazakhTengeIcon, id: 14 },
    { Icon: SouthKoreanWonIcon, id: 15 }
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
    <div className="flex justify-center items-center h-10 mb-2">
      <div className="icon-highlight">
        <Icon className="h-10 w-10 text-brand currency-icon animate-pulse" strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default CurrencyIcon;

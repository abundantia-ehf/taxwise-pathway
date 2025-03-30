
import React from 'react';
import { BadgePercent, FileText, Landmark, Wallet, HandCoins, Receipt, Vault } from 'lucide-react';

const ScrollingIcons = () => {
  const icons = [
    { id: 1, Icon: BadgePercent },
    { id: 2, Icon: FileText },
    { id: 3, Icon: Landmark },
    { id: 4, Icon: Wallet },
    { id: 5, Icon: HandCoins },
    { id: 6, Icon: Receipt },
    { id: 7, Icon: Vault },
    // Duplicate icons to create a seamless loop
    { id: 8, Icon: BadgePercent },
    { id: 9, Icon: FileText },
    { id: 10, Icon: Landmark },
    { id: 11, Icon: Wallet },
    { id: 12, Icon: HandCoins },
    { id: 13, Icon: Receipt },
    { id: 14, Icon: Vault },
  ];

  return (
    <div className="w-screen -mx-4 overflow-hidden my-6">
      <div className="flex animate-scroll">
        {icons.map(({ id, Icon }) => (
          <div key={id} className="mx-6 flex-shrink-0">
            <Icon className="h-12 w-12 text-gray-600" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingIcons;

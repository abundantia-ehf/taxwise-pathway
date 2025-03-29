
import React from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronRight, Flag, Building, CircleDollarSign, Luggage } from 'lucide-react';

interface DataSourceProps {
  title: string;
  description: string;
  recordCount: number;
  lastUpdated: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const DataSource = ({ title, description, recordCount, lastUpdated, icon, onClick }: DataSourceProps) => {
  const { theme } = useTheme();
  
  return (
    <Card 
      className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'} hover:shadow-md transition-all cursor-pointer`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center">
          <div className="h-12 w-12 rounded-lg bg-brand/20 flex items-center justify-center mr-4">
            {icon}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{title}</h3>
              <ChevronRight size={18} className="text-muted-foreground mt-1" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>{recordCount} records</span>
              <span>Updated: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Data = () => {
  const { theme } = useTheme();
  
  const dataSources = [
    {
      id: '1',
      title: 'Global Tax Rates',
      description: 'Comprehensive database of tax rates across different countries',
      icon: <CircleDollarSign size={24} className="text-brand" />,
      recordCount: 195,
      lastUpdated: 'Oct 15, 2023'
    },
    {
      id: '2',
      title: 'Offshore Locales',
      description: 'Information on business-friendly jurisdictions and their tax benefits',
      icon: <Building size={24} className="text-brand" />,
      recordCount: 45,
      lastUpdated: 'Nov 8, 2023'
    },
    {
      id: '3',
      title: 'Digital Nomad Visas',
      description: 'Details on countries offering special visas for remote workers',
      icon: <Luggage size={24} className="text-brand" />,
      recordCount: 32,
      lastUpdated: 'Sep 22, 2023'
    },
    {
      id: '4',
      title: 'US Tax Treaties',
      description: 'Information on tax treaties between the US and other countries',
      icon: <Flag size={24} className="text-brand" />,
      recordCount: 68,
      lastUpdated: 'Dec 3, 2023'
    }
  ];
  
  const handleOpenDataSource = (id: string) => {
    console.log(`Opening data source with ID: ${id}`);
    // Future functionality: Navigate to detailed view of this data source
  };

  return (
    <MobileLayout>
      <Header title="Data" />
      
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Databases</h2>
            <p className="text-sm text-muted-foreground">
              Access our collection of tax optimization databases and resources
            </p>
          </div>
          
          {dataSources.map(source => (
            <DataSource
              key={source.id}
              title={source.title}
              description={source.description}
              recordCount={source.recordCount}
              lastUpdated={source.lastUpdated}
              icon={source.icon}
              onClick={() => handleOpenDataSource(source.id)}
            />
          ))}
          
          <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'} p-4 mt-8`}>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Our databases are updated regularly to ensure you have access to the most current tax optimization strategies and information.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Data;

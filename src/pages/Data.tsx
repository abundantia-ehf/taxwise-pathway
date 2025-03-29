
import React, { useState, useEffect } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronRight, Flag, Building, CircleDollarSign, Luggage, Database, AlertCircle } from 'lucide-react';
import AirtableSetup from '@/components/AirtableSetup';
import { getAirtableCredentials, fetchAirtableData } from '@/utils/airtable';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
  const [showSetup, setShowSetup] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  // Check if Airtable is connected on component mount
  useEffect(() => {
    const credentials = getAirtableCredentials();
    setIsConnected(!!credentials);
  }, []);
  
  const dataSources = [
    {
      id: '1',
      title: 'Global Tax Rates',
      description: 'Comprehensive database of tax rates across different countries',
      icon: <CircleDollarSign size={24} className="text-brand" />,
      recordCount: 195,
      lastUpdated: 'Oct 15, 2023',
      airtableTable: 'Global Tax Rates'
    },
    {
      id: '2',
      title: 'Offshore Districts',
      description: 'Information on business-friendly jurisdictions and their tax benefits',
      icon: <Building size={24} className="text-brand" />,
      recordCount: 45,
      lastUpdated: 'Nov 8, 2023',
      airtableTable: 'Offshore Districts'
    },
    {
      id: '3',
      title: 'Digital Nomad Visas',
      description: 'Details on countries offering special visas for remote workers',
      icon: <Luggage size={24} className="text-brand" />,
      recordCount: 32,
      lastUpdated: 'Sep 22, 2023',
      airtableTable: 'Digital Nomad Visas'
    },
    {
      id: '4',
      title: 'US Tax Treaties',
      description: 'Information on tax treaties between the US and other countries',
      icon: <Flag size={24} className="text-brand" />,
      recordCount: 68,
      lastUpdated: 'Dec 3, 2023',
      airtableTable: 'US Tax Treaties'
    }
  ];
  
  const handleOpenDataSource = async (id: string) => {
    console.log(`Opening data source with ID: ${id}`);
    setErrorMessage(null);
    
    const dataSource = dataSources.find(source => source.id === id);
    if (!dataSource) return;
    
    if (!isConnected) {
      toast.error("Please connect to Airtable first");
      setShowSetup(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const data = await fetchAirtableData(dataSource.airtableTable);
      console.log(`Fetched ${data.length} records from ${dataSource.title}`);
      
      if (data.length === 0) {
        const errorMsg = `No records found in "${dataSource.title}" table. Please verify the table name exists in your Airtable base.`;
        setErrorMessage(errorMsg);
        toast.warning(errorMsg);
      } else {
        toast.success(`Loaded ${data.length} records from ${dataSource.title}`);
        // In a real app, you'd now navigate to a detail view with this data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMsg = "Failed to load data. Check your Base ID and table name.";
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetupComplete = () => {
    setShowSetup(false);
    setIsConnected(true);
    setErrorMessage(null);
  };

  return (
    <MobileLayout>
      <Header title="Data" />
      
      <div className="container max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold mb-2">Databases</h2>
              <p className="text-sm text-muted-foreground">
                Access our collection of tax optimization databases and resources
              </p>
            </div>
            
            {isConnected ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setShowSetup(true);
                  setErrorMessage(null);
                }}
              >
                <Database size={16} className="mr-2" /> 
                Manage Connection
              </Button>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => setShowSetup(true)}
              >
                <Database size={16} className="mr-2" /> 
                Connect to Airtable
              </Button>
            )}
          </div>
          
          {errorMessage && (
            <Card className={`border ${theme === 'dark' ? 'border-amber-800 bg-amber-950/50' : 'border-amber-200 bg-amber-50'} p-4 mb-4`}>
              <div className="flex items-start">
                <AlertCircle size={18} className="text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-500">Connection Issue</h4>
                  <p className="text-sm">{errorMessage}</p>
                  <p className="text-sm mt-2">
                    Make sure:
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Your Base ID is correct</li>
                      <li>The table name matches exactly in your Airtable base</li>
                      <li>Your access token has permission to access this base</li>
                    </ul>
                  </p>
                </div>
              </div>
            </Card>
          )}
          
          {showSetup ? (
            <AirtableSetup onSetupComplete={handleSetupComplete} />
          ) : (
            <>
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
            </>
          )}
          
          <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'} p-4 mt-8`}>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isConnected 
                  ? "Your Airtable databases are connected. Click on a database to view its contents." 
                  : "Connect to Airtable to access your custom tax optimization databases."}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </MobileLayout>
  );
};

export default Data;

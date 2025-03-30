import React, { useState, useEffect } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import Header from '@/components/layout/Header';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { ChevronRight, Building, CircleDollarSign, Flag, Database, AlertCircle } from 'lucide-react';
import AirtableSetup from '@/components/AirtableSetup';
import { getAirtableCredentials, fetchAirtableData, isAirtableConfigured } from '@/utils/airtable';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataTable from '@/components/DataTable';

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
      <CardContent className="p-3">
        <div className="flex items-center">
          <div className={cn(
            "h-12 w-12 rounded-lg flex items-center justify-center mr-3",
            theme === 'greyscale' ? "bg-gray-700/50" : "bg-brand/20"
          )}>
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
  const [selectedData, setSelectedData] = useState<any[] | null>(null);
  const [selectedDataTitle, setSelectedDataTitle] = useState<string>('');
  const [needsConfiguration, setNeedsConfiguration] = useState(false);
  
  // Check if Airtable is connected on component mount
  useEffect(() => {
    const credentials = getAirtableCredentials();
    setIsConnected(!!credentials);
    setNeedsConfiguration(!isAirtableConfigured());
    
    if (!isAirtableConfigured()) {
      setErrorMessage("Admin needs to configure Airtable credentials in the source code");
    }
  }, []);
  
  const dataSources = [
    {
      id: '1',
      title: 'Global Tax Rates',
      description: 'Comprehensive database of tax rates across different countries',
      icon: <CircleDollarSign size={24} className={theme === 'greyscale' ? "text-gray-300" : "text-brand"} />,
      recordCount: 214,
      lastUpdated: 'Mar 28, 2025',
      airtableTable: 'Global Tax Rates'
    },
    {
      id: '2',
      title: 'Offshore Districts',
      description: 'Information on business-friendly jurisdictions and their tax benefits',
      icon: <Building size={24} className={theme === 'greyscale' ? "text-gray-300" : "text-brand"} />,
      recordCount: 36,
      lastUpdated: 'Mar 28, 2025',
      airtableTable: 'Offshore Districts'
    },
    {
      id: '3',
      title: 'Digital Nomad Visas',
      description: 'Details on countries offering special visas for remote workers',
      icon: <Flag size={24} className={theme === 'greyscale' ? "text-gray-300" : "text-brand"} />,
      recordCount: 48,
      lastUpdated: 'Mar 28, 2025',
      airtableTable: 'Digital Nomad Visas'
    }
  ];
  
  const handleOpenDataSource = async (id: string) => {
    console.log(`Opening data source with ID: ${id}`);
    setErrorMessage(null);
    
    const dataSource = dataSources.find(source => source.id === id);
    if (!dataSource) return;
    
    if (!isConnected) {
      if (needsConfiguration) {
        toast.error("Airtable credentials not configured by admin");
        setErrorMessage("Administrator needs to configure Airtable credentials in the source code");
      } else {
        toast.error("Please connect to Airtable first");
        setShowSetup(true);
      }
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
        setSelectedData(data);
        setSelectedDataTitle(dataSource.title);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      const errorMsg = "Failed to load data. Check your Airtable configuration.";
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
  
  const handleBackToList = () => {
    setSelectedData(null);
    setSelectedDataTitle('');
    setErrorMessage(null);
  };

  return (
    <MobileLayout>
      <Header title="Data" />
      
      <div className="container max-w-md mx-auto px-3 py-4">
        <div className="space-y-3">
          {!selectedData ? (
            <>
              <div className="mb-4 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold mb-1">Databases</h2>
                  <p className="text-sm text-muted-foreground">
                    Access our collection of tax optimization databases and resources
                  </p>
                </div>
                
                {needsConfiguration ? (
                  <Button 
                    variant="outline" 
                    size="sm"
                    disabled
                  >
                    <Database size={16} className="mr-2" /> 
                    Admin Setup Required
                  </Button>
                ) : null}
              </div>
              
              {errorMessage && (
                <Card className={`border ${theme === 'dark' ? 'border-amber-800 bg-amber-950/50' : 'border-amber-200 bg-amber-50'} p-3 mb-3`}>
                  <div className="flex items-start">
                    <AlertCircle size={18} className="text-amber-500 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-500">Configuration Issue</h4>
                      <p className="text-sm">{errorMessage}</p>
                      {needsConfiguration && (
                        <p className="text-sm mt-2">
                          The administrator needs to:
                          <ul className="list-disc pl-5 mt-1 space-y-1">
                            <li>Set the default Airtable API key and Base ID in the source code</li>
                            <li>Ensure the configured base has all required tables</li>
                          </ul>
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              )}
              
              {showSetup && !needsConfiguration ? (
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
              
              <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'} p-3 mt-5`}>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {needsConfiguration 
                      ? "This feature requires administrator configuration to work properly."
                      : "Access your tax optimization databases with secure administrator-managed authentication."}
                  </p>
                </div>
              </Card>
            </>
          ) : (
            <DataTable 
              data={selectedData} 
              title={selectedDataTitle} 
              onBack={handleBackToList} 
            />
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Data;

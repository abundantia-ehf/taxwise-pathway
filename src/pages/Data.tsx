
import React, { useState, useEffect } from 'react';
import MobileLayout from '@/components/layout/MobileLayout';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  ChevronRight, 
  Building, 
  CircleDollarSign, 
  Flag, 
  Database, 
  AlertCircle, 
  ArrowLeft, 
  Share2,
  User,
  ArrowUpRight
} from 'lucide-react';
import AirtableSetup from '@/components/AirtableSetup';
import { getAirtableCredentials, fetchAirtableData, isAirtableConfigured } from '@/utils/airtable';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import DataTable from '@/components/DataTable';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
    <div 
      className={cn(
        "p-5 rounded-2xl mb-4 cursor-pointer",
        theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center mr-4",
          theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{title}</h3>
            <ArrowUpRight size={18} className="text-muted-foreground" />
          </div>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>{recordCount} records</span>
            <span>Updated: {lastUpdated}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Data = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
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
      icon: <CircleDollarSign size={24} className="text-brand" />,
      recordCount: 214,
      lastUpdated: 'Mar 28, 2025',
      airtableTable: 'Global Tax Rates'
    },
    {
      id: '2',
      title: 'Offshore Districts',
      description: 'Information on business-friendly jurisdictions and their tax benefits',
      icon: <Building size={24} className="text-brand" />,
      recordCount: 36,
      lastUpdated: 'Mar 28, 2025',
      airtableTable: 'Offshore Districts'
    },
    {
      id: '3',
      title: 'Digital Nomad Visas',
      description: 'Details on countries offering special visas for remote workers',
      icon: <Flag size={24} className="text-brand" />,
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

  // Stats for the dashboard view
  const dataStats = [
    { label: 'Countries', value: '214', icon: <User size={14} className="text-brand" /> },
    { label: 'Tax Rates', value: '428', icon: <User size={14} className="text-brand" /> },
    { label: 'Jurisdictions', value: '36', icon: <User size={14} className="text-brand" /> },
  ];

  return (
    <MobileLayout>
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <div 
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center mr-4 cursor-pointer",
                theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
              )}
              onClick={() => navigate('/home')}
            >
              <ArrowLeft size={18} className="text-foreground" />
            </div>
            <h1 className="text-2xl font-bold">Data</h1>
          </div>
          <div 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center",
              theme === 'dark' ? 'bg-zinc-800' : 'bg-gray-100'
            )}
          >
            <Share2 size={18} className="text-foreground" />
          </div>
        </div>

        {!selectedData ? (
          <>
            {/* Data Overview */}
            <div className={cn(
              "p-6 rounded-2xl mb-8",
              theme === 'dark' ? 'bg-zinc-900' : 'bg-white'
            )}>
              <h2 className="text-xl font-semibold mb-4">Data Overview</h2>
              <div className="grid grid-cols-3 gap-4">
                {dataStats.map((stat, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-1 mb-1">
                      {stat.icon}
                      <span className="text-2xl font-bold">{stat.value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Error message if needed */}
            {errorMessage && (
              <div className={cn(
                "p-4 rounded-2xl mb-6",
                theme === 'dark' ? 'bg-amber-950/30 border border-amber-500/30' : 'bg-amber-50 border border-amber-200'
              )}>
                <div className="flex items-start">
                  <AlertCircle size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
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
              </div>
            )}
            
            {/* Airtable setup or data sources */}
            {showSetup && !needsConfiguration ? (
              <AirtableSetup onSetupComplete={handleSetupComplete} />
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">Databases</h2>
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
            
            {/* Info card */}
            <div className={cn(
              "p-5 rounded-2xl mt-6 text-center",
              theme === 'dark' ? 'bg-zinc-900/50 border border-zinc-800' : 'bg-white/50 border border-gray-200'
            )}>
              <p className="text-sm text-muted-foreground">
                {needsConfiguration 
                  ? "This feature requires administrator configuration to work properly."
                  : "Access your tax optimization databases with secure administrator-managed authentication."}
              </p>
            </div>
          </>
        ) : (
          <DataTable 
            data={selectedData} 
            title={selectedDataTitle} 
            onBack={handleBackToList} 
          />
        )}
      </div>
    </MobileLayout>
  );
};

export default Data;

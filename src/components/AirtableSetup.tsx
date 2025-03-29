
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveAirtableCredentials, getAirtableCredentials } from '@/utils/airtable';
import { toast } from 'sonner';

interface AirtableSetupProps {
  onSetupComplete: () => void;
}

const AirtableSetup = ({ onSetupComplete }: AirtableSetupProps) => {
  const savedCredentials = getAirtableCredentials();
  const [apiKey, setApiKey] = useState(savedCredentials?.apiKey || '');
  const [baseId, setBaseId] = useState(savedCredentials?.baseId || '');

  const handleSave = () => {
    if (!apiKey || !baseId) {
      toast.error("Please provide both API key and Base ID");
      return;
    }

    saveAirtableCredentials(apiKey, baseId);
    toast.success("Airtable credentials saved");
    onSetupComplete();
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-medium">Connect to Airtable</h3>
        <p className="text-sm text-muted-foreground">
          Enter your Airtable API key and Base ID to connect your databases
        </p>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="apiKey">API Key</Label>
            <Input 
              id="apiKey" 
              placeholder="Enter your Airtable API key" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              type="password"
            />
            <p className="text-xs text-muted-foreground">
              Find your API key in your Airtable account settings
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="baseId">Base ID</Label>
            <Input 
              id="baseId" 
              placeholder="Enter your Airtable Base ID" 
              value={baseId}
              onChange={(e) => setBaseId(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Find your Base ID in the API documentation of your Airtable base
            </p>
          </div>
          
          <Button onClick={handleSave} className="w-full">
            Connect to Airtable
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AirtableSetup;

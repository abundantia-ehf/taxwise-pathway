
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { saveAirtableCredentials, getAirtableCredentials } from '@/utils/airtable';
import { toast } from 'sonner';
import { ExternalLink } from 'lucide-react';

interface AirtableSetupProps {
  onSetupComplete: () => void;
}

const AirtableSetup = ({ onSetupComplete }: AirtableSetupProps) => {
  const savedCredentials = getAirtableCredentials();
  const [token, setToken] = useState(savedCredentials?.apiKey || '');
  const [baseId, setBaseId] = useState(savedCredentials?.baseId || '');

  const handleSave = () => {
    if (!token || !baseId) {
      toast.error("Please provide both Access Token and Base ID");
      return;
    }

    saveAirtableCredentials(token, baseId);
    toast.success("Airtable credentials saved");
    onSetupComplete();
  };

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-lg font-medium">Connect to Airtable</h3>
        <p className="text-sm text-muted-foreground">
          Enter your Airtable Personal Access Token and Base ID to connect your databases
        </p>
        
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="token">Personal Access Token</Label>
            <Input 
              id="token" 
              placeholder="Enter your Airtable Personal Access Token" 
              value={token}
              onChange={(e) => setToken(e.target.value)}
              type="password"
            />
            <p className="text-xs text-muted-foreground flex items-center">
              <span>Create a token in your Airtable account settings</span>
              <a 
                href="https://airtable.com/create/tokens" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand inline-flex items-center ml-1 hover:underline"
              >
                <ExternalLink size={12} className="ml-1" />
              </a>
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
            <p className="text-xs text-muted-foreground flex items-center">
              <span>Find your Base ID in the API documentation of your Airtable base</span>
              <a 
                href="https://airtable.com/api" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand inline-flex items-center ml-1 hover:underline"
              >
                <ExternalLink size={12} className="ml-1" />
              </a>
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

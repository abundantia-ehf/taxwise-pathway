
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

interface AirtableSetupProps {
  onSetupComplete: () => void;
}

const AirtableSetup = ({ onSetupComplete }: AirtableSetupProps) => {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h3 className="text-lg font-medium">Admin Configuration Required</h3>
            <p className="text-sm text-muted-foreground mt-1">
              This feature requires the administrator to configure Airtable credentials in the source code.
            </p>
          </div>
        </div>
        
        <Button onClick={onSetupComplete} className="w-full">
          Return to Databases
        </Button>
      </CardContent>
    </Card>
  );
};

export default AirtableSetup;

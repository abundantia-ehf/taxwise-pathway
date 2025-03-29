
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { OptimizedImage } from './ui/optimized-image';

interface DataTableProps {
  data: any[];
  title: string;
  onBack: () => void;
}

const DataTable = ({ data, title, onBack }: DataTableProps) => {
  const { theme } = useTheme();
  
  // Early return if there's no data
  if (!data || data.length === 0) {
    return (
      <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'} p-4`}>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground">No data available</p>
        </CardContent>
      </Card>
    );
  }
  
  // Extract column headers from the first record's fields
  let columns = Object.keys(data[0].fields || {});
  
  // Filter out specific columns based on the table title
  if (title === "Global Tax Rates") {
    columns = columns.filter(column => column !== "Flag");
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" />
          Back to databases
        </Button>
      </div>
      
      <Card className={`border ${theme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-zinc-200 bg-white'}`}>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column}>{column}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((record) => (
                <TableRow key={record.id}>
                  {columns.map((column) => {
                    const value = record.fields[column];
                    let displayValue = value;
                    
                    // Handle arrays and objects for display
                    if (Array.isArray(value)) {
                      // If it's an array of objects (like attachments or linked records)
                      if (value.length > 0 && typeof value[0] === 'object') {
                        // For attachments with URLs - Add proper null checks
                        if (value[0] && value[0].url) {
                          displayValue = (
                            <OptimizedImage 
                              src={value[0].url} 
                              alt={value[0].filename || 'Image'} 
                              className="h-8 w-auto"
                              fallback={<div className="h-8 w-8 bg-muted flex items-center justify-center text-xs">No img</div>}
                            />
                          );
                        } else if (value[0] && value[0].id) {
                          // For linked records, just show the count
                          displayValue = `${value.length} linked records`;
                        } else {
                          // Safely stringify the array
                          try {
                            displayValue = JSON.stringify(value).substring(0, 50);
                            if (displayValue.length >= 50) displayValue += '...';
                          } catch (e) {
                            displayValue = 'Complex data';
                          }
                        }
                      } else {
                        // For simple arrays, join with commas
                        displayValue = value.join(', ');
                      }
                    } else if (value && typeof value === 'object') {
                      // For objects, safely stringify them
                      try {
                        displayValue = JSON.stringify(value).substring(0, 50);
                        if (displayValue.length >= 50) displayValue += '...';
                      } catch (e) {
                        displayValue = 'Complex data';
                      }
                    }
                    
                    // Final null check to ensure we always have something to display
                    if (displayValue === null || displayValue === undefined) {
                      displayValue = '';
                    }
                    
                    return (
                      <TableCell key={column}>
                        {displayValue}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default DataTable;

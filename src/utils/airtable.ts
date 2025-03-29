
import { toast } from "sonner";

interface AirtableConfig {
  apiKey: string;
  baseId: string;
}

// Store Airtable credentials in localStorage
export const saveAirtableCredentials = (apiKey: string, baseId: string) => {
  localStorage.setItem('airtable_api_key', apiKey);
  localStorage.setItem('airtable_base_id', baseId);
};

// Get stored Airtable credentials
export const getAirtableCredentials = (): AirtableConfig | null => {
  const apiKey = localStorage.getItem('airtable_api_key');
  const baseId = localStorage.getItem('airtable_base_id');
  
  if (!apiKey || !baseId) {
    return null;
  }
  
  return { apiKey, baseId };
};

// Fetch data from an Airtable table
export const fetchAirtableData = async (tableName: string): Promise<any[]> => {
  const credentials = getAirtableCredentials();
  
  if (!credentials) {
    toast.error("Airtable credentials not found");
    return [];
  }
  
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${credentials.baseId}/${encodeURIComponent(tableName)}`,
      {
        headers: {
          Authorization: `Bearer ${credentials.apiKey}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    toast.error("Failed to fetch data from Airtable");
    return [];
  }
};

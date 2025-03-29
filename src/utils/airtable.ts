
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
    // Use the correct Airtable API URL format
    // Adding 'fields=true' to the URL ensures that all fields are returned
    const url = `https://api.airtable.com/v0/${credentials.baseId}/${encodeURIComponent(tableName)}`;
    
    console.log(`Fetching data from: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${credentials.apiKey}`,
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable API error:", errorData);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`Full API response for ${tableName}:`, data);
    return data.records;
  } catch (error) {
    console.error("Error fetching Airtable data:", error);
    toast.error("Failed to fetch data from Airtable");
    return [];
  }
};

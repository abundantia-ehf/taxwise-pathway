import { toast } from "sonner";

interface AirtableConfig {
  apiKey: string;
  baseId: string;
}

// Default credentials that should be set by the admin
const DEFAULT_CREDENTIALS: AirtableConfig = {
  apiKey: "", // Admin should replace with actual Airtable API key
  baseId: "", // Admin should replace with actual Airtable Base ID
};

// Check if the app should use admin-provided credentials only
const ADMIN_ONLY_CREDENTIALS = true; // Set to true to use only the DEFAULT_CREDENTIALS

// Store Airtable credentials in localStorage
export const saveAirtableCredentials = (apiKey: string, baseId: string) => {
  // Only save if allowed (not in admin-only mode or the user is an admin)
  if (!ADMIN_ONLY_CREDENTIALS) {
    localStorage.setItem('airtable_api_key', apiKey);
    localStorage.setItem('airtable_base_id', baseId);
  }
};

// Get stored Airtable credentials
export const getAirtableCredentials = (): AirtableConfig | null => {
  // If in admin-only mode, return the default credentials
  if (ADMIN_ONLY_CREDENTIALS) {
    return DEFAULT_CREDENTIALS.apiKey && DEFAULT_CREDENTIALS.baseId
      ? DEFAULT_CREDENTIALS
      : null;
  }
  
  // Otherwise, try to get from localStorage
  const apiKey = localStorage.getItem('airtable_api_key');
  const baseId = localStorage.getItem('airtable_base_id');
  
  if (!apiKey || !baseId) {
    return null;
  }
  
  return { apiKey, baseId };
};

// Check if Airtable credentials are configured by admin
export const isAirtableConfigured = (): boolean => {
  if (ADMIN_ONLY_CREDENTIALS) {
    return Boolean(DEFAULT_CREDENTIALS.apiKey && DEFAULT_CREDENTIALS.baseId);
  }
  return true; // User will be asked to configure if needed
};

// Fetch data from an Airtable table
export const fetchAirtableData = async (tableName: string): Promise<any[]> => {
  const credentials = getAirtableCredentials();
  
  if (!credentials) {
    toast.error("Airtable credentials not configured");
    return [];
  }
  
  try {
    // Use the correct Airtable API URL format
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

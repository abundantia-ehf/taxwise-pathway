import { toast } from "sonner";

interface AirtableConfig {
  token: string;
  baseId: string;
}

// Default credentials that should be set by the admin
const DEFAULT_CREDENTIALS: AirtableConfig = {
  token: "", // Admin should replace with actual Airtable Personal Access Token
  baseId: "", // Admin should replace with actual Airtable Base ID
};

// Admin-only credentials mode is enabled by default
const ADMIN_ONLY_CREDENTIALS = true;

// Store Airtable credentials in localStorage (only used if admin mode is disabled)
export const saveAirtableCredentials = (token: string, baseId: string) => {
  // Only save if allowed (not in admin-only mode)
  if (!ADMIN_ONLY_CREDENTIALS) {
    localStorage.setItem('airtable_token', token);
    localStorage.setItem('airtable_base_id', baseId);
  }
};

// Get stored Airtable credentials
export const getAirtableCredentials = (): AirtableConfig | null => {
  // If in admin-only mode, return the default credentials
  if (ADMIN_ONLY_CREDENTIALS) {
    return DEFAULT_CREDENTIALS.token && DEFAULT_CREDENTIALS.baseId
      ? DEFAULT_CREDENTIALS
      : null;
  }
  
  // Otherwise, try to get from localStorage
  const token = localStorage.getItem('airtable_token');
  const baseId = localStorage.getItem('airtable_base_id');
  
  if (!token || !baseId) {
    return null;
  }
  
  return { token, baseId };
};

// Check if Airtable credentials are configured by admin
export const isAirtableConfigured = (): boolean => {
  if (ADMIN_ONLY_CREDENTIALS) {
    return Boolean(DEFAULT_CREDENTIALS.token && DEFAULT_CREDENTIALS.baseId);
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
        Authorization: `Bearer ${credentials.token}`,
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

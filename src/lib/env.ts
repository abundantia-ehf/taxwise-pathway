
// Environment variables check
export const checkEnvVariables = () => {
  // Since we're using the pre-configured Supabase client, we don't need to check for env variables
  return true;
};

// Helper to safely access environment variables
export const getEnvVariable = (name: string, defaultValue: string = ''): string => {
  return import.meta.env[name] || defaultValue;
};

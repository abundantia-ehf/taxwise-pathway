
// Environment variables check
export const checkEnvVariables = () => {
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY'
  ];
  
  const missing = requiredVars.filter(
    varName => !import.meta.env[varName]
  );
  
  if (missing.length > 0) {
    // In development, provide helpful guidance
    if (import.meta.env.DEV) {
      console.warn(
        `⚠️ Missing required environment variables: ${missing.join(', ')}.\n` +
        `Create a .env file in the project root with these variables to use Supabase features.`
      );
    }
    
    // In production, log error but don't crash the UI if possible
    if (import.meta.env.PROD) {
      console.error(
        `⚠️ Critical environment variables missing: ${missing.join(', ')}`
      );
    }
    
    return false;
  }
  
  return true;
};

// Helper to safely access environment variables
export const getEnvVariable = (name: string, defaultValue: string = ''): string => {
  return import.meta.env[name] || defaultValue;
};

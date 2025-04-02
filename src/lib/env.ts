
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
    console.error(
      `⚠️ Missing required environment variables: ${missing.join(', ')}`
    );
    return false;
  }
  
  return true;
};

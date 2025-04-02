
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page directly during development
    // Change back to '/start' when ready to re-enable authentication
    navigate('/home');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <p className="text-xl text-foreground">Redirecting to home screen...</p>
      </div>
    </div>
  );
};

export default Index;

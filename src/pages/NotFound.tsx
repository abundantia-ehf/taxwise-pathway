
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background text-foreground">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-brand text-black hover:bg-brand/90"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;

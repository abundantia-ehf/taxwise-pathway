
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';

const LoadingPage = () => {
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadingFinished = () => {
    setShowLoading(false);
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-black">
      {showLoading && <LoadingScreen onFinished={handleLoadingFinished} />}
    </div>
  );
};

export default LoadingPage;

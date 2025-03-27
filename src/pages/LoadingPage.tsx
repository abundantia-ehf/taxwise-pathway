
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';

const LoadingPage = () => {
  const [showLoading, setShowLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoadingFinished = () => {
    setShowLoading(false);
    navigate('/');
  };

  return (
    <>
      {showLoading && <LoadingScreen onFinished={handleLoadingFinished} />}
    </>
  );
};

export default LoadingPage;

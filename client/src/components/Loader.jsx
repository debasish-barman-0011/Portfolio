import { useEffect, useState } from 'react';

const Loader = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  if (!loading) return null;
  return (
    <div className="loader-overlay">
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
      <div className="loader-text">Loading<span className="loader-dots">...</span></div>
      <div className="loader-progress"><div className="loader-progress-bar"></div></div>
    </div>
  );
};
export default Loader;
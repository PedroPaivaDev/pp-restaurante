import React from 'react';

const useMediaQuery = () => {
  const [widthApp, setWidthApp] = React.useState(window.innerWidth - 20);

  React.useEffect(() => {
    const handleResize = () => {
      setWidthApp(window.innerWidth - 20);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return widthApp;
};

export default useMediaQuery;
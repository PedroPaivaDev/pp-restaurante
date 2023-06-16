import React from 'react';

const useMediaQuery = () => {

  const [widthApp, setWidthApp] = React.useState(window.screen.width - 20)

  const resizeObserver = new ResizeObserver(event => {
    setWidthApp(event[0].borderBoxSize[0].inlineSize - 20);
  });

  resizeObserver.observe(document.body);
  
  return widthApp
}

export default useMediaQuery;
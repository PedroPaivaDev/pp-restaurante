import React from 'react';

const useMediaQuery = () => {

  const [widthApp, setWidthApp] = React.useState(window.screen.width - 20)

  const resizeObserver = new ResizeObserver(e => {
    setWidthApp(e[0].borderBoxSize[0].inlineSize - 20);
  });

  resizeObserver.observe(document.body);
  
  return [widthApp, setWidthApp]
}

export default useMediaQuery;
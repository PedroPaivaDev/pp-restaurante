import React from 'react';
import styled from 'styled-components';

import Slide from './Slide';

type TypeSetState = HTMLElement | null;

interface BgProps {
  bgImage: string;
}

const DivImage = styled.div<BgProps>`
  width: 100%;
  height: 100%;
  background: ${(props) => `url(${props.bgImage})`};
  background-position: center center;
  background-size: cover;
`;

const Slider = ({images}:{images: string[]}) => {
  const [container, setContainer] = React.useState<TypeSetState>();
  const [elements, setElements] = React.useState<TypeSetState>();
  const [controls, setControls] = React.useState<TypeSetState>();

  React.useEffect(() => {
    if(document) {
      setContainer(document.getElementById('slide'));
      setElements(document.getElementById('slide-elements'));
      setControls(document.getElementById('slide-controls'));
    }
  }, [container]);

  React.useEffect(() => {
    if(container && elements && controls && elements.children.length) {
      const slide = new Slide(container, Array.from(elements.children), controls, 3000);
      slide.show(0);
    }
  },[elements]);

  return (
    <div id='slide'>
      <div id="slide-elements">
        {images.map(image => (
          <DivImage key={image} bgImage={image}/>
        ))}
      </div>
      <div id='slide-controls'/>
    </div>
  )
}

export default Slider;
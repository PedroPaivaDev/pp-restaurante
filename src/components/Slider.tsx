import React from 'react';
import styled from 'styled-components';

const DivSlider = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
`;

interface PropsSlider {
  onSwipe: (direction: 'right' | 'left') => void;
  children: React.ReactNode;
}

const Slider: React.FC<PropsSlider> = ({ onSwipe, children }) => {
  const startXRef = React.useRef<number | null>(null);
  const startYRef = React.useRef<number | null>(null);

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    const touch = event.touches[0];
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (!startXRef.current || !startYRef.current) return;

    const touch = event.touches[0];
    const deltaX = touch.clientX - startXRef.current;
    const deltaY = touch.clientY - startYRef.current;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        onSwipe('right');
      } else {
        onSwipe('left');
      }
    }

    startXRef.current = null;
    startYRef.current = null;
  }

  return (
    <DivSlider id='slider'
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {children}
    </DivSlider>
  );
};

export default Slider;
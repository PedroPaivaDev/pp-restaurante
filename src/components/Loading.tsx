import React from 'react';
import Image from 'next/image';

const Loading = () => {
  return (
    <>
      <Image
        src={'./loading.svg'}
        alt='arrowLeft'
        width={50}
        height={50}
      />
      <p>Carregando...</p>
    </>
  );
}

export default Loading;
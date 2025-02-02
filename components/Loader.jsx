import React, { useEffect, useState } from 'react';

export default function Loader({ onFinish }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula el tiempo de carga y luego oculta el loader
    setTimeout(() => {
      setIsLoading(false);
      onFinish(); // Llama a la función para mostrar la página
    }, 1500); // Tiempo igual a la animación de la barra
  }, [onFinish]);

  return (
    <div className={`loader-container ${isLoading ? '' : 'hidden'}`}>
      <div className="loader-line"></div>
    </div>
  );
}

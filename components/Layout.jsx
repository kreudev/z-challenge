import React, { useState } from 'react';
import Navbar from './Navbar';
import Loader from './Loader';

const Layout = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="container">
      <Navbar />
      {!isLoaded ? (
        <Loader onFinish={() => setIsLoaded(true)} />
      ) : (
        <div className="fade-in">{children}</div>
      )}
    </main>
  );
};

export default Layout;

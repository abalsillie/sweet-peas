import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <h5 className="text-center mb-2">Designed by Alex Balsillie</h5>
      <h5 className="text-center mb-0">&copy; {new Date().getFullYear()}</h5>
    </footer>
  );
};

export default Footer;

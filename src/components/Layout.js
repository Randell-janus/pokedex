import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="py-24 min-h-screen max-w-6xl mx-auto px-8">
      <h1 className="font-semibold border-b pb-8 mb-8 w-full tracking-wider">
        Pokedex
      </h1>
      {children}
    </div>
  );
};

export default Layout;

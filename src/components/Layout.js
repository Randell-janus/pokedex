import React from "react";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="py-24 min-h-screen max-w-6xl mx-auto px-8">
      <Link to="/">
        <h1 className="font-semibold border-b pb-8 mb-8 w-full tracking-wider">
          Pokedex
        </h1>
      </Link>
      {children}
    </div>
  );
};

export default Layout;

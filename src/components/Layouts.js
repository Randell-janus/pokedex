import React from "react";
import { Link } from "react-router-dom";

export const PageLayout = ({ children }) => {
  return (
    <div className="py-24 min-h-screen max-w-6xl mx-auto px-8">
      <h1 className="font-semibold border-b pb-8 mb-8 w-full">
        <Link to="/">Pokedex</Link>
      </h1>
      {children}
    </div>
  );
};

export const FooterLayout = ({ children }) => {
  return (
    <footer className="flex justify-end mt-12">{children}</footer>
  );
};

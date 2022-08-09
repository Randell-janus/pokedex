import React from "react";
import { Link } from "react-router-dom";

export const PageLayout = ({ children }) => {
  return (
    <div className="py-24 min-h-screen max-w-7xl mx-auto px-8">
      <h1 className="font-semibold border-b pb-8 mb-8 w-full">
        <Link to="/">Pokedex</Link>
      </h1>
      {children}
    </div>
  );
};

export const FooterLayout = ({ children }) => {
  return <footer className="flex justify-end mt-12">{children}</footer>;
};

export const DataLayout = ({ children, label }) => {
  return (
    <div className="space-y-2 w-1/2">
      <h4 className="font-bold mb-4">{label}</h4>
      <div className="space-y-1">{children}</div>
    </div>
  );
};

export const DataContainer = ({ children }) => {
  return (
    <div className="flex flex-col sm:flex-row space-y-8 sm:space-y-0">
      {children}
    </div>
  );
};

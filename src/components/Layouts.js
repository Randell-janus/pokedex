import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleTextChange = (e) => {
    const target = e.target.value.replace(/\s+/g, "");
    setSearchTerm(target.toLowerCase());
  };

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/pokemon/${searchTerm.toLocaleLowerCase()}`);
  };

  return (
    <div className="py-24 min-h-screen max-w-7xl mx-auto px-8">
      <div className="font-bold border-b pb-8 mb-8 flex items-center justify-between">
        <h1>
          <Link to="/">Pokedex</Link>
        </h1>
        <form onSubmit={handleSearch} className="space-x-4">
          <input
            type="text"
            required
            className="input-primary-slate"
            onChange={handleTextChange}
          />
          <button className="btn-primary-slate">search</button>
        </form>
      </div>
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

import React, { useContext, useState, useEffect, createContext } from "react";

const PokemonContext = createContext();

export const usePokemons = () => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");

  const getPokemon = async (name) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await res.json();
    return data;
  };

  const getPokemons = async () => {
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach(async (pokemon) => {
      const data = await getPokemon(pokemon.name);

      setPokemons((prev) => [...prev, data]);
    });

    setUrl(data.next);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const value = { getPokemon, getPokemons, pokemons };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

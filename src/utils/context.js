import React, { useContext, useState, useEffect, createContext } from "react";
import { fetcher } from "./helpers";
import { ENDPOINTS } from "./constants";

const PokemonContext = createContext();

export const usePokemons = () => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [url, setUrl] = useState(ENDPOINTS.POKEMONS);

  const getPokemons = async () => {
    const res = await fetch(url);
    const data = await res.json();

    data.results.forEach(async (pokemon) => {
      const pokemonProfile = await fetcher(ENDPOINTS.POKEMON, pokemon.name);
      // const pokemonSpecies = await getSpecies(pokemon.name);
      // const evolutionID = formatEvolutionID(pokemonSpecies);

      // setPokemons((prev) => [
      //   ...prev,
      //   { ...pokemonProfile, ...pokemonSpecies },
      // ]);
      setPokemons((prev) => [...prev, pokemonProfile]);
    });
    pokemons.sort((a, b) => a.id - b.id);
    setUrl(data.next);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const value = { getPokemons, pokemons };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

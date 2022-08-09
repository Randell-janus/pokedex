import React, { useContext, useState, useEffect, createContext } from "react";
import { fetcher } from "./helpers";
import { ENDPOINTS } from "./constants";

const PokemonContext = createContext();

export const usePokemons = () => {
  return useContext(PokemonContext);
};

export const PokemonProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [pokemon, setPokemon] = useState();
  const [evolutions, setEvolutions] = useState([]);

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
    setUrl(data.next);
  };

  useEffect(() => {
    getPokemons();
  }, []);

  const value = {
    pokemons,
    pokemon,
    evolutions,
    setEvolutions,
    setPokemon,
    getPokemons,
  };

  return (
    <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>
  );
};

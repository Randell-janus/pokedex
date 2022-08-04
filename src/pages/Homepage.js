import React, { useState } from "react";
import { Link } from "react-router-dom";
import PokemonCard from "../components/PokemonCard";

import { usePokemons } from "../contexts/PokemonContext";

const Homepage = () => {
  const { getPokemons, pokemons } = usePokemons();

  return (
    <div>
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-8 border-b pb-7 mb-7">
        {pokemons?.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon} />
        ))}
      </main>
      <footer className="flex justify-end">
        <button
          className="px-5 py-2 bg-slate-100 rounded-md hover:scale-105 transition-all active:scale-95"
          onClick={getPokemons}
        >
          Load more pokemons...
        </button>
      </footer>
    </div>
  );
};

export default Homepage;

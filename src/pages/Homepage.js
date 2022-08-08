import React, { useState } from "react";

import { FooterLayout } from "../components/Layouts";
import PokemonCard from "../components/PokemonCard";

import { usePokemons } from "../utils/context";

const Homepage = () => {
  const { getPokemons, pokemons } = usePokemons();

  return (
    <>
      <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-4 sm:gap-x-6 sm:gap-y-8 border-b pb-8">
        {pokemons?.map((pokemon, i) => (
          <PokemonCard key={i} pokemon={pokemon} />
        ))}
      </main>

      <FooterLayout>
        <button className="btn-primary-slate" onClick={getPokemons}>
          Load more pokemons...
        </button>
      </FooterLayout>
    </>
  );
};

export default Homepage;

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { usePokemons } from "../contexts/PokemonContext";

const Homepage = () => {
  const { getPokemons, pokemons } = usePokemons();

  return (
    <div>
      <div>
        {pokemons?.map((p, i) => (
          <Link to={`/pokemon/${p.name}`} key={i}>
            {p.name}
          </Link>
        ))}
      </div>
      <button onClick={getPokemons}>Load more</button>
    </div>
  );
};

export default Homepage;

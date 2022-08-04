import React from "react";
import { Link } from "react-router-dom";

const PokemonCard = ({ pokemon }) => {
  return (
    <Link
      to={`/pokemon/${pokemon.name}`}
      className="rounded-md hover:shadow-md hover:scale-105 transition-all"
    >
      <section className="rounded-t-md flex items-center justify-center bg-slate-100 p-4 sm:p-8">
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-40"
        />
      </section>

      <section className="p-4">
        <p className="capitalize text-center text-slate-600">{pokemon.name}</p>
      </section>
    </Link>
  );
};

export default PokemonCard;

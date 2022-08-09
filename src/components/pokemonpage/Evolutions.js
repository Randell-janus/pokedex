import React from "react";
import { Link } from "react-router-dom";

import { usePokemons } from "../../utils/context";

const Evolutions = () => {
  const { evolutions } = usePokemons();

  return (
    <section className="border rounded-md p-12 h-full space-y-8">
      <h3 className="capitalize font-bold w-full text-center md:text-start">
        Evolutions
      </h3>
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-6 md:space-y-0 items-center justify-center">
        {evolutions
          ?.sort((a, b) => a.weight - b.weight)
          .map((ev, i) => (
            <Link to={`/pokemon/${ev.name}`} key={i} className="space-y-2">
              <div className="bg-slate-100 rounded-md hover:bg-slate-200 transition-all p-4 w-max md:w-full">
                <img
                  src={ev.sprites.front_default}
                  alt={ev.name}
                  className="w-40"
                />
              </div>
              <p className="text-center capitalize">{ev.name}</p>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default Evolutions;

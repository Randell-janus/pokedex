import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { usePokemons } from "../contexts/PokemonContext";

const PokemonPage = () => {
  const { getPokemon } = usePokemons();
  const { name } = useParams();

  const [pokemon, setPokemon] = useState();

  const handleGetPokemon = async () => {
    const data = await getPokemon(name);
    setPokemon(data);
  };

  useEffect(() => {
    handleGetPokemon();
  }, []);

  return (
    <div className="space-y-8">
      <section className="flex flex-col sm:flex-row border rounded-md">
        <div className="flex items-center justify-center border-b sm:border-b-0 sm:border-r w-full sm:w-1/3 py-4 px-8">
          <img
            src={pokemon?.sprites.front_default}
            alt={pokemon?.name}
            className="w-52"
          />
        </div>

        <div className="flex-1 p-8 sm:p-12 space-y-4 flex flex-col">
          <h2 className="capitalize tracking-wider font-bold">
            {pokemon?.name}
          </h2>
          <div className="flex flex-col sm:flex-row rounded-md p-8 w-full space-y-8 sm:space-y-0">
            <div className="space-y-2 w-1/2">
              <h3 className="font-bold mb-4">Types</h3>
              <div className="space-y-2 rounded-md">
                {pokemon?.types.map((type, i) => (
                  <p key={i} className="capitalize">
                    {type.type.name}
                  </p>
                ))}
              </div>
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-bold mb-4">Abilities</h3>
              <div className="space-y-2 rounded-md">
                {pokemon?.abilities.map((ability, i) => (
                  <p key={i} className="capitalize">{ability.ability.name}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border p-8 sm:p-12 space-y-8 rounded-md">
        <div className="space-y-2">
          <h3 className="font-bold mb-4">Stats</h3>
          <div className="space-y-4 rounded-md">
            {pokemon?.stats.map((stat, i) => (
              <div key={i}>
                <p className="capitalize">
                  {stat.stat.name}: {stat.base_stat}
                </p>
                <div className="bg-slate-200 rounded-full h-1.5">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full"
                    style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PokemonPage;

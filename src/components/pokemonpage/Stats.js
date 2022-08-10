import { useState } from "react";

import { SPECIES_COLORS, STATS } from "../../utils/constants";
import { usePokemons } from "../../utils/context";
import { RefreshIcon } from "../Icons";

const Stats = () => {
  const { pokemon } = usePokemons();
  const [isFrontImage, setIsFrontImage] = useState(true);

  return (
    <section className="w-full md:w-2/5 lg:w-1/3 relative border rounded-md">
      <div className="flex items-center justify-center rounded-md py-8">
        <button
          onClick={() => setIsFrontImage((prev) => !prev)}
          className="btn-primary-slate p-2 absolute top-3 right-3"
        >
          <RefreshIcon />
        </button>
        <img
          src={
            isFrontImage
              ? pokemon?.sprites.front_default
              : pokemon?.sprites.back_default
          }
          alt={pokemon?.name}
          className="w-52 p-4 lg:p-0"
        />
      </div>

      <div className="px-12 pb-12 rounded-md space-y-4">
        <h2 className="tracking-wider font-bold text-center uppercase mb-14">
          {pokemon?.name}
        </h2>
        <h3 className="font-bold">Stats</h3>
        <div className="space-y-4">
          {pokemon?.stats.map((stat, i) => (
            <div key={i}>
              <p className="capitalize">
                {STATS[stat.stat.name]}: {stat.base_stat}
              </p>
              <div className="bg-slate-100 rounded-full h-1.5">
                <div
                  className={`h-1.5 rounded-full ${
                    SPECIES_COLORS[pokemon?.color?.name]
                  }`}
                  style={{ width: `${(stat.base_stat / 200) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;

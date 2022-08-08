import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { formatEvolutionID, fetcher } from "../utils/helpers";
import { SPECIES_COLORS, ENDPOINTS } from "../utils/constants";

import { RefreshIcon } from "../components/Icons";
import { FooterLayout } from "../components/Layouts";

const PokemonPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState();
  const [evolutions, setEvolutions] = useState([]);

  const [evolutionObj, setEvolutionObj] = useState();
  const [isFrontImage, setIsFrontImage] = useState(true);

  const handleGetPokemon = async () => {
    const pokemonProfile = await fetcher(ENDPOINTS.POKEMON, name);
    const pokemonSpecies = await fetcher(ENDPOINTS.SPECIES, name);
    const evolutionID = formatEvolutionID(pokemonSpecies);
    const evolutionObj = await fetcher(ENDPOINTS.EVOLUTION, evolutionID);

    setPokemon({ ...pokemonProfile, ...pokemonSpecies });
    setEvolutionObj(evolutionObj);
  };

  const handlePokemonChange = (data) => {
    setIsFrontImage(true);
    setPokemon(data);
    navigate(`/pokemon/${data.name}`);
  };

  const getPrevPokemon = async () => {
    const data = await fetcher(ENDPOINTS.POKEMON, pokemon.id - 1);
    handlePokemonChange(data);
  };

  const getNextPokemon = async () => {
    const data = await fetcher(ENDPOINTS.POKEMON, pokemon.id + 1);
    handlePokemonChange(data);
  };

  const getEvolutionChain = () => {
    const evolutions = [];

    const first = evolutionObj?.chain?.species.name;
    const second = evolutionObj?.chain?.evolves_to[0];
    const third = evolutionObj?.chain?.evolves_to[0]?.evolves_to[0];

    evolutions.push(first);

    if (second?.length < 1) return;
    evolutions.push(second?.species?.name);

    if (third?.length < 0) return;
    evolutions.push(third?.species?.name);

    setEvolutions(evolutions);
  };

  useEffect(() => {
    handleGetPokemon();
    getEvolutionChain();
  }, [pokemon]);

  return (
    <>
      {/* <main className="space-y-8">
        <section className="flex flex-col sm:flex-row border rounded-md">
          <div className="flex items-center justify-center border-b sm:border-b-0 sm:border-r w-full sm:w-1/3 py-4 px-8 relative">
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
              className="w-52"
            />
          </div>

          <div className="flex-1 p-8 sm:p-12 space-y-6 flex flex-col">
            <h2 className="capitalize tracking-wider font-bold">
              {pokemon?.name}
            </h2>
            <div className="flex flex-col sm:flex-row rounded-md w-full space-y-8 sm:space-y-0">
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
                    <p key={i} className="capitalize">
                      {ability.ability.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border p-8 sm:p-12 space-x-0 sm:space-x-10 space-y-8 sm:space-y-0 rounded-md flex flex-col sm:flex-row">
          <div className="space-y-2 w-full sm:w-1/4">
            <h3 className="font-bold mb-4">Profile</h3>
            <div className="space-y-4 rounded-md">sdsd</div>
          </div>

          <div className="space-y-2 flex-1">
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
                      style={{ width: `${(stat.base_stat / 175) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main> */}
      <main className="flex space-x-8">
        <section className="w-1/3 relative border rounded-md">
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
              className="w-52"
            />
          </div>

          <div className="px-12 pb-12 rounded-md">
            <div className="space-y-2 flex-1">
              <h3 className="font-bold mb-4">Stats</h3>
              <div className="space-y-4 rounded-md">
                {pokemon?.stats.map((stat, i) => (
                  <div key={i}>
                    <p className="capitalize">
                      {stat.stat.name}: {stat.base_stat}
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
          </div>
        </section>

        <section className="flex flex-1 border rounded-md items-center justify-center py-4 px-8">
          <div>
            {evolutions.map((ev, i) => (
              <div key={i}>{ev}</div>
            ))}
          </div>
        </section>
      </main>

      <FooterLayout>
        <div className="flex space-x-4">
          {pokemon?.id > 1 && (
            <button className="btn-primary-slate" onClick={getPrevPokemon}>
              Previous
            </button>
          )}
          {pokemon?.id < 905 && (
            <button className="btn-primary-slate" onClick={getNextPokemon}>
              Next
            </button>
          )}
        </div>
      </FooterLayout>
    </>
  );
};

export default PokemonPage;

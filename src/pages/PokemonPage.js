import { useEffect, useState } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import { formatEvolutionID, fetcher } from "../utils/helpers";
import { ENDPOINTS } from "../utils/constants";

import { FooterLayout } from "../components/Layouts";
import Stats from "../components/pokemonpage/Stats";
import { usePokemons } from "../utils/context";
import Profile from "../components/pokemonpage/Profile";

const PokemonPage = () => {
  const { pokemon, setPokemon } = usePokemons();
  const { name } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const [evolutions, setEvolutions] = useState([]);

  const getPrevPokemon = async () => {
    const data = await fetcher(ENDPOINTS.POKEMON, pokemon.id - 1);
    navigate(`/pokemon/${data.name}`);
  };

  const getNextPokemon = async () => {
    const data = await fetcher(ENDPOINTS.POKEMON, pokemon.id + 1);
    navigate(`/pokemon/${data.name}`);
  };

  const getEvolutions = (evolutionObj) => {
    const evolutions = [];

    const first = evolutionObj?.chain?.species.name;
    const second = evolutionObj?.chain?.evolves_to[0];
    const third = evolutionObj?.chain.evolves_to[0]?.evolves_to[0];

    evolutions.push(first);
    if (second !== undefined) evolutions.push(second?.species?.name);
    if (third !== undefined) evolutions.push(third?.species?.name);

    evolutions.forEach(async (pokemon) => {
      const pokemonProfile = await fetcher(ENDPOINTS.POKEMON, pokemon);
      setEvolutions((prev) => [...prev, pokemonProfile]);
    });
  };

  const getPokemon = async () => {
    setEvolutions([]);
    const pokemonProfile = await fetcher(ENDPOINTS.POKEMON, name);
    const pokemonSpecies = await fetcher(ENDPOINTS.SPECIES, name);
    const evolutionID = formatEvolutionID(pokemonSpecies);
    const evolutionObj = await fetcher(ENDPOINTS.EVOLUTION, evolutionID);

    getEvolutions(evolutionObj);
    setPokemon({ ...pokemonProfile, ...pokemonSpecies });
  };

  useEffect(() => {
    getPokemon();
  }, [location]);

  return (
    <>
      <main className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
        <Stats />

        <div className="flex-1 flex flex-col space-y-8">
          <Profile />

          <section className="border rounded-md p-12 h-full space-y-8">
            <h3 className="capitalize font-bold w-full text-center md:text-start">
              Evolutions
            </h3>
            <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-6 md:space-y-0 items-center justify-center">
              {evolutions?.map((ev, i) => (
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
        </div>
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

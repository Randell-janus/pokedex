import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { formatEvolutionID, fetcher } from "../utils/helpers";
import { ENDPOINTS } from "../utils/constants";

import { FooterLayout } from "../components/Layouts";
import Stats from "../components/pokemonpage/Stats";
import { usePokemons } from "../utils/context";
import Profile from "../components/pokemonpage/Profile";

const PokemonPage = () => {
  const { pokemon, setPokemon, evolutions, setEvolutions } = usePokemons();
  const { name } = useParams();
  const navigate = useNavigate();

  const handlePokemonChange = (data) => {
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

  const getEvolutions = (evolutionObj) => {
    const evolutions = [];

    const first = evolutionObj?.chain?.species.name;
    const second = evolutionObj?.chain?.evolves_to[0];
    const third = evolutionObj?.chain.evolves_to[0]?.evolves_to[0];

    evolutions.push(first);

    if (second?.length < 1) return;
    evolutions.push(second?.species?.name);

    if (third?.length < 1) return;
    evolutions.push(third?.species?.name);

    setEvolutions(evolutions);
  };

  const getPokemon = async () => {
    const pokemonProfile = await fetcher(ENDPOINTS.POKEMON, name);
    const pokemonSpecies = await fetcher(ENDPOINTS.SPECIES, name);
    const evolutionID = formatEvolutionID(pokemonSpecies);
    const evolutionObj = await fetcher(ENDPOINTS.EVOLUTION, evolutionID);

    setPokemon({ ...pokemonProfile, ...pokemonSpecies });
    getEvolutions(evolutionObj);
  };

  useEffect(() => {
    getPokemon();
  }, [pokemon]);

  return (
    <>
      <main className="flex flex-col md:flex-row space-x-0 md:space-x-8 space-y-8 md:space-y-0">
        <Stats />

        <div className="flex-1 flex flex-col space-y-8">
          <Profile />

          <section className="border rounded-md p-12 flex items-center justify-center flex-1">
            {evolutions?.map((ev, i) => (
              <div key={i}>{ev}</div>
            ))}
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

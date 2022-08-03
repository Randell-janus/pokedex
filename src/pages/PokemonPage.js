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

  return <div>{pokemon?.name}</div>;
};

export default PokemonPage;

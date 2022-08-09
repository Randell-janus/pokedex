import React from "react";

import { usePokemons } from "../../utils/context";
import { DataContainer, DataLayout } from "../Layouts";

const Profile = () => {
  const { pokemon } = usePokemons();

  return (
    <section className="p-12 space-y-8 flex flex-col border rounded-md">
      <DataContainer>
        <DataLayout label="Height">{pokemon?.height * 10} cm</DataLayout>
        <DataLayout label="Weight">{pokemon?.weight * 0.22} lbs</DataLayout>
      </DataContainer>

      <DataContainer>
        <DataLayout label="Types">
          {pokemon?.types.map((type, i) => (
            <p key={i} className="capitalize">
              {type.type.name}
            </p>
          ))}
        </DataLayout>
        <DataLayout label="Abilities">
          {pokemon?.abilities.map((ability, i) => (
            <p key={i} className="capitalize">
              {ability.ability.name}
            </p>
          ))}
        </DataLayout>
      </DataContainer>
    </section>
  );
};

export default Profile;

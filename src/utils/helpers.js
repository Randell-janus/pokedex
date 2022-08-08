export const formatEvolutionID = (species) => {
  const url = species.evolution_chain.url;
  const parts = url.split("/");
  const id = parts[parts.length - 2];
  return id;
};

export const fetcher = async (url, param) => {
  const res = await fetch(url + param);
  const data = await res.json();
  return data;
};

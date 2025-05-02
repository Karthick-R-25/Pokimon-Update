import axios from 'axios';
export async function getPokemonList() {
  const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
  return Promise.all(res.data.results.map(async p => {
    const details = await axios.get(p.url);
    
    console.log(details)
    return {
      id: details.data.id,
      name: details.data.name,
      image: details.data.sprites.front_default,
      types: details.data.types.map(t => t.type.name),
      moves: details.data.moves.map(val=>val.move).slice(0,10),
     
    };
   
  }));
 
}
export const getPokemonById = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await res.json();

  // fetch species to get evolution chain URL
  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();

  // fetch evolution chain
  const evoRes = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoRes.json();

  // process evolution chain
  const renderEvolutionChain = (chain) => {
    const steps = [];
    let current = chain;

    while (current) {
      const name = current.species.name;
      const details = current.evolves_to?.[0]?.evolution_details?.[0];
      const trigger = details?.trigger?.name;
      const level = details?.min_level;

      let label = name;
      if (trigger === 'level-up' && level) {
        label += ` (Lv ${level})`;
      } else if (trigger) {
        label += ` (${trigger})`;
      }

      steps.push(label);
      current = current.evolves_to?.[0];
    }

    return steps.join(' → ');
  };

  const evolutionChain = renderEvolutionChain(evoData.chain);
  console.log(evolutionChain)

  return {
    id: data.id,
    name: data.name,
    image: data.sprites?.front_default || '',
    shinyImage: data.sprites?.front_shiny || '',
    types: data.types?.map(t => t.type.name) || [],

    height: data.height,
    weight: data.weight,
    abilities: data.abilities?.map(a => a.ability.name) || [],
    stats: data.stats?.map(s => ({
      name: s.stat.name,
      value: s.base_stat,
    })) || [],
    sound: data.cries?.latest || '',
    moves: data.moves?.slice(0, 5).map(m => m.move.name) || [],
    species: data.species.name,
    typeUrl: data.types?.map(t => t.type.url) || [],
    evolutionChain,  // 💥 added here
  };
};

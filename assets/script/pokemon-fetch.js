/**
* getPokes() - connecting with api, parsing to json();
*/
export async function getPokes(pokeUrl) { 
    const response = await fetch(pokeUrl);
    const pokemonData = await response.json();
    return pokemonData;
  };
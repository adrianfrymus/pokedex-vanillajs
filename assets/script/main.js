import { getPokes } from './pokemon-fetch.js';
import { searchPoke } from './pokemon-search.js';
import { pokeCreateContainer } from './pokemon-container.js';

const pokeButton = document.getElementById('pokeButton');
const pokeSearch = document.getElementById('search');
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

document.addEventListener('DOMContentLoaded', loadPoke());
pokeButton.addEventListener('click', loadPoke);

pokeSearch.addEventListener('input', (e) => {
  const input = e.target.value.toLowerCase();
  searchPoke(input);
});

/** 
* disable button and add animation on click which is cancelled when function is done, 
* mapping pokemons through destructurization,
* spread them to single containers using spread structure ...;
*/
async function loadPoke() {
  const pokeContainer = document.getElementById('main-container');
  
  pokeButton.disabled = true;
  pokeButton.classList.add('poke-button');

  const pokemonData = await getPokes(pokeUrl);
  pokeUrl = pokemonData.next;
  
  const pokePromises = pokemonData.results.map(async(poke) => {
    const { name, sprites: { front_default: img}, types } = await fetch(poke.url).then(res => res.json());
    return pokeCreateContainer(name, img, types);
  });

  const pokeDivs = await Promise.all(pokePromises);
  pokeContainer.append(...pokeDivs);
  
  pokeButton.classList.remove('poke-button');
  pokeButton.disabled = false;

  const input = pokeSearch.value.toLowerCase();
  searchPoke(input);
};

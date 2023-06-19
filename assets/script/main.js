import { getPokes } from './pokemon-fetch.js';
import { searchPoke, pokeFilter, submitForm } from './pokemon-search.js';
import { pokeCreateContainer, createFilterButtons, pokeGetTypeTextArray } from './pokemon-container.js';

const pokeButton = document.getElementById('pokeButton');
const pokeSearch = document.getElementById('search');
const filterIcon = document.getElementById('filterIcon');
const filterContainer = document.querySelector('.filter-div');
const pokeTypeTextArray = [];
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
    const { name, sprites: { front_default: img}, types, id } = await fetch(poke.url).then(res => res.json());
    return pokeCreateContainer(name, img, types, id);
  });
  
  const pokeDivs = await Promise.all(pokePromises);
  pokeContainer.append(...pokeDivs);
  
  pokeButton.classList.remove('poke-button');
  pokeButton.disabled = false;

  const input = pokeSearch.value.toLowerCase();
  searchPoke(input);
};


filterIcon.addEventListener('click', () => {
  if (filterContainer.style.display === 'block') {
    filterContainer.style.display = 'none';
  } else {
    filterContainer.style.display = 'block';
  }
});

document.body.addEventListener('click', (event) => {
  const target = event.target;
    const isClickInsideFilterIcon = filterIcon.contains(target);
    const isClickInsideFilterDiv = filterContainer.contains(target);

    if (!isClickInsideFilterIcon && !isClickInsideFilterDiv) {
      if (filterContainer.style.display === 'block') {
        filterContainer.style.display = 'none';
    }
  }
});

createFilterButtons();
pokeFilter();

document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('.poke-type-button');
  
  buttons.forEach(function(button) {
    button.addEventListener('click', function() {
      var type = button.dataset.type;
      var color = $pokemon-types[type];
      button.style.backgroundColor = color;
    });
  });
});
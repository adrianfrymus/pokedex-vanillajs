// @ts-nocheck
const pokeContainer = document.getElementById('main-container');
const pokeButton = document.getElementById('pokeButton');
const pokeSearch = document.getElementById('search');
const pokeNotFound = document.getElementById('pokemon-not-found-container');
const notFoundImage = document.getElementById('noPoke');
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

notFoundImage.style.display = 'none';

/**
* getPokes() - connecting with api, parsing to json();
*/
async function getPokes() {
  const response = await fetch(pokeUrl);
  const pokemonData = await response.json();
  return pokemonData;
};

/**
 * search bar function, uppercase included, 
 * display an element if nothing found;
 */
pokeSearch.addEventListener('input', (e) => {
  const input = e.target.value.toLowerCase();
  const pokeNames = document.querySelectorAll('.pokemon-name');
  let found = false;
  pokeNames.forEach(name => {
    const nameValue = name.textContent.toLowerCase();
    if (nameValue.indexOf(input) > -1) {
      name.parentElement.style.display = '';
      found = true;
    } else {
      name.parentElement.style.display = 'none';
    }
  });
  pokeNotFound.style.display = found ? 'none' : 'block';
  notFoundImage.style.display = found ? 'none' : 'block';
});

/** 
* disable button and add animation on click which is cancelled when function is done, 
* mapping pokemons through destructurization,
* spread them to single containers using spread structure ...;
*/
async function loadPoke() {
  pokeButton.disabled = true;
  pokeButton.classList.add('poke-button');

  const pokemonData = await getPokes();
  pokeUrl = pokemonData.next;
  
  const pokePromises = pokemonData.results.map(async(poke) => {
    const { name, sprites: { front_default: img}, types } = await fetch(poke.url).then(res => res.json());
    return pokeCreateContainer(name, img, types);
  });

  const pokeDivs = await Promise.all(pokePromises);
  pokeContainer.append(...pokeDivs);
  
  pokeButton.classList.remove('poke-button');
  pokeButton.disabled = false;
};

/**
* creating pokemon template with types destructurization,
* appending to divs;
*/
function pokeCreateContainer(name, img, types) {
  const pokeDiv = document.createElement('div');
  pokeDiv.className = 'pokemon-data';

  const pokeImg = document.createElement('img');
  pokeImg.className = 'pokemon-image';
  pokeImg.src = img;

  const pokeName = document.createElement('div');
  pokeName.className = 'pokemon-name';
  pokeName.textContent = name;

  types.forEach(({ type: {name} }) => {
    const typeClass = `type-${name}`;
    pokeDiv.classList.add(typeClass);
  });

  pokeDiv.appendChild(pokeImg);
  pokeDiv.appendChild(pokeName);

  return pokeDiv;
};

document.addEventListener('DOMContentLoaded', loadPoke());
pokeButton.addEventListener('click', loadPoke);


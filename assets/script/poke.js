// @ts-nocheck
const pokeContainer = document.getElementById('main-container');
const pokeButton = document.getElementById('pokeButton');
const pokeSearch = document.getElementById('search');
const pokeNotFound = document.getElementById('pokemon-not-found-container');
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

/**
* getpokes - pobieramy dane z api
*/
async function getPokes() {
  const response = await fetch(pokeUrl);
  const pokemonData = await response.json();
  return pokemonData;
};

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
});

/** 
* otrzymuje dane, pokemon wpada do kontenera 
* start funkcji czyli click w buttona wylaczamy mozliwosc klikniecia i doadjemy animacje ladowania - trwa do zaladowania pokow
*/
async function loadPoke() {
  pokeButton.disabled = true;
  pokeButton.classList.add('poke-button');

  const pokemonData = await getPokes();
  pokeUrl = pokemonData.next;
  
  for (const poke of pokemonData.results) {
    const { name, sprites: { front_default: img }, types } = await fetch(poke.url).then(res => res.json());
    const pokeDiv = pokeCreateContainer(name, img, types);
    pokeContainer.appendChild(pokeDiv);
  }
  
  pokeButton.classList.remove('poke-button');
  pokeButton.disabled = false;
};

/**
* tworzymy szablon dla pokemonow
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


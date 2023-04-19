// @ts-nocheck
const pokeContainer = document.getElementById('main-container');
const pokeButton = document.getElementById('pokeButton');
let pokeUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20';

/**
* getpokes - pobieramy dane z api
*/
async function getPokes() {
  const pokemonData = await fetch(pokeUrl).then(res => res.json());
  return pokemonData;
};

/** 
* otrzymuje dane, pokemon wpada do kontenera 
* start funkcji czyli click w buttona wylaczamy mozliwosc klikniecia i doadjemy animacje ladowania - trwa do zaladowania pokow
*/
async function loadPoke() {
  pokeContainer.style.overflowY = 'hidden';
  pokeButton.disabled = true;
  pokeButton.classList.add('poke-button');

  const pokemonData = await getPokes();
  pokeUrl = pokemonData.next;
  
  for (const poke of pokemonData.results) {
    const { name, sprites: { front_default: img }, types } = await fetch(poke.url).then(res => res.json());
    const pokeDiv = pokeCreateContainer(name, img, types);
    pokeContainer.appendChild(pokeDiv);
  }
  
  pokeContainer.style.overflowY = 'scroll';
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

  types.forEach(type => {
    const typeClass = `type-${type.type.name}`;
    pokeDiv.classList.add(typeClass);
  });

  pokeDiv.appendChild(pokeImg);
  pokeDiv.appendChild(pokeName);

  return pokeDiv;
};

window.onload = loadPoke();
pokeButton.addEventListener('click', loadPoke);


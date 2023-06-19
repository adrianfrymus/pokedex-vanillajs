import { getPokes } from './pokemon-fetch.js';
/**
* creating pokemon template with types destructurization,
* appending to divs;
*/

export function pokeCreateContainer(name, img, types, id) {
  const formattedId = `#${String(id).padStart(4, '0')}`;

  const pokeDiv = document.createElement('div');
  pokeDiv.className = 'pokemon-data';

  const pokeImg = document.createElement('img');
  pokeImg.className = 'pokemon-image';
  pokeImg.src = img;

  const pokeInfoContainer = document.createElement('div');
  pokeInfoContainer.className = 'pokemon-info-container';

  const pokeName = document.createElement('div');
  pokeName.className = 'pokemon-name';
  pokeName.textContent = name;

  const pokeId = document.createElement('div');
  pokeId.className = 'poke-id';
  pokeId.textContent = formattedId;

  const pokeType = pokeTypeCreate(types);

  pokeInfoContainer.appendChild(pokeId);
  pokeInfoContainer.appendChild(pokeName);
  pokeInfoContainer.appendChild(pokeType);

  pokeDiv.appendChild(pokeImg);
  pokeDiv.appendChild(pokeInfoContainer);

  return pokeDiv;
}

function pokeTypeCreate(types) {
  const pokeTypeContainer = document.createDocumentFragment();

  types.forEach(({ type: { name } }, index) => {
    const pokeType = document.createElement('span');
    pokeType.className = `poke-type-text poke-type-text-${index + 1}`;

    const typeClass = `${name}`;
    pokeType.classList.add(typeClass);
    const typeName = `${name}`;

    if (index > 0) {
      pokeType.textContent += '';
    }
    pokeType.textContent += typeName;

    pokeTypeContainer.appendChild(pokeType);
  });

  return pokeTypeContainer;
}


export function pokeGetTypeTextArray() {
  const pokeTypeTextArray = [];
  const pokeTypeElements = document.querySelectorAll('.poke-type-text, [class^="poke-type-text"]');

  pokeTypeElements.forEach((element) => {
    pokeTypeTextArray.push(element.textContent);
  });

  return pokeTypeTextArray;
}


export async function createFilterButtons(types) {
  const pokeFilterContainer = document.getElementById('poke-types');
  const pokeUrl = 'https://pokeapi.co/api/v2/type/';
  const pokemonData = await getPokes(pokeUrl);

  const pokePromises = pokemonData.results.map(poke => poke.name);

    pokePromises.forEach((type) => {
      const createButton = document.createElement('button');
      createButton.textContent = type;
      createButton.className = 'poke-type-button';
      pokeFilterContainer.appendChild(createButton);
    });
};
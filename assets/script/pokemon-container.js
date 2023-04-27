/**
* creating pokemon template with types destructurization,
* appending to divs;
*/
export function pokeCreateContainer(name, img, types) {
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
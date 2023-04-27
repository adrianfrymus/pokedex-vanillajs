/**
 * search bar function, uppercase included, 
 * display an element if nothing found;
 */
 export function searchPoke(input) {
    const pokeNotFound = document.getElementById('pokemon-not-found-container');
    const notFoundImage = document.getElementById('noPoke');
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
};
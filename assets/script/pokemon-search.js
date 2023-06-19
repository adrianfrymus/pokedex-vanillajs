import { pokeGetTypeTextArray } from './pokemon-container.js';

let selectedType = '';
let selectedTypeClass = '';
const pokeDataContainers = document.getElementsByClassName('pokemon-data');

export function searchPoke(input) {
  const pokeNotFound = document.getElementById('pokemon-not-found-container');
  const notFoundImage = document.getElementById('noPoke');
  let found = false;

  Array.from(pokeDataContainers).forEach((container) => {
    const name = container.querySelector('.pokemon-name');
    const nameValue = name.textContent.toLowerCase();
    const containerText = Array.from(container.getElementsByClassName('poke-type-text')).map(element => element.textContent);

    const isMatched = nameValue.includes(input) && (selectedType === '' || containerText.includes(selectedType));
    
    if (isMatched) {
      container.style.display = '';
      found = true;
    } else {
      container.style.display = 'none';
    }
  });

  pokeNotFound.style.display = found ? 'none' : 'block';
  notFoundImage.style.display = found ? 'none' : 'block';
}

export function submitForm() {
  const searchInput = document.getElementById('search');
  const inputValue = searchInput.value.trim();
  searchPoke(inputValue);
}

export function pokeFilter() {
  const buttonsContainer = document.getElementById('poke-types');
  const searchInput = document.getElementById('search');
  const typeButtons = buttonsContainer.getElementsByClassName('poke-type-button');

  buttonsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('poke-type-button')) {
      event.preventDefault();

      for (let i = 0; i < typeButtons.length; i++) {
        const button = typeButtons[i];

        if (button === event.target) {
          button.classList.add('clicked');
          selectedType = button.textContent;
          selectedTypeClass = `clicked-${selectedType}`;
          button.classList.add(selectedTypeClass);
        } else {
          button.classList.remove('clicked');
          button.classList.remove(`clicked-${button.textContent}`);
        }
      }
    }
  });

  const form = document.getElementById('filterForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitForm();
  });

  document.body.addEventListener('click', (event) => {
    const target = event.target;
    const isClickInsideDiv = buttonsContainer.contains(target);
    const isClickInsideForm = form.contains(target);

    if (!isClickInsideDiv && !isClickInsideForm) {
      submitForm();
    }
  });

  const resetButton = document.querySelector('button[type="reset"]');
  resetButton.addEventListener('click', () => {
    resetTypeButtons();
    resetContainers();
    selectedType = '';
    selectedTypeClass = '';
    const inputValue = searchInput.value.trim();
    searchPoke(inputValue);
  });

  function resetTypeButtons() {
    for (let i = 0; i < typeButtons.length; i++) {
      const button = typeButtons[i];
      button.classList.remove('clicked');
      button.classList.remove(`clicked-${button.textContent}`);
    }
  }

  function resetContainers() {
    Array.from(pokeDataContainers).forEach((container) => {
      container.style.display = '';
    });
  }
}
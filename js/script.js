const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonName = document.querySelector('.pokemon__name');
const pokemonImg = document.querySelector('.pokemon__img');

let pokemonScale = 1;

const pokemonScale1 = document.querySelector('.pokemon-scale-value-1');
const pokemonScale12 = document.querySelector('.pokemon-scale-value-12');
const pokemonScale20 = document.querySelector('.pokemon-scale-value-20');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const buttonPrev = document.querySelector('.button-prev');
const buttonNext = document.querySelector('.button-next');
const buttonCries = document.querySelector('.button-cries');
const cries = document.getElementById('pokemon-cries');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonNumber.innerHTML = '';
    pokemonName.innerHTML = 'Loading ...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImg.style.display = 'block';
        pokemonNumber.innerHTML = data.id;
        pokemonName.innerHTML = data.name;
        cries.src = data['cries']['latest'];
        pokemonImg.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonScale = data.height;
        pokemonScale1.innerHTML = pokemonScale*10+'cm';
        pokemonScale12.innerHTML = (pokemonScale/1.2).toFixed(2)+'cm';
        pokemonScale20.innerHTML = (pokemonScale/2).toFixed(1)+'cm';
    } else{
        pokemonImg.style.display = 'none';
        pokemonNumber.innerHTML = '';
        pokemonName.innerHTML = 'Not found!';
    }
    input.value = '';
    searchPokemon = data.id;
    
}

function pokemonCries() {
    cries.play();
} 


form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    if (searchPokemon < 649) {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    }
});


buttonCries.addEventListener('click', pokemonCries);

renderPokemon(searchPokemon);
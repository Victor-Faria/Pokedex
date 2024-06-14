const pokemonName = document.querySelector(".pokemon_name");

const pokemonNumber = document.querySelector(".pokemon_number");

const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");

const input = document.querySelector(".input_search");

const buttonNext = document.querySelector(".btn_next");

const buttonPrev = document.querySelector(".btn_prev");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const apiResponse = await fetch(
    "https://pokeapi.co/api/v2/pokemon/" + pokemon
  );

  if (apiResponse.status === 200) {
    const data = await apiResponse.json();

    return data;
  }
};
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Loading...";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = "block";

    pokemonName.innerHTML = data.name;

    pokemonNumber.innerHTML = data.id;

    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";

    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";

    pokemonName.innerHTML = "Not Found";

    pokemonNumber.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon--;

    renderPokemon(searchPokemon);
  }
});
buttonNext.addEventListener("click", () => {
  searchPokemon++;

  renderPokemon(searchPokemon);
});

renderPokemon("1");

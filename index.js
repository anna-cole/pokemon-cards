// hide & seek with the form

let addPokemon = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-pokemon-btn");
  const pokemonFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    addPokemon = !addPokemon;
    if (addPokemon) {
      pokemonFormContainer.style.display = "block";
    } else {
      pokemonFormContainer.style.display = "none";
    }
  });
});

// Fetch pokemons from the server. 

// fetch('http://localhost:3000/pokemons')
// .then(resp => resp.json())
// .then(data => data.forEach(pokemon => renderPokemons(pokemon)))

// // With the response data, render the pokemons in the DOM, by making a card <div class="card"> for each pokemon and adding it to the pokemon-collection div. Then, add pokemon info into the cards.

// function renderPokemons(pokemon) {
//     let pokemonContainer = document.querySelector('#pokemon-collection');
//     let card = document.createElement('div');
//     card.className = 'card';

//     card.innerHTML = `
//     <h2>${pokemon.name}</h2>
//     <img src="${pokemon.image}" class="pokemon-avatar">
//     <p>${pokemon.likes} likes</p>
//     <button class="like-btn" id=${pokemon.id}>Like ❤️</button>`
    
//     const likeBtn = card.querySelector('.like-btn')
//     likeBtn.addEventListener('click', () => {
//       let p = card.querySelector('p')
//       p.textContent = `${pokemon.likes+= 1} likes`
//       updateLikes(pokemon.id, pokemon.likes)
//     })
//     pokemonContainer.appendChild(card)
//   }

// // Add a new pokemon. When a user submits the pokemon form, send a POST request to add the new pokemon to the collection. If the post is successful, the pokemon should be added to the DOM without reloading the page.

// const form = document.querySelector('.add-pokemon-form')

// form.addEventListener('submit', e => {
//   e.preventDefault()
//   //console.log(e.target.name)
//   let newPokemonObj = {
//     name: e.target.name.value,
//     image: e.target.image.value,
//     likes: 0
//   }
//   renderNewPokemon(newPokemonObj)
//   e.target.reset()
// })

// // Then, make the POST request to send to the server the new card.
// function renderNewPokemon(newPokemonObj) {
//   const configObj = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify(newPokemonObj)
//   }
//   fetch('http://localhost:3000/pokemons', configObj)
//   .then(res => res.json())
//   .then(newPokemon => renderPokemons(newPokemon))
// }

// // Then, make the PATCH request to update the number of likes in the server.
// function updateLikes(id, newNumberOfLikes) {
//   fetch(`http://localhost:3000/pokemons/${id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json'
//     },
//     body: JSON.stringify({likes: newNumberOfLikes})
//   })
//   .then(resp => resp.json())
//   .then(updatedPokemon => console.log(updatedPokemon))
// }



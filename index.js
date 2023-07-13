let addPokemon = false
const addBtn = document.querySelector("#new-pokemon-btn")
const formContainer = document.querySelector(".container")
const addForm = document.querySelector('.add-pokemon-form')
const searchForm = document.querySelector('#search-form')
let cardsContainer = document.querySelector('#pokemon-collection')

document.addEventListener("DOMContentLoaded", () => hideForm())

function hideForm() {
  addBtn.addEventListener("click", () => {
    addPokemon = !addPokemon
    if(addPokemon) {
      formContainer.style.display = "block"
    } else {
      formContainer.style.display = "none"
    }
  })
}

fetch('http://localhost:3000/pokemons')
.then(resp => resp.json())
.then(data => data.forEach(pokemon => {search(pokemon), renderPokemons(pokemon)}))

function search(pokemon) {
  searchForm.addEventListener("submit", e => {
    e.preventDefault()
    const inputName = e.target.q.value
    const capitalized = inputName.charAt(0).toUpperCase() + inputName.slice(1)
    if(capitalized === pokemon.name) {
      cardsContainer.textContent = ''
      renderPokemons(pokemon)
    }
    e.target.reset()
  })
}

function renderPokemons(pokemon) {
  const card = document.createElement('div')
  card.className = 'card'

  card.innerHTML = `
  <h2>${pokemon.name}</h2>
  <img src="${pokemon.image}" class="pokemon-avatar">
  <p>${pokemon.description}</p>
  <p style="color: blue">Type: ${pokemon.type}</p>
  <p style="color: red">Weakness: ${pokemon.weakness}</p>
  <h4>${pokemon.likes} likes</h4>
  <button class="like-btn" id=${pokemon.id}>Like ❤️</button>`
  
  const likeBtn = card.querySelector('.like-btn')
  likeBtn.addEventListener('click', () => {
    const likes = card.querySelector('h4')
    likes.textContent = `${pokemon.likes+= 1} likes`
    updateLikes(pokemon.id, pokemon.likes)
  })
  cardsContainer.appendChild(card)

  const bigCard = document.querySelectorAll(".card")
  bigCard.forEach(element => {
    element.addEventListener("mouseover", () => changeSize())
    element.addEventListener("mouseout", () => normalSize())
  
    function changeSize() {
      element.style.width = '17rem'
      element.style.height = '27rem'
    }
    function normalSize() {
      element.style.width = '15rem'
      element.style.height = '25rem'
    }
  })
}

addForm.addEventListener('submit', e => {
  e.preventDefault()
  const newPokemonObj = {
    name: e.target.name.value,
    image: e.target.image.value,
    description: e.target.description.value,
    type: e.target.type.value,
    weakness: e.target.weakness.value,
    likes: 0
  }
  addNewPokemon(newPokemonObj)
  e.target.reset()
})

function addNewPokemon(newPokemonObj) {
  const configObj = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newPokemonObj)
  }
  fetch('http://localhost:3000/pokemons', configObj)
  .then(res => res.json())
  .then(newPokemon => renderPokemons(newPokemon))
}

function updateLikes(id, numberOfLikes) {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({likes: numberOfLikes})
  })
  .then(resp => resp.json())
}



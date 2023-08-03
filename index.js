let addPokemon = false
const addBtn = document.querySelector("#new-pokemon-btn")
const formContainer = document.querySelector(".container")
const pokemonContainer = document.querySelector('#pokemon-collection')
const searchForm = document.querySelector('#search-form')
const form = document.querySelector('.add-pokemon-form')

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
.then(pokemons => renderPokemon(pokemons))

function renderPokemon(pokemons) {
  pokemons.forEach(pokemon => {
    const card = document.createElement('div')
    card.className = 'card'

    const namePoke = document.createElement('h2')
    namePoke.textContent = pokemon.name

    const image = document.createElement('img')
    image.className = 'pokemon-avatar'
    image.src = pokemon.image

    const description = document.createElement('p')
    description.textContent = pokemon.description

    const type = document.createElement('h4')
    type.textContent = `Type: ${pokemon.type}`
    type.style.color = 'blue'

    const weakness = document.createElement('h4')
    weakness.textContent = `Weakness: ${pokemon.weakness}`
    weakness.style.color = 'red'

    const button = document.createElement('button')
    button.textContent = 'Like ❤️'

    let likes = document.createElement('p')
    likes.textContent = `${pokemon.likes} likes`

    button.addEventListener('click', () => {
      likes.textContent = `${pokemon.likes+= 1} likes` 
      updateLikes(pokemon.id, pokemon.likes)
    })

    card.addEventListener('mouseover', () => {
      card.style.width = '17rem'
      card.style.height = '27rem'
    })

    card.addEventListener('mouseout', () => {
      card.style.width = '15rem'
      card.style.height = '25rem'
    })

    card.append(namePoke, image, description, type, weakness, button, likes)
    pokemonContainer.append(card)
  })
}

function updateLikes(id, updatedLikes) {
  fetch(`http://localhost:3000/pokemons/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({likes: updatedLikes})
  })
  .then(resp => resp.json())
}

form.addEventListener('submit', e => {
  e.preventDefault()
  const name = form.name.value
  const image = form.image.value
  const description = form.description.value
  const type = form.type.value
  const weakness = form.weakness.value
  const newPokemon = {
    name: name,
    image: image,
    description: description,
    type: type,
    weakness: weakness,
    likes: 0
  }
  updateNewPokemon(newPokemon)
  form.reset()
})

function updateNewPokemon(newPokemon) {
  fetch('http://localhost:3000/pokemons', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newPokemon)
  })
  .then(resp => resp.json())
  .then(newPokemon => {
    newPokeArr = []
    newPokeArr.push(newPokemon)
    renderPokemon(newPokeArr)
  })
}

searchForm.addEventListener('submit', e => {
  e.preventDefault()
  fetch('http://localhost:3000/pokemons')
  .then(resp => resp.json())
  .then(pokemons => pokemons.forEach(pokemon => {
    const input = searchForm.q.value
    const inputCap = input.toUpperCase()
    const pokeNameCap = pokemon.name.toUpperCase()
    if (inputCap === pokeNameCap) {
      newPokeArr = []
      newPokeArr.push(pokemon)
      pokemonContainer.textContent = ''
      renderPokemon(newPokeArr)
      searchForm.reset()
    }
  }))
})
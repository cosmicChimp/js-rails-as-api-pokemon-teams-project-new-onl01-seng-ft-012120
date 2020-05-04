const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", function(){
    fetchPokemons();
})

function fetchPokemons() {
    return fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then((data) =>
    data.forEach(pokemons => {
        makeCard(pokemons);
        
    }));
}

function makeCard(obj) {
    let cardContainer = document.querySelector('main');

    let div = document.createElement('div');
    div.class = "card";
    div.setAttribute('data-id', `${obj.id}`);

    let p = document.createElement('p');
    p.innerText = obj.name;
    div.appendChild(p)

    

    let ul = document.createElement('ul')
    obj.pokemons.forEach(p => {
        let li = document.createElement('li');
        li.setAttribute('data-id', `${p.id}`);
        let releaseButton = document.createElement('button');
        releaseButton.setAttribute('class', "release");
        releaseButton.setAttribute('pokemon-data-id', `${p.id}`);
        releaseButton.innerHTML = "Release"
        
        li.innerHTML = p.nickname + " " + "(" + p.species + ")"
        ul.appendChild(li);
        li.append(releaseButton);
            return li;
    })
    div.appendChild(ul)

    // div.innerHTML += `<ul>
    //      ${obj.pokemons.map(p => {
    //          return `<li>
    //            ${p.nickname}
    //          </li>`
    //      }).join('')}
    //    </ul>`
    
    // cardContainer.innerHTML += `
    // <div data-id="${obj.id}">
    //   <p>${obj.name}</p>
    //   
    // </div>
    // `

    

    let addButton = document.createElement('button')
    addButton.setAttribute('id', `${obj.id}`);
    addButton.innerHTML = "Add Pokemon"
    div.appendChild(addButton)

    addButton.addEventListener("click", addPokemon)
   cardContainer.appendChild(div);
}

function addPokemon(e) {
    fetch(POKEMONS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            trainer_id: e.target.id
        })
    })
    .then(response => response.json())
    .then(data => renderNewPokemon(data))
};

function renderNewPokemon(obj)
{
    const parentUl = document.querySelector(`[data-id='${obj.trainer_id}']`);
    console.log(parentUl) 
    let lis = makeCard(obj);
     parentUl.appendChild(lis);
}

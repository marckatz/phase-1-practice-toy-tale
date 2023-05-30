let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
  .then((r) => r.json())
  .then((toys) => createToyInfo(toys))

  document.getElementsByClassName('add-toy-form')[0].addEventListener('submit', (event) => {
    event.preventDefault()
    let name = event.target.name.value
    let img = event.target.image.value
    let header = {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
    let body = JSON.stringify({
      "name": name,
      "image": img,
      "likes": 0
    })
    fetch("http://localhost:3000/toys", {method: "POST", headers: header, body: body})
    
  
  })

});

function createToyInfo(toys){
  toys.forEach(toy => {
    const div = document.createElement('div')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const button = document.createElement('button')
    
    button.addEventListener('click', (e) => {
      fetch(`http://localhost:3000/toys/${toy.id}`)
      .then((r) => r.json())
      .then((currentToy) => {
        let newLikes = currentToy.likes+1
      let header = {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
      let body = JSON.stringify({
        "likes": newLikes
      })
      fetch(`http://localhost:3000/toys/${currentToy.id}`, {method: "PATCH", headers: header, body: body})
      p.textContent = `${newLikes} likes`
      })

    })
    const image = document.createElement('img')
    div.className = "card"
    h2.textContent = toy.name 
    image.src = toy.image
    image.className = "toy-avatar"
    button.className = "like-btn"
    button.id = toy.id
    button.textContent = "Like ❤️"
    p.textContent = `${toy.likes} likes`
    div.appendChild(h2)
    div.appendChild(image)
    div.appendChild(p)
    div.appendChild(button)
    document.getElementById('toy-collection').appendChild(div)

  })
}





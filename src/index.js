// write your code here
// ****DOM SHIT*****
const spiceTitle = document.querySelector(".title")
const spiceImg = document.querySelector(".detail-image")
const ingredientBox = document.querySelector(".ingredients-list")
const titleForm = document.querySelector("#update-form")
const ingredientForm = document.querySelector("#ingredient-form")
const ingredientsList = document.createElement("li")

// ****RENDER FUNCTIONS*****
function renderSpice(spiceObj){
    spiceTitle.innerHTML = spiceObj.title
    spiceImg.src = spiceObj.image
    titleForm.dataset.id = spiceObj.id

    
    
    const ingredientsArray = spiceObj.ingredients

    ingredientsArray.forEach(ingredient =>{
        const ingredientsList = document.createElement("li")
        ingredientsList.innerHTML = ingredient.name
        ingredientBox.append(ingredientsList)
    })

    titleForm.addEventListener("submit", e => {
        e.preventDefault()
        const newTitle = e.target.title.value

        spiceTitle.innerHTML = newTitle

      
        fetch(`http://localhost:3000/spiceblends/${spiceObj.id}`, {
        method: 'PATCH', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: newTitle
        }),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        

    })

}
// *****EVENT LISTENERS*****
ingredientForm.addEventListener("submit", e => {
    e.preventDefault()

    const newIngredient = e.target.name.value

    ingredientsList.innerHTML = newIngredient

    ingredientBox.append(ingredientsList)

    fetch(`http://localhost:3000/ingredients`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newIngredient,
            spiceblendId: parseInt(titleForm.dataset.id)
        }),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
})





// *****GET FETCH******
fetch(`http://localhost:3000/spiceblends/1`)
.then(response => response.json())
.then(data => renderSpice(data))



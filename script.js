document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const retrieveBtn = document.getElementById('retrieveBtn');
    const recipeList = document.getElementById('recipeList');

    recipeForm.addEventListener('submit', addRecipe);
    retrieveBtn.addEventListener('click', retrieveRecipes);

    function addRecipe(event) {
        event.preventDefault();
        const recipeName = document.getElementById('recipeName').value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;

        // Send a POST request to add the recipe
        fetch('http://localhost:5000/api/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                recipeName: recipeName,
                ingredients: ingredients,
                instructions: instructions
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Recipe added:', data);
            // Clear input fields
            recipeForm.reset();
        })
        .catch(error => {
            console.error('Error adding recipe:', error);
        });
    }

    function retrieveRecipes() {
        // Send a GET request to retrieve recipes
        fetch('http://localhost:5000/api/recipes')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Recipes retrieved:', data);
            // Display recipes in recipeList
            recipeList.innerHTML = ''; // Clear previous list
            data.forEach(recipe => {
                const recipeItem = document.createElement('div');
                recipeItem.innerHTML = `<strong>${recipe.recipeName}</strong><br>${recipe.ingredients}<br>${recipe.instructions}<br><br>`;
                recipeList.appendChild(recipeItem);
            });
        })
        .catch(error => {
            console.error('Error retrieving recipes:', error);
        });
    }
});

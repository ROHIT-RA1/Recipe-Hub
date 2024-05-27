import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [recipes, setRecipes] = useState([]);
    const [title, setTitle] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');

    useEffect(() => {
        const fetchRecipes = async () => {
            const res = await axios.get('/api/recipes');
            setRecipes(res.data);
        };

        fetchRecipes();
    }, []);

    const addRecipe = async (e) => {
        e.preventDefault();
        const newRecipe = {
            title,
            ingredients,
            instructions
        };
        await axios.post('http://localhost:5000/api/recipes', newRecipe);
        setRecipes([...recipes, newRecipe]);
    };

    return (
        <div>
            <h1>RecipeHub</h1>
            <form onSubmit={addRecipe}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Ingredients"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Instructions"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                />
                <button type="submit">Add Recipe</button>
            </form>
            <div>
                {recipes.map((recipe) => (
                    <div key={recipe._id}>
                        <h2>{recipe.title}</h2>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;

// Assuming you have a form to collect recipe data

import React, { useState } from 'react';
import axios from 'axios';

const AddRecipeForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recipes', formData);
      console.log(response.data);
      // Handle success, reset form, show message, etc.
    } catch (error) {
      console.error(error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" value={formData.title} onChange={handleChange} />
      <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} />
      <textarea name="instructions" value={formData.instructions} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddRecipeForm;

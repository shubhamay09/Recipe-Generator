import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import './RecipeDetails.css';
import BannerImage from './assets/cover.png';

const SPOONACULAR_KEY = '5f788d47306a4b728303c27d366abd83';

const NutritionPanel = ({ nutrients }) => {
  const getValue = (name) => {
    const item = nutrients?.find(n => n.title === name);
    return item ? `${item.amount.toFixed(1)} ${item.unit}` : 'N/A';
  };

  const items = {
    Calories: getValue('Calories'),
    Protein: getValue('Protein'),
    Fat: getValue('Fat'),
    Carbohydrates: getValue('Carbohydrates'),
    Fiber: getValue('Fiber'),
    Sugar: getValue('Sugar')
  };

  const hasData = Object.values(items).some(v => v !== 'N/A');

  if (!hasData) {
    return <p className="no-nutrition">No nutritional information available</p>;
  }

  return (
    <div className="nutrition-info">
      <h2>Nutritional Information</h2>
      {Object.entries(items).map(([name, value]) => (
        <p key={name}>
          <strong>{name}:</strong> {value}
        </p>
      ))}
    </div>
  );
};

const RecipeInfo = ({ recipe }) => (
  <div className="recipe-info">
    <p>
      <strong>Cuisine:</strong> {recipe.cuisines?.length ? recipe.cuisines.join(', ') : 'N/A'}
    </p>
    <p>
      <strong>Ingredients:</strong> {recipe.extendedIngredients?.map(ing => ing.name).join(', ')}
    </p>
    <p>
      <strong>Instructions:</strong>
      <span dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
    </p>
    <p>
      <strong>Health Score:</strong> {recipe.healthScore}/100
    </p>
  </div>
);

const RecipeDetailsPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(
          `https://api.spoonacular.com/recipes/${recipeId}/information?` +
          `apiKey=${SPOONACULAR_KEY}&includeNutrition=true`
        );
        
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (error) return <div className="error-message">{error}</div>;
  
  if (!recipe) return (
    <div className="loading">
      <TailSpin height="100" width="100" color="#db6102" />
    </div>
  );

  return (
    <div className="recipe-details">
      <div className="banner">
        <img src={BannerImage} alt="Recipe banner" />
      </div>
      
      <h1 className="recipe-title">{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} className="recipe-image" />
      
      <RecipeInfo recipe={recipe} />
      <NutritionPanel nutrients={recipe.nutrition?.nutrients} />
      
      <Link to="/" className="back-button">Back to Home</Link>
    </div>
  );
};

export default RecipeDetailsPage;
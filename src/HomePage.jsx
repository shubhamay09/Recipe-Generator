import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Users, AlertCircle, Heart, ChefHat } from 'lucide-react';
import ingredients from './ingredients.json';
import './App.css';

const SPOONACULAR_KEY = '67013bfc0ea9437da3b456f43847fa65';
const DIETS = ['None', 'Vegetarian', 'Vegan', 'Dairy Free', 'Gluten Free','Ketogenic','Pescetarian'];

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [diet, setDiet] = useState('');
  const [cookTime, setCookTime] = useState(30);
  const [portions, setPortions] = useState(2);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleQueryChange = e => {
    const input = e.target.value;
    setQuery(input);
    const inputIngredients = input.split(',');
    const currentInput = inputIngredients[inputIngredients.length - 1].trim().toLowerCase();
    if (currentInput.length > 0) {
      const matches = ingredients.ingredientsList.filter(item => 
        item.toLowerCase().includes(currentInput)
      );
      setSuggestions(matches);
      setShowSuggestions(matches.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectIngredient = item => {
    const ingredients = query.split(',').map(i => i.trim());
    ingredients[ingredients.length - 1] = item;
    setQuery(ingredients.join(', ') + ', ');
    setShowSuggestions(false);
    searchRef.current.querySelector('input').focus();
  };

  useEffect(() => {
    const handleOutsideClick = e => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div className="input-section">
      <div className="input-group">
        <label>Ingredients</label>
        <div className="input-wrapper" ref={searchRef}>
          <Search className="input-icon" />
          <input
            placeholder="Enter ingredients (separate with commas)"
            value={query}
            onChange={handleQueryChange}
            onFocus={() => {
              const currentInput = query.split(',').pop().trim().toLowerCase();
              if (currentInput.length > 0) {
                // Use the imported ingredients here as well
                const matches = ingredients.ingredientsList.filter(item =>
                  item.toLowerCase().includes(currentInput)
                );
                setSuggestions(matches);
                setShowSuggestions(matches.length > 0);
              }
            }}
          />
          {showSuggestions && (
            <ul className="suggestions">
              {suggestions.map(item => (
                <li key={item} onClick={() => selectIngredient(item)}>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="input-group">
        <label>Dietary Restrictions</label>
        <select value={diet} onChange={e => setDiet(e.target.value)}>
          {DIETS.map(option => (
            <option key={option} value={option.toLowerCase()}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="filters-row">
        <div className="input-group">
          <label>Max Cooking Time (mins)</label>
          <div className="input-wrapper">
            <Clock className="input-icon" />
            <input
              type="number"
              value={cookTime}
              onChange={e => setCookTime(Number(e.target.value))}
              min={5}
              max={180}
            />
          </div>
        </div>

        <div className="input-group">
          <label>Servings</label>
          <div className="input-wrapper">
            <Users className="input-icon" />
            <input
              type="number"
              value={portions}
              onChange={e => setPortions(Number(e.target.value))}
              min={1}
              max={12}
            />
          </div>
        </div>
      </div>

      <button 
        className="search-button"
        onClick={() => onSearch({ query, diet, cookTime, portions })}
      >
        Find Recipes
      </button>
    </div>
  );
};

const RecipeCard = ({ recipe }) => (
  <article className="recipe-card">
    <div className="recipe-image-container">
      <img src={recipe.image} alt={recipe.title} />
      <span className="cooking-time">
        <Clock /> {recipe.readyInMinutes} mins
      </span>
    </div>
    
    <div className="recipe-content">
      <h2>{recipe.title}</h2>
      <div className="recipe-stats">
        <Heart />
        <span>Health Score: {recipe.healthScore}/100</span>
      </div>
      <p className="recipe-ingredients">
        <strong>Ingredients:</strong> {recipe.ingredients}
      </p>
      <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
    </div>
  </article>
);

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async ({ query, diet, cookTime }) => {
    setIsLoading(true);
    setError('');
    setRecipes([]);

    try {
      const params = new URLSearchParams({
        apiKey: SPOONACULAR_KEY,
        query,
        maxReadyTime: cookTime,
        number: 4,
        addRecipeInformation: true,
        fillIngredients: true
      });

      if (diet && diet !== 'none') {
        params.append('diet', diet);
      }

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?${params}`
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const { results } = await response.json();

      if (!results?.length) {
        throw new Error('No recipes found');
      }

      const details = await Promise.all(
        results.map(async recipe => {
          const detailRes = await fetch(
            `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${SPOONACULAR_KEY}`
          );
          return detailRes.json();
        })
      );

      setRecipes(details.map(recipe => ({
        id: recipe.id,
        title: recipe.title,
        readyInMinutes: recipe.readyInMinutes,
        image: recipe.image,
        healthScore: recipe.healthScore || 'N/A',
        ingredients: recipe.extendedIngredients
          .map(ing => ing.name)
          .join(', ')
      })));

    } catch (err) {
      setError(err.message || 'Failed to fetch recipes');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <div className="banner">
        <img src="src/assets/cover.png" alt="Recipe Banner" />
      </div>
      
      <div className="app-container">
        <header>
          <ChefHat className="header-icon" />
          <h1>Generate your ideal recipes now</h1>
          <p>Personalized according to your needs</p>
        </header>

        <main className="search-panel">
          <SearchBar onSearch={searchRecipes} />

          {error && (
            <div className="error-message">
              <AlertCircle />
              <p>{error}</p>
            </div>
          )}
        </main>

        {recipes.length > 0 && (
          <div className="recipe-grid">
            {recipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
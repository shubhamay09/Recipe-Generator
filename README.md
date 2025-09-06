# AI-Powered Recipe Generator 🍳🤖

## Project Overview

The **AI-Powered Recipe Generator** is a smart, user-friendly application designed to create personalized recipes based on the ingredients you already have, your dietary preferences, and your cooking goals. This project combines **Artificial Intelligence (AI)**, **Natural Language Processing (NLP)**, and data-driven recipe curation to make cooking more accessible, reduce food waste, and inspire culinary creativity.

Users can input a list of available ingredients, select a cuisine type, specify meal categories (breakfast, lunch, dinner, snacks), and set dietary restrictions (vegan, gluten-free, keto, low-calorie). The system intelligently processes this input to generate new recipes or suggest existing ones from a curated database.

For a richer experience, the application can provide step-by-step instructions, nutritional information, and optionally, AI-generated images of the final dish.

---

## Key Features

* **Ingredient-based Recipe Generation:** Minimize food waste by generating recipes using ingredients you already have.
* **Cuisine and Dietary Filters:** Tailor meal suggestions based on cuisine type and dietary preferences.
* **AI-Powered Recipe Creation:** Generate unique and creative dishes using AI models.
* **Step-by-Step Cooking Instructions:** Clear guidance to help users follow recipes effortlessly.
* **Nutritional Information:** Calculate calories, protein, carbs, and fats for healthier meal planning.
* **AI Dish Visualization (Optional):** Generate images of dishes for better visualization.

---

## Applications

1. **Daily Meal Planning:** Assist households in planning meals efficiently.
2. **Beginner-Friendly Cooking:** Help beginners and busy individuals cook easily.
3. **Healthy Eating:** Promote healthy eating through personalized recipes.
4. **Sustainable Food Usage:** Encourage using available ingredients and reducing waste.

---

## Technical Overview

* **Backend:** Integrates machine learning models for text generation, ingredient matching, and nutritional estimation.
* **Frontend:** Intuitive user interface for effortless interaction, suitable for beginners.
* **Data Sources:** Recipes can be stored locally or fetched from online APIs for dynamic content updates.
* **AI Models:** GPT-based models for generating recipe text and optionally AI models for dish image generation.

---

## How It Works

1. User inputs available ingredients and preferences (cuisine, dietary restrictions, meal type).
2. The system searches the recipe database or uses AI to generate a new recipe.
3. Recipe details are presented including step-by-step instructions, estimated cooking time, difficulty, and nutritional information.
4. Optional: AI-generated image of the final dish is displayed.

---

## Technologies Used

* **Programming Languages:** Python, JavaScript (if web frontend)
* **Libraries & Frameworks:**

  * NLP & AI: GPT models, Hugging Face Transformers
  * Backend: Flask / Django / FastAPI
  * Frontend: React / PyQt5 (for GUI)
  * Data Handling: Pandas, NumPy
* **Database:** Local or online APIs for recipe storage
* **Optional:** AI image generation libraries like DALL·E or Stable Diffusion

---

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-link>
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the application:

```bash
python app.py
```

4. Open the frontend interface and start generating recipes.

---

## Future Enhancements

* Voice input for ingredients and preferences.
* Integration with grocery delivery APIs for automated shopping lists.
* Personalized recipe recommendations based on user history.

---

## License

This project is licensed under the **MIT License**. See the LICENSE file for details.

---

## Author

**Shubhamay Santra**
Passionate about AI, NLP, and making everyday life smarter through technology.

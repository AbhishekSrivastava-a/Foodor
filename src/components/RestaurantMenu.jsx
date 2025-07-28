import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../features/cart/cartSlice";

const API_KEY = "2d7a2a6666f04705a34ddfeda0f0aaca";

const RestaurantMenu = () => {
  const [category, setCategory] = useState("vegetarian"); 
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedMeal, setExpandedMeal] = useState(null);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.spoonacular.com/recipes/random?number=8&tags=indian,${category}&excludeIngredients=beef,pork,lamb&apiKey=${API_KEY}`
      );
      const data = await res.json();
      setMeals(data.recipes || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
      setMeals([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [category]);

  const handleAddToCart = (item) => dispatch(addItem(item));
  const handleRemoveFromCart = (id) => dispatch(removeItem(id));

  const generatePrice = (id) => 100 + (id % 50);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading meals...</p>;
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Our Special Menu</h1>

      {/* Category Toggle */}
      <div className="flex justify-center gap-4 mb-8">
        {["vegetarian", "chicken", "seafood"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-5 py-2 rounded font-semibold capitalize transition duration-200 ${
              category === cat
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Meals Grid */}
      <div className="grid gap-6 sm:grid-cols-2">
        {meals.map((meal) => {
          const id = meal.id;
          const name = meal.title;
          const price = generatePrice(id);
          const quantity = cartItems[id]?.quantity || 0;

          return (
            <div
              key={id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg"
            >
              <div className="relative">
                <img
                  src={meal.image}
                  alt={name}
                  className="w-full h-52 object-cover"
                />
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  ⭐ {Math.floor(Math.random() * 2) + 4}.{Math.floor(Math.random() * 9)}
                </span>
              </div>

              <div className="p-5">
                <p className="text-sm text-gray-500 font-medium">— Indian {category}</p>

                <h2 className="text-xl font-semibold text-gray-900 mt-1">{name}</h2>

        
                <p className="text-gray-600 text-sm mt-2 mb-2">
                  {expandedMeal === id
                    ? meal.summary?.replace(/<[^>]+>/g, "")
                    : meal.summary?.replace(/<[^>]+>/g, "").slice(0, 120) + "..."}
                  {meal.summary && meal.summary.length > 120 && (
                    <button
                      onClick={() =>
                        setExpandedMeal(expandedMeal === id ? null : id)
                      }
                      className="text-blue-500 ml-1 text-xs"
                    >
                      {expandedMeal === id ? "Show less" : "Read more"}
                    </button>
                  )}
                </p>

                {/* Price + Cart */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-md text-gray-900 font-semibold">₹{price}/-</p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleRemoveFromCart(id)}
                      disabled={!quantity}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-md flex items-center justify-center text-lg font-bold"
                    >
                      −
                    </button>
                    <span className="text-gray-800 font-medium">{quantity}</span>
                    <button
                      onClick={() =>
                        handleAddToCart({ id, name, price })
                      }
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-8 h-8 rounded-md flex items-center justify-center text-lg font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default RestaurantMenu;
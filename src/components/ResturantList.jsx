import React, { useEffect, useState } from "react";
import {
  Card, CardHeader, CardBody, Button, Typography
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const API_KEY = "2d7a2a6666f04705a34ddfeda0f0aaca";
const API_URL = `https://api.spoonacular.com/recipes/random?number=18&tags=indian&apiKey=${API_KEY}`;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function getVegType(restaurant) {
  const txt =
    (
      (restaurant.title || '') +
      " " +
      (restaurant.name || '') +
      " " +
      (restaurant.ingredients ? restaurant.ingredients.join(" ") : "") +
      " " +
      (restaurant.summary || '') +
      " " +
      (restaurant.instructions || '') +
      " " +
      (restaurant.description || '')
    ).toLowerCase();
    
  if (txt.includes("beef")) return "ignore";
  if (
    txt.includes("chicken") ||
    txt.includes("egg") ||
    txt.includes("mutton") ||
    txt.includes("fish") ||
    txt.includes("lamb") ||
    txt.includes("pork") ||
    txt.includes("seafood") ||
    txt.includes("shrimp") ||
    txt.includes("prawn") ||
    txt.includes("crab")
  ) return "nonveg";
  return "veg";
}

const RestaurantCard = ({ restaurant }) => {
  const id = restaurant.idMeal || restaurant.id;
  const name = restaurant.strMeal || restaurant.title || "Unknown";
  const image = restaurant.strMealThumb || restaurant.image;
  const description = restaurant.instructions || restaurant.summary || restaurant.description || "No description provided.";
  const time = getRandomInt(20, 50);
  const reviews = getRandomInt(70, 321);
  const price = getRandomInt(120, 380);
  const rating = getRandomInt(4, 6);
  const vegType = getVegType(restaurant);
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <Card className="w-full max-w-md bg-white rounded-xl shadow overflow-hidden m-3 flex-shrink-0 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Link to={`/restaurant/${id}`} className="block h-full">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 duration-400 transition-transform"/>
        </Link>
        <div className="absolute top-3 left-3 bg-pink-600 text-white px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider">New</div>
        <button
          onClick={() => setWishlisted(w => !w)}
          className={`absolute top-3 right-3 rounded-full w-10 h-10 flex items-center justify-center shadow bg-white bg-opacity-90 hover:bg-opacity-100 transition-all text-xl
            ${wishlisted ? "text-pink-600 scale-110" : "text-gray-400 hover:text-pink-600"}`}
          aria-label="Wishlist"
        >
          <svg viewBox="0 0 24 24" fill={wishlisted ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} className="h-6 w-6 transition-all">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </button>
        {vegType !== "ignore" && (
          <div className={`absolute top-3 right-16 px-3 py-1.5 rounded text-xs font-semibold uppercase shadow 
            ${vegType === "veg" ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"}`}>
            {vegType === "veg" ? "Veg" : "Non-Veg"}
          </div>
        )}
      </div>
      <CardBody className="pb-3">
        <div className="text-indigo-600 text-xs font-semibold uppercase tracking-wider mb-1">Indian</div>
        <Typography variant="h5" color="blue-gray" className="font-bold mb-2 truncate" title={name}>{name}</Typography>
        <div className="flex items-center my-2">
          <div className="flex mr-2">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 20 20" fill={i < rating ? "#fbbf24" : "#e5e7eb"} className="w-4 h-4">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.46c.97 0 1.37 1.24.59 1.81l-2.8 2.03a1 1 0 00-.36 1.12l1.07 3.29c.3.92-.76 1.69-1.55 1.12l-2.8-2.04a1 1 0 00-1.17 0l-2.8 2.04c-.78.57-1.84-.2-1.54-1.12l1.07-3.29a1 1 0 00-.36-1.12l-2.8-2.04c-.78-.57-.38-1.81.59-1.81h3.46a1 1 0 00.95-.69l1.07-3.29z"/>
              </svg>
            ))}
          </div>
          <span className="text-gray-500 text-xs">{reviews} reviews</span>
        </div>
        <div className="italic text-gray-500 text-xs mb-1">Mumbai, India</div>
        <Typography className="text-gray-600 text-xs mb-4 h-10 overflow-hidden">{description.replace(/<[^>]+>/g, '').slice(0, 80)}...</Typography>
        <div className="flex flex-wrap gap-1 mb-2">
          {vegType === "veg" && (
            <div className="flex items-center bg-green-100 text-green-600 rounded px-2 py-1 text-xs font-semibold">Veg</div>
          )}
          {vegType === "nonveg" && (
            <div className="flex items-center bg-red-100 text-red-600 rounded px-2 py-1 text-xs font-semibold">Non-Veg</div>
          )}
          <div className="flex items-center bg-blue-100 text-blue-600 rounded px-2 py-1 text-xs font-semibold">{time}m</div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="text-lg font-bold text-gray-900 mr-2">₹{price}</span>
            <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded text-xs font-semibold">-20%</span>
            <span className="ml-2 text-gray-400 line-through text-xs">₹{(price * 1.2).toFixed(0)}</span>
          </div>
          <Button color="indigo" size="sm" as={Link} to={`/restaurant/${id}`} className="font-semibold px-5 py-2 rounded flex items-center gap-1">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/><path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/></svg>
            View
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

const RestaurantList = () => {
  const [meals, setMeals] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMeals() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        const filtered = (data.recipes || []).filter(
          meal => getVegType(meal) !== "ignore"
        );
        setMeals(filtered);
      } catch (error) {
        setMeals([]);
      } finally {
        setLoading(false);
      }
    }
    fetchMeals();
  }, []);

  const handleShowMore = () =>
    setVisibleCount((prev) => Math.min(prev + 4, meals.length));

  if (loading) return (
    <p className="text-center mt-10 text-gray-500">Loading meals...</p>
  );
  if (!meals.length) return (
    <p className="text-center mt-10 text-red-500">No Indian meals found.</p>
  );

  return (
    <div className="flex flex-col items-center bg-gray-50 py-6 px-4 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl w-full">
        {meals.slice(0, visibleCount).map((meal, i) => (
          <RestaurantCard key={meal.id || i} restaurant={meal} />
        ))}
      </div>
      {visibleCount < meals.length && (
        <button
          onClick={handleShowMore}
          className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default RestaurantList;

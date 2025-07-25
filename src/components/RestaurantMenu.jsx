import React, { useState } from "react"; 
import { useParams } from "react-router-dom"; 
import { menuData } from "../utils/mockMenuData"; 
import restaurantData from "../utils/resturantMockData"; 

const RestaurantMenu = () => {
  // Get restaurant id from URL like /restaurant/1
  const { id } = useParams();
  const restaurantId = Number(id);

  // Find restaurant from data using id
  const restaurant = restaurantData.find((r) => r.id === restaurantId) || null;
  // Get menu items for this restaurant, fallback in case of missing data
  const menu = menuData[restaurantId] || { veg: [], nonveg: [] };

  // State to toggle veg and non-veg menu items display
  const [showVeg, setShowVeg] = useState(true);
  // State to keep track of cart items and their quantity
  const [cart, setCart] = useState({});

  // Choose items to show according to veg/nonveg toggle
  const itemsToShow = showVeg ? menu.veg : menu.nonveg;

  // Function to add one item quantity to cart object
  const addToCart = (itemId) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  // Function to remove one item quantity from cart object
  const removeFromCart = (itemId) => {
    setCart((prev) => {
      if (!prev[itemId]) return prev; // If item not in cart, do nothing
      const newCart = { ...prev };
      if (newCart[itemId] === 1) {
        delete newCart[itemId]; // Remove item if quantity becomes 0
      } else {
        newCart[itemId] -= 1; // Otherwise, reduce quantity by 1
      }
      return newCart; // Return updated cart
    });
  };

  // This is the main UI returned by this component
  return (
    <main className="max-w-lg mx-auto px-5 py-8">
      {/* Title showing restaurant name or fallback text */}
      <h1 className="text-3xl font-bold mb-6">
        Menu for {restaurant ? restaurant.name : `Restaurant #${restaurantId}`}
      </h1>

      {/* Buttons to switch between veg and non-veg menu */}
      <section className="mb-6 flex gap-4">
        <button
          onClick={() => setShowVeg(true)} // Set showVeg true when clicked
          disabled={showVeg} // Disable if already showing veg menu
          aria-pressed={showVeg} // Accessibility for toggles
          type="button"
          className={`px-5 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
            showVeg
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Veg
        </button>
        <button
          onClick={() => setShowVeg(false)} // Set showVeg false when clicked
          disabled={!showVeg} // Disable if already showing non-veg menu
          aria-pressed={!showVeg} // Accessibility for toggles
          type="button"
          className={`px-5 py-2 rounded font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400 ${
            !showVeg
              ? "bg-orange-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Non-Veg
        </button>
      </section>

      {/* Show menu items or no items message */}
      <section className="flex flex-col gap-6">
        {itemsToShow.length === 0 ? (
          <p className="text-gray-500 italic">No items available</p>
        ) : (
          itemsToShow.map(({ id, name, price }) => (
            // Each menu item displayed as simple card-like div
            <div
              key={id}
              className="border rounded-lg p-4 shadow hover:shadow-md cursor-pointer"
            >
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-lg font-medium">Price: ₹{price}</p>

              {/* Buttons to remove and add item in cart */}
              <div className="flex items-center gap-3 mt-3">
                <button
                  onClick={() => removeFromCart(id)} // Remove one quantity
                  disabled={!cart[id]} // Disable if quantity is zero
                  aria-label={`Remove one ${name} from cart`}
                  className="px-3 py-1 rounded bg-red-500 text-white disabled:bg-gray-300"
                  type="button"
                >
                  −
                </button>

                {/* Show current quantity */}
                <span className="min-w-[20px] text-center" aria-live="polite" aria-atomic="true">
                  {cart[id] || 0}
                </span>

                <button
                  onClick={() => addToCart(id)} // Add one quantity
                  aria-label={`Add one ${name} to cart`}
                  className="px-3 py-1 rounded bg-green-600 text-white"
                  type="button"
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Cart summary section showing total items and price */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>

        {Object.keys(cart).length === 0 ? (
          <p className="text-gray-600 italic">Your cart is empty</p>
        ) : (
          <ul className="list-disc pl-6 space-y-2 text-gray-800">
            {Object.entries(cart).map(([itemId, qty]) => {
              const numericId = Number(itemId);
              // Find item details from veg or nonveg menu
              const item =
                menu.veg.find((i) => i.id === numericId) ||
                menu.nonveg.find((i) => i.id === numericId);
              if (!item) return null;

              return (
                <li key={itemId}>
                  {item.name} x {qty} = ₹{(item.price * qty).toFixed(2)}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </main>
  );
};

export default RestaurantMenu;

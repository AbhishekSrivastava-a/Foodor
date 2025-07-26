import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { menuData } from "../utils/mockMenuData";
import restaurantData from "../utils/resturantMockData";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../features/cart/cartSlice";

const RestaurantMenu = () => {
  const { id } = useParams();
  const restaurantId = Number(id);

  const restaurant = restaurantData.find((r) => r.id === restaurantId) || null;
  const menu = menuData[restaurantId] || { veg: [], nonveg: [] };

  const [showVeg, setShowVeg] = useState(true);

  // Get the dispatch function to send actions to the Redux store
  const dispatch = useDispatch();
  // Get the current cart items from the Redux store
  const cartItems = useSelector((state) => state.cart.items);

  const itemsToShow = showVeg ? menu.veg : menu.nonveg;

  // Handler to dispatch the addItem action
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
  };

  // Handler to dispatch the removeItem action
  const handleRemoveFromCart = (itemId) => {
    dispatch(removeItem(itemId));
  };

  return (
    <main className="max-w-lg mx-auto px-5 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Menu for {restaurant ? restaurant.name : `Restaurant #${restaurantId}`}
      </h1>

      <section className="mb-6 flex gap-4">
        <button
          onClick={() => setShowVeg(true)}
          disabled={showVeg}
          aria-pressed={showVeg}
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
          onClick={() => setShowVeg(false)}
          disabled={!showVeg}
          aria-pressed={!showVeg}
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

      <section className="flex flex-col gap-6">
        {itemsToShow.length === 0 ? (
          <p className="text-gray-500 italic">No items available</p>
        ) : (
          itemsToShow.map((item) => {
            const { id, name, price } = item;
            const cartItem = cartItems[id];
            const quantity = cartItem ? cartItem.quantity : 0;

            return (
              <div
                key={id}
                className="border rounded-lg p-4 shadow hover:shadow-md"
              >
                <h2 className="text-xl font-semibold">{name}</h2>
                <p className="text-lg font-medium">Price: ₹{price}</p>

                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => handleRemoveFromCart(id)}
                    disabled={!quantity}
                    aria-label={`Remove one ${name} from cart`}
                    className="px-3 py-1 rounded bg-red-500 text-white disabled:bg-gray-300"
                    type="button"
                  >
                    −
                  </button>

                  <span className="min-w-[20px] text-center" aria-live="polite" aria-atomic="true">
                    {quantity}
                  </span>

                  <button
                    onClick={() => handleAddToCart(item)}
                    aria-label={`Add one ${name} to cart`}
                    className="px-3 py-1 rounded bg-green-600 text-white"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            );
          })
        )}
      </section>
    </main>
  );
};

export default RestaurantMenu;

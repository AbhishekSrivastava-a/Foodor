import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../../features/cart/cartSlice";

const formatINR = (amount) => `₹${amount.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;

const Cart = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);
  const cartItems = Object.values(items);

  // Promo code logic
  const [promoCode, setPromoCode] = React.useState('');
  const [discount, setDiscount] = React.useState(0);
  const [promoError, setPromoError] = React.useState('');

  // Totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );
  const shipping = subtotal > 0 ? 50.0 : 0; // use Rs. 50 flat shipping, adapt if needed
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Apply discount if set
  const grandTotal = subtotal + shipping - discount;

  // Handlers
  const handleAddItem = (item) => dispatch(addItem(item));
  const handleRemoveItem = (itemId) => dispatch(removeItem(itemId));
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      dispatch(clearCart());
    }
  };

  const handlePromoChange = (e) => setPromoCode(e.target.value);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode === "GET10") {
      setDiscount(subtotal * 0.1); // 10% off subtotal
      setPromoError('');
    } else {
      setDiscount(0);
      setPromoError('Invalid promo code');
    }
  };

  return (
    <section className="relative z-10 after:content-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          {/* Left: Cart Items */}
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            {/* Cart Header */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Cart Items
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {totalItems} Item{totalItems !== 1 ? "s" : ""}
              </h2>
            </div>

            {/* Table heading */}
            {cartItems.length > 0 && (
              <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
                <div className="col-span-12 md:col-span-7">
                  <p className="font-normal text-lg leading-8 text-gray-400">
                    Product Details
                  </p>
                </div>
                <div className="col-span-12 md:col-span-5">
                  <div className="grid grid-cols-5">
                    <div className="col-span-3">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Quantity
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                        Total
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Cart items */}
            {cartItems.length === 0 ? (
              <div className="py-8 text-center text-gray-600">Your cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6 border-b border-gray-200 group">
                  <div className="w-full md:max-w-[126px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="mx-auto rounded-xl object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                    <div className="md:col-span-2">
                      <div className="flex flex-col max-[500px]:items-center gap-3">
                        <h6 className="font-semibold text-base leading-7 text-black">
                          {item.name}
                        </h6>
                        <h6 className="font-normal text-base leading-7 text-gray-500">
                          {item.category}
                        </h6>
                        <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-indigo-600">
                          {formatINR(item.price)}
                        </h6>
                      </div>
                    </div>
                    <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                      <div className="flex items-center h-full">
                        <button
                          type="button"
                          className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-300"
                          aria-label="Decrease quantity"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={item.quantity <= 1}
                        >
                          {/* minus */}
                          <span className="text-2xl font-bold text-gray-900">–</span>
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                          aria-label="Item quantity"
                        />
                        <button
                          type="button"
                          className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-gray-300"
                          aria-label="Increase quantity"
                          onClick={() => handleAddItem(item)}
                        >
                          {/* plus */}
                          <span className="text-2xl font-bold text-gray-900">+</span>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full">
                      <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-indigo-600">
                        {formatINR(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}

            <div className="flex items-center justify-end mt-8 gap-4">
              <button
                type="button"
                onClick={handleClearCart}
                className="flex items-center px-5 py-3 rounded-full gap-2 font-semibold text-lg leading-8 text-red-600 shadow-sm border border-red-200 transition-all duration-500 hover:text-red-700 outline-none focus-visible:ring-2 focus-visible:ring-red-400"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="col-span-12 xl:col-span-4 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Order Summary
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">{totalItems} Item{totalItems !== 1 ? "s" : ""}</p>
                <p className="font-medium text-lg leading-8 text-black">{formatINR(subtotal)}</p>
              </div>
              <form onSubmit={handleApplyPromo}>
                <label className="flex items-center mb-1.5 text-gray-600 text-sm font-medium">
                  Shipping
                </label>
                <div className="flex pb-6">
                  <div className="relative w-full">
                    <div className="absolute left-0 top-0 py-3 px-4 pointer-events-none">
                      <span className="font-normal text-base text-gray-300">
                        Second Delivery
                      </span>
                    </div>
                    <input
                      type="text"
                      className="block w-full h-11 pr-10 pl-36 min-[500px]:pl-52 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder={formatINR(shipping)}
                      value={formatINR(shipping)}
                      readOnly
                    />
                  </div>
                </div>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Promo Code
                </label>
                <div className="flex pb-4 w-full">
                  <div className="relative w-full">
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      placeholder="xxxx xxxx xxxx"
                      aria-label="Promo code input"
                      value={promoCode}
                      onChange={handlePromoChange}
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 z-10 inline-flex items-center py-4 px-4 text-base font-medium text-center text-gray-900 bg-transparent absolute right-0 top-0 pl-2"
                      aria-label="Apply promo code"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                {promoError && (<p className="text-xs text-red-500 mb-2">{promoError}</p>)}
                {discount > 0 && (
                  <div className="flex items-center justify-between py-2">
                    <p className="font-medium text-base text-green-600">Discount</p>
                    <p className="font-medium text-base text-green-600">–{formatINR(discount)}</p>
                  </div>
                )}
                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">{totalItems} Item{totalItems !== 1 ? "s" : ""}</p>
                  <p className="font-semibold text-xl leading-8 text-indigo-600">{formatINR(grandTotal >= 0 ? grandTotal : 0)}</p>
                </div>
                <button
                  type="button"
                  className="w-full text-center bg-indigo-600 rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-indigo-700"
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Cart;

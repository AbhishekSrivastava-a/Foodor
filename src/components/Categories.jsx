import React, { useRef, useState, useEffect } from "react";
import foodCategories from "../utils/carouselMockData";

const Categories = () => {
  const containerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scrollAmount = 180; 

  const updateScrollStatus = () => {
    if (!containerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1); 
  };

  useEffect(() => {
    updateScrollStatus();
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("scroll", updateScrollStatus);
    window.addEventListener("resize", updateScrollStatus);

    return () => {
      container.removeEventListener("scroll", updateScrollStatus);
      window.removeEventListener("resize", updateScrollStatus);
    };
  }, []);

  const scrollLeft = () => {
    containerRef.current?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  const scrollRight = () => {
    containerRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="px-6 md:px-10 lg:px-20 border-b border-gray-300 font-sans">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">What's on your mind?</h2>
        <div className="flex gap-3">
          <button
            type="button"
            aria-label="Scroll Left"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-disabled={!canScrollLeft}
            className={`w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition ${
              !canScrollLeft ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &#x2190;
          </button>
          <button
            type="button"
            aria-label="Scroll Right"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-disabled={!canScrollRight}
            className={`w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xl font-bold hover:bg-gray-300 transition ${
              !canScrollRight ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            &#x2192;
          </button>
        </div>
      </div>

      <ul
        ref={containerRef}
        className="flex space-x-6 overflow-x-auto scrollbar-hide py-2"
        aria-live="polite"
        aria-atomic="true"
        role="list"
      >
        {foodCategories.map((category) => (
          <li key={category.id} className="flex-shrink-0 text-center">
            <button
              type="button"
              onClick={() => {
              }}
              className="block group focus:outline-none"
              aria-label={`Select category ${category.name}`}
            >
              <img
                src={category.image}
                alt={category.name || "Category image"}
                className="
                  w-36 sm:w-40 md:w-44 h-44 sm:h-48 md:h-52 
                  object-cover rounded-lg 
                  transition-transform duration-300 ease-in-out 
                  group-hover:scale-105 group-hover:shadow-lg
                "
                loading="lazy"
              />
              <p className="mt-2 text-gray-700 font-medium">{category.name}</p>
            </button>
          </li>
        ))}
      </ul>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default Categories;

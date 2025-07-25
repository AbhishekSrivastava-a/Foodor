import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import restaurantData from "../utils/resturantMockData";

const RestaurantCard = ({ restaurant }) => {
  const { id, name, image, cuisine, rating, deliveryTime, offer, location } = restaurant;

  return (
    <Card className="w-full max-w-xs m-3 flex-shrink-0 transition-transform duration-300 hover:scale-105 cursor-pointer shadow-orange-500/50 rounded-xl">
      <Link to={`/restaurant/${id}`}>
        <CardHeader color="blue-gray" className="relative h-56 p-0 rounded-xl overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full"
          />
          {offer && (
            <div
              className="absolute bottom-2 right-0 bg-orange-600 text-white py-1 px-3 font-bold text-sm rounded-l-md"
              style={{ backgroundColor: "#ff5200" }}
            >
              {offer}
            </div>
          )}
        </CardHeader>
      </Link>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="italic mb-2 truncate" title={name}>
          {name}
        </Typography>
        <Typography className="mb-1 truncate">
          <span className="italic font-semibold text-gray-700 text-center">Cuisine: </span>
          {cuisine}
        </Typography>
        <Typography className="italic text-gray-500 text-sm text-left truncate" title={location}>
          {location}
        </Typography>
        <Typography className="mb-1">
          <span className="italic font-semibold text-gray-700">⭐ {rating}</span> &bull; {deliveryTime} mins
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button color="indigo" size="sm" as={Link} to={`/restaurant/${id}`}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const RestaurantList = () => {
  const INITIAL_SHOW_COUNT = 8;
  const LOAD_MORE_COUNT = 8;    

  const [visibleCount, setVisibleCount] = useState(INITIAL_SHOW_COUNT);

  const handleShowMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, restaurantData.length));
  };

  if (!restaurantData.length) {
    return <p className="text-center mt-10 text-gray-500">No restaurants available.</p>;
  }

  return (
    <div className="flex flex-col items-center bg-gray-50 py-6 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl w-full">
        {restaurantData.slice(0, visibleCount).map((rest) => (
          <RestaurantCard key={rest.id} restaurant={rest} />
        ))}
      </div>

      {visibleCount < restaurantData.length && (
        <button
          onClick={handleShowMore}
          className="mt-8 px-6 py-3 bg-orange-500 text-white rounded-lg font-semibold shadow hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="Show more restaurants"
          type="button"
        >
          Show More
        </button>
      )}
    </div>
  );
};

export default RestaurantList;

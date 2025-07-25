import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Categories from "./components/Categories";      
import ResturantList from "./components/ResturantList";
import RestaurantMenu from "./components/RestaurantMenu";
import About from "./pages/About/About";
import Offers from "./pages/Offers/Offers";
import Help from "./pages/Help/Help";
import SignIn from "./pages/SignIn/SignIn"
import Cart from "./pages/Cart/Cart";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <>
            <Categories />
            <ResturantList />
          </>
        ),
      },
      {
        path: "restaurant/:id",
        element: <RestaurantMenu />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
       {
        path: "cart",
        element: <Cart/>,
      },
    ],
  },
]);

export default appRouter;

import React from 'react';
import Foodor from '/src/assets/Foodor.png';
import { Link, NavLink } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

const navItems = [
  { id: 1, label: "About", path: "/about" },
  { id: 2, label: "Offers", path: "/offers" },
  { id: 3, label: "Help", path: "/help" },
  { id: 4, label: "Sign In", path: "/signin" },
];

const Header = () => {
  const totalItems = useSelector((state) =>
    state.cart.totalItems !== undefined
      ? state.cart.totalItems
      : Object.values(state.cart.items || {}).reduce((sum, x) => sum + x.quantity, 0)
  );

  return (
    <Disclosure as="nav" className="bg-white/90 backdrop-blur shadow sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-20 flex justify-between items-center">
              <Link to="/" className="flex items-center">
                <img className="h-10 w-auto md:h-14 select-none" src={Foodor} alt="Foodor Logo" draggable={false} />
              </Link>
              <div className="hidden sm:flex sm:space-x-8 items-center">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    [
                      "font-semibold px-2 py-1 rounded transition-colors duration-200",
                      isActive
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500",
                      "italic"
                    ].join(" ")
                  }
                >
                  Home
                </NavLink>
                {navItems.map(({ id, path, label }) => (
                  <NavLink
                    key={id}
                    to={path}
                    className={({ isActive }) =>
                      [
                        "font-semibold px-2 py-1 rounded transition-colors duration-200",
                        isActive
                          ? "text-orange-500"
                          : "text-gray-700 hover:text-orange-500",
                        "italic"
                      ].join(" ")
                    }
                  >
                    {label}
                  </NavLink>
                ))}
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    [
                      "relative font-semibold px-2 py-1 rounded italic flex items-center transition-colors duration-200",
                      isActive
                        ? "text-orange-500"
                        : "text-gray-700 hover:text-orange-500",
                    ].join(" ")
                  }
                >
                  <ShoppingCartIcon className="h-6 w-6 mr-1" />
                  Cart
                  {totalItems > 0 && (
                    <span className="ml-1 bg-orange-500 text-white text-xs min-w-[22px] px-1.5 py-0.5 rounded-full inline-flex items-center justify-center font-bold">
                      {totalItems}
                    </span>
                  )}
                </NavLink>
              </div>
              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-400">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden bg-white shadow">
            <div className="px-2 pt-2 pb-3 space-y-2">
              <Disclosure.Button
                as={NavLink}
                to="/"
                className="block px-3 py-2 rounded-md text-base font-bold italic text-gray-700 hover:text-orange-500 hover:bg-gray-50"
              >
                Home
              </Disclosure.Button>
              {navItems.map(({ id, path, label }) => (
                <Disclosure.Button
                  key={id}
                  as={NavLink}
                  to={path}
                  className="block px-3 py-2 rounded-md text-base font-bold italic text-gray-700 hover:text-orange-500 hover:bg-gray-50"
                >
                  {label}
                </Disclosure.Button>
              ))}
              <Disclosure.Button
                as={NavLink}
                to="/cart"
                className="flex items-center px-3 py-2 rounded-md text-base font-bold italic text-gray-700 hover:text-orange-500 hover:bg-gray-50"
              >
                <ShoppingCartIcon className="h-6 w-6 mr-1" />
                Cart
                {totalItems > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs min-w-[22px] px-1.5 py-0.5 rounded-full inline-flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Header;

import React from 'react';
import Foodor from '/src/assets/Foodor.png';
import { Link } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';

const navItems = [
  { id: 1, text: "About", link: "/about" },
  { id: 2, text: "Offers", link: "/offers" },
  { id: 3, text: "Help", link: "/help" },
  { id: 4, text: "Sign In", link: "/signin" },
];

const Header = () => {
  // Get the total number of items from the Redux cart state
  const totalItems = useSelector((state) => state.cart.totalItems);

  return (
    <Disclosure as="nav" className="bg-white shadow sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div style={{ height: 80 }} className="flex justify-between items-center">
              <div className="flex-shrink-0">
                <Link to="/">
                  <img
                    className="h-45 w-auto"
                    src={Foodor}
                    alt="Foodor Logo"
                  />
                </Link>
              </div>

              <div className="hidden sm:flex sm:space-x-10 items-center">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.link}
                    className="text-gray-700 hover:text-orange-500 px-1 py-1 rounded-md text-medium font-bold font-itallic"
                  >
                    {item.text}
                  </Link>
                ))}
                {/* Display the number of items in the cart */}
                <Link
                  to="/cart"
                  className="text-gray-700 hover:text-orange-500 px-1 py-1 rounded-md text-medium font-bold font-itallic"
                >
                  Cart ({totalItems})
                </Link>
              </div>

              <div className="sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden bg-white shadow">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {[...navItems, { id: 5, text: `Cart (${totalItems})`, link: "/cart" }].map((item) => (
                <Disclosure.Button
                  key={item.id}
                  as={Link}
                  to={item.link}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                >
                  {item.text}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default Header;
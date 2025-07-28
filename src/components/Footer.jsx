import { Typography } from "@material-tailwind/react";
import {
  FaFacebookF,
  FaRedditAlien,
  FaWhatsapp,
  FaPinterestP,
  FaInstagram,
  FaTwitter,
  FaGithub,
} from "react-icons/fa";

const COLS = [
  {
    title: "My Account",
    items: [
      { label: "My Account", href: "#" },
      { label: "Order History", href: "#" },
      { label: "Shopping Cart", href: "#" },
      { label: "Wishlist", href: "#" },
    ],
  },
  {
    title: "Helps",
    items: [
      { label: "Contact", href: "#" },
      { label: "FAQs", href: "#" },
      { label: "Terms & Condition", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
  {
    title: "Categories",
    items: [
      { label: "Printers", href: "#" },
      { label: "Cartridge", href: "#" },
      { label: "Ink", href: "#" },
    ],
  },
  {
    title: "Product",
    items: [
      { label: "Overview", href: "#" },
      { label: "Features", href: "#" },
      { label: "Solutions", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
  },
];

const currentYear = new Date().getFullYear();

const PAYMENT_METHODS = [
  { src: "https://www.logo.wine/a/logo/Apple_Pay/Apple_Pay-White-Dark-Background-Logo.wine.svg", alt: "Apple Pay" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynWEtLag--sQ4XlfTwHh9_DAnfcglW7C3iw&s", alt: "Visa" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6mJsEDg1aR_JCFb3ohk2nCxjgSvkWnpmlKg&s", alt: "Mastercard" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQveKfGcJ1tSEY8bLg52DxvVrFDJXmxXJgv1Q&s", alt: "Discover" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDS0zyuJdI4e7E1VGaNDAVtRn3fGTzr0PBOA&s", alt: "Secure Payment" },
];

const APP_DOWNLOADS = [
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-v52tLnvL3FEjfxjPvZWbvUMYvVUtAm9R6A&s", alt: "Google Play" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJgk5tpxJC_1CAnsXwo2VvBGyQGI-o5c1PJw&s", alt: "App Store" },
];

const SOCIALS = [
  { icon: <FaFacebookF />, color: "text-blue-600", href: "#" },
  { icon: <FaRedditAlien />, color: "text-red-600", href: "#" },
  { icon: <FaWhatsapp />, color: "text-green-500", href: "#" },
  { icon: <FaPinterestP />, color: "text-pink-600", href: "#" },
  { icon: <FaInstagram />, color: "text-pink-400", href: "#" },
  { icon: <FaTwitter />, color: "text-blue-400", href: "#" },
  { icon: <FaGithub />, color: "text-black", href: "#" },
];

const Footer = () => (
  <footer className="w-full bg-white dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 border-t border-gray-200/70 pt-12 pb-4">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-10 border-b border-gray-200/70">
        <div>
          <h2 className="text-2xl font-extrabold flex items-center space-x-2 tracking-tight">
            <span className="text-orange-600 text-3xl font-black">Foo</span>
            <span>Dor</span>
          </h2>
          <p className="mt-3 text-[15px] text-gray-600 dark:text-gray-300 max-w-xs">
            Elevate your experience with us. Innovative, authentic, and delivered.
          </p>
          <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
            <span className="font-semibold">(219) 555-0114</span>
          </p>
          <div className="flex space-x-3 mt-5">
            {SOCIALS.map(s => (
              <a key={s.color} href={s.href} className={`text-xl ${s.color} hover:opacity-80 transition`} target="_blank" rel="noopener noreferrer">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {COLS.map((col) => (
          <div key={col.title}>
            <h3 className="font-semibold mb-2">{col.title}</h3>
            <ul className="text-[15px] space-y-2">
              {col.items.map(link =>
                <li key={link.label || link}>
                  <a href={link.href || "#"} className="hover:text-blue-600 transition">{link.label || link}</a>
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 gap-6">
        <div className="flex space-x-2">
          {APP_DOWNLOADS.map(app => (
            <img key={app.src} src={app.src} alt={app.alt} className="h-10" />
          ))}
        </div>
        <div className="flex space-x-2">
          {PAYMENT_METHODS.map(pay => (
            <img key={pay.src} src={pay.src} alt={pay.alt} className="h-[30px] w-10 rounded-md object-cover bg-white" />
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8 border-t pt-4">
        ExpertSquad © {currentYear}. All Rights Reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

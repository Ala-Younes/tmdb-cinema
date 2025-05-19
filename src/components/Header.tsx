import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/react.svg";
import { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { motion } from "framer-motion";
import { Transition } from "@headlessui/react";
import { 
  MagnifyingGlassIcon, 
  SunIcon, 
  MoonIcon, 
  FilmIcon,
  FireIcon,
  StarIcon,
  CalendarIcon,
  Bars3Icon,
  XMarkIcon
} from "@heroicons/react/24/outline";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [hidden, setHidden] = useState(true);
  const [darkMode, setDarkMode] = useLocalStorage({
    key: "darkMode",
    initialValue: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setHidden(true);
    }
  };

  const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode((previousMode) => !previousMode);
  };

  const navItems = [
    { path: "/", label: "Home", icon: <FilmIcon className="w-5 h-5 mr-1" /> },
    { path: "movies/popular", label: "Popular", icon: <FireIcon className="w-5 h-5 mr-1" /> },
    { path: "movies/top", label: "Top Rated", icon: <StarIcon className="w-5 h-5 mr-1" /> },
    { path: "movies/upcoming", label: "Upcoming", icon: <CalendarIcon className="w-5 h-5 mr-1" /> },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
      <nav className={`bg-white dark:bg-gray-900 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="flex items-center space-x-3">
              <motion.img 
                src={Logo} 
                className="h-8 w-8" 
                alt="Cinamate Logo"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <span className="self-center text-2xl font-bold text-gray-800 dark:text-white">
                Cinamate
              </span>
            </Link>
          </motion.div>
          
          <div className="flex items-center md:order-2">
            {/* Dark mode toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleDarkMode}
              type="button"
              className="p-2 mr-2 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <SunIcon className="w-5 h-5" />
              ) : (
                <MoonIcon className="w-5 h-5" />
              )}
            </motion.button>
            
            {/* Desktop search */}
            <div className="relative hidden md:block">
              <form onSubmit={handleSubmit} className="flex items-center">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={searchTerm}
                    onChange={handleOnChange}
                    type="text"
                    className="w-full md:w-64 pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                    placeholder="Search for movies..."
                    aria-label="Search"
                  />
                </div>
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Search
                </button>
              </form>
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setHidden(!hidden)}
              type="button"
              className="inline-flex items-center p-2 ml-3 text-gray-700 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu"
              aria-expanded={!hidden}
            >
              <span className="sr-only">Open main menu</span>
              {hidden ? (
                <Bars3Icon className="w-6 h-6" />
              ) : (
                <XMarkIcon className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center text-base font-medium transition-colors ${
                    isActive 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400'
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>
          
          {/* Mobile menu */}
          <Transition
            show={!hidden}
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
            className="w-full md:hidden"
          >
            <div className="flex flex-col mt-4 space-y-4 pb-4">
              {/* Mobile search */}
              <form onSubmit={handleSubmit} className="mb-2">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    value={searchTerm}
                    onChange={handleOnChange}
                    type="text"
                    className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-gray-100 border-0 rounded-full focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500"
                    placeholder="Search for movies..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Search
                </button>
              </form>
              
              {/* Mobile navigation */}
              <div className="flex flex-col space-y-2 border-t pt-4 dark:border-gray-700">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setHidden(true)}
                    className={({ isActive }) => 
                      `flex items-center py-2 px-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
                          : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </Transition>
        </div>
      </nav>
    </header>
  );
};

export default Header;

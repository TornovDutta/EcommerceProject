import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useEffect, useState } from "react";
import { useAuth, useCart } from "../../context";

export const Header = () => {
    const [hidden, setHidden] = useState(true);
    const [dropdown, setDropdown] = useState(false);
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false);
    const { token, logout } = useAuth();
    const { cartList } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = event.target.search.value;
        event.target.reset();
        return navigate(`/products?q=${query}`);
    }

    const activeClass = "text-base block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white";
    const inActiveClass = "text-base block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    <Link to="/" className="flex items-center">
                        <img src={logo} className="mr-3 h-6 sm:h-9" alt="CodeBook Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
                    </Link>

                    <div className="flex items-center md:order-2 gap-2">
                        <button onClick={() => setDarkMode(!darkMode)} data-tooltip-target="navbar-search-example-toggle-dark-mode-tooltip" type="button" data-collapse-toggle="navbar-search-example-toggle-dark-mode-tooltip" className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1">
                            {darkMode ? <span className="bi bi-sun-fill"></span> : <span className="bi bi-moon-fill"></span>}
                        </button>

                        <form onSubmit={handleSubmit} className="hidden md:block relative mr-2">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <span className="bi bi-search text-gray-500"></span>
                            </div>
                            <input name="search" type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                        </form>

                        <Link to="/cart" className="text-gray-700 dark:text-white mr-2 relative">
                            <span className="text-2xl bi bi-cart-fill"></span>
                            <span className="text-white text-xs absolute -top-1 -right-1 bg-rose-500 px-1 rounded-full ">{cartList.length}</span>
                        </Link>

                        {token ? (
                            <div className="relative">
                                <span onClick={() => setDropdown(!dropdown)} className="cursor-pointer text-gray-700 dark:text-white text-2xl bi bi-person-circle"></span>
                                {dropdown && (
                                    <div id="dropdownAvatar" className="select-none absolute top-10 right-0 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                        <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                            <div className="font-medium truncate">Welcome</div>
                                        </div>
                                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                            <li>
                                                <Link onClick={() => setDropdown(false)} to="/products" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All eBooks</Link>
                                            </li>
                                            <li>
                                                <Link onClick={() => setDropdown(false)} to="/dashboard" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                            </li>
                                        </ul>
                                        <div className="py-1">
                                            <span onClick={() => { logout(); setDropdown(false); }} className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Log In</Link>
                        )}
                        <button onClick={() => setHidden(!hidden)} data-collapse-toggle="mobile-menu-2" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>

                    <div className={`${hidden ? "hidden" : ""} justify-between items-center w-full md:flex md:w-auto md:order-1`} id="mobile-menu-2">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inActiveClass} end>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/products" className={({ isActive }) => isActive ? activeClass : inActiveClass}>eBooks</NavLink>
                            </li>
                        </ul>
                        {/* Search Bar (Mobile) */}
                        <form onSubmit={handleSubmit} className="md:hidden mt-4 relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <span className="bi bi-search text-gray-500"></span>
                            </div>
                            <input name="search" type="text" id="search-navbar-mobile" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    )
}

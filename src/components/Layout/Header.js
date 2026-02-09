import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../logo.svg";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";

export const Header = () => {
    const [hidden, setHidden] = useState(true);
    const [dropdown, setDropdown] = useState(false);

    // Redux Selectors
    const token = useSelector(state => state.auth.token);
    const cartList = useSelector(state => state.cart.cartList);

    // Redux Dispatch
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const query = event.target.search.value;
        event.target.reset();
        return navigate(`/products?q=${query}`);
    }

    const handleLogout = () => {
        dispatch(logout());
        setDropdown(false);
        navigate("/");
    }

    useEffect(() => {
        if (localStorage.getItem("theme") === "dark" || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [])

    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");

    return (
        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <img src={logo} className="mr-3 h-8 sm:h-9" alt="CodeBook Logo" />
                            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">CodeBook</span>
                        </Link>
                    </div>

                    

                    {/* Right Side Actions */}
                    <div className="flex items-center relative">
                        {/* Dark Mode Toggle */}
                        <span onClick={() => {
                            setDarkMode(!darkMode);
                            if (darkMode) {
                                document.documentElement.classList.remove('dark');
                                localStorage.setItem("theme", "light");
                            } else {
                                document.documentElement.classList.add('dark');
                                localStorage.setItem("theme", "dark");
                            }
                        }} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 bi bi-gear-wide-connected"></span>

                        {/* Search Bar - Desktop */}
                        <form onSubmit={handleSubmit} className="hidden md:block mr-5">
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <span className="bi bi-search text-gray-500 dark:text-gray-400"></span>
                                </div>
                                <input name="search" type="text" id="search-navbar" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                            </div>
                        </form>

                        {/* Search Icon - Mobile */}
                        <span onClick={() => setHidden(!hidden)} className="cursor-pointer text-xl text-gray-700 dark:text-white mr-5 md:hidden bi bi-search"></span>

                        {/* Cart */}
                        <Link to="/cart" className="text-gray-700 dark:text-white mr-5 relative">
                            <span className="text-2xl bi bi-cart-fill"></span>
                            <span className="text-white text-sm absolute -top-1 left-2.5 bg-rose-500 px-1 rounded-full">{cartList.length}</span>
                        </Link>

                        {/* User Profile */}
                        <span onClick={() => setDropdown(!dropdown)} className="cursor-pointer text-2xl text-gray-700 dark:text-white mr-5 bi bi-person-circle"></span>

                        {/* Dropdown Menu */}
                        {dropdown && (token ? (
                            <div className="z-10 absolute top-10 right-0 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <div className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                                    <div className="font-medium truncate">USER</div>
                                </div>
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li><Link onClick={() => setDropdown(false)} to="/products" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All eBooks</Link></li>
                                    <li><Link onClick={() => setDropdown(false)} to="/dashboard" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link></li>
                                </ul>
                                <div className="py-1">
                                    <span onClick={handleLogout} className="cursor-pointer block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Log out</span>
                                </div>
                            </div>
                        ) : (
                            <div className="z-10 absolute top-10 right-0 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                    <li><Link onClick={() => setDropdown(false)} to="/products" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">All eBooks</Link></li>
                                    <li><Link onClick={() => setDropdown(false)} to="/login" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Login</Link></li>
                                    <li><Link onClick={() => setDropdown(false)} to="/register" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Register</Link></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search - Mobile View */}
                {!hidden && (
                    <div className="md:hidden px-4 md:px-0 py-2">
                        <form onSubmit={handleSubmit}>
                            <div className="relative">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <span className="bi bi-search text-gray-500 dark:text-gray-400"></span>
                                </div>
                                <input name="search" type="text" id="search-navbar-mobile" className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." autoComplete="off" />
                            </div>
                        </form>
                    </div>
                )}
            </nav>
        </header>
    )
}

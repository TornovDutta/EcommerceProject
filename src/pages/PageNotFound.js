
import { Link } from "react-router-dom";

export const PageNotFound = () => {
    return (
        <main>
            <section className="flex flex-col justify-center px-2">
                <div className="flex flex-col items-center my-4">
                    <p className="text-7xl text-gray-700 font-bold my-10 dark:text-white">404, Oops!</p>
                    <div className="max-w-xs text-center">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white mb-5">Page Not Found</p>
                        <p className="text-gray-500 dark:text-gray-300 mb-6">The page you are looking for does not exist.</p>
                        <Link to="/" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Back To Home</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

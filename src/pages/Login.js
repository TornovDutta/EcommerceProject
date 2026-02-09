import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context";
import { toast } from "react-toastify";

export const Login = () => {
    const email = useRef();
    const password = useRef();
    const navigate = useNavigate();
    const { credentialLogin } = useAuth();

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const authDetail = {
                email: email.current.value,
                password: password.current.value
            }
            await credentialLogin(authDetail);
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <main>
            <section>
                <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">Login</p>
            </section>
            <div className="flex justify-center flex-wrap h-[80vh]">
                <div className="max-w-sm w-full bg-white rounded-lg border border-gray-200 shadow-md p-5 dark:bg-gray-800 dark:border-gray-700">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white text-center mb-5">Sign in to CodeBook</h5>
                    <form onSubmit={handleLogin}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                            <input ref={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="shubham@example.com" required autoComplete="off" />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                            <input ref={password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Log In</button>
                    </form>
                    <button className="mt-4 block w-full text-center text-sm font-medium text-gray-900 dark:text-gray-300 hover:underline">
                        <Link to="/register">Don't have an account? Register</Link>
                    </button>
                </div>
            </div>
        </main>
    )
}

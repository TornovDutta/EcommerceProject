import { Link, useLocation } from "react-router-dom";

export const OrderSuccessPage = () => {
    const { state } = useLocation();
    const data = state ? state.data : null;

    return (
        <main>
            <section className="text-xl text-center max-w-4xl mx-auto my-10 py-5 dark:text-slate-100 border dark:border-slate-700 rounded bg-white dark:bg-gray-800 shadow-md">
                <div className="my-5">
                    <p className="bi bi-check-circle text-green-600 text-7xl mb-5"></p>
                    <p>Thank you so much for your order!</p>
                    {data ? (
                        <>
                            <p className="font-semibold text-lg mt-2">Your Order ID: {data.id}</p>
                            <p className="text-base mt-1">Check your email <span className="font-semibold">{data.user.email}</span> for details.</p>
                        </>
                    ) : (
                        <p className="text-red-500">Something went wrong accessing order details.</p>
                    )}
                </div>
                <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Continue Shopping <i className="ml-2 bi bi-cart"></i></Link>
            </section>
        </main>
    )
}

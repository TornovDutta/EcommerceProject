import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CheckoutPage = () => {
    const dispatch = useDispatch();
    const cartList = useSelector(state => state.cart.cartList);
    const total = useSelector(state => state.cart.total);
    const token = useSelector(state => state.auth.token);
    const id = useSelector(state => state.auth.id);
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        async function getUser() {
            const response = await fetch(`http://localhost:8000/600/users/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            setUser(data);
        }
        if (id) {
            getUser();
        }
    }, [id, token]); //eslint-disable-line

    async function handleOrder(event) {
        event.preventDefault();
        try {
            const order = {
                cartList: cartList,
                amount_paid: total,
                quantity: cartList.length,
                user: {
                    name: event.target.name.value,
                    email: event.target.email.value,
                    id: id
                }
            }
            const response = await fetch("http://localhost:8000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(order)
            });
            if (!response.ok) {
                throw { message: response.statusText, status: response.status }; //eslint-disable-line
            }
            const data = await response.json();
            dispatch(clearCart());
            navigate("/order-summary", { state: { data: data, status: true } });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <main>
            <section className="max-w-4xl mx-auto py-10 px-5">
                <p className="text-2xl text-center font-semibold dark:text-slate-100 mb-10 underline underline-offset-8">Checkout</p>
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Checkout Form */}
                    <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
                        <h3 className="text-xl font-semibold dark:text-slate-100 mb-5">Billing Information</h3>
                        <form onSubmit={handleOrder}>
                            <div className="mb-6">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                                <input defaultValue={user.name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                                <input defaultValue={user.email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="card" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number (Mock)</label>
                                <input type="text" id="card" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0000 0000 0000 0000" required />
                            </div>
                            <div className="flex gap-4">
                                <div className="mb-6 flex-1">
                                    <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date</label>
                                    <input type="text" id="expiry" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="MM/YY" required />
                                </div>
                                <div className="mb-6 flex-1">
                                    <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">CVV</label>
                                    <input type="text" id="cvv" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="123" required />
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-green-700 hover:bg-green-800 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 transition duration-300">
                                <i className="bi bi-lock-fill mr-2"></i> PAY NOW (${total})
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Side */}
                    <div className="lg:w-1/3">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-slate-700 sticky top-20">
                            <h3 className="text-xl font-semibold dark:text-slate-100 mb-5 text-center">Order Summary</h3>
                            <div className="flex justify-between items-center mb-2 font-medium dark:text-slate-200">
                                <span>Items:</span>
                                <span>{cartList.length}</span>
                            </div>
                            <div className="flex justify-between items-center mb-5 text-lg font-bold dark:text-slate-200 border-t pt-2 dark:border-slate-700">
                                <span>Total:</span>
                                <span className="text-blue-600 dark:text-blue-400">${total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

import { useAuth, useCart } from "../../context";
import { CartEmpty } from "../../components/Element/CartEmpty";
import { CartCard } from "../../components/Element/CartCard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CartPage = () => {
    const { cartList, total, clearCart } = useCart();
    const { token, id } = useAuth();
    const navigate = useNavigate();

    async function handleOrder() {
        try {
            const order = {
                cartList: cartList,
                amount_paid: total,
                quantity: cartList.length,
                user: {
                    name: "Codebook User", // ideally verify user details
                    email: "example@example.com",
                    id: id
                }
            }
            const response = await fetch("/660/orders", {
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
            clearCart();
            navigate("/order-summary", { state: { data: data, status: true } });
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <main>
            {cartList.length ? (
                <section className="max-w-7xl mx-auto py-10 px-5">
                    <p className="text-2xl text-center font-semibold dark:text-slate-100 mb-10 underline underline-offset-8">My Cart ({cartList.length})</p>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items Section */}
                        <div className="lg:col-span-2">
                            {cartList.map((product) => (
                                <CartCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Order Summary Section */}
                        <div className="lg:col-span-1">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border dark:border-slate-700 sticky top-20">
                                <h3 className="text-xl font-semibold dark:text-slate-100 mb-5 text-center">Order Summary</h3>
                                <div className="flex justify-between items-center mb-5 text-lg font-medium dark:text-slate-200">
                                    <span>Total Amount:</span>
                                    <span className="text-blue-600 dark:text-blue-400">${total}</span>
                                </div>
                                <button onClick={handleOrder} type="button" className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300">
                                    PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : <CartEmpty />}
        </main>
    )
}

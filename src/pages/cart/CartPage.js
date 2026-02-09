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
                <section>
                    <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Cart ({cartList.length})</p>
                    <div className="flex flex-col items-stretch max-w-4xl m-auto px-2">
                        {cartList.map((product) => (
                            <CartCard key={product.id} product={product} />
                        ))}
                    </div>
                    <div className="max-w-4xl m-auto p-4 mb-10 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 rounded-lg shadow-md border dark:border-slate-700">
                        <div className="text-xl font-semibold dark:text-slate-100 mb-4 md:mb-0">
                            Total Amount: <span className="text-blue-600 dark:text-blue-400">${total}</span>
                        </div>
                        <button onClick={handleOrder} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-lg px-8 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 transition duration-300">
                            PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
                        </button>
                    </div>
                </section>
            ) : <CartEmpty />}
        </main>
    )
}

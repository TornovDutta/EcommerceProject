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
                    <div className="flex flex-col items-center">
                        {cartList.map((product) => (
                            <CartCard key={product.id} product={product} />
                        ))}
                    </div>
                </section>
            ) : <CartEmpty />}

            {cartList.length > 0 && (
                <section className="max-w-4xl m-auto">
                    <div className="flex flex-col p-2 border-b dark:border-slate-700 text-lg dark:text-slate-100">
                        <div className="flex justify-between my-2">
                            <span className="font-semibold">Total Amount:</span>
                            <span>${total}</span>
                        </div>
                    </div>
                    <div className="text-right my-5">
                        <button onClick={handleOrder} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                            PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
                        </button>
                    </div>
                </section>
            )}
        </main>
    )
}

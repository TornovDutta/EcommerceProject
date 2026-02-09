import { useCart } from "../../context";
import { CartEmpty } from "../../components/Element/CartEmpty";
import { CartCard } from "../../components/Element/CartCard";

export const CartPage = () => {
    const { cartList, total } = useCart();

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
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-base px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">
                            PLACE ORDER <i className="ml-2 bi bi-arrow-right"></i>
                        </button>
                    </div>
                </section>
            )}
        </main>
    )
}

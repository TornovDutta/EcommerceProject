import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context";
import { toast } from "react-toastify";

export const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const { cartList, addToCart, removeFromCart } = useCart();
    const [inCart, setInCart] = useState(false);

    useEffect(() => {
        const productInCart = cartList.find(item => item.id === product.id);

        if (productInCart) {
            setInCart(true);
        } else {
            setInCart(false);
        }

    }, [cartList, product.id]);

    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(`http://localhost:8000/products/${id}`);
            const data = await response.json();
            setProduct(data);
        }
        fetchProduct();
    }, [id]);

    return (
        <main>
            <section className="flex justify-center flex-wrap py-10 my-5">
                <div className="max-w-sm">
                    <img className="rounded-lg" src={product.poster} alt={product.name} />
                </div>
                <div className="max-w-2xl text-gray-700 dark:text-slate-200 text-lg lg:ml-10">
                    <h1 className="text-4xl font-bold my-3 text-center lg:text-left">{product.name}</h1>
                    <p className="my-4">{product.overview}</p>

                    <div className="flex flex-wrap gap-2 my-5">
                        {product.best_seller && <span className="font-semibold text-amber-500 border bg-amber-50 rounded-lg px-2.5 py-0.5 border-amber-500">BEST SELLER</span>}
                        {product.in_stock ? <span className="font-semibold text-emerald-600	border bg-slate-100 rounded-lg px-2.5 py-0.5 border-emerald-600">INSTOCK</span> : <span className="font-semibold text-rose-700 border bg-slate-100 rounded-lg px-2.5 py-0.5 border-rose-700">OUT OF STOCK</span>}
                        <span className="font-semibold text-blue-500 border bg-slate-100 rounded-lg px-2.5 py-0.5 border-blue-500">{product.size} MB</span>
                    </div>

                    <p className="my-4">
                        <span className="mr-2 font-bold">Price:</span>
                        <span className="text-2xl leading-none align-baseline text-gray-900 dark:text-white font-bold">${product.price}</span>
                    </p>
                    <div className="my-7 flex flex-wrap gap-4 items-center">
                        {inCart ? (
                            <button onClick={() => removeFromCart(product)} className="flex-1 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" disabled={product.in_stock ? "" : "disabled"}>Remove Item <i className="ml-1 bi bi-trash3"></i></button>
                        ) : (
                            <button onClick={() => addToCart(product)} className={`flex-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${product.in_stock ? "" : "cursor-not-allowed"}`} disabled={product.in_stock ? "" : "disabled"}>Add To Cart <i className="ml-1 bi bi-plus-lg"></i></button>
                        )}
                    </div>

                    <p className="text-lg text-gray-900 dark:text-slate-200">
                        {product.long_description}
                    </p>
                </div>
            </section>
        </main>
    )
}

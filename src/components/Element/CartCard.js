import { Link } from "react-router-dom"
import { useCart } from "../../context"

export const CartCard = ({ product }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="flex flex-wrap justify-between border-b dark:border-slate-700 max-w-4xl m-auto p-4 mb-5 rounded-lg shadow-md bg-white dark:bg-gray-800">
            <div className="flex">
                <Link to={`/products/${product.id}`}>
                    <img className="w-32 rounded" src={product.poster} alt={product.name} />
                </Link>
                <div className="ml-4 flex flex-col justify-between">
                    <Link to={`/products/${product.id}`}>
                        <p className="text-lg font-semibold dark:text-slate-200">{product.name}</p>
                    </Link>
                    <button onClick={() => removeFromCart(product)} className="text-base text-red-500 hover:text-red-700 font-medium self-start">Remove</button>
                </div>
            </div>
            <div className="text-lg font-semibold dark:text-slate-200 self-center">
                <span>${product.price}</span>
            </div>
        </div>
    )
}

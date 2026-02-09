import { Link } from "react-router-dom"
import { useCart } from "../../context"

export const CartCard = ({ product }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="flex justify-between items-center border rounded-lg shadow-sm dark:border-slate-700 p-4 mb-4 bg-white dark:bg-gray-800">
            <div className="flex items-center">
                <Link to={`/products/${product.id}`}>
                    <img className="w-24 h-32 rounded object-cover" src={product.poster} alt={product.name} />
                </Link>
                <div className="ml-4 flex flex-col justify-between h-24">
                    <Link to={`/products/${product.id}`}>
                        <p className="text-lg font-semibold dark:text-slate-200 line-clamp-1">{product.name}</p>
                    </Link>
                    <button onClick={() => removeFromCart(product)} className="text-sm text-red-500 hover:text-red-700 font-medium self-start mt-2">Remove</button>
                </div>
            </div>
            <div className="text-lg font-semibold dark:text-slate-200 text-right">
                <span>${product.price}</span>
            </div>
        </div>
    )
}

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductsCard } from "../../components";

export const DashBoardPage = () => {
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [orders, setOrders] = useState([]);

    // logged-in user from redux
    const user = useSelector(state => state.auth.user);
    // expected: { id, name, email }

    // fetch suggested products (used only if no orders)
    useEffect(() => {
        async function fetchProducts() {
            const res = await fetch("http://localhost:8000/products?_limit=3");
            const data = await res.json();
            setSuggestedProducts(data);
        }
        fetchProducts();
    }, []);

    // fetch orders of logged-in user (EMAIL BASED – IMPORTANT)
    useEffect(() => {
        async function fetchOrders() {
            if (!user?.email) {
                console.log("No user email found:", user);
                return;
            }

            try {
                const res = await fetch("http://localhost:8000/orders");
                const data = await res.json();
                console.log("All orders:", data);
                console.log("User email:", user.email);

                const userOrders = data.filter(order => {
                    const matches = order.user?.email === user.email;
                    console.log(`Order ${order.id}: ${order.user?.email} === ${user.email}? ${matches}`);
                    return matches;
                });

                console.log("Filtered orders:", userOrders);
                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching orders:", error);
                setOrders([]);
            }
        }

        fetchOrders();
    }, [user]);

    // flatten ordered products
    const orderedProducts = orders.flatMap(order => order.cartList);

    return (
        <main>
            <section>
                <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">
                    My Dashboard
                </p>
            </section>

            {/* NO ORDERS → SHOW SUGGESTIONS */}
            {orderedProducts.length === 0 && (
                <section className="max-w-4xl mx-auto px-4 mb-16">
                    <p className="text-center dark:text-slate-100 text-lg mb-8">
                        You haven’t ordered yet — here are some recommended reads
                    </p>

                    <div className="flex flex-wrap justify-center gap-5">
                        {suggestedProducts.map(product => (
                            <ProductsCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* ORDERS EXIST → SHOW ORDERED PRODUCTS */}
            {orderedProducts.length > 0 && (
                <section className="max-w-4xl mx-auto px-4 mb-20">
                    <p className="text-2xl text-center font-semibold dark:text-slate-100 mb-10 underline underline-offset-8">
                        Your Purchased Books
                    </p>

                    <div className="flex flex-wrap justify-center gap-5">
                        {orderedProducts.map((product, index) => (
                            <ProductsCard
                                key={`${product.id}-${index}`}
                                product={product}
                            />
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

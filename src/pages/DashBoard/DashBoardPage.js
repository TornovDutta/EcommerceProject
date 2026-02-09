import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductsCard } from "../../components";

export const DashBoardPage = () => {
    const [products, setProducts] = useState([]);
    const user = useSelector(state => state.auth.token); // Or use user name if stored in session

    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch("http://localhost:8000/products?_limit=3"); // Fetch just 3 products
            const data = await response.json();
            setProducts(data);
        }
        fetchProducts();
    }, []);

    const faqs = [
        {
            id: 1,
            question: "Why should I use CodeBook?",
            answer: "CodeBook is the premier destination for programming ebooks, offering a curated selection of the highest quality technical literature to help you master your craft."
        },
        {
            id: 2,
            question: "How do I access my purchased books?",
            answer: "All your purchased books are available in your personal library immediately after checkout. You can read them online or download them."
        },
        {
            id: 3,
            question: "Is there a return policy?",
            answer: "We offer a 7-day money-back guarantee on all purchases if you are not satisfied with the quality of the ebook."
        },
        {
            id: 4,
            question: "Do you offer customer support?",
            answer: "Yes, our dedicated support team is available 24/7 to assist you with any issues or questions you may have."
        }
    ];

    return (
        <main>
            <section>
                <p className="text-2xl text-center font-semibold dark:text-slate-100 my-10 underline underline-offset-8">My Dashboard</p>
            </section>

            <section className="max-w-4xl mx-auto px-4">
                <p className="text-center dark:text-slate-100 text-lg mb-8">Welcome back! Here are some recommended reads for you.</p>

                <div className="flex flex-wrap justify-center lg:flex-row gap-5 mb-16">
                    {products.map((product) => (
                        <ProductsCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            <section className="max-w-4xl mx-auto px-4 mb-20">
                <h2 className="text-2xl text-center font-semibold dark:text-slate-100 mb-10 underline underline-offset-8">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <div key={faq.id} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
                            <p className="text-gray-700 dark:text-gray-400">{faq.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductsCard } from "../../components";

export const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("http://localhost:8000/products?best_seller=true&_limit=6"); // Modified to show 6
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
      <section className="flex flex-col lg:flex-row dark:text-slate-100 items-center">
        <div className="text my-5">
          <h1 className="text-5xl font-bold">The Ultimate eBook Store</h1>
          <p className="text-2xl my-7 px-1 dark:text-slate-300">CodeBook is the world's most popular and authoritative source for computer science ebooks. Find ratings and access to the newest books digitally.</p>
          <Link to="/products" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Explore eBooks</Link>
        </div>
        <div className="visual my-5 lg:max-w-xl">
          <img className="rounded-lg max-h-full" src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=60" alt="CodeBook Hero Section" />
        </div>
      </section>

      <section className="my-20">
        <h1 className="text-2xl text-center font-semibold dark:text-slate-100 mb-5 underline underline-offset-8">Featured eBooks</h1>
        <div className="flex flex-wrap justify-center lg:flex-row">
          {products.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="my-20">
        <h2 className="text-2xl text-center font-semibold dark:text-slate-100 mb-10 underline underline-offset-8">Frequently Asked Questions</h2>
        <div className="max-w-4xl mx-auto space-y-4 px-4">
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

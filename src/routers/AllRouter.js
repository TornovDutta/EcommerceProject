import { Routes, Route } from "react-router-dom";
import { HomePage, ProductsPages, ProductDetails, Login, Register, CartPage, OrderPage, DashBoardPage, PageNotFound, OrderSuccessPage } from "../pages";

export const AllRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPages />} />
      <Route path="/products/:id" element={<ProductDetails />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/cart" element={<CartPage />} />
      <Route path="/order-summary" element={<OrderSuccessPage />} />
      <Route path="/dashboard" element={<DashBoardPage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import React,{useEffect} from "react";

import Menu from "./components/nav/Menu";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import AdminProducts from "./pages/admin/Products";
import AdminProductUpdate from "./pages/admin/ProductUpdate";
import UserOrders from "./pages/user/Orders";
import UserProfile from "./pages/user/Profile";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import CategoriesList from "./pages/CategoriesList";
import CategoryView from "./pages/CategoryView";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/Orders";
// import { useDispatch } from "react-redux";
// import { currentUser } from "./functions/auth";
// import { auth } from "./firebase";

// import RegisterComplete from "./pages/auth/RegisterComplete";


const PageNotFound = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      404 | Page not found
    </div>
  );
};

export default function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged(async (user) => {
  //     if (user) {
  //       const idTokenResult = await user.getIdTokenResult();
  //       console.log("user", user);
  //       currentUser(idTokenResult.token)
  //       .then((res) => {
  //         dispatch({
  //           type: "LOGGED_IN_USER",
  //           payload: {
  //             name: res.data.name,
  //             email: res.data.email,
  //             token: idTokenResult.token,
  //             role: res.data.role,
  //             _id: res.data._id,
  //           },
  //         });
  //       })
  //       .catch((err) => console.log(err));
  //     }
  //   });
    // cleanup
  //   return () => unsubscribe();
  // }, []);
  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/register/complete" element={<RegisterComplete />} /> */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/categories" element={<CategoriesList />} />
        <Route path="/category/:slug" element={<CategoryView />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<UserProfile />} />
          <Route path="user/orders" element={<UserOrders />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route
            path="admin/product/update/:slug"
            element={<AdminProductUpdate />}
          />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<PageNotFound />} replace />
      </Routes>
    </BrowserRouter>
  );
}

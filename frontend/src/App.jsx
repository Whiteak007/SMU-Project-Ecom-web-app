import { useState } from "react";
import { ToastContainer, toast, Slide } from 'react-toastify';
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import SearchBar from "./components/SearchBar";
import Verify from "./pages/Verify";
import MyProfile from "./pages/MyProfile";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] ">
        {/* <ToastContainer/> */}
      <ToastContainer position="top-center" autoClose={1000}  transition={Slide} />

        <Navbar />
        <SearchBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/my-profile" element={<MyProfile />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;

import React from "react";
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import NavBar from "./componentes/Navbar/Navbar";
import ItemDetailContainer from "./componentes/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Cart from "./componentes/Cart/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./componentes/Checkout/Checkout";
import imagenBanner from '/img/2.png'; 
import './App.css';
import Footer from "./componentes/Footer/Footer"; // Importar el Footer

const App = () => {
    return (
        <>
            <BrowserRouter>
                <CarritoProvider>
                    <NavBar />
                    <img
                        src={imagenBanner}
                        alt="Banner"
                        className="banner-img"
                    />
                    <Routes>
                        <Route path="/" element={<ItemListContainer />} />
                        <Route path="/categoria/:idCategoria" element={<ItemListContainer />} />
                        <Route path="/item/:idItem" element={<ItemDetailContainer />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                    <Footer /> 
                </CarritoProvider>
                <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;

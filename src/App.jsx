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

const App = () => {
    return (
        <>
            <BrowserRouter>
                <CarritoProvider>
                    <NavBar />

                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <img
                                        src={imagenBanner}
                                        alt="Banner"
                                        style={{ width: '100%', height: 'auto', marginTop: '10px' }}
                                    />
                                    <ItemListContainer />
                                </>
                            }
                        />
                        <Route
                            path="/categoria/:idCategoria"
                            element={<ItemListContainer />}
                        />
                        <Route path="/item/:idItem"element={<ItemDetailContainer />}  />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </CarritoProvider>
                <ToastContainer />
            </BrowserRouter>
        </>
    );
};

export default App;

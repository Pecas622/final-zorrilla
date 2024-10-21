import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.css";

const Cart = () => {
    const { carrito, total, cantidadTotal, vaciarCarrito } = useContext(CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <div className="cart-container">
                <h2>No hay productos en el carrito!</h2>
                <Link className="finalizar-compra" to="/">Volver</Link>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {carrito.map(producto => (
                <CartItem 
                    key={producto.item.id} 
                    {...producto} 
                />
            ))}

            <h3>Total: ${total}</h3>
            <h3>Cantidad Total: {cantidadTotal}</h3>
            <button className="cart-button" onClick={vaciarCarrito}>Vaciar Carrito</button>
            <Link className="finalizar-compra" to="/checkout">Finalizar Compra</Link>
        </div>
    );
};

export default Cart;

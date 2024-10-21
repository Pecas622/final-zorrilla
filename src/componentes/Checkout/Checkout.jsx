import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import './Checkout.css';

const Checkout = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmacion, setEmailConfirmacion] = useState("");
    const [error, setError] = useState("");

    const { carrito, vaciarCarrito, total } = useContext(CarritoContext);
    const navigate = useNavigate(); 

    const manejadorFormulario = async (e) => {
        e.preventDefault();

        if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
            setError("Por favor, completa todos los campos.");
            return;
        }

        if (email !== emailConfirmacion) {
            setError("Los campos del email no coinciden.");
            return;
        }

        
        const stockSuficiente = await Promise.all(carrito.map(async (producto) => {
            const productoRef = doc(db, "productos", producto.item.id);
            const productoDoc = await getDoc(productoRef);
            const stockActual = productoDoc.data().stock;
            return stockActual >= producto.cantidad; 
        }));

        if (!stockSuficiente.every(Boolean)) {
            setError("No hay suficiente stock para algunos productos.");
            return;
        }

        const orden = {
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        };

        try {
            // Actualizar el stock y guardar la orden en paralelo
            await Promise.all(
                orden.items.map(async (productoOrden) => {
                    const productoRef = doc(db, "productos", productoOrden.id);
                    const productoDoc = await getDoc(productoRef);
                    const stockActual = productoDoc.data().stock;

                    await updateDoc(productoRef, {
                        stock: stockActual - productoOrden.cantidad
                    });
                })
            );

            // Guardar la orden en la base de datos
            await addDoc(collection(db, "ordenes"), orden);
            vaciarCarrito();
            setNombre("");
            setApellido("");
            setTelefono("");
            setEmail("");
            setEmailConfirmacion("");

            // Redirigir al home
            navigate("/"); // Redirigir a la página principal
        } catch (error) {
            console.error("Error al procesar la orden", error);
            setError("Se produjo un error al procesar la orden.");
        }
    };

    return (
        <div className="checkout-container">
            <h2>Checkout</h2>

            <form onSubmit={manejadorFormulario}>
                {carrito.map(producto => (
                    <div key={producto.item.id} className="checkout-product">
                        <p>{producto.item.nombre}</p>
                        <p>{producto.item.precio} x {producto.cantidad}</p>
                        <p>Total: ${producto.item.precio * producto.cantidad}</p>
                        <hr />
                    </div>
                ))}

                <div className="checkout-field">
                    <label>Nombre</label>
                    <input type="text" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                </div>

                <div className="checkout-field">
                    <label>Apellido</label>
                    <input type="text" onChange={(e) => setApellido(e.target.value)} value={apellido} />
                </div>

                <div className="checkout-field">
                    <label>Teléfono</label>
                    <input type="text" onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                </div>

                <div className="checkout-field">
                    <label>Email</label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className="checkout-field">
                    <label>Confirmación de Email</label>
                    <input type="email" onChange={(e) => setEmailConfirmacion(e.target.value)} value={emailConfirmacion} />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" className="checkout-button">Confirmar Compra</button>
            </form>
        </div>
    );
};

export default Checkout;

import Swal from "sweetalert2";
import { useState, createContext } from "react";

// 2) Crear el contexto
export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0,
    loading: false,
    carritoVaciado: false, // Nuevo estado para el carrito vaciado
});

// 3) Proveedor del contexto
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [carritoVaciado, setCarritoVaciado] = useState(false); // Nuevo estado

    // Función para agregar productos al carrito
    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente = carrito.find((prod) => prod.item.id === item.id);
    
        if (!productoExistente) {
            setCarrito((prev) => [...prev, { item, cantidad }]);
            setCantidadTotal((prev) => prev + cantidad);
            setTotal((prev) => prev + item.precio * cantidad);
        } else {
            // Actualiza el carrito
            const carritoActualizado = carrito.map((prod) => {
                if (prod.item.id === item.id) {
                    return { ...prod, cantidad: prod.cantidad + cantidad };
                } else {
                    return prod;
                }
            });
            setCarrito(carritoActualizado);
            setCantidadTotal((prev) => prev + cantidad);
            setTotal((prev) => prev + item.precio * cantidad);
        }
    
        // Alerta cuando se agrega un producto (opcional)
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `Se ha añadido ${cantidad} unidad/es de ${item.nombre} al carrito.`,
            timer: 2000,
        });
    };
    
    // Función para eliminar un producto del carrito
    const eliminarProducto = (id) => {
        setLoading(true); // Iniciar la carga
        const productoEliminado = carrito.find((prod) => prod.item.id === id);
        const carritoActualizado = carrito.filter((prod) => prod.item.id !== id);

        setCarrito(carritoActualizado);
        setCantidadTotal((prev) => prev - productoEliminado.cantidad);
        setTotal(
            (prev) =>
                prev - productoEliminado.item.precio * productoEliminado.cantidad
        );
        setLoading(false); // Finalizar la carga
        
        // Alerta cuando se elimina un producto (opcional)
        Swal.fire({
            icon: 'info',
            title: 'Producto eliminado',
            text: `Se ha eliminado ${productoEliminado.item.nombre} del carrito.`,
            timer: 2000,
        });
    };

    // Función para vaciar todo el carrito y mostrar mensaje de compra exitosa
    const vaciarCarrito = () => {
        setLoading(true); // Iniciar la carga
        
        // Vaciar el carrito y resetear los valores
        setCarrito([]);
        setCantidadTotal(0);
        setTotal(0);
        setCarritoVaciado(true); // Marcar el carrito como vaciado
        setLoading(false); // Finalizar la carga
        
        // Mostrar mensaje de compra exitosa
        Swal.fire({
            icon: 'success',
            title: '¡Compra realizada!',
            text: 'Tu compra ha sido realizada con éxito.',
            timer: 3000, // Puedes ajustar el tiempo que se muestra el mensaje
        });
    };

    return (
        <CarritoContext.Provider
            value={{
                carrito,
                total,
                cantidadTotal,
                agregarAlCarrito,
                eliminarProducto,
                vaciarCarrito,
                loading, // Estado de carga
                carritoVaciado, // Estado de carrito vaciado
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

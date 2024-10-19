import Swal from "sweetalert2";
import { useState, createContext } from "react";

// 2) Crear el contexto
export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0,
    loading: false,
});

// 3) Proveedor del contexto
export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    // Verificar el estado del carrito por consola:
    console.log(carrito);

    // Función para agregar productos al carrito
    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente = carrito.find((prod) => prod.item.id === item.id);
    
        if (!productoExistente) {
            setCarrito((prev) => [...prev, { item, cantidad }]);
            // Verifica aquí que item tiene propiedades válidas
            console.log("Producto agregado:", item);
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
        Swal.fire({
            icon: 'info',
            title: 'Producto eliminado',
            text: `Se ha eliminado ${productoEliminado.item.nombre} del carrito.`,
            timer: 2000,
        });
    };

    // Función para vaciar todo el carrito
    const vaciarCarrito = () => {
        setLoading(true); // Iniciar la carga
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás deshacer esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, vaciar',
        }).then((result) => {
            if (result.isConfirmed) {
                setCarrito([]);
                setCantidadTotal(0);
                setTotal(0);
                setLoading(false); // Finalizar la carga
                Swal.fire({
                    icon: 'success',
                    title: 'Carrito vaciado',
                    text: 'Todos los productos han sido eliminados del carrito.',
                    timer: 2000,
                });
            } else {
                setLoading(false); // Finalizar la carga si se cancela
            }
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
            }}
        >
            {children}
        </CarritoContext.Provider>
    );
};

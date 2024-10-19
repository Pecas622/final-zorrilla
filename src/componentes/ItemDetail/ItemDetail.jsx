import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CarritoContext } from '../../context/CarritoContext';
import { toast } from 'react-toastify';
import Contador from '../Contador/Contador';
import './ItemDetail.css';

const ItemDetail = ({ id, nombre, precio, img, stock }) => {
    const [agregarCantidad, setAgregarCantidad] = useState(0);
    const { agregarAlCarrito } = useContext(CarritoContext);

    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);

        // Asegúrate de que item tiene todas las propiedades
        const item = { id, nombre, precio, img }; // Agrega img si es necesario
        agregarAlCarrito(item, cantidad);
        toast.success("Su compra fue enviada al carrito", { autoClose: 1000, theme: "dark", position: "top-right" });
    };

    return (
        <div className='contenedorItem'>
            <h2>Nombre: {nombre}</h2>
            <h3>Precio: ${precio}</h3>
            <h3>ID: {id}</h3>
            <img src={img} alt={nombre} />
            {
                agregarCantidad > 0 ? (
                    <Link to="/cart"> Terminar Compra</Link>
                ) : (
                    <Contador inicial={1} stock={stock} funcionAgregar={manejadorCantidad} />
                )
            }
        </div>
    );
};

export default ItemDetail;

import { useState } from "react";
import './Contador.css'; // Asegúrate de que la ruta sea correcta

const Contador = ({ inicial, stock, funcionAgregar }) => {
    const [contador, setContador] = useState(inicial);

    const sumarContador = () => {
        setContador(prevContador => (prevContador < stock ? prevContador + 1 : prevContador));
    };

    const restarContador = () => {
        setContador(prevContador => (prevContador > inicial ? prevContador - 1 : prevContador));
    };

    return (
        <div className="contador-container">
            <button className="contador-button" onClick={restarContador} disabled={contador <= inicial}> - </button>
            <strong className="contador-strong">{contador}</strong>
            <button className="contador-button" onClick={sumarContador} disabled={contador >= stock}> + </button>
            <button className="agregar-button" onClick={() => funcionAgregar(contador)}> Agregar al carrito</button>
        </div>
    );
};

export default Contador;

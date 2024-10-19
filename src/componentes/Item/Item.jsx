import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({ id, nombre, precio, img, stock }) => {
    return (
        <div className='product-card'>
            <img src={img} alt={nombre} />
            <h3>{nombre}</h3>
            <p>{precio}</p>
            <p>ID: {id}</p>
            <p>Stock: {stock}</p>
            <Link to={`/item/${id}`} className="product-card-button">Ver Más</Link>
        </div>
    );
}

export default Item;

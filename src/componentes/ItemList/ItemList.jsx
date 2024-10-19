import Item from "../Item/Item";
import './ItemList.css';

const ItemList = ({ productos }) => {
    console.log(productos); 
    return (
        <div className="contenedorProductos">
            {productos.map((item) => (
                <Item key={item.id} {...item} />
            ))}
        </div>
    )
}

export default ItemList;

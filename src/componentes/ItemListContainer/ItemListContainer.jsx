import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false)

    const { idCategoria } = useParams();

    useEffect(() => {
        setLoading(true);
        const misProductos = idCategoria
            ? query(collection(db, "productos"), where("idCat", "==", idCategoria))
            : collection(db, "productos");

        getDocs(misProductos)
            .then((res) => {
                const nuevosProductos = res.docs.map((doc) => {
                    const data = doc.data();
                    return { id: doc.id, ...data };
                });
                setProductos(nuevosProductos);
            })
            .catch((error) => console.log(error))
            .finally(() => {
                console.log("proceso finalizado");
                setLoading(false);
            });
    }, [idCategoria]);

    return (
        <div className="item-list-container">
            <h2 style={{ textAlign: 'center' }}>Mis Productos</h2>

            {/* Aquí estaba el Loader, lo eliminamos */}
            <ItemList productos={productos} />
        </div>
    );
};

export default ItemListContainer;

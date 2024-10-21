import React, { useState, useEffect } from 'react';
import CartWidget from '../CartWidget/CartWidget';
import "./NavBar.css";
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../services/config';

const NavBar = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const obtenerCategorias = async () => {
            const productosCollection = collection(db, 'productos');
            const productosSnapshot = await getDocs(productosCollection);
            const productos = productosSnapshot.docs.map(doc => doc.data());

            const categoriasConProductos = [...new Set(
                productos
                    .filter(prod => prod.stock > 0)
                    .map(prod => prod.idCat)
            )];
            setCategorias(categoriasConProductos);
        };

        obtenerCategorias();
    }, []);

    return (
        <header className='Navbar'>
            <Link to="/">
                <img src="/img/logo.png" alt="Logo" />
            </Link>
            <nav>
                <ul className='menu'>
                    <li className='menu-link'>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    {categorias.map((categoria, index) => (
                        <li key={index} className='menu-link'>
                            <NavLink to={`/categoria/${categoria}`}>{categoria}</NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="CartContainer">
                <CartWidget />
            </div>
        </header>
    );
};

export default NavBar;

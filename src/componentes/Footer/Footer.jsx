// Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <h3 className='footer-titulo'>Tradición Mate</h3>
                <p>&copy; {new Date().getFullYear()} Todos los derechos reservados.</p>
                <p>Contáctanos: <a href="mailto:info@tradicionmate.com">info@tradicionmate.com</a></p>
                <p>"Calidad en cada sorbo".</p>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                        <i className="bi bi-facebook social-icon"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <i className="bi bi-instagram social-icon"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                        <i className="bi bi-twitter social-icon"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

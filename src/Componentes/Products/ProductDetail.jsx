import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ProductDetail.css';
import guitarra1 from '../../assets/ejemplo.png';

const ProductDetail = () => {
    const { id } = useParams();
    const product = {
        id: id,
        name: "Gibson Les Paul Studio Electric Guitar",
        price: 3999,
        description: "The Gibson Les Paul Studio Sessions electric guitar is an updated and refined version of the classic Les Paul Studio, designed to meet the demands of today's discerning players. This guitar features an Ultra-Modern weight-relieved mahogany body with an AA figured maple cap, a mahogany neck with a bound ebony fretboard, and a SlimTaper profile with a Modern Contoured Heel for effortless access to the upper frets.",
        images: [guitarra1]
    };

    return (
        <div>
            <Header />
            <div className="navigation-bar">
                <div className="home-icon">
                    <a href="/" className="home-link"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></a>
                </div>
                <h2 className="category-title">Guitarras</h2>
                <div className="back-icon">
                    <a href="/productos" className="back-link">←</a>
                </div>
            </div>
            <div className="product-detail-container">
                <h1 className="product-name">{product.name}</h1>
                <div className="product-detail-content">
                    <div className="product-images-container">
                        <div className="main-image-container">
                            <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="main-image"
                            />
                        </div>
                    </div>

                    <div className="product-info-container">
                        <div className="product-description">
                            <p>{product.description}</p>
                        </div>
                        <div className="purchase-section">
                            <div className="price-tag">${product.price}</div>
                            <div class="purchase-actions">
                                <select className="quantity-select" defaultValue="1">
                                    {[...Array(4)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                                <button className="add-to-cart-button">
                                    Agregar al carrito
                                </button>
                            </div>
                                
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ProductDetail;
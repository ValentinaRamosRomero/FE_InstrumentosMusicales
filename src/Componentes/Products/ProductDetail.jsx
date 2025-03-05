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
        images: [guitarra1],
        characteristics: {
            marca: "Gibson",
            modelo: "Les Paul",
            condicion: "2 años de uso",
            origen: "USA",
            lanzamiento: "2022",
            medidas: "120 x 40 x 9 cm",
            material: "Caoba",
            uso: "Profesional"
        }
    };

    return (
        <div className="product-page">
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
                
                <div className="product-detail-layout">
                    {/* DIV1.1 - Imágenes del producto */}
                    <div className="product-images-container">
                        <div className="main-image-container">
                            <img 
                                src={product.images[0]} 
                                alt={product.name}
                                className="main-image"
                            />
                        </div>
                    </div>
                    
                    {/* DIV2 - Descripción del producto */}
                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>
                    
                    {/* DIV1.2 - Sección de compra */}
                    <div className="purchase-section">
                        <div className="quantity-controls">
                            <div className="price-tag">${product.price}</div>
                            <select className="quantity-select" defaultValue="1">
                                {[...Array(4)].map((_, i) => (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <button className="add-to-cart-button desktop-button">
                                Agregar al carrito
                            </button>

                            {/* Botón móvil/tablet que solo se muestra en esas vistas */}
                            <div className="add-to-cart-container">
                                <button className="add-to-cart-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="px" fill="#FFFFFF"><path d="M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 51Q359-123 337.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51-21Q717-225 738-203.79t21 51Q759-123 737.79-102t-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="characteristics-section">
                    <h2 className="characteristics-title">Características</h2>
                    <div className="characteristics-grid">
                        <div className="characteristics-column">
                            <div className="characteristic-item">
                                <span className="characteristic-icon">📌</span>
                                <span className="characteristic-label">Marca:</span>
                                <span className="characteristic-value">{product.characteristics.marca}</span>
                            </div>
                            <div className="characteristic-item">
                                <span className="characteristic-icon">📋</span>
                                <span className="characteristic-label">Modelo:</span>
                                <span className="characteristic-value">{product.characteristics.modelo}</span>
                            </div>
                            <div className="characteristic-item">
                                <span className="characteristic-icon">📏</span>
                                <span className="characteristic-label">Condición:</span>
                                <span className="characteristic-value">{product.characteristics.condicion}</span>
                            </div>
                            <div className="characteristic-item">
                                <span className="characteristic-icon">🌐</span>
                                <span className="characteristic-label">Origen:</span>
                                <span className="characteristic-value">{product.characteristics.origen}</span>
                            </div>
                        </div>
                        <div className="characteristics-column">
                            <div className="characteristic-item">
                                <span className="characteristic-icon">📅</span>
                                <span className="characteristic-label">Año de lanzamiento:</span>
                                <span className="characteristic-value">{product.characteristics.lanzamiento}</span>
                            </div>
                            <div className="characteristic-item">
                                <span className="characteristic-icon">📐</span>
                                <span className="characteristic-label">Medidas:</span>
                                <span className="characteristic-value">{product.characteristics.medidas}</span>
                            </div>
                            <div className="characteristic-item">
                                <span className="characteristic-icon">🪵</span>
                                <span className="characteristic-label">Material principal:</span>
                                <span className="characteristic-value">{product.characteristics.material}</span>
                            </div>
                            <div className="characteristic-item">
                                <span className="characteristic-icon">🎯</span>
                                <span className="characteristic-label">Uso recomendado:</span>
                                <span className="characteristic-value">{product.characteristics.uso}</span>
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
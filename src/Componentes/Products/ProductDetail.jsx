import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ProductDetail.css';
import axios from 'axios'; 

//importando iconos
import marcaIcon from '../../assets/icons/marca-icon.png';
import modeloIcon from '../../assets/icons/modelo-icon.png';
import condicionIcon from '../../assets/icons/condicion-icon.png';
import origenIcon from '../../assets/icons/origen-icon.png';
import lanzamientoIcon from '../../assets/icons/lanzamiento-icon.png';
import medidasIcon from '../../assets/icons/medidas-icon.png';
import materialIcon from '../../assets/icons/material-icon.png';
import usoIcon from '../../assets/icons/uso-icon.png';

const ProductDetail = ({ isAuthenticated, userData, onLogout }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                // endpoint
                const response = await axios.get(`https://music-store-api.up.railway.app/products/${id}`);
                
                // componente
                const productData = response.data;
                
                setProduct({
                    id: productData.id,
                    name: productData.name,
                    price: productData.price,
                    description: productData.description,
                    images: productData.mainImage,
                    characteristics: {
                        marca: productData.brand,
                        modelo: productData.model,
                        condicion: productData.product_condition,
                        origen: productData.origin,
                        lanzamiento: productData.launchYear,
                        medidas: productData.size,
                        material: productData.material,
                        uso: productData.recommendedUse
                    },
                    category: productData.category
                });
                
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('No se pudo cargar el producto. Por favor, intenta nuevamente más tarde.');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!product) return <div className="not-found">Producto no encontrado</div>;

    return (
        <div className="product-page">
            <Header
                isAuthenticated={isAuthenticated} 
                userData={userData} 
                onLogout={onLogout} 
            />
            <div className="navigation-bar">
                <div className="home-icon">
                    <a href="/" className="home-link"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/></svg></a>
                </div>
                <h2 className="category-title">{product.category}</h2>
                <div className="back-icon">
                    <a href="/" className="back-link">←</a>
                </div>
            </div>
            
            <div className="product-detail-container">
                <h1 className="product-name">{product.name}</h1>
                
                <div className="product-detail-layout">
                    {/* DIV1.1 - Imágenes del producto */}
                    <div className="product-images-container">
                        <div className="main-image-container">
                            <img 
                                src={"https://res.cloudinary.com/dqc7cuyox/image/upload/fl_preserve_transparency/v1740765878/equipomejoras_aefxbm.jpg?_s=public-apps"} 
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
                                <img src={marcaIcon} alt="Marca" className="characteristic-icon" />
                                <span className="characteristic-label">Marca:</span>
                                <span className="characteristic-value">{product.characteristics.marca}</span>
                            </div>
                            <div className="characteristic-item">
                                <img src={modeloIcon} alt="Modelo" className="characteristic-icon" />
                                <span className="characteristic-label">Modelo:</span>
                                <span className="characteristic-value">{product.characteristics.modelo}</span>
                            </div>
                            <div className="characteristic-item">
                                <img src={condicionIcon} alt="Condición" className="characteristic-icon" />
                                <span className="characteristic-label">Condición:</span>
                                <span className="characteristic-value">{product.characteristics.condicion}</span>
                            </div>
                            <div className="characteristic-item">
                                <img src={origenIcon} alt="Origen" className="characteristic-icon" />
                                <span className="characteristic-label">Origen:</span>
                                <span className="characteristic-value">{product.characteristics.origen}</span>
                            </div>
                        </div>
                        <div className="characteristics-column">
                            <div className="characteristic-item">
                                <img src={lanzamientoIcon} alt="Año de lanzamiento" className="characteristic-icon" />
                                <span className="characteristic-label">Año de lanzamiento:</span>
                                <span className="characteristic-value">{product.characteristics.lanzamiento}</span>
                            </div>
                            <div className="characteristic-item">
                                <img src={medidasIcon} alt="Medidas" className="characteristic-icon" />
                                <span className="characteristic-label">Medidas:</span>
                                <span className="characteristic-value">{product.characteristics.medidas}</span>
                            </div>
                            <div className="characteristic-item">
                                <img src={materialIcon} alt="Material principal" className="characteristic-icon" />
                                <span className="characteristic-label">Material principal:</span>
                                <span className="characteristic-value">{product.characteristics.material}</span>
                            </div>
                            <div className="characteristic-item">
                                <img src={usoIcon} alt="Uso recomendado" className="characteristic-icon" />
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
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import './ProductDetail.css';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

//importando iconos
import marcaIcon from '../../assets/icons/marca-icon.png';
import modeloIcon from '../../assets/icons/modelo-icon.png';
import condicionIcon from '../../assets/icons/condicion-icon.png';
import origenIcon from '../../assets/icons/origen-icon.png';
import lanzamientoIcon from '../../assets/icons/lanzamiento-icon.png';
import medidasIcon from '../../assets/icons/medidas-icon.png';
import materialIcon from '../../assets/icons/material-icon.png';
import usoIcon from '../../assets/icons/uso-icon.png';
import calendarIcon from '../../assets/icons/calendar-icon.png';

const ProductDetail = ({ isAuthenticated, userData, onLogout }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [availabilityLoading, setAvailabilityLoading] = useState(true);
    const [availabilityError, setAvailabilityError] = useState(null);
    const [bookedDateRanges, setBookedDateRanges] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);
    const [reservationStatus, setReservationStatus] = useState({
        loading: false,
        error: null,
        success: false
    });
    const [showModal, setShowModal] = useState(false);

    const fetchAvailability = async () => {
        setAvailabilityLoading(true);
        setAvailabilityError(null);
        
        try {
            const response = await axios.get(`https://g3pibackend-production.up.railway.app/reservations/products/${id}`);
            const reservationData = response.data.data;
            
            setBookedDateRanges(reservationData.map(reservation => ({
                startDate: new Date(reservation.startDate),
                endDate: new Date(reservation.endDate)
            })));
            
            setAvailabilityLoading(false);
        } catch (err) {
            console.error('Error fetching availability:', err);
            setAvailabilityError('No se pudo cargar la disponibilidad. Por favor, intenta nuevamente más tarde.');
            setAvailabilityLoading(false);
        }
    };

    useEffect(() => {
        const fetchProductAndAvailability = async () => {
            try {
                setLoading(true);
                
                const productResponse = await axios.get(`https://g3pibackend-production.up.railway.app/products/${id}`);
                const productData = productResponse.data;
                
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
                await fetchAvailability();
                
            } catch (err) {
                console.error('Error fetching data:', err);
                if (!product) {
                    setError('No se pudo cargar el producto. Por favor, intenta nuevamente más tarde.');
                    setLoading(false);
                }
            }
        };

        fetchProductAndAvailability();
    }, [id]);

    const isDateBooked = (date) => {
        return bookedDateRanges.some(range => {
            const checkDate = new Date(date);
            checkDate.setHours(0, 0, 0, 0);
            
            const startDate = new Date(range.startDate);
            startDate.setHours(0, 0, 0, 0);
            
            const endDate = new Date(range.endDate);
            endDate.setHours(0, 0, 0, 0);
            
            return checkDate >= startDate && checkDate <= endDate;
        });
    };

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleReservationSubmit = async () => {
        if (!startDate || !endDate) {
            setReservationStatus({
                loading: false,
                error: "Por favor selecciona las fechas de inicio y fin",
                success: false
            });
            return;
        }

        if (!isAuthenticated) {
            setReservationStatus({
                loading: false,
                error: "Debes iniciar sesión para hacer una reserva",
                success: false
            });
            return;
        }

        setReservationStatus({
            loading: true,
            error: null,
            success: false
        });

        try {
            const isRangeBooked = bookedDateRanges.some(range => {
                const rangeStart = new Date(range.startDate);
                const rangeEnd = new Date(range.endDate);
                return (
                    (startDate >= rangeStart && startDate <= rangeEnd) ||
                    (endDate >= rangeStart && endDate <= rangeEnd) ||
                    (startDate <= rangeStart && endDate >= rangeEnd)
                );
            });

            if (isRangeBooked) {
                throw new Error("El rango de fechas seleccionado incluye fechas no disponibles");
            }

            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];

            const response = await axios.post('https://g3pibackend-production.up.railway.app/reservations', {
                productId: id,
                userId: userData.id,
                startDate: formattedStartDate,
                endDate: formattedEndDate
            });

            setReservationStatus({
                loading: false,
                error: null,
                success: true
            });

            await fetchAvailability();

        } catch (error) {
            setReservationStatus({
                loading: false,
                error: error.response?.data?.message || error.message,
                success: false
            });
        }
    };

    const openAvailabilityModal = () => {
        setShowModal(true);
    };

    const closeAvailabilityModal = () => {
        setShowModal(false);
    };

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
                    <a href="/" className="home-link">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                        </svg>
                    </a>
                </div>
                <h2 className="category-title">{product.category}</h2>
                <div className="back-icon">
                    <a href="/" className="back-link">←</a>
                </div>
            </div>
            
            <div className="product-detail-container">
                <h1 className="product-name">{product.name}</h1>
                
                <div className="product-detail-layout">
                    <div className="product-images-container">
                        <div className="main-image-container">
                            <img 
                                src={product.images} 
                                alt={product.name}
                                className="main-image"
                            />
                        </div>
                    </div>
                    
                    <div className="product-description">
                        <p>{product.description}</p>
                    </div>
                    
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

                            <div className="add-to-cart-container">
                                <button className="add-to-cart-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#FFFFFF">
                                        <path d="M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 51Q359-123 337.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51-21Q717-225 738-203.79t21 51Q759-123 737.79-102t-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="availability-button-container">
                    <button className="check-availability-button" onClick={openAvailabilityModal}>
                        <img src={calendarIcon} alt="Calendario" className="calendar-icon" />
                        Ver disponibilidad
                    </button>
                </div>

                {showModal && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="characteristics-title">Disponibilidad</h2>
                                <button className="close-modal-button" onClick={closeAvailabilityModal}>×</button>
                            </div>
                            <div className="modal-body">
                                {availabilityLoading ? (
                                    <div className="availability-loading">Cargando disponibilidad...</div>
                                ) : availabilityError ? (
                                    <div className="availability-error">
                                        <p>{availabilityError}</p>
                                        <button className="retry-button" onClick={fetchAvailability}>
                                            Intentar nuevamente
                                        </button>
                                    </div>
                                ) : (
                                    <div className="calendar-container">
                                        <div className="calendar-header">
                                            <img src={calendarIcon} alt="Calendario" className="calendar-icon" />
                                            <span className="calendar-label">Selecciona fechas para tu reserva:</span>
                                        </div>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={handleDateChange}
                                            startDate={startDate}
                                            endDate={endDate}
                                            monthsShown={2}
                                            selectsRange
                                            inline
                                            minDate={new Date()}
                                            dayClassName={date => 
                                                isDateBooked(date) ? "booked-date" : undefined
                                            }
                                        />

                                        <div className="reservation-controls mt-4">
                                            <button 
                                                onClick={handleReservationSubmit}
                                                disabled={reservationStatus.loading || !startDate || !endDate}
                                                className={`w-full py-2 px-4 rounded-md font-medium text-white 
                                                    ${(!startDate || !endDate) ? 
                                                        'bg-gray-400 cursor-not-allowed' : 
                                                        'bg-blue-600 hover:bg-blue-700 transition-colors'}`}
                                            >
                                                {reservationStatus.loading ? 'Procesando...' : 'ACEPTAR'}
                                            </button>

                                            {reservationStatus.error && (
                                                <div className="mt-2 text-red-600 text-sm">
                                                    {reservationStatus.error}
                                                </div>
                                            )}

                                            {reservationStatus.success && (
                                                <div className="mt-2 text-green-600 text-sm">
                                                    ¡Reserva confirmada exitosamente!
                                                </div>
                                            )}
                                        </div>

                                        <div className="calendar-legend">
                                            <div className="legend-item">
                                                <div className="legend-color available"></div>
                                                Disponible
                                            </div>
                                            <div className="legend-item">
                                                <div className="legend-color booked"></div>
                                                No disponible
                                            </div>
                                            <div className="legend-item">
                                                <div className="legend-color selected"></div>
                                                Seleccionado
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
                
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
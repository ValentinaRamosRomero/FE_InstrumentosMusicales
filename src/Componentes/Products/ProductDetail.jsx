import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ProductDetail.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//importando iconos
import marcaIcon from "../../assets/icons/marca-icon.png";
import modeloIcon from "../../assets/icons/modelo-icon.png";
import condicionIcon from "../../assets/icons/condicion-icon.png";
import origenIcon from "../../assets/icons/origen-icon.png";
import lanzamientoIcon from "../../assets/icons/lanzamiento-icon.png";
import medidasIcon from "../../assets/icons/medidas-icon.png";
import materialIcon from "../../assets/icons/material-icon.png";
import usoIcon from "../../assets/icons/uso-icon.png";
import calendarIcon from "../../assets/icons/calendar-icon.png";

const ProductDetail = ({ isAuthenticated, userData, onLogout, onReserve }) => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [availabilityError, setAvailabilityError] = useState(null);
  const [bookedDateRanges, setBookedDateRanges] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // Recuperar fechas guardadas del localStorage al cargar el componente
  // pero solo si son para este producto específico
  useEffect(() => {
    const savedProductId = localStorage.getItem("selectedProductId");
    
    // Solo cargar las fechas si corresponden al producto actual
    if (savedProductId === id) {
      const savedStartDate = localStorage.getItem("fechaInicio");
      const savedEndDate = localStorage.getItem("fechaFin");
      
      if (savedStartDate) {
        setStartDate(new Date(savedStartDate));
      }
      if (savedEndDate) {
        setEndDate(new Date(savedEndDate));
      }
    } else {
      // Si es un producto diferente, limpiar las fechas seleccionadas
      setStartDate(null);
      setEndDate(null);
    }
  }, [id]);

  const fetchAvailability = async () => {
    setAvailabilityLoading(true);
    setAvailabilityError(null);

    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + `/reservations/products/${id}`
      );
      const reservationData = response.data.data;

      setBookedDateRanges(
        reservationData.map((reservation) => ({
          startDate: new Date(reservation.startDate),
          endDate: new Date(reservation.endDate),
        }))
      );

      setAvailabilityLoading(false);
    } catch (err) {
      console.error("Error fetching availability:", err);
      setAvailabilityError(
        "No se pudo cargar la disponibilidad. Por favor, intenta nuevamente más tarde."
      );
      setAvailabilityLoading(false);
    }
  };

  useEffect(() => {
    const fetchProductAndAvailability = async () => {
      try {
        setLoading(true);

        const productResponse = await axios.get(
          import.meta.env.VITE_API_URL + `/products/${id}`
        );
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
            uso: productData.recommendedUse,
          },
          category: productData.category,
        });

        setLoading(false);
        await fetchAvailability();
      } catch (err) {
        console.error("Error fetching data:", err);
        if (!product) {
          setError(
            "No se pudo cargar el producto. Por favor, intenta nuevamente más tarde."
          );
          setLoading(false);
        }
      }
    };

    fetchProductAndAvailability();
  }, [id]);

  const isDateBooked = (date) => {
    return bookedDateRanges.some((range) => {
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);

      const startDate = new Date(range.startDate);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(range.endDate);
      endDate.setHours(0, 0, 0, 0);

      return checkDate >= startDate && checkDate <= endDate;
    });
  };

  {/*const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // Guardar fechas en localStorage
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = `${date.getMonth() + 1}`.padStart(2, "0");
      const day = `${date.getDate()}`.padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    // Guardar también el ID del producto para asociar las fechas con este producto específico
    localStorage.setItem("selectedProductId", id);
    
    if (start) {
      localStorage.setItem("fechaInicio", formatDate(start));
    } else {
      localStorage.removeItem("fechaInicio");
    }
    
    if (end) {
      localStorage.setItem("fechaFin", formatDate(end));
    } else {
      localStorage.removeItem("fechaFin");
    }
  };*/}

  // Función para convertir una fecha a formato YYYY-MM-DD sin desfase
const formatDateLocal = (date) => {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Función para parsear una fecha en formato YYYY-MM-DD y convertirla a Date sin desfase
const parseLocalDate = (str) => {
  const [year, month, day] = str.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

// Cargar fechas del localStorage al montar el componente
useEffect(() => {
  const savedProductId = localStorage.getItem("selectedProductId");

  if (savedProductId === id) {
    const savedStartDate = localStorage.getItem("fechaInicio");
    const savedEndDate = localStorage.getItem("fechaFin");

    if (savedStartDate) {
      setStartDate(parseLocalDate(savedStartDate));
    }
    if (savedEndDate) {
      setEndDate(parseLocalDate(savedEndDate));
    }
  } else {
    setStartDate(null);
    setEndDate(null);
  }
}, [id]);

// Guardar fechas seleccionadas en localStorage sin desfase
const handleDateChange = (dates) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);

  localStorage.setItem("selectedProductId", id);

  if (start) {
    localStorage.setItem("fechaInicio", formatDateLocal(start));
  } else {
    localStorage.removeItem("fechaInicio");
  }

  if (end) {
    localStorage.setItem("fechaFin", formatDateLocal(end));
  } else {
    localStorage.removeItem("fechaFin");
  }
};

  

  const openAvailabilityModal = () => {
    setShowModal(true);
  };

  const closeAvailabilityModal = () => {
    setShowModal(false);
  };

  const handleReserveClick = () => {
    if (!isAuthenticated) {
      // Guardar la ruta actual exacta (con ID del producto) para redireccionar después del login
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      
      // Guardar el ID del producto actual para poder recuperar las fechas específicas al volver
      localStorage.setItem("selectedProductId", id);
      
      navigate("/login");
      return;
    }
    onReserve(product);
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
            </svg>
          </a>
        </div>
        <h2 className="category-title">{product.category}</h2>
        <div className="back-icon">
          <a href="/" className="back-link">
            ←
          </a>
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
              {/*<select className="quantity-select" defaultValue="1">
                {[...Array(4)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <button className="add-to-cart-button desktop-button">
                Agregar al carrito
              </button>*/}

              <div className="add-to-cart-container">
                <button className="add-to-cart-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="48px"
                    viewBox="0 -960 960 960"
                    width="48px"
                    fill="#FFFFFF"
                  >
                    <path d="M286.79-81Q257-81 236-102.21t-21-51Q215-183 236.21-204t51-21Q317-225 338-203.79t21 51Q759-123 737.79-102t-51 21Zm400 0Q657-81 636-102.21t-21-51Q615-183 636.21-204t51-21Q717-225 738-203.79t21 51ZM235-741l110 228h288l125-228H235Zm-30-60h589.07q22.97 0 34.95 21 11.98 21-.02 42L694-495q-11 19-28.56 30.5T627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="availability-button-container">
          <button
            className="check-availability-button"
            onClick={openAvailabilityModal}
          >
            <img
              src={calendarIcon}
              alt="Calendario"
              className="calendar-icon"
            />
            Ver disponibilidad
          </button>
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="characteristics-title">Disponibilidad</h2>
                <button
                  className="close-modal-button"
                  onClick={closeAvailabilityModal}
                >
                  ×
                </button>
              </div>
              <div className="modal-body">
                {availabilityLoading ? (
                  <div className="availability-loading">
                    Cargando disponibilidad...
                  </div>
                ) : availabilityError ? (
                  <div className="availability-error">
                    <p>{availabilityError}</p>
                    <button
                      className="retry-button"
                      onClick={fetchAvailability}
                    >
                      Intentar nuevamente
                    </button>
                  </div>
                ) : (
                  <div className="calendar-container">
                    <div className="calendar-header">
                      <img
                        src={calendarIcon}
                        alt="Calendario"
                        className="calendar-icon"
                      />
                      <span className="calendar-label">
                        Selecciona fechas para tu reserva:
                      </span>
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
                      dayClassName={(date) =>
                        isDateBooked(date) ? "booked-date" : undefined
                      }
                    />

                    <div className="reservation-controls mt-4">
                      <button onClick={handleReserveClick} disabled={!product} className= 'reservation-button'>
                        Reservar
                      </button>
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
                <img
                  src={marcaIcon}
                  alt="Marca"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">Marca:</span>
                <span className="characteristic-value">
                  {product.characteristics.marca}
                </span>
              </div>
              <div className="characteristic-item">
                <img
                  src={modeloIcon}
                  alt="Modelo"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">Modelo:</span>
                <span className="characteristic-value">
                  {product.characteristics.modelo}
                </span>
              </div>
              <div className="characteristic-item">
                <img
                  src={condicionIcon}
                  alt="Condición"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">Condición:</span>
                <span className="characteristic-value">
                  {product.characteristics.condicion}
                </span>
              </div>
              <div className="characteristic-item">
                <img
                  src={origenIcon}
                  alt="Origen"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">Origen:</span>
                <span className="characteristic-value">
                  {product.characteristics.origen}
                </span>
              </div>
            </div>
            <div className="characteristics-column">
              <div className="characteristic-item">
                <img
                  src={lanzamientoIcon}
                  alt="Año de lanzamiento"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">
                  Año de lanzamiento:
                </span>
                <span className="characteristic-value">
                  {product.characteristics.lanzamiento}
                </span>
              </div>
              <div className="characteristic-item">
                <img
                  src={medidasIcon}
                  alt="Medidas"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">Medidas:</span>
                <span className="characteristic-value">
                  {product.characteristics.medidas}
                </span>
              </div>
              <div className="characteristic-item">
                <img
                  src={materialIcon}
                  alt="Material principal"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">
                  Material principal:
                </span>
                <span className="characteristic-value">
                  {product.characteristics.material}
                </span>
              </div>
              <div className="characteristic-item">
                <img
                  src={usoIcon}
                  alt="Uso recomendado"
                  className="characteristic-icon"
                />
                <span className="characteristic-label">Uso recomendado:</span>
                <span className="characteristic-value">
                  {product.characteristics.uso}
                </span>
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
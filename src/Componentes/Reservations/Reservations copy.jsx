import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import "./Reservations.css";
import { useParams } from "react-router-dom";

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

const Reservations = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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

  return (
    <>
      <Header />
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
              <span className="characteristic-label">Año de lanzamiento:</span>
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
              <span className="characteristic-label">Material principal:</span>
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
    </>
  );
};

export default Reservations;

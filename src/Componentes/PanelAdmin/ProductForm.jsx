import React, { useState } from "react";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import "./ProductForm.css";

const ProductForm = ({ onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    category: "",
    description: "",
    brand: "",
    model: "",
    product_condition: "",
    origin: "",
    launchYear: "",
    material: "",
    height: "",
    width: "",
    depth: "",
    recommendedUse: "",
  });

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data for API
      const productData = {
        ...formData,
        pricePerHour: parseFloat(formData.price),
      };

      // Call the API to save the product
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/products/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        const savedProduct = await response.json();
        setSuccess(true);

        // Wait 2 seconds before returning to product list
        setTimeout(() => {
          onSave(savedProduct);
        }, 2000);
      } else {
        console.error("Error saving product");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="content-section">
      <div className="products-header">
        <h2>Registrar nuevo producto</h2>
        <button className="back-button" onClick={onCancel}>
          <FaArrowLeft />
        </button>
      </div>

      {success ? (
        <div className="success-message">
          <div className="success-icon">✓</div>
          <div className="success-text">
            El producto ha sido guardado con éxito
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-container">
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Imagen</label>
              <div className="file-input-container">
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Selecciona una imagen..."
                  readOnly
                />
                <button type="button" className="file-button">
                  📂
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="price">Precio</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Categoría</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                <option value="Guitarra">Guitarra</option>
                <option value="Batería">Batería</option>
                <option value="Piano">Piano</option>
                <option value="Bajo">Bajo</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              />
            </div>

            <h3 className="form-section-title">Características</h3>

            <div className="form-group">
              <label htmlFor="brand">Marca</label>
              <input
                type="text"
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="model">Modelo</label>
              <input
                type="text"
                id="model"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="product_condition">Condición</label>
              <input
                type="text"
                id="product_condition"
                name="product_condition"
                value={formData.product_condition}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="origin">País de Origen</label>
              <input
                type="text"
                id="origin"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="launchYear">Año de lanzamiento</label>
              <input
                type="text"
                id="launchYear"
                name="launchYear"
                value={formData.launchYear}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="material">Material Principal</label>
              <input
                type="text"
                id="material"
                name="material"
                value={formData.material}
                onChange={handleChange}
              />
            </div>

            <h3 className="form-section-title">Medidas (cm)</h3>
            <div className="dimensions-container">
              <div className="form-group">
                <label htmlFor="height">Alto</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="width">Ancho</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="depth">Profundidad</label>
                <input
                  type="number"
                  id="depth"
                  name="depth"
                  value={formData.depth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="recommendedUse">Uso recomendado</label>
              <select
                id="recommendedUse"
                name="recommendedUse"
                value={formData.recommendedUse}
                onChange={handleChange}
              >
                <option value="">Seleccione un uso</option>
                <option value="Principiante">Principiante</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Profesional">Profesional</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                <FaSave /> Guardar producto
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;

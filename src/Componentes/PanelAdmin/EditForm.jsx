import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./EditForm.css";

const ProductEditForm = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    price: "",
    categoryId: "",
    description: "",
    brandId: "",
    model: "",
    productCondition: "",
    origin: "",
    lauchYear: "",
    material: "",
    size: "",
    recommendedUse: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);

  useEffect(() => {
    if (product) {
      if (product) {
        setFormData({
          name: product.name || "",
          imageUrl: product.imageUrl || "",
          price: product.price || "",
          categoryId: product.categoryId || "",
          description: product.description || "",
          brandId: product.brandId || "",
          model: product.model || "",
          productCondition: product.productCondition || "",
          origin: product.origin || "",
          lauchYear: product.lauchYear || "",
          material: product.material || "",
          height: product.height || "",
          width: product.width || "",
          depth: product.depth || "",
          recommendedUse: product.recommendedUse || "",
        });
      }
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    //Clear errors when user types
    setError(null);
    setNameError(false);
    setFieldsError(false);
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "price",
      "categoryId",
      "description",
    ];
    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      setFieldsError(true);
      return false;
    }
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/update/${product.id}`,
        formData
      );
      setSuccess(true);

      // Notify parent component of the update
      if (onUpdate) {
        onUpdate(response.data.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError(
        error.response?.data?.message || "Error al actualizar el producto"
      );

      if (error.response?.data?.message?.includes("nombre en uso")) {
        setNameError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-edit-overlay">
      <div className="product-edit-container">
        <div className="edit-header">
          <h2>Editar producto</h2>
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="editform-content">
            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={nameError ? "input-error" : ""}
                />
              </div>
              <div className="form-group">
                <label>Imagen</label>
                <div className="image-input-container">
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                  <button type="button" className="browse-button">
                    B
                  </button>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                ></textarea>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Categoría</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar categoría</option>
                  <option value="Guitarras">Guitarras</option>
                  <option value="Bajos">Bajos</option>
                  <option value="Teclados">Teclados</option>
                  <option value="Baterías">Baterías</option>
                </select>
              </div>
            </div>

            <h3>Características</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Marca</label>
                <input
                  type="text"
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Modelo</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Condición</label>
                <input
                  type="text"
                  name="productCondition"
                  value={formData.productCondition}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>País de Origen</label>
                <input
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Año de lanzamiento</label>
                <input
                  type="text"
                  name="lauchYear"
                  value={formData.lauchYear}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Material Principal</label>
                <input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h3>Medidas (cm)</h3>

            <div className="form-row dimensions">
              <div className="form-group dimension">
                <label>Alto</label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group dimension">
                <label>Ancho</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group dimension">
                <label>Profundidad</label>
                <input
                  type="number"
                  name="depth"
                  value={formData.depth}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Uso recomendado</label>
                <select
                  name="recommendedUse"
                  value={formData.recommendedUse}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar uso</option>
                  <option value="Profesional">Profesional</option>
                  <option value="Principiante">Principiante</option>
                  <option value="Intermedio">Intermedio</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button type="submit" className="update-button" disabled={loading}>
              {loading ? "Actualizando..." : "Actualizar producto"}
            </button>
          </div>
        </form>

        {success && (
          <div className="success-message">
            <FaCheck /> El producto ha sido actualizado con éxito
          </div>
        )}

        {nameError && (
          <div className="error-message">
            <FaTimes /> No se ha podido actualizar
            <div>El nombre del producto ya está en uso</div>
          </div>
        )}

        {fieldsError && (
          <div className="error-message">
            <FaTimes /> No se ha podido actualizar
            <div>Por favor, rellene todos los campos</div>
          </div>
        )}

        {error && !nameError && !fieldsError && (
          <div className="error-message">
            <FaTimes /> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductEditForm;

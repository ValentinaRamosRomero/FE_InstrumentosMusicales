import React, { useEffect, useRef, useState } from "react";
import { FaArrowLeft, FaFolder, FaSave } from "react-icons/fa";
import "./ProductForm.css";
import axios from "axios";
import UploadImage from "./UploadImage";

const ProductForm = ({ onSave, onCancel }) => {
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
    launchYear: "",
    material: "",
    height: "",
    width: "",
    depth: "",
    recommendedUse: "",
  });

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    // Obtener categorías y marcas desde los endpoints
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/categories"),
          axios.get(import.meta.env.VITE_API_URL + "/brands"),
        ]);
        console.log("Categorías recibidas:", categoriesRes.data);
        console.log("Marcas recibidas:", brandsRes.data);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
      } catch (error) {
        console.error("Error fetching categories and brands", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      size: `${formData.width}x${formData.height}x${formData.depth}`,
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/products/save",
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      onSave(response.data);
    } catch (error) {
      console.error("Error saving product", error);
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

            <UploadImage formData={formData} 
            setFormData={setFormData} 
            defaultImageUrl={null}
            isNewProduct ={true}
            />

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
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categories?.length > 0 &&
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
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
              <select
                name="brandId"
                value={formData.brandId}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione una marca</option>
                {brands?.length > 0 && brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
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
                  required
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
                  required
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
                  required
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
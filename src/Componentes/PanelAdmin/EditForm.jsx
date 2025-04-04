import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./EditForm.css";
import UploadImage from "./UploadImage";

const ProductEditForm = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    id: "",
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [fieldsError, setFieldsError] = useState(false);

  useEffect(() => {
    // Fetch categories and brands
    const fetchData = async () => {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + "/categories"),
          axios.get(import.meta.env.VITE_API_URL + "/brands"),
        ]);
        setCategories(categoriesRes.data.data);
        setBrands(brandsRes.data.data);
      } catch (error) {
        console.error("Error fetching categories and brands", error);
      }
    };
    fetchData();
  }, []);

  //Funciones para mapear categorias, marcas a su id correspondiente
  const getCategoryId = (categoryName) => {
    const category = categories.find((cat) => cat.name === categoryName);
    return category ? category.id : "";
  };
  const getBrandId = (brandName) => {
    const brand = brands.find((b) => b.name === brandName);
    return brand ? brand.id : "";
  };

  useEffect(() => {
    if (product && product.id) {
      // Separacion del campo size en alto, ancho y profundidad
      const sizeArray = product.size ? product.size.split("x") : [];

      setFormData({
        id: product.id || "", // Add product ID for update
        name: product.name || "",
        imageUrl: product.mainImage || "",
        price: product.price || "",
        categoryId: getCategoryId(product.category) || "",
        description: product.description || "",
        brandId: getBrandId(product.brand) || "",
        model: product.model || "",
        productCondition: product.product_condition || "",
        origin: product.origin || "",
        launchYear: product.launchYear || "",
        material: product.material || "",
        height: sizeArray[0] || "",
        width: sizeArray[1] || "",
        depth: sizeArray[2] || "",
        recommendedUse: product.recommendedUse || "",
      });
    }
  }, [product, categories, brands]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors when user types
    setError(null);
    setNameError(false);
    setFieldsError(false);
  };

  const validateForm = () => {
    const requiredFields = ["name", "price", "categoryId", "description"];
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

    // Ensure product ID is included
    if (!formData.id) {
      console.error("No product ID found");
      setError("No se puede actualizar: ID de producto no encontrado");
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(false);

    //seteo del campo size a formato "0x0x0"
    const size = `${formData.height}x${formData.width}x${formData.depth}`;
    const productData = {
      ...formData,
      price: parseFloat(formData.price).toFixed(1),
      size,
      imageUrl: formData.imageUrl || product.mainImage,
    };

    //eliminacion del body los campos height, deep, width
    delete productData.height;
    delete productData.width;
    delete productData.depth;

    // Remove undefined or null values
    Object.keys(productData).forEach((key) =>
      productData[key] === undefined || productData[key] === null
        ? delete productData[key]
        : {}
    );

    try {
      console.log("Sending product data:", productData); // Log the data being sent

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/products/update`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.mensaje) {
        console.log("Product update success:", response.data.mensaje);
        setSuccess(true);
      } else {
        console.log("Unexpected server response:", response.data);
        setError("Unexpected response format");
      }

      // Notify parent component of the update
      if (onUpdate) {
        onUpdate(response.data);
      }
    } catch (error) {
      console.error("Full error response:", error.response); // Log full error response

      if (error.response) {
        setError(
          error.response.data?.message ||
            error.response.data?.error ||
            "Error al actualizar el producto"
        );
      } else if (error.request) {
        setError("No se recibió respuesta del servidor");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error al configurar la solicitud");
        console.error("Request setup error:", error.message);
      }

      if (error.response?.data?.message?.includes("nombre en uso")) {
        setNameError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!product || !product.id) {
    return <p>Cargando datos del producto...</p>; // 🔹 Evita renderizar el formulario sin datos
  }

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

              <UploadImage
                formData={formData}
                setFormData={setFormData}
                defaultImageUrl={product.mainImage}
                isNewProduct={false}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Precio</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
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
                  required
                >
                  <option value="">Seleccionar categoría</option>
                  {categories?.length > 0 &&
                    categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <h3>Características</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Marca</label>
                <select
                  name="brandId"
                  value={formData.brandId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione una marca</option>
                  {brands?.length > 0 &&
                    brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                </select>
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
                  name="launchYear"
                  value={formData.launchYear}
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
                  required
                />
              </div>
              <div className="form-group dimension">
                <label>Ancho</label>
                <input
                  type="number"
                  name="width"
                  value={formData.width}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group dimension">
                <label>Profundidad</label>
                <input
                  type="number"
                  name="depth"
                  value={formData.depth}
                  onChange={handleChange}
                  required
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

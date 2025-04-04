import React, { useEffect, useState } from "react";
import "./PanelAdmin.css";
import Header from "../Header/Header";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import ProductForm from "./ProductForm";
import axios from "axios";
import ProductEditForm from "./EditForm";
import { useNavigate } from "react-router-dom";
import ErrorReserva from "../../assets/ReservaError.png";
import UserSection from "./UserSection";

const PanelAdmin = ({ isAuthenticated, userData, onLogout }) => {
  const [activeSection, setActiveSection] = useState("usuarios");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showProductEditForm, setShowProductEditForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const navigate = useNavigate();

  //Fecth Productos from API
  useEffect(() => {
    if (activeSection === "productos") {
      fetchProducts();
    }
  }, [activeSection]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/products/find-all`,
        {}
      );
      if (response.data && response.data.data) {
        setProducts(response.data.data);
      } else {
        console.error(
          "La respuesta de la API no tiene el formato esperado:",
          response.data
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProduct = (newProduct) => {
    // Update products array with the newly created product
    //setProducts([...products, newProduct]);
    fetchProducts();
    setShowProductForm(false);
  };

  const handleViewProduct = async (productId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${productId}`
      );
      if (response.data) {
        setSelectedProduct(response.data); // Guardar datos completos en el estado
        setShowProductEditForm(true); // Abrir el formulario después de obtener los datos
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = (updatedProduct) => {
    // Update the products array with the updated product
    setProducts(
      products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  //manejador del boton de cerrado, para q se actualice la lista
  const handleCloseEditForm = () => {
    fetchProducts();
    setShowProductEditForm(false);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/delete/${productToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      console.log("Producto eliminado con éxito")
    } catch (error) {
      console.error("Error deleting product:", error);
    }

    // Close confirmation dialog
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  const renderSidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-title">Admin Panel</div>
        </div>

        <div
          className={`sidebar-item ${
            activeSection === "usuarios" ? "active" : ""
          }`}
          onClick={() => setActiveSection("usuarios")}
        >
          <span className="sidebar-icon">
            <i className="fas fa-users"></i>
          </span>
          <span>Usuarios</span>
          {activeSection === "usuarios" && <span className="arrow">►</span>}
        </div>

        <div
          className={`sidebar-item ${
            activeSection === "productos" ? "active" : ""
          }`}
          onClick={() => setActiveSection("productos")}
        >
          <span className="sidebar-icon">
            <i className="fas fa-guitar"></i>
          </span>
          <span>Lista Productos</span>
          {activeSection === "productos" && <span className="arrow">►</span>}
        </div>
      </div>
    );
  };
  const renderDeleteConfirmation = () => {
    if (!showDeleteConfirmation) return null;

    return (
      <div className="confirmation-box">
        <div className="confirmation-icon">!</div>
        <div className="confirmation-message">
          ¿Desea eliminar por completo el artículo "{productToDelete?.name}"?
        </div>
        <button className="confirm-button" onClick={confirmDelete}>
          Confirmar
        </button>
        <button className="cancel-button" onClick={cancelDelete}>
          Cancelar
        </button>
      </div>
    );
  };

  const renderProductosSection = () => {
    if (showProductForm) {
      return (
        <ProductForm
          onSave={handleSaveProduct}
          onCancel={() => setShowProductForm(false)}
        />
      );
    }

    return (
      <div className="content-section">
        <div className="products-header">
          <h2>Listado de Productos</h2>
          <button
            className="new-product-button"
            onClick={() => setShowProductForm(true)}
          >
            <span className="plus-icon">+</span>Agregar Producto
          </button>
        </div>

        {showDeleteConfirmation && renderDeleteConfirmation()}

        {showProductEditForm && (
          <ProductEditForm
            product={selectedProduct}
            onClose={() => {
              handleCloseEditForm();
              setShowProductEditForm(false);
              setSelectedProduct(null);
            }}
            onUpdate={handleUpdateProduct}
          />
        )}

        <table className="products-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Ver Detalle</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>Cargando productos...</td>
              </tr>
            ) : products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    <img src={product.imageUrl} alt={product.name} width="50" />
                  </td>

                  <td>{product.name}</td>
                  <td>{product.pricePerHour}</td>
                  <td>{product.categoryName}</td>
                  <td>
                    <button
                      className="action-button view"
                      onClick={() => navigate(`/product-details/${product.id}`)}
                    >
                      <FaEye />
                    </button>
                  </td>
                  <td className="actions-cell">
                    <button
                      className="action-button edit "
                      onClick={() => handleViewProduct(product.id)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                  <td>
                    <button
                      className="action-button delete"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>No hay productos disponibles</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case "usuarios":
        return <UserSection />;
      case "productos":
        return renderProductosSection();
      default:
        return <UserSection />;
    }
  };

  return (
    <>
      {/* Notificación en Móviles*/}
      <div className="mobile-error-panel">
        <div className="mobile-error-icon-container">
          <img
            src={ErrorReserva}
            alt="Error Icon"
            className="mobile-error-icon"
          />
        </div>
        <h2 className="mobile-error-title">Ha ocurrido un error</h2>
        <p className="mobile-error-message">
          El panel del administrador solo está disponible para la versión
          desktop.
        </p>
      </div>
      <div className="panel-admin-container">
        <Header
          isAuthenticated={isAuthenticated}
          userData={userData}
          onLogout={onLogout}
        />
        <div className="main-content">
          {renderSidebar()}
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default PanelAdmin;
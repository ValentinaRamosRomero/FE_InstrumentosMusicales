import React, { useEffect, useState } from "react";
import "./PanelAdmin.css";
import Header from "../Header/Header";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import UsersSection from "./UsersSection";
import ProductForm from "./ProductForm";
const PanelAdmin = ({ isAuthenticated, userData, onLogin }) => {
  const [activeSection, setActiveSection] = useState("usuarios");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  //Fecth Productos from API
  useEffect(() => {
    if (activeSection === "productos") {
      fetchProducts();
    }
  }, [activeSection]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/products/find-all"
      );
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error(
          "Error fetching products: Server responded with",
          response.status
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
    setProducts([...products, newProduct]);
    setShowProductForm(false);
  };

  const handleDeleteProduct = (product) => {
    setProductToDelete(product);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/products/delete/${productToDelete.id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // Remove the product from the state
        setProducts(
          products.filter((product) => product.id !== productToDelete.id)
        );
      } else {
        console.error("Error deleting product");
      }
    } catch (error) {
      console.error("Error:", error);
    }

    // Close confirmation dialog
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setProductToDelete(null);
  };

  // Mock data for demonstration
  const mockProducts = [
    {
      id: 1,
      imageUrl: "🎸",
      name: "Guitar Les Paul Studio",
      pricePerHour: 399.0,
      category: "Guitarra",
      description: "Lorem ipsum bla bla blabla..",
    },
    {
      id: 2,
      imageUrl: "🎸",
      name: "Guitar Les Paul Studio",
      pricePerHour: 399.0,
      category: "Guitarra",
      description: "Lorem ipsum bla bla blabla..",
    },
    {
      id: 3,
      imageUrl: "🎸",
      name: "Guitar Les Paul Studio",
      pricePerHour: 399.0,
      category: "Guitarra",
      description: "Lorem ipsum bla bla blabla..",
    },
  ];

  const renderSidebar = () => {
    return (
      <div className="sidebar">
        <div
          className={`sidebar-item ${
            activeSection === "usuarios" ? "active" : ""
          }`}
          onClick={() => setActiveSection("usuarios")}
        >
          <span className="arrow">►</span>Usuarios
        </div>

        <div
          className={`sidebar-item ${
            activeSection === "productos" ? "active" : ""
          }`}
          onClick={() => setActiveSection("productos")}
        >
          <span className="arrow">►</span>Productos
        </div>
        <div
          className={`sidebar-item ${
            activeSection === "crear-categoria" ? "active" : ""
          }`}
          onClick={() => setActiveSection("crear-categoria")}
        >
          Crear categoría
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
            <span className="plus-icon">+</span>Nuevo Producto
          </button>
        </div>

        {showDeleteConfirmation && renderDeleteConfirmation()}

        <table className="products-table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6}>Cargando productos...</td>
              </tr>
            ) : products.length > 0 ? (
              mockProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.imageUrl || "🎸"}</td>
                  <td>{product.name}</td>
                  <td>{product.pricePerHour}</td>
                  <td>{product.category}</td>
                  <td>{product.description}</td>
                  <td className="actions-cell">
                    <button className="action-button view">
                      <FaEye />
                    </button>
                    <button className="action-button edit">
                      <FaEdit />
                    </button>
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
        return <UsersSection />;
      case "productos":
        return renderProductosSection();
      default:
        return <UsersSection />;
    }
  };

  return (
    <div className="panel-admin-container">
      <Header
        isAuthenticated={isAuthenticated}
        userData={userData}
        onLogout={() => {}}
      />
      <div className="main-content">
        {renderSidebar()}
        {renderContent()}
      </div>
    </div>
  );
};

export default PanelAdmin;

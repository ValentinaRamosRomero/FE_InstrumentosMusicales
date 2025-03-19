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

const renderProductosSection = () => {
  const displayProducts = products.length > 0 ? products : mockProducts;

  return (
    <div className="content-section">
      <div className="products-header">
        <h2>Listado de Productos</h2>
        <button className="new-product-button">
          <span className="plus-icon">+</span>Nuevo Producto
        </button>
      </div>

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
          ) : (
            displayProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.imageUrl}</td>
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
                  <button className="action-button delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const renderProductosSection = () => {
  const displayProducts = products.length > 0 ? products : mockProducts;
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
            products.map((product) => (
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

import axios from "axios";
import React, { useRef, useState } from "react";
import { set } from "react-hook-form";
import { FaFolder } from "react-icons/fa";

const uploadImage = ({ formData, setFormData, defaultImageUrl, isNewProduct }) => {
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

  //AAAAAAAAAAAAAAAAAAAAAA

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Muestra el nombre del archivo seleccionado temporalmente
    setFormData({
      ...formData,
      imageUrl: file.name,
    });

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append("image", file);

    try {
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/api/upload/image",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: formDataObj,
        }
      );

      if (!response.ok) {
        //const errorText = await response.text(); // Captura el mensaje de error si existe
        setFileName("Error uploading image");
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.url) {
        setFileName(file.name);
        setFormData({ ...formData, imageUrl: data.url });
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setUploading(false);
    }
  };

   // Si no hay una nueva imagen cargada, usamos la imagen por defecto (defaultImageUrl)
  const imageUrlToUse = formData.imageUrl || defaultImageUrl;

  return (
    <div className="form-group">
      <label htmlFor="imageUrl">Imagen</label>
      <div className="file-input-container">
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={fileName || imageUrlToUse}
          placeholder="Selecciona una imagen..."
          readOnly
        />
        <button
          type="button"
          className="file-button"
          onClick={handleFileButtonClick}
          disabled={uploading}
        >
          {uploading ? "⏳" : <FaFolder size={14} />}
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      {/* 👇 Validación: Si estamos creando el producto, la imagen es obligatoria */}
      {isNewProduct && !formData.imageUrl && (
        <div className="error-message">La imagen es obligatoria</div>
      )}
    </div>
  );
};

export default uploadImage;

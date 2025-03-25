import axios from "axios";
import React, { useRef, useState } from "react";
import { FaFolder } from "react-icons/fa";

const uploadImage = ({ formData, setFormData }) => {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileButtonClick = () => {
    fileInputRef.current.click();
  };

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
        const errorText = await response.text(); // Captura el mensaje de error si existe
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const data = await response.json();

      if (data.imageUrl) {
        setFormData({ ...formData, imageUrl: data.imageUrl });
      }
    } catch (error) {
      console.error("Error uploading image", error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="form-group">
      <label htmlFor="imageUrl">Imagen</label>
      <div className="file-input-container">
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
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
    </div>
  );
};

export default uploadImage;

/**
 * try {
    const response = await axios.post(
      import.meta.env.VITE_API_URL + "/api/upload/image",
      formDataObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.imageUrl) {
      setFormData({ ...formData, imageUrl: response.data.imageUrl });
    }
  } catch (error) {
    console.error("Error uploading image", error);
  } finally {
    setUploading(false);
  }
 */

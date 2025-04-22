import React, { useState, useEffect } from "react";
import { getProductById, updateProduct } from "../services/api";

function ProductEdit({ token, productId, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId, token);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price.toString());
        setLoading(false);
      } catch (err) {
        setError("Failed to load product data");
        setLoading(false);
        console.error(err.response?.data || err.message);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price: parseFloat(price) };

    try {
      await updateProduct(productId, productData, token);
      // Signal successful update
      if (onCancel) onCancel();
      // Option to reload or redirect
      window.location.reload();
    } catch (err) {
      setError("Failed to update product");
      console.error(err.response?.data || err.message);
    }
  };

  const styles = {
    container: {
      backgroundColor: "white",
      padding: "1.5rem",
      borderRadius: "0.25rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid #ddd",
      borderRadius: "6px",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    formGroup: {
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "0.5rem",
      color: "#4a5568",
    },
    input: {
      width: "100%",
      padding: "0.5rem",
      border: "1px solid #e2e8f0",
      borderRadius: "0.25rem",
      boxSizing: "border-box",
    },
    textarea: {
      width: "100%",
      padding: "0.5rem",
      border: "1px solid #e2e8f0",
      borderRadius: "0.25rem",
      boxSizing: "border-box",
      minHeight: "100px",
      resize: "vertical",
    },
    submitButton: {
      backgroundColor: "#4285f4",
      color: "white",
      padding: "10px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "10px",
    },
    cancelButton: {
      backgroundColor: "#f1f1f1",
      color: "#333",
      padding: "10px 16px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonContainer: {
      display: "flex",
      marginTop: "1rem",
    },
    error: {
      color: "#e53e3e",
      padding: "1rem",
      border: "1px solid #feb2b2",
      borderRadius: "0.25rem",
      backgroundColor: "#fff5f5",
      marginBottom: "1rem",
    },
    backButton: {
      backgroundColor: "#6c757d",
      color: "white",
      padding: "10px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      marginLeft: "10px",
    },
  };

  if (loading) return <div style={styles.container}>Loading...</div>;
  if (error)
    return <div style={{ ...styles.container, ...styles.error }}>{error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chỉnh sửa sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Tên sản phẩm</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.textarea}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.submitButton}>
            Cập nhật sản phẩm
          </button>
          <button type="button" style={styles.cancelButton} onClick={onCancel}>
            Hủy bỏ
          </button>
          <button type="button" style={styles.backButton} onClick={onCancel}>
            Quay lại
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;

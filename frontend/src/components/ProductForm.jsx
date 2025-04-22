import React, { useState } from "react";
import { createProduct } from "../services/api";

function ProductForm({ token }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = { name, description, price: parseFloat(price) };

    try {
      await createProduct(productData, token);
      setName("");
      setDescription("");
      setPrice("");
      window.location.reload(); // Nếu muốn fetch lại dữ liệu như bên ProductList thì sửa chỗ này
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "6px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    formTitle: {
      fontSize: "22px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    inputGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "6px",
    },
    input: {
      width: "100%",
      padding: "8px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxSizing: "border-box",
    },
    button: {
      backgroundColor: "#4285f4",
      color: "#fff",
      padding: "10px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.formTitle}>Thêm sản phẩm</h2>
      <form onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Tên sản phẩm</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Giá</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}

export default ProductForm;

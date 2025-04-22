import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../services/api";
import ProductEdit from "./ProductEdit";

function ProductList({ token }) {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(token);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts();
  }, [token]);

  const handleEdit = (productId) => {
    setEditingProductId(productId);
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    fetchProducts(); // Refresh product list after editing
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id, token);
      // Update products list after deletion
      setProducts(products.filter((product) => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
    },
    formTitle: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "15px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    tableHeader: {
      backgroundColor: "#f2f2f2",
      padding: "12px",
      textAlign: "left",
      borderBottom: "2px solid #ddd",
    },
    tableCell: {
      border: "1px solid #ddd",
      padding: "12px",
      textAlign: "left",
    },
    deleteButton: {
      backgroundColor: "#ff4d4d",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      margin: "0 5px",
    },
    editButton: {
      backgroundColor: "#4285f4",
      color: "white",
      padding: "8px 12px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      margin: "0 5px",
    },
  };

  // Display edit form when editingProductId is set
  if (editingProductId) {
    return (
      <ProductEdit
        token={token}
        productId={editingProductId}
        onCancel={handleCancelEdit}
      />
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.formTitle}>Products</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Description</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={styles.tableCell}>{product.id}</td>
              <td style={styles.tableCell}>{product.name}</td>
              <td style={styles.tableCell}>{product.description}</td>
              <td style={styles.tableCell}>${product.price?.toFixed(2)}</td>
              <td style={styles.tableCell}>
                <button
                  style={styles.editButton}
                  onClick={() => handleEdit(product.id)}
                >
                  Edit
                </button>
                <button
                  style={styles.deleteButton}
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;

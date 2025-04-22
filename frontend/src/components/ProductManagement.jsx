import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";
import ProductEdit from "./ProductEdit";

const ProductManagement = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState("list");
  const [editingProductId, setEditingProductId] = useState(null);

  const handleEditProduct = (productId) => {
    setEditingProductId(productId);
    setActiveTab("edit");
  };

  const handleCancelEdit = () => {
    setEditingProductId(null);
    setActiveTab("list");
  };

  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      backgroundColor: "#f8f9fa",
    },
    sidebar: {
      width: "25%",
      maxWidth: "280px",
      backgroundColor: "#343a40",
      color: "white",
      padding: "24px",
      boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
    },
    sidebarTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "24px",
      paddingBottom: "16px",
      borderBottom: "1px solid #495057",
    },
    menuList: {
      listStyle: "none",
      padding: "0",
      marginBottom: "32px",
    },
    menuItem: {
      cursor: "pointer",
      padding: "12px 16px",
      marginBottom: "8px",
      borderRadius: "8px",
      transition: "all 0.2s",
      display: "flex",
      alignItems: "center",
    },
    activeMenuItem: {
      backgroundColor: "#0d6efd",
      color: "white",
      fontWeight: "500",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
    inactiveMenuItem: {
      backgroundColor: "transparent",
      hover: {
        backgroundColor: "#495057",
      },
    },
    listIcon: {
      marginRight: "12px",
    },
    logoutButton: {
      width: "100%",
      backgroundColor: "#dc3545",
      color: "white",
      border: "none",
      padding: "12px 16px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "500",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s",
    },
    logoutIcon: {
      marginRight: "8px",
    },
    mainContent: {
      width: "75%",
      padding: "24px",
      overflowY: "auto",
    },
    contentCard: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      maxWidth: "1200px",
      margin: "0 auto",
    },
  };

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>Quản lý sản phẩm</h2>
        <ul style={styles.menuList}>
          <li
            style={{
              ...styles.menuItem,
              ...(activeTab === "list"
                ? styles.activeMenuItem
                : styles.inactiveMenuItem),
            }}
            onClick={() => setActiveTab("list")}
          >
            <span style={styles.listIcon}>📋</span>
            Danh sách sản phẩm
          </li>
          <li
            style={{
              ...styles.menuItem,
              ...(activeTab === "add"
                ? styles.activeMenuItem
                : styles.inactiveMenuItem),
            }}
            onClick={() => setActiveTab("add")}
          >
            <span style={styles.listIcon}>➕</span>
            Thêm sản phẩm
          </li>
        </ul>
        <button
          onClick={onLogout}
          style={styles.logoutButton}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = "#c82333")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = "#dc3545")
          }
        >
          <span style={styles.logoutIcon}>🚪</span>
          Đăng xuất
        </button>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.contentCard}>
          {activeTab === "list" && (
            <ProductList token={token} onEdit={handleEditProduct} />
          )}
          {activeTab === "add" && <ProductForm token={token} />}
          {activeTab === "edit" && editingProductId && (
            <ProductEdit
              token={token}
              productId={editingProductId}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;

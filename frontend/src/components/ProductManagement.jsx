import React, { useState } from "react";
import ProductList from "./ProductList";
import ProductForm from "./ProductForm";

const ProductManagement = ({ token, onLogout }) => {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li
            className={`cursor-pointer mb-2 ${
              activeTab === "list" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("list")}
          >
            Danh sách sản phẩm
          </li>
          <li
            className={`cursor-pointer mb-2 ${
              activeTab === "add" ? "font-bold" : ""
            }`}
            onClick={() => setActiveTab("add")}
          >
            Thêm sản phẩm
          </li>
        </ul>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Đăng xuất
        </button>
      </div>
      <div className="w-3/4 p-4">
        {activeTab === "list" && <ProductList token={token} />}
        {activeTab === "add" && <ProductForm token={token} />}
      </div>
    </div>
  );
};

export default ProductManagement;

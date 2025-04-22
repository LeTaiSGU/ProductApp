import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Đảm bảo toàn bộ nền trang là màu trắng
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#fff"; // Nền trắng
    document.body.style.color = "#000"; // Chữ đen
    document.body.style.height = "100vh";
    document.body.style.display = "flex";
    document.body.style.justifyContent = "center";
    document.body.style.alignItems = "center";
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const response = await axios.post(
        "http://localhost:8000/token",
        formData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      setMessage("Đăng nhập thành công!");
      onLogin(response.data.access_token);
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.detail || "Đăng nhâp thất bại");
    }
  };

  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div
      style={{
        backgroundColor: "#f0f0f0", // Nền form màu xám nhạt
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.5)",
        width: "100%",
        maxWidth: "400px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "24px",
          marginBottom: "20px",
          color: "#000",
        }}
      >
        Đăng nhập
      </h2>
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              marginBottom: "8px",
              color: "#333", // Chữ đen nhạt
            }}
          >
            Tên đăng nhập:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff", // Nền trắng
              color: "#000", // Chữ đen
              fontSize: "14px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              fontSize: "14px",
              marginBottom: "8px",
              color: "#333", // Chữ đen nhạt
            }}
          >
            Mật khẩu:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#fff", // Nền trắng
              color: "#000", // Chữ đen
              fontSize: "14px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff", // Nút xanh dương
            color: "#fff", // Chữ trắng
            fontSize: "16px",
            fontWeight: "bold",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Đăng nhập
        </button>
      </form>
      {message && (
        <p style={{ textAlign: "center", fontSize: "14px", color: "#333" }}>
          {message}
        </p>
      )}
      <hr
        style={{
          border: "none",
          borderTop: "1px solid #ccc",
          margin: "20px 0",
        }}
      />
      <p style={{ textAlign: "center", fontSize: "14px", color: "#333" }}>
        Bạn chưa có tài khoản?
      </p>
      <button
        onClick={handleRegisterRedirect}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: "transparent",
          color: "#007bff", // Chữ xanh dương
          border: "1px solid #007bff", // Viền xanh dương
          borderRadius: "4px",
          cursor: "pointer",
          marginTop: "10px",
        }}
      >
        Đăng ký
      </button>
    </div>
  );
};

export default Login;

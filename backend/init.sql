-- Tạo bảng users
  CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      hashed_password VARCHAR(255) NOT NULL
  );

  -- Tạo bảng products
  CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price FLOAT NOT NULL
  );

  -- Thêm người dùng mặc định (admin/admin123)
  INSERT INTO users (username, hashed_password) 
  VALUES ('admin', '$2y$10$YaM8UIfsDbeK3CXDnwf1c.5Add8KhYNiGCafJLzWl/tgwHINQzEKe'); 
  -- Mật khẩu: admin123 (đã hash bằng bcrypt)
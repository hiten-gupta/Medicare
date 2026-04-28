CREATE DATABASE IF NOT EXISTS medicare;
USE medicare;

-- Users Table (Admin + Customers)
CREATE TABLE users (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    email       VARCHAR(100) NOT NULL UNIQUE,
    password    VARCHAR(255) NOT NULL,
    phone       VARCHAR(20),
    address     TEXT,
    role        ENUM('ADMIN', 'USER') DEFAULT 'USER',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table (Brands / Symptoms)
CREATE TABLE categories (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    type        ENUM('BRAND', 'SYMPTOM') NOT NULL,
    description TEXT
);

-- Medicines Table
CREATE TABLE medicines (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    name            VARCHAR(150) NOT NULL,
    description     TEXT,
    price           DECIMAL(10, 2) NOT NULL,
    stock           INT DEFAULT 0,
    image_url       VARCHAR(500),
    requires_prescription BOOLEAN DEFAULT FALSE,
    category_id     BIGINT,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Orders Table
CREATE TABLE orders (
    id              BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id         BIGINT NOT NULL,
    total_amount    DECIMAL(10, 2) NOT NULL,
    status          ENUM('PENDING','CONFIRMED','SHIPPED','DELIVERED','CANCELLED') DEFAULT 'PENDING',
    payment_status  ENUM('UNPAID','PAID') DEFAULT 'UNPAID',
    address         TEXT NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Order Items Table
CREATE TABLE order_items (
    id          BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id    BIGINT NOT NULL,
    medicine_id BIGINT NOT NULL,
    quantity    INT NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (medicine_id) REFERENCES medicines(id)
);

-- Seed: Default Admin User (password: admin123)
INSERT INTO users (name, email, password, role)
VALUES ('Admin User', 'admin@medicare.com',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'ADMIN');

-- Seed: Sample Categories
INSERT INTO categories (name, type) VALUES
('Paracetamol Brand', 'BRAND'),
('Antibiotic', 'BRAND'),
('Fever', 'SYMPTOM'),
('Headache', 'SYMPTOM'),
('Infection', 'SYMPTOM');

-- Seed: Sample Medicines
INSERT INTO medicines (name, description, price, stock, requires_prescription, category_id) VALUES
('Dolo 650', 'Paracetamol tablet for fever and pain relief', 45.00, 200, FALSE, 1),
('Amoxicillin 500mg', 'Antibiotic for bacterial infections', 120.00, 100, TRUE, 2),
('Crocin Advance', 'Fast relief from headache and fever', 55.00, 150, FALSE, 1),
('Azithromycin 250mg', 'Antibiotic for respiratory infections', 180.00, 80, TRUE, 2),
('Ibuprofen 400mg', 'Anti-inflammatory and pain relief', 60.00, 120, FALSE, 4);
DELETE FROM users WHERE email = 'admin@medicare.com';
-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS estoque CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE estoque;

-- Tabela de categorias
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL
);

-- Tabela de produtos
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  quantidade INT NOT NULL DEFAULT 0,
  preco DECIMAL(10,2) NOT NULL,
  categoria_id INT NOT NULL,
  estoque_minimo INT DEFAULT 10,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Tabela de entradas (movimentações de entrada)
CREATE TABLE IF NOT EXISTS entradas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela de saídas (movimentações de saída)
CREATE TABLE IF NOT EXISTS saidas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  produto_id INT NOT NULL,
  quantidade INT NOT NULL,
  data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
    ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabela de usuários
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

-- Inserir dados de exemplo
INSERT INTO categorias (nome) VALUES 
('Smartphones'),
('Notebooks'),
('Acessórios'),
('Gaming'),
('Audio & Video');

INSERT INTO produtos (nome, quantidade, preco, categoria_id, estoque_minimo) VALUES 
('iPhone 15 Pro Max', 15, 8999.99, 1, 3),
('Samsung Galaxy S24 Ultra', 22, 7499.99, 1, 5),
('MacBook Pro M3', 8, 15999.99, 2, 2),
('Dell XPS 13 Plus', 12, 8999.99, 2, 3),
('AirPods Pro 2', 35, 2499.99, 3, 8),
('Cabo USB-C Premium', 50, 89.90, 3, 15),
('PlayStation 5', 6, 3999.99, 4, 2),
('Nintendo Switch OLED', 18, 2499.99, 4, 5),
('Sony WH-1000XM5', 10, 2999.99, 5, 3),
('Samsung QLED 65"', 4, 5999.99, 5, 1);

INSERT INTO usuarios (nome, email, senha, role) VALUES 
('Administrador', 'admin@example.com', '$2b$10$rQZ8K8K8K8K8K8K8K8K8K.8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', 'admin'),
('Usuário Teste', 'user@example.com', '$2b$10$rQZ8K8K8K8K8K8K8K8K8K.8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K8K', 'user');

-- Inserir alguns movimentos de exemplo
INSERT INTO entradas (produto_id, quantidade, data) VALUES 
(1, 20, NOW() - INTERVAL 2 DAY),
(3, 10, NOW() - INTERVAL 1 DAY),
(5, 40, NOW() - INTERVAL 3 DAY);

INSERT INTO saidas (produto_id, quantidade, data) VALUES 
(1, 5, NOW() - INTERVAL 1 DAY),
(5, 5, NOW()),
(7, 2, NOW() - INTERVAL 2 DAY);

ALTER USER 'root'@'%' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

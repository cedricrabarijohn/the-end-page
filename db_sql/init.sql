DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    avatar VARCHAR(255),
    hashed_password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indices for faster lookups
    INDEX idx_email (email),
    INDEX idx_name (firstname, lastname)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Create a test user (password: test123)
-- INSERT INTO users (email, firstname, lastname, avatar, hashed_password)
-- VALUES ('test@example.com', 'John', 'Doe', NULL, '$2a$10$xVfzGxq5uZ3Up6I3KVtqvekRCPQWjEzG4g6V2WPu7XJyjLot5xeK.');

-- Add additional tables as needed for your application below
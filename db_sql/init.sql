-- IF YOU WANT TO DROP ALL TABLES AND RECREATE THEM, UNCOMMENT THE DROP TABLE STATEMENTS BELOW

-- Create users table
-- DROP TABLE IF EXISTS users;
CREATE TABLE  users (
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

-- DROP TABLE IF EXISTS user_pages;
CREATE TABLE if NOT EXISTS user_pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    page_title VARCHAR(255) NOT NULL,
    page_url VARCHAR(255) NOT NULL,
    page_content TEXT NOT NULL,
    page_confidentiality ENUM('public', 'private') NOT NULL,
    page_status ENUM('draft', 'published', 'archived') NOT NULL,
    page_tags VARCHAR(255),
    images JSON,
    videos JSON,
    audio JSON,
    views INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add more tables as needed for your application below
-- Example of creating a table for user settings
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);


CREATE TABLE recharge_value (
    id INT AUTO_INCREMENT PRIMARY KEY,
    chat_id BIGINT NOT NULL,
    message_id INT NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL
);


CREATE TABLE payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_payment BIGINT NOT NULL,
    chat_id BIGINT NOT NULL,
    message_id INT NOT NULL,
    value DECIMAL(10, 2) NOT NULL,
    created_at DATETIME NOT NULL
);



CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(255) NOT NULL,
    service_price DECIMAL(10, 2) NOT NULL,
    service_callback VARCHAR(255) NOT NULL
);

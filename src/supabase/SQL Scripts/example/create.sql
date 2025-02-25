-- Create the products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,             -- Auto-incrementing primary key
  name VARCHAR(255) NOT NULL,         -- Product name, required
  description TEXT,                  -- Product description, optional
  price DECIMAL(10, 2) NOT NULL,      -- Product price, required with two decimal points
  created_at TIMESTAMPTZ DEFAULT now(), -- Timestamp of creation, default to current time
  updated_at TIMESTAMPTZ DEFAULT now()  -- Timestamp for last update, default to current time
);

-- Optionally, you can create an index for faster searches by name
CREATE INDEX idx_products_name ON products (name);

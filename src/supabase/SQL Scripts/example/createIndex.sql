-- Create an index on the 'name' column for faster search by product name
CREATE INDEX idx_products_name ON products (name);

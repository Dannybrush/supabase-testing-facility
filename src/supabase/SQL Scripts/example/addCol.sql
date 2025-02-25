-- Add stock_quantity column to the products table
ALTER TABLE products
ADD COLUMN stock_quantity INT DEFAULT 0; -- Default value of 0, to indicate no stock

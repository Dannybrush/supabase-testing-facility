-- Update the stock quantity for a specific product
UPDATE products
SET stock_quantity = stock_quantity - 1
WHERE id = 1;  -- Assuming the product ID is 1

-- Create a policy that allows authenticated users to SELECT (read) from the products table
CREATE POLICY "authenticated users can view products"
  ON products
  FOR SELECT
  USING (auth.uid() IS NOT NULL);  -- Only allow access if the user is authenticated (i.e., has a valid auth.uid)


-- Create a policy that allows only users with the admin role to INSERT into the products table
CREATE POLICY "admins can insert products"
  ON products
  FOR INSERT
  TO role_admin  -- Replace with the correct role for your admin users
  USING (true);  -- Always allow if the user has the admin role

-- Create a policy that allows a user to UPDATE only their own products
CREATE POLICY "users can update their products"
  ON products
  FOR UPDATE
  USING (auth.uid() = created_by);  -- Assuming you have a column "created_by" to store the user id

-- Create a policy that allows only admins to DELETE products
CREATE POLICY "admins can delete products"
  ON products
  FOR DELETE
  TO role_admin  -- Replace with the correct role for your admin users
  USING (true);  -- Always allow if the user has the admin role

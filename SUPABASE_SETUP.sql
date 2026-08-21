-- ===============================
-- MAKEUP STORE SUPABASE SETUP
-- ===============================

-- 1. Create Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(100),
  image_url TEXT,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add index for better query performance
CREATE INDEX products_seller_id_idx ON products(seller_id);
CREATE INDEX products_category_idx ON products(category);
CREATE INDEX products_created_at_idx ON products(created_at DESC);

-- 2. Create Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  items JSONB NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Add indexes for orders
CREATE INDEX orders_user_id_idx ON orders(user_id);
CREATE INDEX orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX orders_status_idx ON orders(status);

-- ===============================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===============================

-- Enable RLS on products table
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Products: Anyone can SELECT all products
CREATE POLICY "Allow public to view products"
  ON products FOR SELECT
  USING (true);

-- Products: Only sellers can INSERT their own products
CREATE POLICY "Allow sellers to insert products"
  ON products FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Products: Only sellers can UPDATE their own products
CREATE POLICY "Allow sellers to update their products"
  ON products FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Products: Only sellers can DELETE their own products
CREATE POLICY "Allow sellers to delete their products"
  ON products FOR DELETE
  USING (auth.uid() = seller_id);

-- Enable RLS on orders table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Orders: Users can only view their own orders
CREATE POLICY "Allow users to view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Orders: Authenticated users can INSERT orders
CREATE POLICY "Allow users to create orders"
  ON orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Orders: Users can UPDATE their own orders
CREATE POLICY "Allow users to update own orders"
  ON orders FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Orders: Users can DELETE their own pending orders
CREATE POLICY "Allow users to delete pending orders"
  ON orders FOR DELETE
  USING (auth.uid() = user_id AND status = 'pending');

-- ===============================
-- SAMPLE DATA (Optional)
-- ===============================

-- Insert sample makeup products
INSERT INTO products (name, description, price, category, image_url, seller_id) VALUES
('Red Velvet Lipstick', 'Classic red lipstick with matte finish', 24.99, 'Lipstick', 'https://via.placeholder.com/200?text=Red+Lipstick', NULL),
('Concealer Pro', 'Full coverage concealer that lasts all day', 18.99, 'Concealer', 'https://via.placeholder.com/200?text=Concealer', NULL),
('Natural Foundation', 'Lightweight foundation with SPF 15', 32.99, 'Foundation', 'https://via.placeholder.com/200?text=Foundation', NULL),
('Volume Mascara', 'Black mascara for dramatic lashes', 14.99, 'Mascara', 'https://via.placeholder.com/200?text=Mascara', NULL),
('Eyeshadow Palette', '12 color eyeshadow palette', 36.99, 'Eyeshadow', 'https://via.placeholder.com/200?text=Eyeshadow+Palette', NULL),
('Blush Pink', 'Rosy pink blush for natural look', 19.99, 'Blush', 'https://via.placeholder.com/200?text=Blush', NULL),
('Eyeliner Black', 'Waterproof eyeliner pencil', 12.99, 'Eyeliner', 'https://via.placeholder.com/200?text=Eyeliner', NULL),
('Bronzer Shimmer', 'Shimmer bronzer for glow', 22.99, 'Bronzer', 'https://via.placeholder.com/200?text=Bronzer', NULL);

-- ===============================
-- IMPORTANT NOTES
-- ===============================

/*
To set up the database:

1. Open your Supabase project
2. Go to SQL Editor
3. Copy and paste this entire script
4. Execute it

The tables, indexes, and RLS policies will be created automatically.

RLS Policy Summary:
- Products: Public can view, sellers can create/edit/delete their own
- Orders: Users can only access their own orders

Make sure authentication is enabled in your Supabase project!
*/

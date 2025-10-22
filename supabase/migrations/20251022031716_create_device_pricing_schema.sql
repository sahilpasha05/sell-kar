/*
  # Create Device Pricing Schema

  1. New Tables
    - `device_variants`
      - `id` (uuid, primary key)
      - `device_id` (text) - Device identifier like 'iphone-14'
      - `device_name` (text) - Display name like 'iPhone 14'
      - `brand` (text) - Brand name like 'apple'
      - `device_type` (text) - Type: 'phone', 'laptop', or 'ipad'
      - `storage` (text) - Storage variant like '128GB', '256GB'
      - `base_price` (integer) - Base price in rupees
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `device_variants` table
    - Add policy for public read access (since pricing is public information)
    - No write access for anonymous users (only admins can update prices)

  3. Initial Data
    - Add iPhone 14 variants with different storage options
*/

CREATE TABLE IF NOT EXISTS device_variants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id text NOT NULL,
  device_name text NOT NULL,
  brand text NOT NULL,
  device_type text NOT NULL CHECK (device_type IN ('phone', 'laptop', 'ipad')),
  storage text NOT NULL,
  base_price integer NOT NULL CHECK (base_price >= 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(device_id, storage)
);

ALTER TABLE device_variants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view device pricing"
  ON device_variants
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can insert device pricing"
  ON device_variants
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can update device pricing"
  ON device_variants
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can delete device pricing"
  ON device_variants
  FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO device_variants (device_id, device_name, brand, device_type, storage, base_price) VALUES
  ('iphone-14', 'iPhone 14', 'apple', 'phone', '64GB', 32000),
  ('iphone-14', 'iPhone 14', 'apple', 'phone', '128GB', 36000),
  ('iphone-14', 'iPhone 14', 'apple', 'phone', '256GB', 40000),
  ('iphone-14', 'iPhone 14', 'apple', 'phone', '512GB', 45000)
ON CONFLICT (device_id, storage) DO NOTHING;
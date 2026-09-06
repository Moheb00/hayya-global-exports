CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can read their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
    RETURN EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin' AND user_id = uid);
  END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN true;
END;
$$;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  description_ar text NOT NULL DEFAULT '',
  image_url text NOT NULL DEFAULT '',
  image_path text NOT NULL DEFAULT '',
  season text NOT NULL DEFAULT '',
  is_published boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view published products" ON public.products FOR SELECT TO anon, authenticated USING (is_published OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;
CREATE TRIGGER products_set_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Product images are readable" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'product-images');
CREATE POLICY "Admins can upload product images" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'));

INSERT INTO public.products (name_en, name_ar, description_en, description_ar, image_url, sort_order, is_featured) VALUES
('Fresh Mangoes', 'مانجو طازج', 'Egyptian mangoes selected and packed for export, with attention to ripeness, size, and condition.', 'مانجو مصري يتم اختياره وتعبئته للتصدير مع الاهتمام بنضجه وحجمه وحالته.', '/__l5e/assets-v1/137ceb1c-db0b-4975-8b70-f2e728d7b86c/prod-mangoes.jpg', 10, true),
('Tomatoes', 'طماطم', 'Fresh Egyptian tomatoes sourced for commercial buyers and prepared to agreed specifications.', 'طماطم مصرية طازجة يتم توريدها للمشترين التجاريين وتجهيزها وفق المواصفات المتفق عليها.', '/__l5e/assets-v1/80e36284-fa8a-467a-9f14-045b0da4b651/prod-tomatoes.jpg', 20, true),
('Bell Peppers', 'فلفل حلو', 'Colorful bell peppers packed for export, graded for size, color, and freshness.', 'فلفل حلو ملون يتم تعبئته للتصدير وفرزه حسب الحجم واللون والطزاجة.', '/__l5e/assets-v1/33a9b082-05ac-4dab-94dc-14d888b045f1/prod-bell-peppers.jpg', 30, true),
('Green Grapes', 'عنب أخضر', 'Egyptian green table grapes handled with care for bunches, berry size, and export quality.', 'عنب مصري أخضر للأكل يتم تداوله بعناية للحفاظ على العناقيد وحجم الحبة وجودة التصدير.', '/__l5e/assets-v1/b9ff7732-bc2c-4a27-80c7-bac57ec9ec73/prod-grapes-green.jpg', 40, false),
('Pomegranates', 'رمان', 'Premium Egyptian pomegranates selected for skin quality, size, and shelf-ready presentation.', 'رمان مصري ممتاز يتم اختياره حسب جودة القشرة والحجم ومظهره الجاهز للعرض.', '/__l5e/assets-v1/80b5fa0d-26b5-4718-8595-c0980eca6f8b/prod-pomegranates.jpg', 50, false),
('Table Grapes', 'عنب للأكل', 'A range of Egyptian table grape varieties prepared for international markets and buyer programs.', 'مجموعة من أصناف العنب المصري للأكل يتم تجهيزها للأسواق الدولية وبرامج المشترين.', '/__l5e/assets-v1/4c9d4209-1c8e-4f35-8d8b-a06f21dc0723/prod-grapes-mixed.jpg', 60, false);
export type Language = 'en' | 'am';

export interface LocalizedString {
  en: string;
  am: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedString;
  category: string;
  price: number;
  description: LocalizedString;
  image_url: string;
  is_available: boolean;
  is_daily_special?: boolean;
  tags: string[];
  created_at: string;
}

export type Category = 'All' | 'Burger' | 'Pizza' | 'Fast Food' | 'Drinks' | 'Desserts';

import { MenuItem } from './types';

export const mockMenuItems: MenuItem[] = [
  {
    id: '1',
    name: {
      en: 'Special Beef Burger',
      am: 'ስፔሻል ቢፍ በርገር',
    },
    category: 'Burger',
    price: 350,
    description: {
      en: 'Double juicy beef patty, double cheese, caramelized onions, fresh lettuce, and our secret Tinsae sauce.',
      am: 'ድርብ ጣፋጭ የስጋ በርገር፣ ድርብ ቺዝ፣ በካራሜል የተጠበሰ ቀይ ሽንኩርት፣ ትኩስ ሰላጣ እና ልዩ የትንሳኤ ሶስ።',
    },
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['⭐ Today\'s Special', '🔥 Popular'],
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: {
      en: 'Cheese Burger',
      am: 'ቺዝ በርገር',
    },
    category: 'Burger',
    price: 280,
    description: {
      en: 'Classic single beef patty with melted cheddar cheese, fresh tomato, and lettuce.',
      am: 'ክላሲክ የስጋ በርገር ከቀለጠ ቼዳር ቺዝ፣ ትኩስ ቲማቲም እና ሰላጣ ጋር።',
    },
    image_url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['🔥 Popular'],
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: {
      en: 'Special Tinsae Pizza',
      am: 'ስፔሻል ትንሳኤ ፒዛ',
    },
    category: 'Pizza',
    price: 550,
    description: {
      en: 'Our signature pizza loaded with mixed meats, fresh veggies, extra mozzarella, and our homemade pizza sauce.',
      am: 'የእኛ ልዩ ፒዛ ከተለያዩ ስጋዎች፣ ትኩስ አትክልቶች፣ ተጨማሪ ሞዛሬላ እና ቤታችን በተሰራ የፒዛ ሶስ።',
    },
    image_url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['⭐ Today\'s Special'],
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: {
      en: 'Chicken Pizza',
      am: 'የዶሮ ፒዛ',
    },
    category: 'Pizza',
    price: 450,
    description: {
      en: 'Grilled chicken breast, bell peppers, red onions, mushrooms, and mozzarella cheese.',
      am: 'የተጠበሰ የዶሮ ስጋ፣ ቃሪያ፣ ቀይ ሽንኩርት፣ እንጉዳይ እና ሞዛሬላ ቺዝ።',
    },
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: [],
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: {
      en: 'Pepperoni Pizza',
      am: 'ፔፐሮኒ ፒዛ',
    },
    category: 'Pizza',
    price: 480,
    description: {
      en: 'Classic pepperoni slices with generous amount of mozzarella cheese and tomato base.',
      am: 'ክላሲክ ፔፐሮኒ ከብዙ ሞዛሬላ ቺዝ እና የቲማቲም ሶስ ጋር።',
    },
    image_url: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['🔥 Popular'],
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: {
      en: 'Crispy French Fries',
      am: 'ድንች ጥብስ',
    },
    category: 'Fast Food',
    price: 150,
    description: {
      en: 'Golden crispy crinkle-cut fries, served hot and salted.',
      am: 'ወርቃማ እና ጣፋጭ ድንች ጥብስ፣ ትኩስ ሆኖ የሚቀርብ።',
    },
    image_url: 'https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['🌱 Vegan'],
    created_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: {
      en: 'Fresh Mango Juice',
      am: 'ትኩስ የማንጎ ጭማቂ',
    },
    category: 'Drinks',
    price: 100,
    description: {
      en: 'Freshly squeezed seasonal mango juice, naturally sweet and refreshing.',
      am: 'በተፈጥሮ ጣፋጭ የሆነ ትኩስ የማንጎ ጭማቂ።',
    },
    image_url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&q=80&w=800',
    is_available: true,
    tags: ['🌱 Vegan'],
    created_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: {
      en: 'Chocolate Milkshake',
      am: 'የቸኮሌት ሚልክሼክ',
    },
    category: 'Drinks',
    price: 180,
    description: {
      en: 'Rich and creamy chocolate milkshake topped with whipped cream.',
      am: 'ጣፋጭ የቸኮሌት ሚልክሼክ ከክሬም ጋር።',
    },
    image_url: 'https://images.unsplash.com/photo-1572490122747-3968b75bf699?auto=format&fit=crop&q=80&w=800',
    is_available: false,
    tags: [],
    created_at: new Date().toISOString(),
  }
];

export interface ProductVariant {
  type: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  totalReview: number;
  description: string;
  variants?: ProductVariant[];
}

export const CATEGORIES = [
  { name: 'Fashion', icon: 'shirt-outline' },
  { name: 'Electronics', icon: 'hardware-chip-outline' },
  { name: 'Groceries', icon: 'basket-outline' },
  { name: 'Beauty', icon: 'sparkles-outline' },
  { name: 'Home', icon: 'home-outline' },
  { name: 'Baby', icon: 'happy-outline' },
];

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 24999000,
    image: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708',
    category: 'Electronics',
    rating: 4.9,
    totalReview: 1240,
    description: 'The ultimate iPhone, powered by the A17 Pro chip. A magical new way to interact with iPhone. Groundbreaking safety features. And an innovative 48MP camera for mind-blowing detail. All in a durable Ceramic Shield front, tougher than any smartphone glass.',
    variants: [
      { type: 'Color', values: ['#A4A29B', '#4A464A', '#F0F2F2', '#33373B'] },
      { type: 'Storage', values: ['256GB', '512GB', '1TB'] }
    ]
  },
  {
    id: '2',
    name: 'Oversized Cotton T-shirt',
    price: 299000,
    image: 'https://img.ws.mms.shopee.co.id/id-11134207-7r98o-lq493o1bf0p402',
    category: 'Fashion',
    rating: 4.7,
    totalReview: 890,
    description: 'A comfortable and stylish oversized t-shirt made from 100% premium cotton. Perfect for a casual day out or lounging at home. Its relaxed fit provides a modern silhouette.',
    variants: [
        { type: 'Color', values: ['#FFFFFF', '#000000', '#A9A9A9'] },
        { type: 'Size', values: ['S', 'M', 'L', 'XL'] }
    ]
  },
  {
    id: '3',
    name: 'Maybelline Superstay Lipstick',
    price: 125000,
    image: 'https://www.maybelline.co.id/~/media/mny/id/lips/lip-color/superstay-matte-ink/maybelline-lip-color-superstay-matte-ink-365-enthusiast-041554078563-o.jpg',
    category: 'Beauty',
    rating: 4.8,
    totalReview: 2350,
    description: 'Ink your lips in up to 16 HR saturated liquid matte. SuperStay Matte Ink™ features a unique arrow applicator for precise application and is available in a range of super saturated shades.',
    variants: [
        { type: 'Color', values: ['#B93545', '#D66D57', '#C45D7A'] }
    ]
  },
  {
    id: '4',
    name: 'Digital Rice Cooker',
    price: 799000,
    image: 'https://images.philips.com/is/image/PhilipsConsumer/HD4515_85-IMS-id_ID?$jpglarge$&wid=1250',
    category: 'Home',
    rating: 4.9,
    totalReview: 980,
    description: 'Smart and automatic cooking. Create great tasting meals with the "tasty" setting which ensures the best taste and texture. 8 dedicated cooking menus for the contemporary cook.',
    variants: [
      { type: 'Color', values: ['#FFFFFF', '#33373B'] }
    ]
  },
  {
    id: '5',
    name: 'S-26 Procal GOLD Stage 3',
    price: 350000,
    image: 'https://images.ctfassets.net/y2p6y2o34b2s/4y2P4Xz4kQ2M8w2gI28qM8/b37f4a7c1e55b4e80e1a384f67c9c0b7/S-26-Procal-Gold-900g.png',
    category: 'Baby',
    rating: 5.0,
    totalReview: 3120,
    description: 'Susu pertumbuhan untuk anak usia 1-3 tahun dengan MULTIEXCEL™ α-LIPIDS SYSTEM® untuk dukung potensi dan kemampuan belajar si Kecil.',
  },
  {
    id: '6',
    name: 'Nike Air Max Running Shoes',
    price: 2399000,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/28c189b8-bb1a-45c1-93c4-978185ad3343/invincible-3-road-running-shoes-0h8j3v.png',
    category: 'Fashion',
    rating: 4.8,
    totalReview: 750,
    description: 'With maximum cushioning to support your every mile, the Invincible 3 gives you our highest level of comfort underfoot to help you stay on your feet today, tomorrow and beyond.',
     variants: [
        { type: 'Size', values: ['39', '40', '41', '42', '43'] }
    ]
  },
  {
    id: '7',
    name: 'Samsung Galaxy Watch 6',
    price: 4999000,
    image: 'https://images.samsung.com/is/image/samsung/p6pim/id/2307/gallery/id-galaxy-watch6-r940-sm-r940nzekxid-537410099?$1300_1038_PNG$',
    category: 'Electronics',
    rating: 4.9,
    totalReview: 1020,
    description: 'Start your everyday wellness journey. 20% more screen. Blacker margin. The watch that knows you best is back with a more personalized health experience and even better, upgraded sleep tracking.',
  }
];
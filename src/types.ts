export interface ProductColor {
  name: string;
  hex: string;
  imageUrl: string;
  desc: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'wallets' | 'bags' | 'watch-straps' | 'gifts';
  price: number;
  description: string;
  story: string;
  leatherType: string;
  colors: ProductColor[];
  sizes?: string[];
  dimensions?: string;
  customizable: boolean;
  stitchingOptions?: string[];
  hardwareOptions?: string[];
  isBestseller?: boolean;
}

export interface CustomizationOptions {
  monogramText: string; // Up to 3 characters
  foilColor: 'gold' | 'silver' | 'blind';
  stitching: 'contrasting' | 'tonal';
  hardware?: string;
}

export interface CartItem {
  cartItemId: string; // Unique string for the item with its selected options
  product: Product;
  quantity: number;
  selectedColor: ProductColor;
  selectedSize?: string;
  customization?: CustomizationOptions;
}

export interface AtelierStep {
  title: string;
  description: string;
  videoUrl?: string; // or image
  craftDetail: string;
}

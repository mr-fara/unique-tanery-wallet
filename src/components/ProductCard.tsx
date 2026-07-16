import { useState } from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product, initialColor: ProductColor) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

export default function ProductCard({
  product,
  onViewDetail,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  // Helper to generate custom CSS filters dynamically to simulate gorgeous leather dyes
  // We use different hue-rotates, sepia, and saturations based on the color hex code to make the single image change color!
  const getFilterStyle = (hex: string) => {
    switch (hex.toLowerCase()) {
      case '#1a1a1a': // Black
        return 'brightness-[0.45] contrast-[1.2] grayscale';
      case '#3d2516': // Ebene / Dark Brown
        return 'sepia-[0.7] saturate-[1.1] brightness-[0.5] contrast-[1.15]';
      case '#63251e': // Rouge Sellier / Burgundy
        return 'sepia-[0.8] saturate-[1.8] hue-rotate-[320deg] brightness-[0.5] contrast-[1.2]';
      case '#4d5c41': // Vert Olive
        return 'sepia-[0.7] saturate-[1.2] hue-rotate-[65deg] brightness-[0.6] contrast-[1.1]';
      case '#1d2a45': // Blue Saphir
        return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.5] contrast-[1.2]';
      case '#be814e': // Cognac / Gold
        return 'sepia-[0.2] saturate-[1.3] brightness-[1.0] contrast-[1.0]';
      case '#d9531e': // Hermes Orange
        return 'sepia-[0.2] saturate-[2.1] hue-rotate-[350deg] brightness-[0.95] contrast-[1.05]';
      case '#181e2b': // Indigo Blue
        return 'sepia-[0.4] saturate-[1.6] hue-rotate-[205deg] brightness-[0.4] contrast-[1.2]';
      case '#8b8478': // Taupe Grise
        return 'sepia-[0.3] saturate-[0.5] brightness-[0.8] contrast-[1.0]';
      case '#d9788e': // Rose Azalee
        return 'sepia-[0.2] saturate-[2.0] hue-rotate-[315deg] brightness-[0.9] contrast-[1.05]';
      case '#1e2433': // Bleu Nuit
        return 'sepia-[0.4] saturate-[1.5] hue-rotate-[195deg] brightness-[0.45] contrast-[1.15]';
      case '#233827': // Vert Cypres
        return 'sepia-[0.7] saturate-[1.3] hue-rotate-[100deg] brightness-[0.45] contrast-[1.15]';
      default:
        return '';
    }
  };

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between bg-white border border-luxury-sand p-4 transition-all duration-500 hover:shadow-xl hover:border-luxury-gold/50 text-left h-full"
    >
      {/* Product Image Section (Clean Hermes Style) */}
      <div className="relative aspect-square w-full overflow-hidden bg-luxury-cream border border-gray-50 flex items-center justify-center">
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-luxury-orange shadow-sm transition-all duration-300"
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            size={14}
            className={`transition-colors ${isWishlisted ? 'fill-pink-700 text-luxury-orange' : ''}`}
          />
        </button>

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <span className="absolute top-2 left-1 z-10 bg-luxury-gold text-luxury-cream text-[8px] lg:text-[8px] font-bold tracking-widest uppercase px-2 py-1">
            Best-seller
          </span>
        )}

        {/* The Image with Simulated Leather Dye Colors */}
        <div 
          onClick={() => onViewDetail(product, selectedColor)}
          className="w-full h-full cursor-pointer overflow-hidden relative flex items-center justify-center"
        >
          <motion.img
            src={selectedColor.imageUrl}
            alt={`${product.name} in ${selectedColor.name}`}
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.6 }}
            className={`object-cover w-full h-full transition-all duration-700`}
            style={{ filter: getFilterStyle(selectedColor.hex) }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle leather texture overlay on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-luxury-charcoal/5 pointer-events-none transition-opacity duration-500" />
          )}
        </div>

        {/* Quick View Button overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white/95 to-white/0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden sm:flex justify-center items-center z-10">
          <button
            onClick={() => onViewDetail(product, selectedColor)}
            className="w-full py-2.5 bg-luxury-charcoal text-luxury-cream text-[10px] tracking-luxury font-medium uppercase hover:bg-luxury-orange transition-colors duration-300 flex items-center justify-center space-x-1"
          >
            <span>CUSTOMIZE & CONFIGURE</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {/* Product Information Section */}
      <div className="pt-4 flex flex-col justify-between flex-grow">
        <div className="space-y-1 cursor-pointer" onClick={() => onViewDetail(product, selectedColor)}>
          <span className="text-[9px] tracking-widest text-gray-400 font-medium uppercase block">
            {product.leatherType}
          </span>
          <h3 className="text-sm font-medium text-luxury-charcoal uppercase tracking-wider group-hover:text-luxury-orange transition-colors duration-300 font-sans">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 font-light leading-relaxed mt-1">
            {product.description}
          </p>
        </div>

        {/* Color Swatch Selectors */}
        <div className="mt-4 pt-4 border-t border-luxury-sand flex items-center justify-between">
          <div className="flex items-center space-x-1.5" id={`swatches-${product.id}`}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center ${
                  selectedColor.name === color.name
                    ? 'border-luxury-charcoal scale-110 ring-2 ring-luxury-sand ring-offset-1'
                    : 'border-transparent hover:scale-105'
                }`}
                title={color.name}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full block shadow-inner"
                  style={{ backgroundColor: color.hex }}
                />
              </button>
            ))}
            <span className="text-[10px] text-gray-400 font-light truncate max-w-[80px] sm:max-w-[100px] pl-1 hidden sm:inline">
              {selectedColor.name.split(' (')[0]}
            </span>
          </div>

          <div className="text-right">
            <span className="text-sm font-semibold text-luxury-charcoal tracking-wider">
              ${product.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

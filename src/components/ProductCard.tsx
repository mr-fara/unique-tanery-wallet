import { useState, useCallback, memo } from 'react';
import { Heart, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onViewDetail: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}

const ProductCard = memo(function ProductCard({
  product,
  onViewDetail,
  onToggleWishlist,
  isWishlisted,
}: ProductCardProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const allImages = [product.imageUrl, ...product.secondaryImages];
  const activeImage = allImages[activeImageIndex];

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  const handleViewDetail = useCallback(() => onViewDetail(product), [onViewDetail, product]);
  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleWishlist(product.id);
    },
    [onToggleWishlist, product.id]
  );

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col justify-between bg-white border border-luxury-sand p-4 transition-shadow duration-300 hover:shadow-xl hover:border-luxury-gold/50 text-left h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-luxury-cream flex items-center justify-center">

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/80 hover:bg-white text-gray-400 hover:text-luxury-orange shadow-sm transition-colors duration-200"
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart
            size={14}
            className={isWishlisted ? 'fill-pink-700 text-luxury-orange' : ''}
          />
        </button>

        {/* Bestseller Badge */}
        {product.isBestseller && (
          <span className="absolute top-2 left-1 z-10 bg-luxury-gold text-luxury-cream text-[8px] font-bold tracking-widest uppercase px-2 py-1">
            Best-seller
          </span>
        )}

        {/* Main Image */}
        <div
          onClick={handleViewDetail}
          className="w-full h-full cursor-pointer overflow-hidden relative"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={`${product.name} — view ${activeImageIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                scale: isHovered ? 1.05 : 1,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="object-cover w-full h-full will-change-transform"
              referrerPolicy="no-referrer"
              loading="lazy"
              decoding="async"
            />
          </AnimatePresence>

          {/* Dot Indicators */}
          {allImages.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1 z-10 pointer-events-none">
              {allImages.map((_, idx) => (
                <span
                  key={idx}
                  className={`block rounded-full transition-all duration-200 ${
                    activeImageIndex === idx
                      ? 'w-3 h-1.5 bg-luxury-charcoal'
                      : 'w-1.5 h-1.5 bg-luxury-charcoal/30'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Quick View Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-white/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:flex justify-center items-center z-10">
          <button
            onClick={handleViewDetail}
            className="w-full py-2 bg-luxury-charcoal text-luxury-cream text-[10px] tracking-luxury font-medium uppercase hover:bg-luxury-orange transition-colors duration-200 flex items-center justify-center gap-1"
          >
            <span>CUSTOMIZE & CONFIGURE</span>
            <ArrowUpRight size={12} />
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="pt-4 flex flex-col justify-between flex-grow">

        <div className="space-y-1 cursor-pointer" onClick={handleViewDetail}>
          <span className="text-[9px] tracking-widest text-gray-400 font-medium uppercase block">
            {product.leatherType}
          </span>
          <h3 className="text-sm font-medium text-luxury-charcoal uppercase tracking-wider group-hover:text-luxury-orange transition-colors duration-200 font-sans">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 line-clamp-2 font-light leading-relaxed mt-1">
            {product.description}
          </p>
        </div>

        {/* Thumbnails + Price */}
        <div className="mt-4 pt-4 border-t border-luxury-sand flex items-center justify-between gap-2">

          <div className="flex items-center gap-1.5 overflow-hidden">
            {allImages.slice(0, 5).map((img, idx) => (
              <ThumbnailButton
                key={idx}
                img={img}
                idx={idx}
                productName={product.name}
                isActive={activeImageIndex === idx}
                onClick={setActiveImageIndex}
              />
            ))}
          </div>

          <div className="text-right flex-shrink-0">
            <span className="text-sm font-semibold text-luxury-charcoal tracking-wider">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// Isolated thumbnail to avoid re-rendering entire card on hover
const ThumbnailButton = memo(function ThumbnailButton({
  img,
  idx,
  productName,
  isActive,
  onClick,
}: {
  img: string;
  idx: number;
  productName: string;
  isActive: boolean;
  onClick: (idx: number) => void;
}) {
  return (
    <button
      onClick={() => onClick(idx)}
      className={`relative flex-shrink-0 w-7 h-7 overflow-hidden border transition-all duration-200 ${
        isActive
          ? 'border-luxury-charcoal scale-110 ring-1 ring-luxury-sand ring-offset-1'
          : 'border-luxury-sand/60 hover:border-luxury-charcoal/40 hover:scale-105 opacity-60 hover:opacity-100'
      }`}
      title={`View image ${idx + 1}`}
    >
      <img
        src={img}
        alt={`${productName} thumbnail ${idx + 1}`}
        className="object-cover w-full h-full"
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
      />
      {isActive && (
        <span className="absolute inset-0 bg-luxury-gold/10 pointer-events-none" />
      )}
    </button>
  );
});

export default ProductCard;
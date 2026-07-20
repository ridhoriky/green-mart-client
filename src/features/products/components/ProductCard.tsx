'use client';

import { Heart, Star, Store } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useAddToCartMutation } from '@/features/cart/hooks/useCart';
import type { Product } from '@/features/products/types/product';
import { useToggleWishlistMutation } from '@/features/wishlist/hooks/useWishlist';
import { Link, useRouter } from '@/libs/I18nNavigation';

type ProductCardProps = {
  product: Product;
  noBorder?: boolean;
  originalPrice?: number;
  discountPercent?: number;
  children?: React.ReactNode;
};

export function ProductCard(props: ProductCardProps) {
  const router = useRouter();
  const t = useTranslations('ProductsPage');
  const { accessToken } = useAuthStore();
  const toggleWishlistMutation = useToggleWishlistMutation();
  const addToCartMutation = useAddToCartMutation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!accessToken) {
      toast.error('Please sign in to add items to your cart.');
      router.push('/sign-in');
      return;
    }

    addToCartMutation.mutate(
      { productId: props.product.id, quantity: 1 },
      {
        onSuccess: () => {
          toast.success('Successfully added to cart!');
        },
        onError: () => {
          toast.error('Failed to add item to cart. Please try again.');
        },
      },
    );
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!accessToken) {
      toast.error('Please sign in to add items to your wishlist.');
      router.push('/sign-in');
      return;
    }

    toggleWishlistMutation.mutate(props.product.id, {
      onSuccess: () => {
        toast.success(props.product.is_in_wishlist ? 'Removed from wishlist' : 'Added to wishlist');
      },
      onError: () => {
        toast.error('Failed to update wishlist. Please try again.');
      },
    });
  };

  const isOrganic =
    props.product.category_name.toLowerCase().includes('organic') ||
    props.product.name.toLowerCase().includes('organic');

  const imageUrl =
    props.product.primary_image ??
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60';

  const renderBadge = () => {
    if (props.discountPercent) {
      return (
        <Badge
          variant="destructive"
          className="absolute top-3 left-3 z-20 rounded bg-error px-2 py-0.5 text-[10px] font-bold text-white uppercase shadow-sm"
        >
          {props.discountPercent}% OFF
        </Badge>
      );
    }
    if (isOrganic) {
      return (
        <Badge
          variant="success"
          className="absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
        >
          {t('organic')}
        </Badge>
      );
    }
    if (props.product.total_sold > 1000) {
      return (
        <Badge
          variant="default"
          className="absolute top-3 left-3 rounded px-2 py-0.5 text-[10px] font-bold uppercase"
        >
          {t('best_seller')}
        </Badge>
      );
    }
    return null;
  };

  return (
    <Link href={`/products/${props.product.slug}`} className="block h-full">
      <Card
        className={`product-card-hover group relative flex h-full flex-col overflow-hidden transition-all duration-300 ${
          props.noBorder
            ? 'border-none! bg-transparent! shadow-none!'
            : 'rounded-xl border border-outline-variant bg-white hover:shadow-md'
        }`}
      >
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          disabled={toggleWishlistMutation.isPending}
          className={`absolute top-3 right-3 z-30 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border shadow-xs backdrop-blur-xs transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed ${
            props.product.is_in_wishlist
              ? 'border-red-200 bg-red-50/90 text-red-500'
              : 'border-outline-variant bg-white/90 text-on-surface-variant hover:text-red-500'
          }`}
          type="button"
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`h-4 w-4 transition-transform duration-300 ${
              props.product.is_in_wishlist ? 'fill-current' : ''
            } ${toggleWishlistMutation.isPending ? 'animate-bounce scale-110' : ''}`}
          />
        </button>

        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-surface-container-low">
          <Image
            src={imageUrl}
            alt={props.product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            priority={false}
          />
          {renderBadge()}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4">
          {/* Store Info */}
          <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-on-surface-variant">
            <Store className="h-3.5 w-3.5 text-primary" />
            <span className="truncate">{props.product.store_name}</span>
            {props.product.store_is_verified && (
              <span
                className="material-symbols-outlined text-[12px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            )}
          </div>

          {/* Product Name */}
          <h3 className="mb-2 line-clamp-2 h-10 font-title-md text-[14px] font-semibold text-on-surface transition-colors group-hover:text-primary">
            {props.product.name}
          </h3>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Price, Rating, and Sold Info */}
          <div className="mt-3 flex items-center justify-between border-t border-outline-variant pt-3">
            <div className="flex flex-col">
              {props.originalPrice && (
                <span className="mb-0.5 text-[11px] font-medium text-outline line-through">
                  Rp {Math.round(props.originalPrice).toLocaleString('id-ID')}
                </span>
              )}
              <span className="text-[16px] font-bold text-primary">
                {props.product.price &&
                  `Rp ${Math.round(props.product.price).toLocaleString('id-ID')}`}
              </span>
              <div className="flex items-center gap-1 text-[11px] font-medium text-on-surface-variant">
                <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                <span>{props.product.rating_avg.toFixed(1)}</span>
                <span className="text-outline">({props.product.total_sold})</span>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={props.product.stock <= 0 || addToCartMutation.isPending}
              className={`flex h-8 w-8 items-center justify-center rounded-lg border shadow-xs transition-all duration-300 hover:scale-105 active:scale-95 ${
                props.product.stock <= 0
                  ? 'cursor-not-allowed border-outline-variant bg-surface-container-high text-outline'
                  : 'cursor-pointer border-transparent bg-primary text-white hover:bg-primary-container hover:shadow-md'
              }`}
              type="button"
              aria-label="Add to cart"
            >
              <span className="material-symbols-outlined text-[18px]">
                {props.product.stock <= 0 ? 'block' : 'shopping_cart'}
              </span>
            </button>
          </div>

          {props.children}
        </div>
      </Card>
    </Link>
  );
}

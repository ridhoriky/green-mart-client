'use client';

import {
  Heart,
  Star,
  Store,
  Plus,
  Minus,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/features/auth/store/authStore';
import { useAddToCartMutation } from '@/features/cart/hooks/useCart';
import {
  useProductDetailQuery,
  useProductReviewsQuery,
} from '@/features/products/hooks/useProducts';
import type { ProductImage, ReviewListResponse } from '@/features/products/types/product';
import { useToggleWishlistMutation } from '@/features/wishlist/hooks/useWishlist';
import { Link, useRouter } from '@/libs/I18nNavigation';

type ProductDetailSectionProps = {
  slug: string;
};

function ProductDetailLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-container-max animate-pulse px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      <div className="mb-6 h-6 w-24 rounded bg-surface-container-high" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl bg-surface-container-high" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 w-20 rounded-lg bg-surface-container-high" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 w-3/4 rounded bg-surface-container-high" />
          <div className="h-6 w-1/4 rounded bg-surface-container-high" />
          <div className="h-24 w-full rounded bg-surface-container-high" />
          <div className="h-16 w-1/2 rounded bg-surface-container-high" />
        </div>
      </div>
    </div>
  );
}

function ProductDetailNotFound() {
  return (
    <div className="mx-auto max-w-md px-margin-mobile py-16 text-center">
      <AlertCircle className="mx-auto mb-4 h-12 w-12 text-error" />
      <h2 className="font-headline-md mb-2 text-body-lg font-bold text-on-surface">
        Product Not Found
      </h2>
      <p className="mb-6 text-[13px] text-on-surface-variant">
        The product you are looking for does not exist or may have been removed.
      </p>
      <Link href="/products">
        <Button variant="default">Back to Catalog</Button>
      </Link>
    </div>
  );
}

type ProductReviewsSectionProps = {
  isReviewsLoading: boolean;
  reviewsData?: ReviewListResponse;
  reviewPage: number;
  setReviewPage:
    | React.Dispatch<React.SetStateAction<number>>
    | ((page: number | ((p: number) => number)) => void);
};

function ProductReviewsSection(props: ProductReviewsSectionProps) {
  const t = useTranslations('ProductDetailPage');
  const { isReviewsLoading, reviewsData, reviewPage, setReviewPage } = props;

  if (isReviewsLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="animate-pulse border border-outline-variant bg-white p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-surface-container-high" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-1/4 rounded bg-surface-container-high" />
                <div className="h-3 w-1/6 rounded bg-surface-container-high" />
              </div>
            </div>
            <div className="h-12 w-full rounded bg-surface-container-high" />
          </Card>
        ))}
      </div>
    );
  }

  if (reviewsData && reviewsData.items.length > 0) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          {/* Rating Summary Scorecard */}
          <Card className="flex flex-col items-center justify-center rounded-2xl border border-outline-variant bg-white p-6 text-center md:col-span-4">
            <span className="mb-1 text-[12px] font-bold tracking-wider text-outline uppercase">
              {t('average_rating')}
            </span>
            <span className="mb-2 font-display-lg text-[48px] leading-none font-bold text-on-surface">
              {reviewsData.average_rating.toFixed(1)}
            </span>
            <div className="mb-2 flex items-center gap-0.5 text-yellow-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4.5 w-4.5 ${
                    i < Math.round(reviewsData.average_rating)
                      ? 'fill-yellow-500 text-yellow-500'
                      : 'text-outline-variant'
                  }`}
                />
              ))}
            </div>
            <span className="text-[12px] text-outline">
              Based on {reviewsData.total_reviews} customer reviews
            </span>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4 md:col-span-8">
            {reviewsData.items.map((review) => (
              <Card
                key={review.id}
                className="rounded-2xl border border-outline-variant bg-white p-5 shadow-xs"
              >
                <div className="mb-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-outline-variant">
                      {review.buyer_avatar && (
                        <AvatarImage
                          src={review.buyer_avatar}
                          alt={review.buyer_name}
                          className="object-cover"
                        />
                      )}
                      <AvatarFallback className="bg-primary/10 text-[14px] font-bold text-primary">
                        {review.buyer_name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-[13px] font-bold text-on-surface">{review.buyer_name}</h4>
                      <span className="text-[10px] text-outline">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < review.rating
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-outline-variant'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <p className="mb-3 pl-13 text-[13px] leading-relaxed text-on-surface-variant">
                  {review.comment}
                </p>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2 pl-13">
                    {review.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        className="relative h-16 w-16 overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low"
                      >
                        <Image
                          src={imgUrl}
                          alt="Review image"
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Seller Reply */}
                {review.seller_reply && (
                  <div className="mt-4 ml-13 rounded-xl border border-outline-variant/60 bg-surface-container-low p-4">
                    <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-primary">
                      <Store className="h-3.5 w-3.5" />
                      <span>{t('seller_response')}</span>
                      {review.seller_replied_at && (
                        <span className="text-[9px] font-normal text-outline">
                          ({new Date(review.seller_replied_at).toLocaleDateString()})
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] leading-relaxed text-on-surface-variant">
                      {review.seller_reply}
                    </p>
                  </div>
                )}
              </Card>
            ))}

            {/* Pagination */}
            {reviewsData.meta.total_pages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-4">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={reviewPage <= 1}
                  onClick={() => {
                    setReviewPage((p) => Math.max(1, p - 1));
                  }}
                  className="h-9 w-9 rounded-full"
                >
                  <ChevronLeft className="h-4.5 w-4.5" />
                </Button>
                <span className="text-[12px] font-semibold">
                  {reviewPage} / {reviewsData.meta.total_pages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  disabled={reviewPage >= reviewsData.meta.total_pages}
                  onClick={() => {
                    setReviewPage((p) => Math.min(reviewsData.meta.total_pages, p + 1));
                  }}
                  className="h-9 w-9 rounded-full"
                >
                  <ChevronRight className="h-4.5 w-4.5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="mx-auto max-w-md rounded-2xl border-dashed border-outline-variant bg-surface-container-lowest p-8 text-center">
      <span className="text-[13px] text-on-surface-variant">{t('no_reviews')}</span>
    </Card>
  );
}

type ProductDetailGalleryProps = {
  activeImage: ProductImage;
  productName: string;
  isOrganic: boolean;
  imagesList: ProductImage[];
  activeImageIdx: number;
  setActiveImageIdx: (idx: number) => void;
};

function ProductDetailGallery(props: ProductDetailGalleryProps) {
  const tProducts = useTranslations('ProductsPage');
  const { activeImage, productName, isOrganic, imagesList, activeImageIdx, setActiveImageIdx } =
    props;

  return (
    <div className="space-y-4 lg:col-span-6">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low">
        <Image
          src={activeImage.url}
          alt={activeImage.alt_text ?? productName}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        {isOrganic && (
          <Badge
            variant="success"
            className="absolute top-4 left-4 rounded px-3 py-1 text-[11px] font-bold uppercase shadow-sm"
          >
            {tProducts('organic')}
          </Badge>
        )}
      </div>

      {/* Thumbnails */}
      {imagesList.length > 1 && (
        <div className="flex flex-wrap gap-3">
          {imagesList.map((img, idx) => (
            <button
              key={img.id}
              onClick={() => {
                setActiveImageIdx(idx);
              }}
              className={`relative h-20 w-20 overflow-hidden rounded-lg border bg-surface-container-low transition-all ${
                idx === activeImageIdx
                  ? 'scale-95 border-primary shadow-sm ring-2 ring-primary/20'
                  : 'border-outline-variant hover:border-outline'
              }`}
              type="button"
            >
              <Image
                src={img.url}
                alt={`${productName} gallery ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function ProductDetailSection(props: ProductDetailSectionProps) {
  const router = useRouter();
  const t = useTranslations('ProductDetailPage');
  const { accessToken } = useAuthStore();

  const [quantity, setQuantity] = React.useState(1);
  const [activeImageIdx, setActiveImageIdx] = React.useState(0);
  const [reviewPage, setReviewPage] = React.useState(1);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProductDetailQuery(props.slug);

  const { data: reviewsData, isLoading: isReviewsLoading } = useProductReviewsQuery(props.slug, {
    page: reviewPage,
    limit: 5,
  });

  const toggleWishlistMutation = useToggleWishlistMutation();
  const addToCartMutation = useAddToCartMutation();

  const handleWishlistClick = () => {
    if (!product) {
      return;
    }

    if (!accessToken) {
      toast.error('Please sign in to add items to your wishlist.');
      router.push('/sign-in');
      return;
    }

    toggleWishlistMutation.mutate(product.id, {
      onSuccess: () => {
        toast.success(product.is_in_wishlist ? 'Removed from wishlist' : 'Added to wishlist');
      },
      onError: () => {
        toast.error('Failed to update wishlist.');
      },
    });
  };

  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    if (!accessToken) {
      toast.error('Please sign in to add items to your cart.');
      router.push('/sign-in');
      return;
    }

    addToCartMutation.mutate(
      { productId: product.id, quantity },
      {
        onSuccess: () => {
          toast.success(t('added_to_cart'));
        },
        onError: () => {
          toast.error('Failed to add item to cart. Please try again.');
        },
      },
    );
  };

  if (isProductLoading) {
    return <ProductDetailLoadingSkeleton />;
  }

  if (isProductError || !product) {
    return <ProductDetailNotFound />;
  }

  const imagesList: ProductImage[] =
    product.images && product.images.length > 0
      ? product.images
      : [
          {
            id: 'placeholder',
            url:
              product.images?.[0]?.url ??
              'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&auto=format&fit=crop&q=80',
            alt_text: '',
            is_primary: true,
            sort_order: 1,
            created_at: '',
          },
        ];

  const [fallbackActiveImage] = imagesList;
  if (!fallbackActiveImage) {
    throw new Error('Fallback active image is missing');
  }
  const activeImage = imagesList[activeImageIdx] ?? fallbackActiveImage;
  const isOutOfStock = product.stock <= 0;
  const isOrganic =
    product.category.name.toLowerCase().includes('organic') ||
    product.name.toLowerCase().includes('organic');

  return (
    <div className="mx-auto max-w-container-max px-margin-mobile py-stack-md md:px-margin-desktop md:py-stack-lg">
      {/* Back Link */}
      <Link
        href="/products"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Catalog</span>
      </Link>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Image Gallery */}
        <ProductDetailGallery
          activeImage={activeImage}
          productName={product.name}
          isOrganic={isOrganic}
          imagesList={imagesList}
          activeImageIdx={activeImageIdx}
          setActiveImageIdx={setActiveImageIdx}
        />

        {/* Right Column: Product details and Buy section */}
        <div className="space-y-6 lg:col-span-6">
          <div className="space-y-3">
            {/* Store Information */}
            <div className="flex items-center gap-2 text-[13px] font-semibold text-on-surface-variant">
              <Store className="h-4.5 w-4.5 text-primary" />
              <Link
                href={`/stores/${product.store.slug}`}
                className="hover:text-primary hover:underline"
              >
                {product.store.name}
              </Link>
              {product.store.is_verified && (
                <span
                  className="material-symbols-outlined text-[14px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Verified Seller"
                >
                  verified
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="font-headline-lg text-[24px] leading-tight font-bold text-on-surface">
              {product.name}
            </h1>

            {/* Ratings & Sales summary */}
            <div className="flex items-center gap-4 text-[13px] font-medium text-on-surface-variant">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                <span className="font-bold text-on-surface">{product.rating_avg.toFixed(1)}</span>
                <span className="text-outline">({product.total_reviews} reviews)</span>
              </div>
              <div className="h-3.5 w-px bg-outline-variant" />
              <div>
                {product.total_sold} {t('sold')}
              </div>
            </div>
          </div>

          <hr className="border-outline-variant" />

          {/* Pricing & Stock Card */}
          <Card className="space-y-4 rounded-2xl border border-outline-variant bg-surface-container-lowest p-6">
            <div className="flex items-baseline justify-between">
              <span className="font-display-md text-[32px] font-bold text-primary">
                {product.price && `Rp ${Math.round(product.price).toLocaleString('id-ID')}`}
              </span>
              <div>
                {isOutOfStock ? (
                  <Badge variant="destructive" className="rounded px-2.5 py-0.5">
                    {t('out_of_stock')}
                  </Badge>
                ) : (
                  <Badge variant="success" className="rounded px-2.5 py-0.5">
                    In Stock ({product.stock} left)
                  </Badge>
                )}
              </div>
            </div>

            {!isOutOfStock && (
              <div className="space-y-4 pt-2">
                {/* Quantity Selector */}
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-on-surface-variant">
                    {t('quantity')}
                  </span>
                  <div className="flex items-center rounded-full border border-outline-variant bg-white px-1 py-0.5 shadow-xs">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setQuantity((prev) => Math.max(1, prev - 1));
                      }}
                      disabled={quantity <= 1}
                      className="h-8 w-8 rounded-full text-on-surface-variant hover:bg-surface-container-low"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </Button>
                    <span className="w-10 text-center text-[13px] font-bold text-on-surface select-none">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setQuantity((prev) => Math.min(product.stock, prev + 1));
                      }}
                      disabled={quantity >= product.stock}
                      className="h-8 w-8 rounded-full text-on-surface-variant hover:bg-surface-container-low"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Add to Cart & Wishlist Buttons */}
                <div className="flex gap-3">
                  <Button
                    onClick={handleAddToCart}
                    disabled={addToCartMutation.isPending}
                    className="h-12 flex-1 rounded-full font-semibold shadow-sm"
                  >
                    {addToCartMutation.isPending ? 'Adding...' : t('add_to_cart')}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={handleWishlistClick}
                    disabled={toggleWishlistMutation.isPending}
                    className={`h-12 w-12 rounded-full border border-outline-variant transition-colors hover:bg-surface-container-low ${
                      product.is_in_wishlist
                        ? 'border-red-200 bg-red-50/20 text-red-500'
                        : 'text-on-surface-variant hover:text-red-500'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`h-5 w-5 ${product.is_in_wishlist ? 'fill-red-500' : ''}`} />
                  </Button>
                </div>
              </div>
            )}
          </Card>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-title-lg text-body-md font-bold text-on-surface">
              {t('description')}
            </h3>
            <p className="font-body-md text-[14px] leading-relaxed whitespace-pre-line text-on-surface-variant">
              {product.description}
            </p>
          </div>

          {/* Merchant Features / Badges */}
          <div className="grid grid-cols-2 gap-4 border-t border-outline-variant pt-5">
            <div className="flex items-center gap-2.5 text-[12px] font-semibold text-on-surface-variant">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              <span>Direct Farm Source</span>
            </div>
            <div className="flex items-center gap-2.5 text-[12px] font-semibold text-on-surface-variant">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
              <span>Eco-Friendly Packing</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10 border-outline-variant" />

      {/* Bottom Section: Customer Reviews */}
      <section className="space-y-6">
        <h2 className="font-headline-sm text-body-lg font-bold text-on-surface">{t('reviews')}</h2>

        <ProductReviewsSection
          isReviewsLoading={isReviewsLoading}
          reviewsData={reviewsData}
          reviewPage={reviewPage}
          setReviewPage={setReviewPage}
        />
      </section>
    </div>
  );
}

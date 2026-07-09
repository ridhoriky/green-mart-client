import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { productApi } from '@/features/products/api/productApi';
import { ProductDetailSection } from '@/features/products/components/ProductDetailSection';

type ProductDetailPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export async function generateMetadata(props: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await props.params;

  try {
    const product = await productApi.getProductDetail(slug);
    return {
      title: `${product.name} | GreenMart`,
      description: product.description
        ? product.description.slice(0, 155)
        : `Buy ${product.name} fresh from local farmers at GreenMart.`,
    };
  } catch {
    return {
      title: 'Product Details | GreenMart',
      description: 'Buy fresh organic produce direct from local farmers at GreenMart.',
    };
  }
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const { locale, slug } = await props.params;
  setRequestLocale(locale);

  return <ProductDetailSection slug={slug} />;
}

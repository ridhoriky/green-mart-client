import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  QuickAccess,
  CategoryMenu,
  FlashSale,
  FeaturedCategories,
  FeaturedFarmers,
  HarvestBanner,
  RecommendedProducts,
  SustainabilityStats,
  Newsletter,
  HeroSection,
} from '@/features/home';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function IndexPage(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <QuickAccess />
      <CategoryMenu />
      <FlashSale />
      <FeaturedCategories />
      <FeaturedFarmers />
      <HarvestBanner />
      <RecommendedProducts />
      <SustainabilityStats />
      <Newsletter />
    </>
  );
}

import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  AboutHero,
  AboutVisionMission,
  AboutValues,
  AboutHowItWorks,
  AboutCTA,
} from '@/features/about';

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: AboutPageProps): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'About',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default async function AboutPage(props: AboutPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="flex flex-col gap-y-12">
      <AboutHero />
      <AboutVisionMission />
      <AboutValues />
      <AboutHowItWorks />
      <AboutCTA />
    </div>
  );
}

import { setRequestLocale } from 'next-intl/server';
import { BottomNavBar } from '@/components/layout/BottomNavBar';
import { Footer } from '@/components/layout/Footer';
import { TopNavBar } from '@/components/layout/TopNavBar';

export default async function Layout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="font-body-md flex min-h-screen flex-col overflow-x-hidden bg-surface text-on-surface antialiased">
      <TopNavBar />
      <main className="flex-grow pt-16 pb-24 md:pb-0">{props.children}</main>
      <Footer />
      <BottomNavBar />
    </div>
  );
}

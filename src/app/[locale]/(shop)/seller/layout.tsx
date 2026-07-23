import { setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { SellerSidebar } from '@/features/seller/components/SellerSidebar';

export default async function SellerLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <SellerSidebar>{props.children}</SellerSidebar>
    </AuthGuard>
  );
}

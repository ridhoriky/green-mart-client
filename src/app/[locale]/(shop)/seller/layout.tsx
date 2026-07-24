import { setRequestLocale } from 'next-intl/server';
import { AuthGuard } from '@/features/auth/components/AuthGuard';
import { SellerGuard } from '@/features/seller/components/SellerGuard';
import { SellerSidebar } from '@/features/seller/components/SellerSidebar';

export default async function SellerLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <AuthGuard>
      <SellerGuard>
        <SellerSidebar>{props.children}</SellerSidebar>
      </SellerGuard>
    </AuthGuard>
  );
}

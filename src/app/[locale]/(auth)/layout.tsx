import { setRequestLocale } from 'next-intl/server';
import { GuestGuard } from '@/features/auth';

export default async function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const params = await props.params;
  setRequestLocale(params.locale);

  return <GuestGuard>{props.children}</GuestGuard>;
}

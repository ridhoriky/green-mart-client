import { AuthGuard } from '@/features/auth';

export default function AccountPage() {
  return (
    <AuthGuard>
      <div className="container mx-auto px-margin-mobile py-stack-lg md:px-margin-desktop">
        <h1 className="font-headline-lg text-headline-lg text-primary">My Account</h1>
        <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
          Welcome to your account dashboard!
        </p>
      </div>
    </AuthGuard>
  );
}

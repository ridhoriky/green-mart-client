import { NextIntlClientProvider, useTranslations } from 'next-intl';
import { BottomNavBar } from '@/components/layout/BottomNavBar';
import { Footer } from '@/components/layout/Footer';
import { TopNavBar } from '@/components/layout/TopNavBar';
import { PersistLogin } from '@/features/auth';
import { Link } from '@/libs/I18nNavigation';
import { TanstackQueryProvider } from '@/libs/TanstackQueryProvider';
import messages from '@/locales/en.json';
import '@/styles/global.css';
import 'material-symbols/outlined.css';

function NotFoundInner() {
  const t = useTranslations('NotFound');

  return (
    <div className="font-body-md flex min-h-screen flex-col overflow-x-hidden bg-surface text-on-surface antialiased">
      <TopNavBar />

      <main className="flex grow items-center justify-center px-margin-mobile pt-24 pb-stack-lg md:px-margin-desktop">
        <div className="flex w-full max-w-md flex-col items-center space-y-stack-lg text-center">
          <div className="flex flex-col items-center space-y-stack-sm">
            <span
              className="material-symbols-outlined mb-2 text-display-lg text-primary"
              style={{ fontSize: '64px' }}
            >
              potted_plant
            </span>
            <h1 className="font-display-lg text-display-lg leading-tight text-primary">
              {t('title')}
            </h1>
            <h2 className="font-headline-lg text-on-background">{t('subtitle')}</h2>
            <p className="font-body-lg text-on-surface-variant">{t('description')}</p>
          </div>
          <div className="flex w-full flex-col justify-center gap-stack-md sm:flex-row">
            <Link
              href="/"
              className="rounded-lg bg-primary px-8 py-4 font-title-md text-white shadow-md transition-all hover:bg-primary-container active:scale-95"
            >
              {t('back_to_home')}
            </Link>
            <Link
              href="/marketplace"
              className="rounded-lg border border-outline-variant px-8 py-4 font-title-md text-on-surface-variant transition-all hover:bg-surface-container-low active:scale-95"
            >
              {t('marketplace')}
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNavBar />
    </div>
  );
}

export default function NotFound() {
  return (
    <html lang="en">
      <head>
        <title>404 - Page Not Found</title>
      </head>
      <body>
        <TanstackQueryProvider>
          <NextIntlClientProvider locale="en" messages={messages}>
            <PersistLogin>
              <NotFoundInner />
            </PersistLogin>
          </NextIntlClientProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}

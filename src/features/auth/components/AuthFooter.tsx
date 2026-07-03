import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { Link } from '@/libs/I18nNavigation';

export const AuthFooter = () => {
  const t = useTranslations('AuthFooter');

  return (
    <footer className="w-full border-t border-outline-variant bg-surface-container-lowest py-8">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-6 px-margin-mobile font-body-sm text-body-sm text-secondary md:flex-row md:gap-4">
        <span>{t('copy')}</span>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex gap-4">
            <Link className="transition-colors hover:text-primary" href="#">
              {t('privacy')}
            </Link>
            <Link className="transition-colors hover:text-primary" href="#">
              {t('terms')}
            </Link>
            <Link className="transition-colors hover:text-primary" href="#">
              {t('support')}
            </Link>
          </div>
          <div className="hidden h-4 w-px bg-outline-variant/50 sm:block"></div>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  );
};

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

export function HarvestBanner() {
  const t = useTranslations('Index.HarvestBanner');

  return (
    <section className="mx-auto mt-stack-lg max-w-container-max px-margin-desktop">
      <div className="relative flex flex-col items-center justify-between overflow-hidden rounded-3xl bg-linear-to-r from-primary to-[#1B5E20] p-8 text-white sm:p-12 md:flex-row md:gap-8">
        <div className="relative z-10 max-w-xl text-center md:text-left">
          <h2 className="mb-4 font-display-lg text-display-lg">{t('title')}</h2>
          <p className="mb-8 text-body-lg opacity-90">{t('subtitle')}</p>
          <Button
            variant="secondary"
            size="large"
            className="rounded-xl bg-white px-10 font-bold text-primary shadow-lg transition-all hover:bg-surface-container-low"
          >
            {t('become_seller')}
          </Button>
        </div>

        <div className="relative z-10 mt-12 flex w-full flex-col items-center justify-center md:mt-0 md:w-1/2">
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <svg
              className="h-full w-full drop-shadow-2xl"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="blob">
                  <path
                    d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.7,-0.3C88.2,14.5,83.1,29,75,42.1C66.9,55.1,55.8,66.6,42.4,73.8C29,81.1,14.5,84.1,-0.5,85C-15.5,85.9,-31,84.7,-44.6,77.7C-58.3,70.7,-70,57.9,-77.9,43.3C-85.8,28.8,-89.9,12.4,-88.7,-3.7C-87.5,-19.7,-81,-35.3,-71.2,-48.1C-61.4,-60.9,-48.2,-70.9,-34.1,-77.4C-20,-83.9,-10,-86.9,2.5,-91.3C15,-95.7,31.3,-83.6,44.7,-76.4Z"
                    transform="translate(100 100)"
                  ></path>
                </clipPath>
              </defs>
              <path
                d="M44.7,-76.4C58.1,-69.2,69.5,-57.4,77.3,-43.8C85.1,-30.2,89.2,-15.1,88.7,-0.3C88.2,14.5,83.1,29,75,42.1C66.9,55.1,55.8,66.6,42.4,73.8C29,81.1,14.5,84.1,-0.5,85C-15.5,85.9,-31,84.7,-44.6,77.7C-58.3,70.7,-70,57.9,-77.9,43.3C-85.8,28.8,-89.9,12.4,-88.7,-3.7C-87.5,-19.7,-81,-35.3,-71.2,-48.1C-61.4,-60.9,-48.2,-70.9,-34.1,-77.4C-20,-83.9,-10,-86.9,2.5,-91.3C15,-95.7,31.3,-83.6,44.7,-76.4Z"
                transform="translate(100 100)"
                className="fill-white/20"
              ></path>
              <image
                href="/assets/images/top-farmer.jpg"
                x="0"
                y="0"
                width="200"
                height="200"
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#blob)"
              />
            </svg>
          </div>
          <div className="mt-6 text-center">
            <h4 className="font-title-md font-bold text-white">{t('top_farmer')}</h4>
            <p className="mt-1 text-body-sm text-white/90">{t('top_farmer_desc')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

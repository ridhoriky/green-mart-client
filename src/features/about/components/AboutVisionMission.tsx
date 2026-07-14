import { useTranslations } from 'next-intl';

export function AboutVisionMission() {
  const t = useTranslations('About');

  return (
    <section className="py-12">
      <div className="mx-auto max-w-container-max px-margin-mobile md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Vision Card */}
          <div className="glass-panel organic-gradient rounded-3xl p-8 transition-all duration-300 hover:shadow-xl md:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl font-semibold">visibility</span>
            </div>
            <h2 className="mb-4 font-title-md text-2xl font-bold text-primary">
              {t('vision_title')}
            </h2>
            <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              {t('vision_desc')}
            </p>
          </div>

          {/* Mission Card */}
          <div className="glass-panel organic-gradient rounded-3xl p-8 transition-all duration-300 hover:shadow-xl md:p-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <span className="material-symbols-outlined text-3xl font-semibold">
                track_changes
              </span>
            </div>
            <h2 className="mb-4 font-title-md text-2xl font-bold text-primary">
              {t('mission_title')}
            </h2>
            <p className="font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
              {t('mission_desc')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

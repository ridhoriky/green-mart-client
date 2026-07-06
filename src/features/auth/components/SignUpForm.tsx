'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { GoogleLogin } from '@react-oauth/google';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useGoogleLogin } from '@/features/auth/hooks/useGoogleLogin';
import { useRegister } from '@/features/auth/hooks/useRegister';
import { getAuthErrorMessage } from '@/features/auth/utils/authError';
import { registerSchema } from '@/features/auth/validations/authSchemas';
import type { RegisterFormValues } from '@/features/auth/validations/authSchemas';
import { Link } from '@/libs/I18nNavigation';
import { AuthFooter } from './AuthFooter';

export const SignUpForm = () => {
  const t = useTranslations('SignUp');
  const [showPassword, setShowPassword] = React.useState(false);

  const { mutate: register, isPending, error } = useRegister();
  const { handleGoogleSuccess } = useGoogleLogin();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', role: 'user' },
  });

  const onSubmit = (values: RegisterFormValues) => {
    register(values, {
      onError: (err) => {
        const message = getAuthErrorMessage(err, 'Registration failed. Please try again.');
        toast.error(message);
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-on-surface">
      {/* Subtle Background Atmosphere */}
      <div className="organic-gradient pointer-events-none fixed inset-0 z-0"></div>

      <main className="relative flex flex-1 items-center justify-center px-margin-mobile py-8 md:px-0 md:py-12">
        {/* Registration Content Shell */}
        <div className="relative z-10 my-auto grid w-full max-w-[1100px] grid-cols-1 overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl md:grid-cols-2">
          {/* Left Side: Brand Imagery & Messaging */}
          <section className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-on-primary md:flex">
            {/* Background Graphic Pattern */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='%23ffffff' fill-rule='evenodd'/%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px',
              }}
            ></div>
            <div className="relative z-10">
              <Image
                alt="GreenMart Logo"
                className="mb-stack-lg h-auto w-auto brightness-0 invert filter"
                src="/assets/images/logo.png"
                width={100}
                height={33}
                priority
              />
              <h1 className="mb-stack-md font-display-lg text-display-lg leading-tight">
                {t('empowering_harvest')}
              </h1>
              <p className="max-w-sm font-body-lg text-body-lg opacity-90">{t('left_subtitle')}</p>
            </div>
            <div className="relative z-10 space-y-stack-md">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-fixed">verified_user</span>
                <div>
                  <p className="font-label-bold text-label-bold tracking-wider text-primary-fixed uppercase">
                    {t('trusted_network')}
                  </p>
                  <p className="font-body-sm text-body-sm opacity-80">{t('trusted_desc')}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary-fixed">eco</span>
                <div>
                  <p className="font-label-bold text-label-bold tracking-wider text-primary-fixed uppercase">
                    {t('organic_title')}
                  </p>
                  <p className="font-body-sm text-body-sm opacity-80">{t('organic_desc')}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Right Side: Registration Form */}
          <section className="flex flex-col justify-center p-8 md:p-10">
            <div className="mb-stack-lg md:hidden">
              <Image
                alt="GreenMart Logo"
                className="h-auto w-auto"
                src="/assets/images/logo.png"
                width={80}
                height={26}
                priority
              />
            </div>
            <header className="mb-stack-lg">
              <h2 className="mb-2 font-headline-lg text-headline-lg text-on-surface">
                {t('create_account_title')}
              </h2>
              <p className="font-body-lg text-body-lg text-secondary">
                {t('create_account_subtitle')}
              </p>
            </header>

            <Form {...form}>
              <form className="space-y-stack-md" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Full Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="block font-label-bold text-label-bold tracking-wide text-on-surface-variant uppercase">
                        {t('fullname_label')}
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-[20px] text-outline transition-colors group-focus-within:text-primary">
                            person
                          </span>
                          <Input
                            {...field}
                            variant="primary"
                            size="medium"
                            className="bg-surface-container-low pl-10"
                            placeholder={t('fullname_placeholder')}
                            type="text"
                            data-testid="name-input"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="block font-label-bold text-label-bold tracking-wide text-on-surface-variant uppercase">
                        {t('email_label')}
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-[20px] text-outline transition-colors group-focus-within:text-primary">
                            mail
                          </span>
                          <Input
                            {...field}
                            variant="primary"
                            size="medium"
                            className="bg-surface-container-low pl-10"
                            placeholder={t('email_placeholder')}
                            type="email"
                            data-testid="email-input"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="block font-label-bold text-label-bold tracking-wide text-on-surface-variant uppercase">
                        {t('password_label')}
                      </FormLabel>
                      <FormControl>
                        <div className="group relative">
                          <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-[20px] text-outline transition-colors group-focus-within:text-primary">
                            lock
                          </span>
                          <Input
                            {...field}
                            variant="primary"
                            size="medium"
                            className="bg-surface-container-low pr-12 pl-10"
                            placeholder={t('password_placeholder')}
                            type={showPassword ? 'text' : 'password'}
                            data-testid="password-input"
                          />
                          <button
                            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-outline transition-colors hover:text-primary"
                            onClick={() => {
                              setShowPassword((prev) => !prev);
                            }}
                            type="button"
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TOS Checkbox */}
                <div className="flex items-center gap-3 py-1">
                  <Checkbox
                    id="signup-terms"
                    required
                    aria-label="Terms of Service and Privacy Policy"
                    data-testid="terms-checkbox"
                  />
                  <label
                    className="cursor-pointer font-body-sm text-body-sm text-secondary select-none"
                    htmlFor="signup-terms"
                  >
                    {t.rich('terms_agree', {
                      tos: (chunks) => (
                        <Link className="font-semibold text-primary hover:underline" href="#">
                          {chunks}
                        </Link>
                      ),
                      privacy: (chunks) => (
                        <Link className="font-semibold text-primary hover:underline" href="#">
                          {chunks}
                        </Link>
                      ),
                    })}
                  </label>
                </div>

                {/* Global error */}
                {error && !isPending && (
                  <p className="rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-center font-body-sm text-body-sm text-error">
                    {getAuthErrorMessage(error, 'Something went wrong')}
                  </p>
                )}

                {/* Primary Action */}
                <Button
                  variant="primary"
                  size="large"
                  className="mt-4 w-full tracking-widest"
                  type="submit"
                  disabled={isPending}
                  data-testid="signup-submit-btn"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      {t('submit_button')}
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </>
                  )}
                </Button>
              </form>
            </Form>

            <footer className="mt-stack-lg flex flex-col items-center gap-4 border-t border-outline-variant pt-stack-md">
              <p className="font-body-sm text-body-sm text-secondary">
                {t('already_have_account')}{' '}
                <Link
                  className="ml-1 font-bold text-primary transition-colors hover:underline"
                  href="/sign-in"
                >
                  {t('sign_in')}
                </Link>
              </p>

              {/* Social Registration - Google Only & Full Width */}
              <div className="relative w-full">
                {/* Visible Custom Button */}
                <Button
                  type="button"
                  variant="outline"
                  size="medium"
                  className="w-full gap-2 bg-surface-container-lowest hover:bg-surface-container-low active:scale-95"
                  disabled={isPending}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                  <span className="font-body-sm text-body-sm text-on-surface">
                    {t('google_button')}
                  </span>
                </Button>

                {/* Invisible Google Login Overlay */}
                <div className="absolute inset-0 z-10 h-full w-full cursor-pointer overflow-hidden opacity-0 [&_div]:h-full [&_div]:w-full [&_div]:max-w-none [&_iframe]:absolute [&_iframe]:inset-0 [&_iframe]:h-full [&_iframe]:min-h-full [&_iframe]:w-full [&_iframe]:min-w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      toast.error('Google sign-in was cancelled or failed.');
                    }}
                    theme="outline"
                    size="large"
                    shape="rectangular"
                    width="100%"
                  />
                </div>
              </div>
            </footer>
          </section>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
};

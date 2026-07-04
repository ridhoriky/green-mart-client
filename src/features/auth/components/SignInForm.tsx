'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { useLogin } from '@/features/auth/hooks/useLogin';
import { getAuthErrorMessage } from '@/features/auth/utils/authError';
import { loginSchema } from '@/features/auth/validations/authSchemas';
import type { LoginFormValues } from '@/features/auth/validations/authSchemas';
import { Link } from '@/libs/I18nNavigation';
import { AuthFooter } from './AuthFooter';

export const SignInForm = () => {
  const t = useTranslations('SignIn');
  const [showPassword, setShowPassword] = React.useState(false);

  const { mutate: login, isPending, error } = useLogin();
  const { initiateLogin: loginWithGoogle, isPending: isGooglePending } = useGoogleLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (values: LoginFormValues) => {
    login(values, {
      onError: (err) => {
        const message = getAuthErrorMessage(err, 'Login failed. Please try again.');
        toast.error(message);
      },
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-on-surface">
      <main className="agro-gradient relative flex flex-1 items-center justify-center px-margin-mobile py-8 md:py-12">
        {/* Decorative Background */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-secondary-container opacity-30 blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-10%] h-[400px] w-[400px] rounded-full bg-primary-fixed opacity-20 blur-[100px]" />
        </div>

        <div className="z-10 my-auto w-full max-w-[480px]">
          {/* Logo */}
          <div className="mb-6 flex justify-center">
            <Image
              alt="GreenMart Logo"
              className="h-auto w-auto object-contain transition-transform duration-500 hover:scale-105 md:h-16"
              src="/assets/images/logo.png"
              width={180}
              height={64}
              priority
            />
          </div>

          {/* Card */}
          <div className="glass-panel rounded-xl p-8 md:p-10">
            <header className="mb-8 text-center">
              <h1 className="mb-2 font-headline-lg text-headline-lg text-on-surface">
                {t('welcome_back')}
              </h1>
              <p className="font-body-lg text-body-lg text-secondary">{t('sign_in_subtitle')}</p>
            </header>

            {/* ── Form uses FormProvider under the hood ── */}
            <Form {...form}>
              <form className="space-y-stack-md" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center gap-2 font-label-bold text-label-bold text-secondary">
                        <span className="material-symbols-outlined text-[18px]">mail</span>
                        {t('email_label')}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          variant="primary"
                          size="medium"
                          placeholder={t('email_placeholder')}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="flex items-center gap-2 font-label-bold text-label-bold text-secondary">
                          <span className="material-symbols-outlined text-[18px]">lock</span>
                          {t('password_label')}
                        </FormLabel>
                        <Link
                          className="font-label-bold text-label-bold text-primary transition-all hover:underline"
                          href="/reset-password"
                        >
                          {t('forgot_password')}
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            variant="primary"
                            size="medium"
                            className="pr-12"
                            placeholder={t('password_placeholder')}
                          />
                          <button
                            type="button"
                            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-secondary transition-colors hover:text-primary"
                            onClick={() => {
                              setShowPassword((prev) => !prev);
                            }}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            <span className="material-symbols-outlined">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Remember Me */}
                <div className="flex items-center gap-3 py-1">
                  <Checkbox id="signin-remember" aria-label={t('remember_me')} />
                  <label
                    htmlFor="signin-remember"
                    className="cursor-pointer font-body-sm text-body-sm text-secondary select-none"
                  >
                    {t('remember_me')}
                  </label>
                </div>

                {/* API-level error (not field-specific) */}
                {error && !isPending && (
                  <p className="rounded-lg border border-error/30 bg-error/10 px-4 py-2 text-center font-body-sm text-body-sm text-error">
                    {getAuthErrorMessage(error, 'Something went wrong')}
                  </p>
                )}

                {/* Submit */}
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isPending}
                  className="w-full"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    t('submit_button')
                  )}
                </Button>
              </form>
            </Form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-outline-variant" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-surface px-4 font-label-bold text-label-bold tracking-wider text-secondary uppercase">
                  {t('social_divider')}
                </span>
              </div>
            </div>

            {/* Google */}
            <Button
              type="button"
              variant="outline"
              size="medium"
              className="w-full gap-3 bg-surface-container-lowest text-on-surface hover:bg-surface-container-low"
              onClick={() => {
                loginWithGoogle();
              }}
              disabled={isPending || isGooglePending}
            >
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {t('google_button')}
            </Button>

            {/* Footer */}
            <footer className="mt-10 text-center">
              <p className="font-body-sm text-body-sm text-secondary">
                {t('new_to_greenmart')}{' '}
                <Link className="ml-1 font-bold text-primary hover:underline" href="/sign-up">
                  {t('create_account')}
                </Link>
              </p>
            </footer>
          </div>

          {/* Trust Badges */}
          <div className="mt-stack-lg flex justify-center gap-gutter opacity-60">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">verified_user</span>
              <span className="font-label-bold text-label-bold">{t('secure_access')}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">eco</span>
              <span className="font-label-bold text-label-bold">{t('sustainable_data')}</span>
            </div>
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
};

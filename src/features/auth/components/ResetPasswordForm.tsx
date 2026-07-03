'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForgotPassword } from '@/features/auth/hooks/useForgotPassword';
import { useResetPassword } from '@/features/auth/hooks/useResetPassword';
import { getAuthErrorMessage } from '@/features/auth/utils/authError';
import { forgotPasswordSchema, resetPasswordSchema } from '@/features/auth/validations/authSchemas';
import type {
  ForgotPasswordFormValues,
  ResetPasswordFormValues,
} from '@/features/auth/validations/authSchemas';
import { AuthFooter } from './AuthFooter';

export const ResetPasswordForm = () => {
  const t = useTranslations('ResetPassword');
  const params = useParams<{ 'reset-password'?: string[] }>();
  const token = params?.['reset-password']?.[0];

  const [submitted, setSubmitted] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const { mutate: forgotPassword, isPending: isForgotPasswordPending } = useForgotPassword();
  const { mutate: resetPassword, isPending: isResetPasswordPending } = useResetPassword();

  // 1. Form for requesting reset link (forgot password)
  const forgotForm = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  // 2. Form for setting new password
  const resetForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  const onForgotSubmit = (values: ForgotPasswordFormValues) => {
    forgotPassword(values, {
      onSuccess: () => {
        setSubmitted(true);
        toast.success('Password reset email sent. Check your inbox.');
      },
      onError: (err) => {
        const message = getAuthErrorMessage(err, 'Failed to send reset email.');
        toast.error(message);
      },
    });
  };

  const onResetSubmit = (values: ResetPasswordFormValues) => {
    if (!token) {
      return;
    }
    resetPassword(
      { token, newPassword: values.newPassword },
      {
        onSuccess: () => {
          toast.success('Password updated successfully. Please login.');
        },
        onError: (err) => {
          const message = getAuthErrorMessage(err, 'Failed to update password.');
          toast.error(message);
        },
      },
    );
  };

  const isPending = token ? isResetPasswordPending : isForgotPasswordPending;

  const renderCardContent = () => {
    if (submitted && !token) {
      return (
        <div className="mt-stack-md space-y-stack-md">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <span className="material-symbols-outlined text-[32px]">mark_email_read</span>
          </div>
          <p className="font-body-lg text-body-lg text-secondary">
            We sent a reset link to{' '}
            <strong className="text-on-surface">{forgotForm.getValues('email')}</strong>. Check your
            inbox.
          </p>
        </div>
      );
    }

    if (token) {
      return (
        <>
          <p className="mb-stack-lg max-w-[280px] font-body-lg text-body-lg text-secondary">
            {t('set_new_password_subtitle')}
          </p>

          <Form {...resetForm}>
            <form
              className="flex w-full flex-col gap-stack-md"
              onSubmit={resetForm.handleSubmit(onResetSubmit)}
            >
              {/* New Password Field */}
              <FormField
                control={resetForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem className="w-full space-y-unit text-left">
                    <FormLabel className="block font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
                      {t('new_password_label')}
                    </FormLabel>
                    <FormControl>
                      <div className="group relative">
                        <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">
                          lock
                        </span>
                        <Input
                          {...field}
                          variant="primary"
                          size="medium"
                          className="pr-12 pl-10"
                          placeholder={t('new_password_placeholder')}
                          type={showPassword ? 'text' : 'password'}
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

              {/* Confirm Password Field */}
              <FormField
                control={resetForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="w-full space-y-unit text-left">
                    <FormLabel className="block font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
                      {t('confirm_password_label')}
                    </FormLabel>
                    <FormControl>
                      <div className="group relative">
                        <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">
                          lock
                        </span>
                        <Input
                          {...field}
                          variant="primary"
                          size="medium"
                          className="pr-12 pl-10"
                          placeholder={t('confirm_password_placeholder')}
                          type={showConfirmPassword ? 'text' : 'password'}
                        />
                        <button
                          className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-outline transition-colors hover:text-primary"
                          onClick={() => {
                            setShowConfirmPassword((prev) => !prev);
                          }}
                          type="button"
                          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            {showConfirmPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant="primary"
                size="large"
                className="w-full gap-2"
                type="submit"
                disabled={isPending}
              >
                {isPending && <Loader2 className="h-5 w-5 animate-spin text-white" />}
                <span>
                  {isPending
                    ? t('submitting_new_password_button')
                    : t('submit_new_password_button')}
                </span>
              </Button>
            </form>
          </Form>
        </>
      );
    }

    return (
      <>
        <p className="mb-stack-lg max-w-[280px] font-body-lg text-body-lg text-secondary">
          {t('reset_password_subtitle')}
        </p>

        <Form {...forgotForm}>
          <form
            className="flex w-full flex-col gap-stack-md"
            onSubmit={forgotForm.handleSubmit(onForgotSubmit)}
          >
            <FormField
              control={forgotForm.control}
              name="email"
              render={({ field }) => (
                <FormItem className="w-full space-y-unit text-left">
                  <FormLabel className="block font-label-bold text-label-bold tracking-wider text-on-surface-variant uppercase">
                    {t('email_label')}
                  </FormLabel>
                  <FormControl>
                    <div className="group relative">
                      <span className="material-symbols-outlined absolute top-1/2 left-3 -translate-y-1/2 text-outline transition-colors group-focus-within:text-primary">
                        mail
                      </span>
                      <Input
                        {...field}
                        variant="primary"
                        size="medium"
                        className="pr-4 pl-10"
                        placeholder={t('email_placeholder')}
                        type="email"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              variant="primary"
              size="large"
              className="w-full gap-2"
              type="submit"
              disabled={isPending}
            >
              {isPending && <Loader2 className="h-5 w-5 animate-spin text-white" />}
              <span>{isPending ? t('sending_button') : t('submit_button')}</span>
            </Button>
          </form>
        </Form>
      </>
    );
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background text-on-surface">
      {/* Decorative Ambient Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div
          className="bg-blob top-[-10%] left-[-5%] h-96 w-96 bg-primary-fixed"
          style={{ animationDelay: '0s' }}
        ></div>
        <div
          className="bg-blob right-[-5%] bottom-[-10%] h-[500px] w-[500px] bg-secondary-fixed"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <main className="relative z-10 flex flex-1 items-center justify-center px-margin-mobile py-8 md:py-12">
        <div className="my-auto w-full max-w-md">
          {/* Logo Section */}
          <div className="mb-6 flex justify-center">
            <Image
              alt="GreenMart Logo"
              className="h-auto w-auto object-contain transition-transform duration-500 hover:scale-105"
              src="/assets/images/logo.png"
              width={150}
              height={48}
              priority
            />
          </div>

          {/* Reset Password Card */}
          <div className="glass-panel flex flex-col items-center rounded-xl p-8 text-center md:p-10">
            <div className="mb-stack-md flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-primary">
              <span className="material-symbols-outlined text-[32px]">lock_reset</span>
            </div>

            <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
              {token ? t('set_new_password_title') : t('reset_password')}
            </h1>

            {renderCardContent()}
          </div>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
};

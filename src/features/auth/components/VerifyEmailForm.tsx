'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useResendOtp } from '@/features/auth/hooks/useResendOtp';
import { useVerifyEmail } from '@/features/auth/hooks/useVerifyEmail';
import { getAuthErrorMessage } from '@/features/auth/utils/authError';
import { verifyEmailSchema } from '@/features/auth/validations/authSchemas';
import type { VerifyEmailFormValues } from '@/features/auth/validations/authSchemas';
import { Link } from '@/libs/I18nNavigation';
import { AuthFooter } from './AuthFooter';

export const VerifyEmailForm = () => {
  const t = useTranslations('VerifyEmail');

  const [otp, setOtp] = React.useState<string[]>(Array.from({ length: 6 }, () => ''));
  const inputRefs = React.useRef<(HTMLElement | null)[]>([]);

  const pendingEmail =
    typeof window === 'undefined'
      ? ''
      : (sessionStorage.getItem('pending_verification_email') ?? '');

  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();
  const { mutate: resendOtp, isPending: isResendPending, cooldown } = useResendOtp();

  const getResendButtonText = () => {
    if (cooldown > 0) {
      return `Resend in ${cooldown}s`;
    }
    if (isResendPending) {
      return t('resending_code');
    }
    return t('resend_code');
  };

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { otpCode: '' },
  });

  const handleVerify = (values: VerifyEmailFormValues) => {
    verifyEmail(
      { email: pendingEmail, otpCode: values.otpCode },
      {
        onError: (err) => {
          const message = getAuthErrorMessage(err, 'Verification failed. Please try again.');
          toast.error(message);
        },
      },
    );
  };

  const handleResend = () => {
    if (!pendingEmail) {
      toast.error('Email not found. Please register again.');
      return;
    }
    resendOtp(
      { email: pendingEmail },
      {
        onSuccess: () => {
          toast.success('Verification code resent to your email.');
        },
        onError: (err) => {
          const message = getAuthErrorMessage(err, 'Failed to resend code.');
          toast.error(message);
        },
      },
    );
  };

  const isResending = isResendPending || cooldown > 0;

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-background text-on-surface">
      {/* Transactional Header */}
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-container-max items-center justify-center px-margin-mobile md:px-margin-desktop">
          <Image
            alt="GreenMart Logo"
            className="h-auto w-auto object-contain"
            src="/assets/images/logo.png"
            width={120}
            height={40}
            priority
          />
        </div>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-margin-mobile pt-24 pb-8 md:pb-12">
        <div className="my-auto w-full max-w-md">
          {/* Decorative Icon */}
          <div className="mb-stack-lg flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-container text-primary shadow-xs">
              <span className="material-symbols-outlined text-4xl">mark_email_read</span>
            </div>
          </div>

          {/* Heading Content */}
          <div className="mb-stack-lg text-center">
            <h1 className="mb-stack-sm font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
              {t('title')}
            </h1>
            <p className="font-body-lg text-body-lg text-secondary">{t('subtitle')}</p>
            {pendingEmail && (
              <p className="mt-2 font-body-sm text-body-sm text-primary">{pendingEmail}</p>
            )}
          </div>

          {/* Verification Form Card */}
          <div className="glass-panel rounded-xl p-8 shadow-2xl">
            <Form {...form}>
              <form className="space-y-stack-lg" onSubmit={form.handleSubmit(handleVerify)}>
                {/* 6-digit inputs */}
                <FormField
                  control={form.control}
                  name="otpCode"
                  render={() => (
                    <FormItem className="space-y-stack-lg">
                      <FormControl>
                        <div className="flex justify-between gap-2">
                          {otp.map((digit, idx) => (
                            <Input
                              key={idx}
                              ref={(el) => {
                                inputRefs.current[idx] = el;
                              }}
                              type="text"
                              inputMode="numeric"
                              maxLength={1}
                              pattern="\d*"
                              value={digit}
                              onChange={(e) => {
                                const val = e.target.value;
                                const cleanValue = val.replaceAll(/\D/gu, '').slice(-1);
                                const newOtp = [...otp];
                                newOtp[idx] = cleanValue;
                                setOtp(newOtp);
                                form.setValue('otpCode', newOtp.join(''), { shouldValidate: true });

                                if (cleanValue && idx < 5) {
                                  inputRefs.current[idx + 1]?.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace') {
                                  if (!otp[idx] && idx > 0) {
                                    const newOtp = [...otp];
                                    newOtp[idx - 1] = '';
                                    setOtp(newOtp);
                                    form.setValue('otpCode', newOtp.join(''), {
                                      shouldValidate: true,
                                    });
                                    inputRefs.current[idx - 1]?.focus();
                                  } else {
                                    const newOtp = [...otp];
                                    newOtp[idx] = '';
                                    setOtp(newOtp);
                                    form.setValue('otpCode', newOtp.join(''), {
                                      shouldValidate: true,
                                    });
                                  }
                                }
                              }}
                              onPaste={
                                idx === 0
                                  ? (e) => {
                                      e.preventDefault();
                                      const pasteText = e.clipboardData
                                        .getData('text')
                                        .replaceAll(/\D/gu, '')
                                        .slice(0, 6);
                                      // eslint-disable-next-line typescript/no-misused-spread
                                      const pasteData = [...pasteText];
                                      const newOtp = [...otp];

                                      for (let i = 0; i < pasteData.length; i += 1) {
                                        const char = pasteData[i];
                                        if (char !== undefined) {
                                          newOtp[i] = char;
                                          const el = inputRefs.current[i];
                                          if (el instanceof HTMLInputElement) {
                                            el.value = char;
                                          }
                                        }
                                      }

                                      setOtp(newOtp);
                                      form.setValue('otpCode', newOtp.join(''), {
                                        shouldValidate: true,
                                      });
                                      const focusIndex = Math.min(pasteData.length, 5);
                                      inputRefs.current[focusIndex]?.focus();
                                    }
                                  : undefined
                              }
                              variant="primary"
                              size="large"
                              className="w-12 text-center font-title-md text-title-md"
                              aria-label={`Digit ${idx + 1}`}
                            />
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  disabled={isVerifying || form.watch('otpCode').length < 6}
                  className="w-full gap-2"
                >
                  {isVerifying && <Loader2 className="h-5 w-5 animate-spin" />}
                  <span>{isVerifying ? t('verifying_button') : t('verify_button')}</span>
                </Button>
              </form>
            </Form>

            {/* Resend Action */}
            <div className="mt-stack-lg flex flex-col items-center gap-2 text-center">
              <p className="font-body-sm text-body-sm text-secondary">{t('did_not_receive')}</p>
              <Button
                type="button"
                variant="link"
                onClick={handleResend}
                disabled={isResending}
                className="h-auto p-0 font-label-bold text-label-bold text-primary hover:underline"
              >
                {getResendButtonText()}
              </Button>
            </div>
          </div>

          {/* Contact Support Note */}
          <p className="mt-stack-lg text-center font-body-sm text-body-sm text-secondary">
            {t('need_help')}{' '}
            <Link href="#" className="font-semibold text-primary transition-all hover:underline">
              {t('contact_support')}
            </Link>
          </p>
        </div>
      </main>

      <AuthFooter />
    </div>
  );
};

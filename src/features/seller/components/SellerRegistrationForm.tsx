'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';
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
import { useAuthStore } from '@/features/auth/store/authStore';
import { sellerApi } from '@/features/seller/api/sellerApi';
import type { CreateStoreRequest } from '@/features/seller/types/seller';
import { useRouter } from '@/libs/I18nNavigation';

const formSchema = z.object({
  store_name: z
    .string()
    .min(3, { message: 'store_name_min_length' })
    .max(50, { message: 'store_name_max_length' }),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const SellerRegistrationForm = () => {
  const t = useTranslations('SellerRegisterPage');
  const router = useRouter();
  const setCredentials = useAuthStore((state) => state.setCredentials);
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (user?.role === 'seller') {
      router.push('/seller/dashboard');
    }
  }, [user, router]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      store_name: '',
      description: '',
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: CreateStoreRequest) => await sellerApi.registerStore(data),
    onSuccess: () => {
      toast.success(t('registration_success'));
      if (user && accessToken) {
        setCredentials({ ...user, role: 'seller' }, accessToken);
      }
      router.push('/seller/dashboard');
    },
    onError: (error: unknown) => {
      const message = error instanceof Error ? error.message : t('registration_failed');
      toast.error(message);
    },
  });

  const onSubmit = (values: FormValues) => {
    registerMutation.mutate({
      store_name: values.store_name,
      description: values.description,
    });
  };

  return (
    <div className="mx-auto w-full max-w-md">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <span className="material-symbols-outlined text-[32px] text-primary">storefront</span>
        </div>
        <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface">
          {t('title')}
        </h1>
        <p className="mt-2 font-body-sm text-body-sm text-on-surface-variant">{t('subtitle')}</p>
      </div>

      <div className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="store_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('store_name_label')}</FormLabel>
                  <FormControl>
                    <Input
                      id="seller-register-store-name"
                      placeholder={t('store_name_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t('store_description_label')}{' '}
                    <span className="text-on-surface-variant">({t('optional')})</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="seller-register-description"
                      placeholder={t('store_description_placeholder')}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              id="seller-register-submit"
              type="submit"
              variant="primary"
              className="w-full"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? (
                <>
                  <span className="material-symbols-outlined mr-2 animate-spin text-[20px]">
                    progress_activity
                  </span>
                  {t('submitting')}
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined mr-2 text-[20px]">store</span>
                  {t('submit_registration')}
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

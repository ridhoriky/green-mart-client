'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUpdateUserMutation, useUserQuery } from '@/features/auth/hooks/useUser';
import { useAuthStore } from '@/features/auth/store/authStore';
import type { UserResponse } from '@/features/auth/types/auth';
import type { UserProfileFormValues } from '@/features/auth/validations/authSchemas';
import { userProfileSchema } from '@/features/auth/validations/authSchemas';
import { Link } from '@/libs/I18nNavigation';

function UserHeader(props: { user?: UserResponse; avatarUrl?: string }) {
  const t = useTranslations('UserProfilePage');
  const initial = props.user?.name?.charAt(0).toUpperCase() ?? 'U';

  const getRoleText = (role?: string) => {
    if (role === 'seller') {
      return t('role_seller');
    }
    if (role === 'admin') {
      return t('role_admin');
    }
    return t('role_buyer');
  };

  const roleText = getRoleText(props.user?.role);

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm sm:flex-row sm:justify-between">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 border-primary/20 bg-linear-to-tr from-primary to-secondary font-bold text-white shadow-md">
          {props.avatarUrl && props.avatarUrl.trim() !== '' ? (
            <Image
              src={props.avatarUrl}
              alt={props.user?.name ?? 'User Avatar'}
              fill
              unoptimized
              className="object-cover"
            />
          ) : (
            <div className="text-title-lg flex h-full w-full items-center justify-center">
              {initial}
            </div>
          )}
        </div>
        <div>
          <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">
            {props.user?.name}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">{props.user?.email}</p>
          <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary-container px-3 py-0.5 text-xs font-bold text-on-secondary-container">
            <span className="material-symbols-outlined text-[14px]">badge</span>
            <span>{roleText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserForm(props: { user?: UserResponse }) {
  const t = useTranslations('UserProfilePage');
  const userId = props.user?.id ?? '';
  const updateMutation = useUpdateUserMutation(userId);
  const [avatarError, setAvatarError] = useState(false);

  const form = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      name: props.user?.name ?? '',
      phone: props.user?.phone ?? '',
      avatar_url: props.user?.avatar_url ?? '',
    },
  });

  useEffect(() => {
    if (props.user) {
      form.reset({
        name: props.user.name ?? '',
        phone: props.user.phone ?? '',
        avatar_url: props.user.avatar_url ?? '',
      });
    }
  }, [props.user, form]);

  const onSubmit = async (values: UserProfileFormValues) => {
    try {
      await updateMutation.mutateAsync(values);
      toast.success(t('update_success'));
    } catch {
      toast.error(t('update_failed'));
    }
  };

  const avatarUrl = form.watch('avatar_url');

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <h3 className="mb-6 font-title-md text-title-md font-bold text-on-surface">
        {t('personal_info_title')}
      </h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-on-surface">
            {t('field_name')}
          </label>
          <Input id="name" placeholder={t('field_name_placeholder')} {...form.register('name')} />
          {form.formState.errors.name && (
            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-on-surface">
            {t('field_email')}
          </label>
          <Input
            id="email"
            value={props.user?.email ?? ''}
            disabled
            className="cursor-not-allowed bg-surface-container-low opacity-80"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium text-on-surface">
            {t('field_role')}
          </label>
          <Input
            id="role"
            value={props.user?.role ?? ''}
            disabled
            className="cursor-not-allowed bg-surface-container-low uppercase opacity-80"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-on-surface">
            {t('field_phone')}
          </label>
          <Input
            id="phone"
            placeholder={t('field_phone_placeholder')}
            {...form.register('phone')}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="avatar_url" className="text-sm font-medium text-on-surface">
            {t('field_avatar_url')}
          </label>
          <Input
            id="avatar_url"
            placeholder={t('field_avatar_placeholder')}
            {...form.register('avatar_url')}
            onChange={(e) => {
              setAvatarError(false);
              void form.register('avatar_url').onChange(e);
            }}
          />
          {avatarUrl && !avatarError && (
            <div className="mt-2">
              <p className="mb-1 font-body-sm text-xs font-medium text-muted-foreground">
                {t('avatar_preview')}:
              </p>
              <div className="relative h-16 w-16 overflow-hidden rounded-full border">
                <Image
                  src={avatarUrl}
                  alt="Avatar Preview"
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => {
                    setAvatarError(true);
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={updateMutation.isPending}>
            {updateMutation.isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[18px]">
                  progress_activity
                </span>
                {t('saving_button')}
              </>
            ) : (
              t('save_button')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

function SecuritySection() {
  const t = useTranslations('UserProfilePage');

  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
      <h3 className="mb-2 font-title-md text-title-md font-bold text-on-surface">
        {t('security_title')}
      </h3>
      <p className="font-body-md text-body-md mb-6 max-w-2xl font-normal text-on-surface-variant">
        {t('security_desc')}
      </p>
      <Link
        href="/reset-password"
        className="inline-flex items-center gap-2 rounded-lg border border-outline px-4 py-2.5 font-label-bold text-label-bold text-on-surface transition-colors hover:bg-surface-container-low"
      >
        <span className="material-symbols-outlined text-[20px]">lock_reset</span>
        {t('change_password_button')}
      </Link>
    </div>
  );
}

/**
 * User Profile component for inspecting and updating personal details.
 * @returns User profile page UI.
 */
export function UserProfilePage() {
  const t = useTranslations('UserProfilePage');
  const storeUser = useAuthStore((state) => state.user);
  const userId = storeUser?.id ?? '';

  const { data: user, isLoading, error } = useUserQuery(userId);

  const activeUser = user ?? storeUser ?? undefined;

  if (isLoading && !activeUser) {
    return (
      <div className="container mx-auto max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="flex min-h-75 items-center justify-center">
          <span className="material-symbols-outlined animate-spin text-[32px] text-primary">
            progress_activity
          </span>
          <span className="font-body-md ml-2 text-on-surface-variant">{t('loading')}</span>
        </div>
      </div>
    );
  }

  if (error && !activeUser) {
    return (
      <div className="container mx-auto max-w-4xl px-margin-mobile py-stack-lg md:px-margin-desktop">
        <div className="rounded-xl border border-error bg-error/10 p-6 text-center text-error">
          <p className="font-bold">{t('error_loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-8 px-margin-mobile py-stack-lg md:px-margin-desktop">
      <div>
        <h1 className="font-headline-lg text-headline-lg font-bold text-primary">{t('title')}</h1>
        <p className="font-body-md text-body-md mt-1 text-on-surface-variant">{t('subtitle')}</p>
      </div>

      <UserHeader user={activeUser} avatarUrl={activeUser?.avatar_url} />
      <UserForm user={activeUser} />
      <SecuritySection />
    </div>
  );
}

'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import * as React from 'react';
import { Env } from '@/libs/Env';

/**
 * Wraps children with the Google OAuth context required by @react-oauth/google hooks.
 * Client-only provider — safe to use in Server Component layouts via the
 * standard "client boundary wrapper" pattern.
 * @param props - Component props.
 * @param props.children - Child nodes to render inside the provider.
 * @returns JSX element wrapping children with GoogleOAuthProvider.
 */
export const GoogleAuthProvider = (props: { children: React.ReactNode }) => (
  <GoogleOAuthProvider clientId={Env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
    {props.children}
  </GoogleOAuthProvider>
);

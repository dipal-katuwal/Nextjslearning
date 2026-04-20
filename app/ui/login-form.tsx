'use client';

import { lusitana } from '@/app/ui/fonts';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from './button';
import { useActionState } from 'react';
import { authenticate, registerUser } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm({ isRegisterPage = false }: { isRegisterPage?: boolean }) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  // Toggle between actions based on the prop
  const [errorMessage, formAction, isPending] = useActionState(
    isRegisterPage ? registerUser : authenticate,
    undefined,
  );

  return (
    <form 
      key={isRegisterPage ? 'signup-form' : 'login-form'}
      action={formAction} 
      className="space-y-3"
    >
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className={`${lusitana.className} mb-3 text-2xl`}>
          {isRegisterPage ? 'Create an account.' : 'Please log in to continue.'}
        </h1>
        <div className="w-full">
          {/* Name Field - Only visible on Sign Up page */}
          {isRegisterPage && (
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="name"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                />
                <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>

          {/* Password Field */}
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
                required
                minLength={6}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>

        <input type="hidden" name="redirectTo" value={callbackUrl} />
        
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          {isRegisterPage ? 'Register' : 'Log in'} 
          <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {/* Toggle Links using Next.js Link */}
        <div className="mt-4 text-center">
          {isRegisterPage ? (
            <Link 
              href="/login" 
              className="text-sm text-blue-500 hover:underline"
            >
              Already have an account? Log in
            </Link>
          ) : (
            <Link 
              href="/signup" 
              className="text-sm text-blue-500 hover:underline"
            >
              Don't have an account? Sign up
            </Link>
          )}
        </div>

        {/* Dynamic Error/Success Messaging */}
        <div className="flex h-8 items-end space-x-1">
          {errorMessage && (
            <>
              <ExclamationCircleIcon 
                className={`h-5 w-5 ${
                  errorMessage.includes('created') ? 'text-green-500' : 'text-red-500'
                }`} 
              />
              <p 
                className={`text-sm ${
                  errorMessage.includes('created') ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {errorMessage}
              </p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
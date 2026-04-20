import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';

export default function SignUpPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        {/* 1. Wrap the form in Suspense */}
        <Suspense fallback={<div className="h-[400px] w-full animate-pulse bg-gray-100 rounded-lg" />}>
          <LoginForm isRegisterPage={true} />
        </Suspense>
      </div>
    </main>
  );
}
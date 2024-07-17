'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import useAuthStore from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';

export default function GuestLayout({ children }: { children: React.ReactNode }) {
     const { token } = useAuthStore();
     const { isDarkMode } = useThemeStore()

     const router = useRouter();

     useEffect(() => {
          if (isDarkMode) {
               document.querySelector('html')?.classList.add('dark')
          } else {
               document.querySelector('html')?.classList.remove('dark')
          }
     }, [isDarkMode])

     if (token) {
          router.push('/');
     } else {
          return <>{children}</>
     }
}

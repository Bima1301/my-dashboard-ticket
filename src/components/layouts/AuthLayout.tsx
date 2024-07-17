'use client'

import useAuthStore from '@/stores/authStore';
import { useThemeStore } from '@/stores/themeStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    const { token } = useAuthStore();
    const router = useRouter();
    if (!token) {
        router.push('/login');
    }
    const { isDarkMode } = useThemeStore()


    useEffect(() => {
        if (isDarkMode) {
            document.querySelector('html')?.classList.add('dark')
        } else {
            document.querySelector('html')?.classList.remove('dark')
        }
    }, [isDarkMode])

    return (
        <main>
            {children}
        </main>
    )
}

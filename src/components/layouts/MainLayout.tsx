'use client'
import useAuthStore from "@/stores/authStore";
import { useEffect, useState } from "react";
import SidebarDrawer from "../sections/SidebarDrawer";
import Topbar from "../sections/Topbar";
import useIsMobile from "@/hooks/useIsMobile";
import toast from "react-hot-toast";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { setCurrentUser, token, setToken } = useAuthStore();
    const isMobile = useIsMobile();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    const getUser = async () => {
        const res = await fetch('/api/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        if (res.status === 200) {
            const data = await res.json()
            setCurrentUser(data.user)
        } else {
            toast.error('Invalid token')
            setCurrentUser(null)
            setToken(null)
            localStorage.removeItem('ACCESS_TOKEN')
            window.location.href = '/login'
        }
    }

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token]);

    return (
        <div className='relative flex flex-row w-full min-h-screen dark:bg-gray-900 bg-slate-200 text-gray-900 dark:text-white'>
            <SidebarDrawer isSidebarOpen={isSidebarOpen} />
            {isSidebarOpen && isMobile && (
                <div className="fixed inset-0 bg-black/50 z-10" onClick={closeSidebar}></div>
            )}
            <div className={`relative w-full transition-opacity ${isSidebarOpen ? 'opacity-75' : 'opacity-100'} ${isMobile ? (isSidebarOpen ? '' : '') : 'pl-[250px]'}`}>
                <Topbar toggleSidebar={toggleSidebar} />
                <div className="px-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

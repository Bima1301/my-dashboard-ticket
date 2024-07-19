'use client'
import { useEffect, useState } from "react";
import { IoMoon, IoSunny, IoMenu } from "react-icons/io5";
import { Avatar, Dropdown } from "flowbite-react";
import useIsMobile from "@/hooks/useIsMobile";
import useAuthStore from "@/stores/authStore";
import { useThemeStore } from "@/stores/themeStore";
import { usePathname } from "next/navigation";
import { formatPathname } from "@/libs/utils";

export default function Topbar({ toggleSidebar }: { toggleSidebar: () => void }) {
    const { currentUser, setToken, setCurrentUser } = useAuthStore();
    const { toggleTheme, isDarkMode } = useThemeStore();
    const isMobile = useIsMobile();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);

    const handleLogout = () => {
        setToken(null);
        setCurrentUser(null);
        window.location.href = '/login';
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`sticky top-0 z-20 flex flex-row justify-between p-4 items-center transition-colors ${isScrolled ? 'bg-gray-800/10 dark:bg-white/10 backdrop-blur-sm' : 'bg-transparent'}`}>
            {isMobile && (
                <button onClick={toggleSidebar} className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                    <IoMenu className="md:size-[24px] size-6" />
                </button>
            )}
            <p className="md:text-2xl text-lg font-semibold">
                {formatPathname(pathname)}
            </p>
            <div className="flex flex-row items-center gap-3 divide-x-2 divide-gray-400 dark:divide-gray-500">
                <button
                    onClick={toggleTheme}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                    {isDarkMode ? <IoMoon className="md:size-[24px] size-4" /> : <IoSunny className="md:size-[24px] size-4" />}
                </button>
                <Dropdown label="" dismissOnClick={false} renderTrigger={() => (
                    <div className="flex flex-row items-center gap-2 pl-3 cursor-pointer">
                        <p className="md:text-sm text-xs font-medium">
                            {currentUser?.name}
                        </p>
                        <Avatar img={'/images/person.jpg'} className="object-cover" rounded bordered />
                    </div>
                )}>
                    <Dropdown.Item>
                        <button className="w-full text-start" onClick={handleLogout}>
                            Logout
                        </button>
                    </Dropdown.Item>
                </Dropdown>
            </div>
        </div>
    );
}

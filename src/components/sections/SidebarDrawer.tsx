import { Sidebar } from "flowbite-react"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTicketAlt } from "react-icons/fa";
import { HiChartPie, HiViewBoards } from "react-icons/hi";

export default function SidebarDrawer({ isSidebarOpen }: { isSidebarOpen: boolean }) {
    const pathname = usePathname();
    return (
        <Sidebar aria-label="Default sidebar example" className={`h-screen fixed left-0 top-0 w-[250px] transition-transform transform z-20 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
            <Sidebar.Logo href="#" img="/images/d-logo.png" imgAlt="Flowbite logo" className="p-6">
                Dashboard Kit
            </Sidebar.Logo>
            <Sidebar.Items>
                <Sidebar.ItemGroup className="p-0">
                    <Link href={'/overview'} className={`flex items-center gap-3 py-3 px-5 md:text-lg text-sm text-gray-700 dark:text-white hover:bg-black/10 dark:hover:bg-white/5 border-l-4 ${pathname === '/overview' ? 'bg-black/10 border-blue-400 dark:bg-white/5 dark:border-white' : 'border-transparent'}`}>
                        <HiChartPie className="md:size-[18px] size-4" />
                        Overview
                    </Link>
                    <Link href={'/tickets'} className={`flex items-center gap-3 py-3 px-5 md:text-lg text-sm text-gray-700 dark:text-white hover:bg-black/10 dark:hover:bg:white/5 border-l-4 ${pathname === '/tickets' ? 'bg-black/10 border-blue-400 dark:bg:white/5 dark:border-white' : 'border-transparent'}`}>
                        <FaTicketAlt className="md:size-[18px] size-4" />
                        Tickets
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Sidebar.Item href="#" icon={HiChartPie}>
                        Upgrade to Pro
                    </Sidebar.Item>
                    <Sidebar.Item href="#" icon={HiViewBoards}>
                        Documentation
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}
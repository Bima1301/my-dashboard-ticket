import GuestLayout from "@/components/layouts/GuestLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <GuestLayout>
                {children}
            </GuestLayout>
        </main>
    );
}

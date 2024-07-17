import AuthLayout from "@/components/layouts/AuthLayout";
import MainLayout from "@/components/layouts/MainLayout";

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <MainLayout>
                <AuthLayout>
                    {children}
                </AuthLayout>
            </MainLayout>
        </main>
    );
}

import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import BottomNav from "@/components/dashboard/BottomNav";
import { SociaProvider } from "@/context/SociaContext";
import { Toaster } from "sonner";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SociaProvider>
            <Toaster position="top-right" richColors />
            <div className="flex bg-slate-50 min-h-screen">
                {/* Sidebar - Desktop Only */}
                <div className="hidden lg:block w-[240px] fixed inset-y-0 left-0 z-50 transition-all duration-300">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col lg:pl-[240px] transition-all duration-300 pb-[70px] lg:pb-0">
                    <Header />
                    <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden">
                        {children}
                    </main>
                </div>

                {/* Bottom Navigation - Mobile Only */}
                <BottomNav />
            </div>
        </SociaProvider>
    );
}

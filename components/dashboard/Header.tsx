"use client"

import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Search, Bell, Calendar, User, Settings, LogOut } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    // Get page title from last segment
    const pageTitle = segments[segments.length - 1]
        ? segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1).replace(/-/g, ' ')
        : "Dashboard"

    const handleLogout = () => {
        signOut({ callbackUrl: "/" })
    }

    return (
        <header className="flex h-16 items-center justify-between gap-4 px-4 md:px-6 bg-white border-b border-slate-200 sticky top-0 z-40">
            {/* Left: Brand (Mobile) or Title (Desktop) */}
            <div className="flex-1">
                {/* Desktop Title */}
                <h1 className="hidden lg:block text-xl font-semibold text-slate-900">{pageTitle}</h1>

                {/* Mobile Brand Identity */}
                <div className="lg:hidden flex items-center gap-3">
                    <div className="h-8 w-8 flex items-center justify-center shrink-0">
                        <img
                            src="/images/socia-logo.-onlys.png"
                            alt="SOCIA Logo"
                            className="h-full w-auto object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-slate-900 leading-none uppercase">SOCIA</span>
                        <span className="text-[8px] font-medium text-slate-500 tracking-[0.02em] uppercase mt-[1.5px] leading-none">Creative Agency</span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-4">
                {/* Search Bar - Desktop Only */}
                <div className="hidden lg:relative lg:block lg:w-[300px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={2} />
                    <Input
                        className="w-full bg-slate-50 border-slate-200 rounded-lg pl-10 h-10 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:ring-1 focus-visible:ring-slate-300 focus-visible:border-slate-300"
                        placeholder="Search anything..."
                        type="search"
                    />
                </div>

                {/* Date Display - Desktop Only */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                    <span className="text-sm font-medium text-slate-700">8</span>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-500 leading-none">Sun,</span>
                        <span className="text-[10px] text-slate-500 leading-none">February</span>
                    </div>
                </div>

                {/* Calendar Icon - Desktop Only */}
                <button className="hidden lg:flex h-10 w-10 items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                    <Calendar className="h-5 w-5 text-slate-600" strokeWidth={1.5} />
                </button>

                {/* Notifications */}
                <button className="h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors relative mr-1 md:mr-0">
                    <Bell className="h-4 w-4 md:h-5 md:w-5 text-slate-600" strokeWidth={1.5} />
                </button>

                {/* Profile Identity Unit (Sleek Chip) */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 md:gap-2.5 p-0.5 pr-2 md:pr-3 rounded-full hover:bg-slate-50 transition-all outline-none group border border-transparent hover:border-slate-100">
                            <div className="h-8 w-8 md:h-9 md:w-9 rounded-full overflow-hidden border border-slate-200 shrink-0 shadow-sm">
                                <img
                                    src="/images/raghu-profile.jpg"
                                    alt="Raghuvir Solanki"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col text-left">
                                <span className="text-[13px] md:text-sm font-semibold text-slate-900 leading-none">Raghuvir Solanki</span>
                                <span className="text-[9px] md:text-[10px] font-medium text-slate-400 leading-none mt-0.5">Admin</span>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mt-1">
                        <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            <span>My Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="cursor-pointer text-red-600 focus:text-red-600"
                            onClick={handleLogout}
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

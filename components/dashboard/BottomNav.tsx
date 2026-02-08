"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Users, Megaphone, Inbox, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Clients", href: "/dashboard/clients" },
    { icon: Megaphone, label: "Ads", href: "/dashboard/ads" },
    { icon: Inbox, label: "Leads", href: "/dashboard/leads" },
    { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
]

export default function BottomNav() {
    const pathname = usePathname()

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-[70px] bg-white border-t border-slate-200 z-50 flex items-center justify-around px-2 shadow-[0_-4px_12px_rgba(0,0,0,0.05)]">
            {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex flex-col items-center justify-center gap-1 min-w-[64px] transition-colors",
                            isActive ? "text-[#0F172A]" : "text-slate-400 hover:text-slate-600"
                        )}
                    >
                        <Icon
                            className={cn("h-5 w-5", isActive ? "stroke-[2.5px]" : "stroke-[2px]")}
                        />
                        <span className={cn(
                            "text-[11px] font-medium leading-none",
                            isActive ? "text-[#0F172A] font-semibold" : "text-slate-400"
                        )}>
                            {item.label}
                        </span>
                    </Link>
                )
            })}
        </nav>
    )
}

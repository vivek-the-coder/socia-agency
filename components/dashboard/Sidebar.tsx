"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
    LayoutDashboard,
    Users,
    Image as ImageIcon,
    Inbox,
    Activity,
    Zap,
    PieChart,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Client Accounts", href: "/dashboard/clients", icon: Users },
    { name: "Ads Manager", href: "/dashboard/ads", icon: Activity },
    { name: "Leads Inbox", href: "/dashboard/leads", icon: Inbox, badge: 12 },
    { name: "Reports", href: "/dashboard/reports", icon: PieChart },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <TooltipProvider delayDuration={0}>
            <motion.div
                className="h-full bg-white border-r border-slate-200 flex flex-col pt-[22px] pb-6 z-50 relative"
                animate={{ width: collapsed ? 72 : 240 }}
                transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            >
                <div className="flex flex-col h-full">
                    <div className={cn(
                        "flex items-center gap-3 mb-8 transition-all",
                        collapsed ? "px-0 justify-center" : "px-5"
                    )}>
                        <div className="h-9 w-9 flex items-center justify-center flex-shrink-0">
                            <img
                                src="/images/socia-logo.-onlys.png"
                                alt="SOCIA Logo"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <AnimatePresence>
                            {!collapsed && (
                                <motion.div
                                    initial={{ opacity: 0, width: 0 }}
                                    animate={{ opacity: 1, width: "auto" }}
                                    exit={{ opacity: 0, width: 0 }}
                                    className="overflow-hidden whitespace-nowrap flex flex-col"
                                >
                                    <span className="font-bold text-[20px] text-slate-900 leading-none">
                                        SOCIA
                                    </span>
                                    <span className="text-[12px] text-slate-500 font-medium mt-[3px] leading-none">Creative Agency</span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <nav className={cn(
                        "flex flex-col gap-1 flex-1 px-3"
                    )}>
                        <div className={cn(
                            "text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2 px-3 transition-opacity duration-300",
                            collapsed && "opacity-0"
                        )}>
                            HOME
                        </div>

                        {navItems.map((item) => {
                            const isActive = item.href === "/dashboard" ? pathname === item.href : pathname.startsWith(item.href)

                            const navContent = (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "relative group flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-150",
                                        isActive
                                            ? "bg-slate-900 text-white"
                                            : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    <item.icon className={cn(
                                        "h-[18px] w-[18px] flex-shrink-0",
                                        isActive ? "text-white" : "text-slate-500"
                                    )} strokeWidth={1.5} />

                                    <AnimatePresence>
                                        {!collapsed && (
                                            <motion.span
                                                initial={{ opacity: 0, width: 0 }}
                                                animate={{ opacity: 1, width: "auto" }}
                                                exit={{ opacity: 0, width: 0 }}
                                                className="overflow-hidden whitespace-nowrap text-sm font-normal"
                                            >
                                                {item.name}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                    {/* Badge */}
                                    {!collapsed && item.badge && (
                                        <span className={cn(
                                            "ml-auto h-5 w-5 flex items-center justify-center rounded-md text-[10px] font-semibold",
                                            isActive
                                                ? "bg-white text-slate-900"
                                                : "bg-blue-100 text-blue-700"
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                    {collapsed && item.badge && (
                                        <span className="absolute -top-0.5 -right-0.5 h-4 w-4 bg-blue-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            )

                            if (collapsed) {
                                return (
                                    <Tooltip key={item.href}>
                                        <TooltipTrigger asChild>
                                            {navContent}
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="text-xs">
                                            {item.name}
                                        </TooltipContent>
                                    </Tooltip>
                                )
                            }

                            return navContent
                        })}
                    </nav>

                    {/* User Section */}
                    <div className={cn(
                        "border-t border-slate-200 pt-4 mt-auto px-3"
                    )}>
                        <div className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all",
                            "hover:bg-slate-50"
                        )}>
                            <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 flex-shrink-0">
                                <img
                                    src="/images/raghu-profile.jpg"
                                    alt="Profile"
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.div
                                        initial={{ opacity: 0, width: 0 }}
                                        animate={{ opacity: 1, width: "auto" }}
                                        exit={{ opacity: 0, width: 0 }}
                                        className="overflow-hidden whitespace-nowrap flex-1"
                                    >
                                        <p className="text-sm font-medium text-slate-900 leading-tight">Raghuvir Solanki</p>
                                        <p className="text-xs text-slate-500 leading-tight">Admin</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </TooltipProvider>
    )
}

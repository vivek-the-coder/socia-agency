"use client"

import { useState } from "react"
import { Search, Plus, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, XCircle, MoreHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock Data - Client Performance
const CLIENTS = [
    {
        id: "1",
        name: "Vivek Digital",
        since: "Jan 2024",
        email: "contact@Vivekdigital.in",
        status: "healthy",
        spend: 2845000,
        budget: 3500000,
        leads: 142,
        cpl: 1850,
        roas: 4.8,
        change: 12.4,
        platforms: ["Google", "Meta"],
    },
    {
        id: "2",
        name: "Vivek Chemicals",
        since: "Mar 2024",
        email: "ops@Vivek.in",
        status: "warning",
        spend: 1820000,
        budget: 2000000,
        leads: 86,
        cpl: 2480,
        roas: 2.8,
        change: -8.2,
        platforms: ["Google", "LinkedIn"],
    },
    {
        id: "3",
        name: "Vivek Bank",
        since: "Nov 2023",
        email: "accounts@Vivekbank.com",
        status: "critical",
        spend: 5280000,
        budget: 5000000,
        leads: 218,
        cpl: 2210,
        roas: 5.1,
        change: 18.6,
        platforms: ["Google", "Meta", "LinkedIn"],
    },
    {
        id: "4",
        name: "Vivek Industries",
        since: "Feb 2024",
        status: "healthy",
        spend: 1250000,
        budget: 1500000,
        leads: 62,
        cpl: 1920,
        roas: 3.2,
        change: 5.8,
        platforms: ["Meta"],
    },
    {
        id: "5",
        name: "Vivek PVT LTD",
        since: "Apr 2024",
        status: "warning",
        spend: 890000,
        budget: 1000000,
        leads: 38,
        cpl: 3150,
        roas: 1.9,
        change: -15.3,
        platforms: ["Google"],
    },
    {
        id: "6",
        name: "Vivek Motors",
        since: "Dec 2023",
        status: "healthy",
        spend: 1980000,
        budget: 2200000,
        leads: 104,
        cpl: 1780,
        roas: 4.1,
        change: 9.2,
        platforms: ["Google", "LinkedIn"],
    },
]

const STATUS_CONFIG = {
    healthy: {
        color: "text-emerald-700",
        bg: "bg-emerald-50",
        icon: CheckCircle2,
        label: "Healthy"
    },
    warning: {
        color: "text-amber-700",
        bg: "bg-amber-50",
        icon: AlertTriangle,
        label: "Needs Attention"
    },
    critical: {
        color: "text-rose-700",
        bg: "bg-rose-50",
        icon: XCircle,
        label: "Critical"
    },
}

export default function ClientAccountsPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "healthy" | "warning" | "critical">("all")

    const filteredClients = CLIENTS.filter(client => {
        const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || client.status === statusFilter
        return matchesSearch && matchesStatus
    })

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8 pb-[100px] lg:pb-8">

                {/* Header Section - Centered on mobile to match dashboard */}
                <header className="mb-6 md:mb-8 text-center md:text-left">
                    <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Client Accounts</h1>
                    <p className="text-xs md:text-sm text-slate-500">Monitor client performance and health status</p>
                </header>

                {/* Filters & Search - Mobile: Vertical Stack, Desktop: Horizontal */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        {/* Search (Part of User's Vertical Stack Step 1) */}
                        <div className="relative flex-1 md:max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={2} />
                            <Input
                                className="w-full bg-slate-50 border-slate-200 rounded-xl pl-10 h-12 text-sm focus-visible:ring-1 focus-visible:ring-slate-300"
                                placeholder="Search clients..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Status Filters (Part of User's Vertical Stack Step 2) */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1.5 md:pb-0 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0",
                                    statusFilter === "all"
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                All ({CLIENTS.length})
                            </button>
                            <button
                                onClick={() => setStatusFilter("healthy")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0",
                                    statusFilter === "healthy"
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                Healthy ({CLIENTS.filter(c => c.status === "healthy").length})
                            </button>
                            <button
                                onClick={() => setStatusFilter("warning")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0",
                                    statusFilter === "warning"
                                        ? "bg-amber-600 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                Warning ({CLIENTS.filter(c => c.status === "warning").length})
                            </button>
                            <button
                                onClick={() => setStatusFilter("critical")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap shrink-0",
                                    statusFilter === "critical"
                                        ? "bg-rose-600 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                Critical ({CLIENTS.filter(c => c.status === "critical").length})
                            </button>
                        </div>

                        {/* Mobile Only Add Client Button (Part of User's Vertical Stack Step 3) */}
                        <Button className="md:hidden w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-4 h-11 gap-2 shadow-sm font-semibold">
                            <Plus className="h-5 w-5" strokeWidth={2.5} />
                            Add Client
                        </Button>
                    </div>
                </div>

                {/* Client Performance Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {filteredClients.map((client) => {
                        const statusConfig = STATUS_CONFIG[client.status as keyof typeof STATUS_CONFIG]
                        const StatusIcon = statusConfig.icon
                        const budgetUsage = (client.spend / client.budget) * 100

                        return (
                            <div
                                key={client.id}
                                className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all group overflow-hidden"
                            >
                                {/* card content - clickable */}
                                <Link href={`/dashboard/clients/${client.id}`} className="block p-5 md:p-6">
                                    {/* Card Header - Identical to Dashboard List Style */}
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-slate-700 transition-colors mb-0.5">
                                                {client.name}
                                            </h3>
                                            <p className="text-[11px] text-slate-400 font-medium">Joined {client.since} • {client.email}</p>
                                        </div>
                                        <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full", statusConfig.bg)}>
                                            <StatusIcon className={cn("h-3.5 w-3.5", statusConfig.color)} strokeWidth={2.5} />
                                            <span className={cn("text-[10px] font-bold uppercase tracking-wider", statusConfig.color)}>
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Key Metrics - Dashboard Parity Boxes */}
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                MTD Spend
                                            </p>
                                            <div className="flex flex-col items-end">
                                                <p className="text-xl font-bold text-slate-900 tracking-tight">
                                                    ₹{(client.spend / 100000).toFixed(1)}L
                                                </p>
                                                <div className="flex items-center gap-1">
                                                    {client.change > 0 ? (
                                                        <TrendingUp className="h-3 w-3 text-emerald-600" strokeWidth={2.5} />
                                                    ) : (
                                                        <TrendingDown className="h-3 w-3 text-rose-600" strokeWidth={2.5} />
                                                    )}
                                                    <span className={cn(
                                                        "text-[10px] font-bold",
                                                        client.change > 0 ? "text-emerald-700" : "text-rose-700"
                                                    )}>
                                                        {Math.abs(client.change)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500">
                                                Performance
                                            </p>
                                            <div className="flex flex-col items-end">
                                                <p className="text-xl font-bold text-slate-900 tracking-tight">
                                                    {client.leads} <span className="text-[10px] uppercase text-slate-400 font-medium ml-1">Leads</span>
                                                </p>
                                                <p className="text-[10px] text-slate-500 font-medium">
                                                    ₹{client.cpl.toLocaleString('en-IN')} CPL
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Budget Bar - Subtler Parity */}
                                    <div className="px-1">
                                        <div className="flex items-center justify-between text-[10px] mb-2 font-bold uppercase tracking-widest">
                                            <span className="text-slate-400">Budget Delivery</span>
                                            <span className={cn(
                                                "font-bold",
                                                budgetUsage > 100 ? "text-rose-600" :
                                                    budgetUsage > 85 ? "text-amber-600" :
                                                        "text-emerald-600"
                                            )}>{budgetUsage.toFixed(0)}%</span>
                                        </div>
                                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={cn(
                                                    "h-full rounded-full transition-all duration-700",
                                                    budgetUsage > 100 ? "bg-rose-500" :
                                                        budgetUsage > 85 ? "bg-amber-500" :
                                                            "bg-emerald-500"
                                                )}
                                                style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </Link>

                                {/* Card Footer Actions */}
                                <div className="px-5 py-4 bg-slate-50/20 border-t border-slate-100 flex items-center justify-between mt-auto">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl">
                                            <MoreHorizontal className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="outline" className="h-10 text-xs font-semibold rounded-xl px-5 bg-white border-slate-200 text-slate-700">
                                            Edit
                                        </Button>
                                        <Button className="h-10 text-xs font-semibold rounded-xl px-5 bg-slate-900 text-white shadow-sm">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Load More Button - Mobile Priority */}
                <div className="mt-12 flex justify-center">
                    <Button variant="outline" className="w-full md:w-auto min-w-[200px] h-12 md:h-11 rounded-xl text-slate-600 font-semibold border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                        Load More Clients
                    </Button>
                </div>

                {/* Empty State */}
                {filteredClients.length === 0 && (
                    <div className="bg-white rounded-2xl p-12 shadow-sm border border-slate-100 text-center">
                        <p className="text-slate-500 font-medium">No clients found matching your filters</p>
                    </div>
                )}
            </div>
        </div>
    )
}

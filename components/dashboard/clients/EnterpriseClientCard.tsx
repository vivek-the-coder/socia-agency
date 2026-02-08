"use client"

import { cn } from "@/lib/utils"
import { EnterpriseClient } from "@/lib/enterpriseClientData"
import { MoreHorizontal, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface EnterpriseClientCardProps {
    client: EnterpriseClient
    onSelect: (client: EnterpriseClient) => void
}

export function EnterpriseClientCard({ client, onSelect }: EnterpriseClientCardProps) {
    const spendPercentage = (client.currentSpend / client.monthlyBudget) * 100
    const isOverBudget = spendPercentage > 100
    const isHighSpend = spendPercentage > 90

    // Format currency to professional standard (e.g. ₹12,400)
    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val)

    return (
        <div
            className="group relative bg-white border border-slate-200 rounded-lg shadow-sm hover:border-indigo-300 hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
            onClick={() => onSelect(client)}
        >
            <div className="p-5 flex flex-col h-full">
                {/* Header: Identity & Status */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-sm font-bold text-slate-700">
                            {client.logo}
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 leading-tight">{client.name}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className={cn(
                                    "h-1.5 w-1.5 rounded-full",
                                    client.status === "Active" ? "bg-emerald-500" :
                                        client.status === "Paused" ? "bg-slate-400" : "bg-indigo-500"
                                )} />
                                <p className="text-xs text-slate-500 font-medium">{client.status}</p>
                            </div>
                        </div>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 text-slate-400 hover:text-slate-600">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem className="text-xs">Analytics</DropdownMenuItem>
                            <DropdownMenuItem className="text-xs">Campaigns</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-xs text-rose-600">Pause Client</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Key Metrics Grid - Data First */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
                    <div>
                        <p className="text-[10px] items-center text-slate-400 uppercase tracking-wider font-semibold mb-0.5 flex gap-1">
                            Spend
                            {isHighSpend && <Activity className="h-3 w-3 text-amber-500" />}
                        </p>
                        <p className="text-base font-semibold text-slate-900 font-mono tracking-tight">
                            {formatCurrency(client.currentSpend)}
                        </p>
                    </div>
                    <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">
                            Budget
                        </p>
                        <p className="text-base font-medium text-slate-600 font-mono tracking-tight">
                            {formatCurrency(client.monthlyBudget)}
                        </p>
                    </div>

                    <div className="col-span-2 pt-2 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">ROAS</p>
                                <div className="flex items-center gap-1.5">
                                    <p className="text-sm font-semibold text-slate-900 font-mono">{client.roas}×</p>
                                    <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1 rounded font-medium flex items-center">
                                        <ArrowUpRight className="h-3 w-3 mr-0.5" /> 12%
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mb-0.5">Leads</p>
                                <p className="text-sm font-semibold text-slate-900 font-mono">{client.leads}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Bar (Visual budget context) */}
                <div className="mt-auto">
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className={cn("h-full transition-all duration-500 ease-out",
                                isOverBudget ? "bg-rose-500" :
                                    isHighSpend ? "bg-amber-500" : "bg-indigo-600"
                            )}
                            style={{ width: `${Math.min(spendPercentage, 100)}%` }}
                        />
                    </div>
                </div>

                {/* Footer Platforms */}
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
                    <div className="flex -space-x-1">
                        {client.platforms.google.connected && (
                            <div className="h-5 w-5 rounded-full bg-white border border-slate-200 flex items-center justify-center z-30 ring-2 ring-white">
                                <span className="text-[8px] font-bold text-slate-700">G</span>
                            </div>
                        )}
                        {client.platforms.meta.connected && (
                            <div className="h-5 w-5 rounded-full bg-white border border-slate-200 flex items-center justify-center z-20 ring-2 ring-white">
                                <span className="text-[8px] font-bold text-slate-700">M</span>
                            </div>
                        )}
                        {client.platforms.linkedin.connected && (
                            <div className="h-5 w-5 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 ring-2 ring-white">
                                <span className="text-[8px] font-bold text-slate-700">in</span>
                            </div>
                        )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium ml-auto">
                        {client.platforms.google.campaigns + client.platforms.meta.campaigns + client.platforms.linkedin.campaigns} campaigns active
                    </span>
                </div>
            </div>
        </div>
    )
}

export function EnterpriseClientCardSkeleton() {
    return (
        <div className="border border-slate-200 rounded-lg shadow-sm p-5 space-y-4 animate-pulse bg-white">
            <div className="flex justify-between">
                <div className="flex gap-3">
                    <div className="h-10 w-10 bg-slate-100 rounded-lg" />
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-slate-100 rounded" />
                        <div className="h-3 w-16 bg-slate-100 rounded" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="h-8 bg-slate-100 rounded" />
                <div className="h-8 bg-slate-100 rounded" />
            </div>
        </div>
    )
}

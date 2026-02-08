"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { MoreHorizontal, Trash2, Settings, BarChart3, FileText, AlertTriangle } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Client } from "@/lib/mockClientData"

interface EnhancedClientCardProps extends Client {
    onCardClick: (client: Client) => void
    onStatusToggle: (clientId: string, newStatus: "Active" | "Paused") => void
    onDelete: (clientId: string) => void
}

export function EnhancedClientCard({
    onCardClick,
    onStatusToggle,
    onDelete,
    ...client
}: EnhancedClientCardProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [isToggling, setIsToggling] = useState(false)

    const budgetPercentage = (client.currentSpend / client.monthlyBudget) * 100
    const isOverBudget = budgetPercentage > 100

    const handleToggle = async () => {
        setIsToggling(true)
        const newStatus = client.status === "Active" ? "Paused" : "Active"

        // Optimistic UI update
        setTimeout(() => {
            onStatusToggle(client.id, newStatus)
            toast.success(`${client.name} is now ${newStatus}`, {
                description: `Campaign status updated successfully`,
            })
            setIsToggling(false)
        }, 300)
    }

    const handleDelete = () => {
        onDelete(client.id)
        toast.success("Client deleted", {
            description: `${client.name} has been removed from your portfolio`,
        })
        setShowDeleteDialog(false)
    }

    const getPlatformStatusColor = (status: "syncing" | "connected" | "error") => {
        switch (status) {
            case "connected": return "text-green-600"
            case "syncing": return "text-yellow-600"
            case "error": return "text-red-600"
            default: return "text-gray-600"
        }
    }

    return (
        <>
            <Card className="overflow-hidden hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer border-[#E5E7EB] group">
                <CardContent className="p-0">
                    <div className="p-5 flex justify-between items-start" onClick={() => onCardClick(client)}>
                        <div className="flex gap-4">
                            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-sm font-bold text-[#3B82F6] border border-blue-100 shadow-sm">
                                {client.logo}
                            </div>
                            <div>
                                <h3 className="font-bold text-[#111827] text-lg leading-tight group-hover:text-[#3B82F6] transition-colors">{client.name}</h3>
                                <p className="text-sm text-[#64748B]">{client.industry}</p>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8] hover:text-[#111827] hover:bg-gray-100">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation()
                                    onCardClick(client)
                                }}>
                                    <BarChart3 className="mr-2 h-4 w-4" />
                                    View Analytics
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <FileText className="mr-2 h-4 w-4" />
                                    Edit Lead Forms
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                    <Settings className="mr-2 h-4 w-4" />
                                    Manage API Tokens
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setShowDeleteDialog(true)
                                    }}
                                    className="text-red-600 focus:text-red-600"
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Delete Client
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="px-5 pb-4" onClick={() => onCardClick(client)}>
                        {/* Status and Toggle */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-2 mr-auto" onClick={(e) => e.stopPropagation()}>
                                <Switch
                                    checked={client.status === "Active"}
                                    onCheckedChange={handleToggle}
                                    disabled={isToggling || client.status === "Onboarding"}
                                    className="data-[state=checked]:bg-green-500"
                                />
                                <Badge
                                    variant="outline"
                                    className={`
                                        ${client.status === "Active" ? "bg-green-50 text-green-700 border-green-200" :
                                            client.status === "Paused" ? "bg-yellow-50 text-yellow-700 border-yellow-200" :
                                                "bg-blue-50 text-blue-700 border-blue-200"}
                                    `}
                                >
                                    {client.status}
                                </Badge>
                            </div>

                            {/* Platform Icons with Hover Status */}
                            <div className="flex gap-1.5">
                                {client.platforms.google && client.platformStatus.google && (
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <div className={`h-7 w-7 rounded-full bg-white flex items-center justify-center border shadow-sm cursor-pointer hover:scale-110 transition-transform ${client.platformStatus.google.status === "error" ? "border-red-200" : "border-gray-200"
                                                }`}>
                                                <span className="text-[10px] font-bold text-red-600">G</span>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-48" side="top">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-semibold">Google Ads</h4>
                                                <p className={`text-xs ${getPlatformStatusColor(client.platformStatus.google.status)}`}>
                                                    {client.platformStatus.google.status === "connected" && `Connected - ${client.platformStatus.google.adsCount} Active Ads`}
                                                    {client.platformStatus.google.status === "syncing" && "Syncing..."}
                                                    {client.platformStatus.google.status === "error" && "Connection Error"}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                )}
                                {client.platforms.meta && client.platformStatus.meta && (
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                                <span className="text-[10px] font-bold text-blue-600">M</span>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-48" side="top">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-semibold">Meta Ads</h4>
                                                <p className={`text-xs ${getPlatformStatusColor(client.platformStatus.meta.status)}`}>
                                                    {client.platformStatus.meta.status === "connected" && `Connected - ${client.platformStatus.meta.adsCount} Active Ads`}
                                                    {client.platformStatus.meta.status === "syncing" && "Syncing..."}
                                                    {client.platformStatus.meta.status === "error" && "Connection Error"}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                )}
                                {client.platforms.linkedin && client.platformStatus.linkedin && (
                                    <HoverCard>
                                        <HoverCardTrigger>
                                            <div className="h-7 w-7 rounded-full bg-white flex items-center justify-center border border-gray-200 shadow-sm cursor-pointer hover:scale-110 transition-transform">
                                                <span className="text-[9px] font-bold text-sky-700">in</span>
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-48" side="top">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-semibold">LinkedIn Ads</h4>
                                                <p className={`text-xs ${getPlatformStatusColor(client.platformStatus.linkedin.status)}`}>
                                                    {client.platformStatus.linkedin.status === "connected" && `Connected - ${client.platformStatus.linkedin.adsCount} Active Ads`}
                                                    {client.platformStatus.linkedin.status === "syncing" && "Syncing..."}
                                                    {client.platformStatus.linkedin.status === "error" && "Connection Error"}
                                                </p>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                )}
                            </div>
                        </div>

                        {/* Budget vs Spend */}
                        <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                            <div className="flex justify-between text-xs font-medium mb-2">
                                <span className="text-[#64748B]">Monthly Budget</span>
                                <span className={isOverBudget ? "text-red-600 font-bold" : "text-[#111827]"}>
                                    ₹{client.currentSpend.toLocaleString('en-IN')} / ₹{client.monthlyBudget.toLocaleString('en-IN')}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-500 ${isOverBudget ? "bg-red-500" : "bg-blue-500"}`}
                                    style={{ width: `${Math.min(budgetPercentage, 100)}%` }}
                                ></div>
                            </div>
                            {isOverBudget && (
                                <div className="flex items-center gap-1 mt-2 text-xs text-red-600">
                                    <AlertTriangle className="h-3 w-3" />
                                    <span className="font-medium">Over budget by ₹{(client.currentSpend - client.monthlyBudget).toLocaleString('en-IN')}</span>
                                </div>
                            )}
                        </div>

                        {/* Metrics & Sparkline */}
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider mb-1">Last 7 Days</p>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-2xl font-bold text-[#111827]">{client.spend}</span>
                                    <span className={`text-xs font-bold ${client.trend >= 0 ? "text-green-600" : "text-red-500"}`}>
                                        {client.trend > 0 ? "+" : ""}{client.trend}%
                                    </span>
                                </div>
                                <div className="flex gap-3 text-[10px] text-[#64748B]">
                                    <span>{client.leadCount} Leads</span>
                                    <span>•</span>
                                    <span>{client.activeAds} Ads</span>
                                </div>
                            </div>
                            <div className="h-16 w-28">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={client.data}>
                                        <defs>
                                            <linearGradient id={`gradient-${client.id}`} x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor={client.trend >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0.3} />
                                                <stop offset="95%" stopColor={client.trend >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <Area
                                            type="monotone"
                                            dataKey="value"
                                            stroke={client.trend >= 0 ? "#22c55e" : "#ef4444"}
                                            strokeWidth={2.5}
                                            fill={`url(#gradient-${client.id})`}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/30 px-5 py-3 border-t border-[#E5E7EB] flex justify-between items-center group-hover:from-blue-50 group-hover:to-blue-100/50 transition-colors">
                        <span className="text-xs font-semibold text-[#64748B] group-hover:text-[#3B82F6]">View Dashboard</span>
                        <span className="text-xs text-[#94A3B8] group-hover:text-[#3B82F6]">→</span>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete <strong>{client.name}</strong> and remove all associated campaign data. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete Client
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}

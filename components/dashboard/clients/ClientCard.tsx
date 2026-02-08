"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Area, AreaChart, ResponsiveContainer } from "recharts"
import { MoreHorizontal, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface ClientCardProps {
    id: string
    name: string
    industry: string
    logo: string
    status: "Active" | "Paused"
    spend: string
    trend: number
    platforms: {
        google: boolean
        meta: boolean
        linkedin: boolean
    }
    data: { value: number }[]
}

export function ClientCard({ id, name, industry, logo, status, spend, trend, platforms, data }: ClientCardProps) {
    return (
        <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer border-[#E5E7EB]">
            <CardContent className="p-0">
                <div className="p-5 flex justify-between items-start">
                    <div className="flex gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-xl font-bold text-[#3B82F6] border border-blue-100">
                            {logo}
                        </div>
                        <div>
                            <h3 className="font-bold text-[#111827] text-lg leading-tight">{name}</h3>
                            <p className="text-sm text-[#64748B]">{industry}</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8]">
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </div>

                <div className="px-5 pb-4">
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant={status === "Active" ? "default" : "secondary"} className={status === "Active" ? "bg-green-50 text-green-700 hover:bg-green-100 border-green-200" : "bg-gray-100 text-gray-600"}>
                            {status}
                        </Badge>
                        <div className="flex gap-1 ml-auto">
                            {platforms.google && <div className="h-6 w-6 rounded-full bg-red-50 flex items-center justify-center border border-red-100" title="Google Ads"><span className="text-[10px] font-bold text-red-600">G</span></div>}
                            {platforms.meta && <div className="h-6 w-6 rounded-full bg-blue-50 flex items-center justify-center border border-blue-100" title="Meta Ads"><span className="text-[10px] font-bold text-blue-600">M</span></div>}
                            {platforms.linkedin && <div className="h-6 w-6 rounded-full bg-sky-50 flex items-center justify-center border border-sky-100" title="LinkedIn"><span className="text-[10px] font-bold text-sky-700">in</span></div>}
                        </div>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider mb-1">Last 7 Days Spend</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-[#111827]">{spend}</span>
                                <span className={`text-xs font-bold ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                                    {trend > 0 ? '+' : ''}{trend}%
                                </span>
                            </div>
                        </div>
                        <div className="h-12 w-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id={`gradient-${id}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={trend >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={trend >= 0 ? "#22c55e" : "#ef4444"} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke={trend >= 0 ? "#22c55e" : "#ef4444"}
                                        strokeWidth={2}
                                        fill={`url(#gradient-${id})`}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="bg-[#F8F9FA] px-5 py-3 border-t border-[#E5E7EB] flex justify-between items-center group-hover:bg-blue-50/50 transition-colors">
                    <span className="text-xs font-semibold text-[#64748B] group-hover:text-[#3B82F6]">View Dashboard</span>
                    <ExternalLink className="h-3.5 w-3.5 text-[#94A3B8] group-hover:text-[#3B82F6]" />
                </div>
            </CardContent>
        </Card>
    )
}

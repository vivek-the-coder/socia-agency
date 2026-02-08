"use client"

import { useState } from "react"
import { Search, Mail, Phone, Calendar, Star, StarOff, MoreVertical, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Mock Leads Data
const LEADS = [
    {
        id: "1",
        name: "Manav Patel",
        email: "manav.patel@techcorp.in",
        phone: "+91 98765 43210",
        company: "TechCorp India",
        source: "Google Ads",
        campaign: "Diwali Lead Gen",
        status: "new",
        value: 125000,
        createdAt: "2024-10-05",
        priority: true,
    },
    {
        id: "2",
        name: "Hiren Vasava",
        email: "hiren.v@startupindia.io",
        phone: "+91 87654 32109",
        company: "Startup.io",
        source: "Meta Ads",
        campaign: "Brand Awareness",
        status: "contacted",
        value: 82000,
        createdAt: "2024-10-04",
        priority: false,
    },
    {
        id: "3",
        name: "Brijraj Dhummad",
        email: "brijraj.d@designstudio.in",
        phone: "+91 76543 21098",
        company: "Design Studio Inc",
        source: "LinkedIn Ads",
        campaign: "B2B Outreach",
        status: "qualified",
        value: 158000,
        createdAt: "2024-10-03",
        priority: true,
    },
    {
        id: "4",
        name: "Vraj Patel",
        email: "vraj.p@Vivekenterprise.com",
        phone: "+91 65432 10987",
        company: "Vivek Enterprises",
        source: "Google Ads",
        campaign: "Retargeting",
        status: "new",
        value: 220000,
        createdAt: "2024-10-05",
        priority: true,
    },
    {
        id: "5",
        name: "Rocky Upadhyay",
        email: "rocky@innovationco.in",
        phone: "+91 91234 56789",
        company: "Innovation Co",
        source: "Meta Ads",
        campaign: "Lead Gen",
        status: "proposal",
        value: 185000,
        createdAt: "2024-10-02",
        priority: false,
    },
    {
        id: "6",
        name: "Vraj Padaria",
        email: "vraj.padu@ventures.in",
        phone: "+91 82345 67890",
        company: "Roy Ventures",
        source: "LinkedIn Ads",
        campaign: "B2B Outreach",
        status: "contacted",
        value: 98000,
        createdAt: "2024-10-01",
        priority: false,
    },
]

const STATUS_CONFIG = {
    new: { color: "text-blue-700", bg: "bg-blue-50", label: "New" },
    contacted: { color: "text-amber-700", bg: "bg-amber-50", label: "Contacted" },
    qualified: { color: "text-purple-700", bg: "bg-purple-50", label: "Qualified" },
    proposal: { color: "text-indigo-700", bg: "bg-indigo-50", label: "Proposal Sent" },
    won: { color: "text-emerald-700", bg: "bg-emerald-50", label: "Won" },
    lost: { color: "text-slate-600", bg: "bg-slate-100", label: "Lost" },
}

export default function LeadsInboxPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | keyof typeof STATUS_CONFIG>("all")

    const filteredLeads = LEADS.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || lead.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const totalValue = filteredLeads.reduce((sum, lead) => sum + lead.value, 0)
    const newLeads = LEADS.filter(l => l.status === "new").length
    const qualifiedLeads = LEADS.filter(l => l.status === "qualified").length

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">

                {/* Header */}
                <div className="mb-6 md:mb-8 text-left">
                    <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Leads Inbox</h1>
                    <p className="text-xs md:text-sm text-slate-500">Track and manage sales opportunities across campaigns</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
                    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 md:mb-2">Total Leads</p>
                        <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{LEADS.length}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 md:mb-2">New</p>
                        <p className="text-2xl md:text-3xl font-bold text-blue-600 tracking-tight">{newLeads}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 md:mb-2">Qualified</p>
                        <p className="text-2xl md:text-3xl font-bold text-purple-600 tracking-tight">{qualifiedLeads}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1 md:mb-2">Pipeline Value</p>
                        <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">₹{(totalValue / 100000).toFixed(1)}L</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 mb-6 max-w-full overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
                        <div className="relative w-full md:w-[260px] md:min-w-[180px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={2} />
                            <Input
                                className="w-full bg-[#F8FAFC] border-[#E2E8F0] rounded-[10px] pl-10 pr-3 h-12 md:h-10 text-[14px] transition-all duration-200 focus:bg-white focus:border-[#4F46E5] focus:ring-[3px] focus:ring-[#4F46E5]/10 outline-none"
                                placeholder="Search leads..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-hide w-full">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0",
                                    statusFilter === "all"
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                All
                            </button>
                            {Object.entries(STATUS_CONFIG).map(([key, config]) => (
                                <button
                                    key={key}
                                    onClick={() => setStatusFilter(key as keyof typeof STATUS_CONFIG)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0",
                                        statusFilter === key
                                            ? cn(config.bg, config.color, "shadow-sm")
                                            : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                    )}
                                >
                                    {config.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Leads List - CRM Style */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">

                    {/* Table Header */}
                    <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-600">
                        <div className="col-span-3">Contact</div>
                        <div className="col-span-2">Company</div>
                        <div className="col-span-2">Source</div>
                        <div className="col-span-2">Status</div>
                        <div className="col-span-1 text-right">Value</div>
                        <div className="col-span-1 text-right">Date</div>
                        <div className="col-span-1 text-right">Actions</div>
                    </div>

                    {/* Leads Rows */}
                    <div className="divide-y divide-slate-100">
                        {filteredLeads.map((lead) => {
                            const statusConfig = STATUS_CONFIG[lead.status as keyof typeof STATUS_CONFIG]

                            return (
                                <div
                                    key={lead.id}
                                    className="relative flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 px-4 py-4 md:px-6 md:py-4 hover:bg-slate-50 transition-colors group border-b border-slate-100 last:border-0 md:border-0"
                                >
                                    {/* Action Button - Mobile */}
                                    <div className="absolute top-4 right-4 md:hidden">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 text-slate-400"
                                        >
                                            <MoreVertical className="h-4 w-4" strokeWidth={2} />
                                        </Button>
                                    </div>

                                    {/* Contact */}
                                    <div className="md:col-span-3 flex items-start md:items-center gap-3 pr-8 md:pr-0">
                                        <button
                                            className="shrink-0 mt-0.5 md:mt-0"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {lead.priority ? (
                                                <Star className="h-4 w-4 text-amber-500 fill-amber-500" strokeWidth={2} />
                                            ) : (
                                                <StarOff className="h-4 w-4 text-slate-300 hover:text-slate-400" strokeWidth={2} />
                                            )}
                                        </button>
                                        <div className="min-w-0 flex-1">
                                            <p className="font-semibold text-sm text-slate-900 truncate">{lead.name}</p>
                                            <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-3 mt-0.5">
                                                <span className="text-xs text-slate-500 truncate flex items-center gap-1">
                                                    <Mail className="h-3 w-3" strokeWidth={2} />
                                                    {lead.email}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Company */}
                                    <div className="md:col-span-2 flex items-center mt-1 md:mt-0 pl-7 md:pl-0 min-w-0">
                                        <div className="min-w-0 flex-1">
                                            <p className="font-medium text-sm text-slate-900 truncate md:hidden">{lead.company}</p>
                                            <p className="font-medium text-sm text-slate-900 truncate hidden md:block">{lead.company}</p>
                                            <p className="text-xs text-slate-500 truncate flex items-center gap-1">
                                                <Phone className="h-3 w-3" strokeWidth={2} />
                                                {lead.phone}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Source */}
                                    <div className="md:col-span-2 flex items-center md:pl-0 pl-7 mt-1 md:mt-0">
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-slate-900 truncate">{lead.source}</p>
                                            <p className="text-xs text-slate-500 truncate">{lead.campaign}</p>
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className="md:col-span-2 flex items-center md:pl-0 pl-7 mt-2 md:mt-0">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] md:text-xs font-bold uppercase tracking-wide",
                                            statusConfig.bg,
                                            statusConfig.color
                                        )}>
                                            {statusConfig.label}
                                        </span>
                                    </div>

                                    {/* Value */}
                                    <div className="md:col-span-1 flex items-center md:justify-end md:pl-0 pl-7 md:mt-0 mt-1">
                                        <p className="text-sm font-bold text-slate-900">
                                            <span className="md:hidden text-xs font-medium text-slate-400 mr-2">Value:</span>
                                            ₹{(lead.value / 1000).toFixed(1)}k
                                        </p>
                                    </div>

                                    {/* Date */}
                                    <div className="md:col-span-1 flex items-center md:justify-end md:pl-0 pl-7 md:mt-0 mt-0.5">
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <Calendar className="h-3 w-3 md:hidden" strokeWidth={2} />
                                            <span className="md:hidden">Created:</span>
                                            {new Date(lead.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="hidden md:flex md:col-span-1 items-center justify-end">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <MoreVertical className="h-4 w-4" strokeWidth={2} />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Empty State */}
                    {filteredLeads.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <p className="text-slate-500">No leads found matching your filters</p>
                        </div>
                    )}

                </div>

            </div>
        </div>
    )
}

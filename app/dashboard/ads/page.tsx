"use client"

import { useState, useEffect } from "react"
import { Search, TrendingUp, TrendingDown, Pause, Play, Settings2, BarChart3, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

// Mock Campaign Data
const CAMPAIGNS = [
    {
        id: "1",
        name: "Diwali Lead Gen - Google Search",
        client: "Vivek Digital",
        platform: "Google Ads",
        status: "active",
        spend: 1245000,
        budget: 1500000,
        impressions: 145820,
        clicks: 2841,
        conversions: 142,
        cpa: 8768,
        roas: 4.2,
        performance: "excellent",
        trend: [{ v: 800000 }, { v: 920000 }, { v: 1050000 }, { v: 1120000 }, { v: 1245000 }],
    },
    {
        id: "2",
        name: "Brand Awareness - Meta",
        client: "Vivek Industries",
        platform: "Meta Ads",
        status: "active",
        spend: 820000,
        budget: 1000000,
        impressions: 892340,
        clicks: 4821,
        conversions: 86,
        cpa: 9535,
        roas: 2.1,
        performance: "poor",
        trend: [{ v: 1000000 }, { v: 950000 }, { v: 900000 }, { v: 850000 }, { v: 820000 }],
    },
    {
        id: "3",
        name: "Retargeting Campaign",
        client: "Vivek Bank",
        platform: "Google Ads",
        status: "paused",
        spend: 580000,
        budget: 800000,
        impressions: 52100,
        clicks: 1240,
        conversions: 68,
        cpa: 8529,
        roas: 5.8,
        performance: "excellent",
        trend: [{ v: 600000 }, { v: 620000 }, { v: 590000 }, { v: 580000 }, { v: 580000 }],
    },
    {
        id: "4",
        name: "LinkedIn B2B Outreach",
        client: "Vivek Motors",
        platform: "LinkedIn Ads",
        status: "active",
        spend: 420000,
        budget: 500000,
        impressions: 28420,
        clicks: 892,
        conversions: 42,
        cpa: 10000,
        roas: 3.4,
        performance: "good",
        trend: [{ v: 350000 }, { v: 380000 }, { v: 400000 }, { v: 410000 }, { v: 420000 }],
    },
]

const PERFORMANCE_CONFIG = {
    excellent: { color: "text-emerald-700", bg: "bg-emerald-50", label: "Excellent" },
    good: { color: "text-blue-700", bg: "bg-blue-50", label: "Good" },
    poor: { color: "text-rose-700", bg: "bg-rose-50", label: "Poor" },
}

// ApexCharts Sparkline Config
const sparklineOptions: any = {
    chart: {
        type: "area",
        sparkline: { enabled: true },
        animations: { enabled: false }
    },
    stroke: { curve: "smooth", width: 2 },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.15,
            opacityTo: 0.05,
            stops: [0, 90, 100]
        }
    },
    colors: ["#0f172a"],
    tooltip: { enabled: false }
}

export default function AdsManagerPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<"all" | "active" | "paused">("all")
    // Fix for Recharts not rendering on mobile: Forced resize after mount
    useEffect(() => {
        const fire = () => window.dispatchEvent(new Event('resize'));
        const timers = [200, 600, 1200].map(t => setTimeout(fire, t));

        window.addEventListener("orientationchange", fire);
        window.addEventListener("resize", fire);

        return () => {
            timers.forEach(clearTimeout);
            window.removeEventListener("orientationchange", fire);
            window.removeEventListener("resize", fire);
        };
    }, []);

    const filteredCampaigns = CAMPAIGNS.filter(campaign => {
        const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            campaign.client.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === "all" || campaign.status === statusFilter
        return matchesSearch && matchesStatus
    })

    // Summary calculations
    const totalSpend = CAMPAIGNS.reduce((sum, c) => sum + c.spend, 0)
    const totalConversions = CAMPAIGNS.reduce((sum, c) => sum + c.conversions, 0)
    const avgRoas = CAMPAIGNS.reduce((sum, c) => sum + c.roas, 0) / CAMPAIGNS.length

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">

                {/* Header Section - Centered on mobile */}
                <header className="mb-6 md:mb-8 text-center md:text-left">
                    <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Ads Manager</h1>
                    <p className="text-xs md:text-sm text-slate-500">Monitor campaign performance across all platforms</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500">Total Spend (MTD)</p>
                            <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-slate-900 flex items-center justify-center">
                                <DollarSign className="h-4 w-4 md:h-5 md:w-5 text-white" strokeWidth={2} />
                            </div>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">₹{(totalSpend / 100000).toFixed(1)}L</p>
                        <p className="text-[10px] md:text-sm text-slate-500 mt-2">Across {CAMPAIGNS.length} campaigns</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500">Total Conversions</p>
                            <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                                <BarChart3 className="h-4 w-4 md:h-5 md:w-5 text-emerald-600" strokeWidth={2} />
                            </div>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{totalConversions}</p>
                        <p className="text-[10px] md:text-sm text-slate-500 mt-2">Average CPA: ₹{(totalSpend / totalConversions).toFixed(0)}</p>
                    </div>

                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
                        <div className="flex items-start justify-between mb-3">
                            <p className="text-[10px] md:text-xs font-semibold uppercase tracking-wider text-slate-500">Average ROAS</p>
                            <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-blue-600" strokeWidth={2} />
                            </div>
                        </div>
                        <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{avgRoas.toFixed(1)}x</p>
                        <p className="text-[10px] md:text-sm text-emerald-600 mt-2 font-semibold">+12% vs last month</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                        <div className="relative flex-1 md:max-w-md w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={2} />
                            <Input
                                className="w-full bg-slate-50 border-slate-200 rounded-xl pl-10 h-10 text-sm focus-visible:ring-1 focus-visible:ring-slate-300"
                                placeholder="Search campaigns..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-2 px-2 md:mx-0 md:px-0">
                            <button
                                onClick={() => setStatusFilter("all")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap",
                                    statusFilter === "all"
                                        ? "bg-slate-900 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                All ({CAMPAIGNS.length})
                            </button>
                            {/* ... (rest of buttons similarily updated for scale/size parity) */}
                            <button
                                onClick={() => setStatusFilter("active")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap",
                                    statusFilter === "active"
                                        ? "bg-emerald-600 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                Active ({CAMPAIGNS.filter(c => c.status === "active").length})
                            </button>
                            <button
                                onClick={() => setStatusFilter("paused")}
                                className={cn(
                                    "px-4 py-2 rounded-lg text-xs md:text-sm font-semibold transition-all whitespace-nowrap",
                                    statusFilter === "paused"
                                        ? "bg-amber-600 text-white shadow-sm"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                                )}
                            >
                                Paused ({CAMPAIGNS.filter(c => c.status === "paused").length})
                            </button>
                        </div>
                    </div>
                </div>

                {/* Campaign Performance Blocks */}
                <div className="space-y-4">
                    {filteredCampaigns.map((campaign) => {
                        const perfConfig = PERFORMANCE_CONFIG[campaign.performance as keyof typeof PERFORMANCE_CONFIG]
                        const budgetUsage = (campaign.spend / campaign.budget) * 100
                        const ctr = ((campaign.clicks / campaign.impressions) * 100).toFixed(2)

                        return (
                            <div
                                key={campaign.id}
                                className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all group overflow-visible"
                            >
                                <div className="flex flex-col md:grid md:grid-cols-12 gap-6">

                                    {/* Left: Campaign Info */}
                                    <div className="md:col-span-4">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors mb-0.5">
                                                    {campaign.name}
                                                </h3>
                                                <p className="text-[11px] text-slate-400 font-medium">{campaign.client} • {campaign.platform}</p>
                                            </div>
                                            {campaign.status === "active" ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full">
                                                    <Play className="h-3 w-3 text-emerald-600 fill-emerald-600" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Active</span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full">
                                                    <Pause className="h-3 w-3 text-slate-600" />
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Paused</span>
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest", perfConfig.bg, perfConfig.color)}>
                                                {perfConfig.label} Performance
                                            </span>
                                        </div>
                                    </div>

                                    {/* Center: Metrics Grid Parity Boxes */}
                                    <div className="md:col-span-5 grid grid-cols-2 gap-3">
                                        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                                            <div>
                                                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Spend</p>
                                                <p className="text-xl font-bold text-slate-900 tracking-tight">₹{(campaign.spend / 1000).toFixed(0)}k</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-[10px] font-medium text-slate-400">Budget</p>
                                                <p className="text-[10px] font-bold text-slate-600">₹{(campaign.budget / 1000).toFixed(0)}k</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center p-3 bg-slate-50 rounded-xl">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">Results</p>
                                            <div className="flex items-end justify-between">
                                                <p className="text-xl font-bold text-slate-900 tracking-tight">{campaign.conversions}</p>
                                                <p className="text-[10px] text-slate-500 font-bold mb-0.5">₹{campaign.cpa.toFixed(0)} CPA</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col justify-center p-3 bg-slate-50 rounded-xl text-center md:text-left">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">CTR</p>
                                            <p className="text-xl font-bold text-slate-900 tracking-tight">{ctr}%</p>
                                        </div>

                                        <div className="flex flex-col justify-center p-3 bg-slate-50 rounded-xl">
                                            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">ROAS</p>
                                            <div className="flex items-center justify-between">
                                                <p className="text-xl font-bold text-slate-900 tracking-tight">{campaign.roas}x</p>
                                                {campaign.roas >= 4 ? (
                                                    <TrendingUp className="h-4 w-4 text-emerald-600" strokeWidth={2.5} />
                                                ) : campaign.roas < 2.5 ? (
                                                    <TrendingDown className="h-4 w-4 text-rose-600" strokeWidth={2.5} />
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Trend & Actions */}
                                    <div className="md:col-span-3 flex flex-col justify-between">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Pacing Trend</p>
                                            <div className="h-14 relative w-full overflow-hidden">
                                                <Chart
                                                    options={sparklineOptions}
                                                    series={[{ name: "Trend", data: campaign.trend.map(t => t.v) }]}
                                                    type="area"
                                                    height="100%"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 md:flex md:items-center gap-2 mt-4 md:mt-2">
                                            <Button size="sm" variant="outline" className="h-9 md:h-8 rounded-xl text-xs font-semibold border-slate-200">
                                                <Settings2 className="h-3.5 w-3.5 mr-1.5 text-slate-400" strokeWidth={2.5} />
                                                Edit
                                            </Button>
                                            <Button size="sm" className="h-9 md:h-8 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white shadow-sm">
                                                Analyze
                                            </Button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}

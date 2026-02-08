"use client"

import { useState, useEffect } from "react"
import { Download, Share2, FileText, TrendingUp, TrendingDown, Calendar, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

// Mock Data
const PERIOD_DATA = [
    { date: "Jan 28", spend: 42000, leads: 52, cpl: 807, roas: 4.2 },
    { date: "Jan 29", spend: 48000, leads: 61, cpl: 786, roas: 4.4 },
    { date: "Jan 30", spend: 51000, leads: 68, cpl: 750, roas: 4.6 },
    { date: "Jan 31", spend: 49000, leads: 64, cpl: 765, roas: 4.5 },
    { date: "Feb 1", spend: 53000, leads: 72, cpl: 736, roas: 4.8 },
    { date: "Feb 2", spend: 56000, leads: 78, cpl: 717, roas: 5.0 },
    { date: "Feb 3", spend: 52000, leads: 70, cpl: 742, roas: 4.7 },
]

const PLATFORM_PERFORMANCE = [
    { platform: "Google Ads", spend: 182000, leads: 242, cpl: 752, roas: 4.8, color: "blue" },
    { platform: "Meta Ads", spend: 124500, leads: 168, cpl: 741, roas: 3.2, color: "indigo" },
    { platform: "LinkedIn Ads", spend: 42000, leads: 55, cpl: 763, roas: 5.1, color: "purple" },
]

const TOP_CAMPAIGNS = [
    { name: "Diwali Lead Gen - Google Search", platform: "Google", spend: 124500, leads: 142, cpl: 876, trend: "up", performance: 92 },
    { name: "Retargeting Campaign", platform: "Google", spend: 58000, leads: 68, cpl: 852, trend: "up", performance: 88 },
    { name: "LinkedIn B2B Outreach", platform: "LinkedIn", spend: 42000, leads: 42, cpl: 1000, trend: "down", performance: 76 },
    { name: "Brand Awareness - Meta", platform: "Meta", spend: 82000, leads: 86, cpl: 953, trend: "down", performance: 68 },
]

const INSIGHTS = [
    { type: "positive", text: "CPL improved by 18% compared to last period" },
    { type: "insight", text: "Meta contributed 42% of total leads" },
    { type: "positive", text: "Lead volume increased while spend remained stable" },
    { type: "warning", text: "LinkedIn CPL is 32% higher than average" },
]

// ApexCharts Options - Spend vs Leads
const spendLeadsOptions: any = {
    chart: {
        type: "line",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
        animations: { enabled: true, speed: 400 }
    },
    stroke: { width: [3, 3], curve: "smooth" },
    colors: ["#0f172a", "#3b82f6"],
    xaxis: {
        categories: PERIOD_DATA.map(d => d.date),
        labels: { style: { colors: "#94a3b8", fontSize: "11px", fontWeight: 500 } },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: [
        {
            title: { text: "Spend", style: { color: "#94a3b8", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' } },
            labels: {
                style: { colors: "#94a3b8" },
                formatter: (val: number) => `₹${(val / 1000).toFixed(0)}k`
            }
        },
        {
            opposite: true,
            title: { text: "Leads", style: { color: "#94a3b8", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' } },
            labels: { style: { colors: "#94a3b8" } }
        }
    ],
    grid: {
        borderColor: "#f1f5f9",
        strokeDashArray: 4,
        padding: { left: 10, right: 10, bottom: 0 }
    },
    legend: {
        position: "bottom",
        horizontalAlign: 'center',
        labels: { colors: "#64748b" },
        markers: { radius: 12, size: 7 }
    },
    dataLabels: { enabled: false },
    markers: { size: 4, strokeWidth: 2, hover: { size: 6 } },
    tooltip: {
        theme: 'light',
        x: { show: true },
        y: {
            formatter: (val: any, { seriesIndex }: any) => seriesIndex === 0 ? `₹${val.toLocaleString()}` : `${val} Leads`
        }
    }
}

// ApexCharts Options - CPL Trend
const cplOptions: any = {
    chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit'
    },
    colors: ["#10b981"],
    stroke: { curve: "smooth", width: 3 },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.15,
            opacityTo: 0.05,
            stops: [0, 90, 100]
        }
    },
    xaxis: {
        categories: PERIOD_DATA.map(d => d.date),
        labels: { style: { colors: "#94a3b8", fontSize: "11px", fontWeight: 500 } },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: {
        title: { text: "Cost Per Lead", style: { color: "#94a3b8", fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' } },
        labels: {
            style: { colors: "#94a3b8" },
            formatter: (val: number) => `₹${val.toFixed(0)}`
        }
    },
    grid: {
        borderColor: "#f1f5f9",
        strokeDashArray: 4,
        padding: { left: 10, right: 10, bottom: 0 }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
        theme: 'light',
        x: { show: true },
        y: { formatter: (val: any) => `₹${val.toFixed(0)}` }
    }
}

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState("30days")
    const [clientFilter, setClientFilter] = useState("all")
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

    // Calculated summaries
    const totalSpend = PLATFORM_PERFORMANCE.reduce((sum, p) => sum + p.spend, 0)
    const totalLeads = PLATFORM_PERFORMANCE.reduce((sum, p) => sum + p.leads, 0)
    const avgCPL = totalSpend / totalLeads
    const avgROAS = PLATFORM_PERFORMANCE.reduce((sum, p) => sum + p.roas, 0) / PLATFORM_PERFORMANCE.length
    const qualifiedLeads = Math.floor(totalLeads * 0.68)

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">

                {/* Header */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-6 md:mb-8 gap-4 md:gap-0">
                    <div>
                        <h1 className="text-2xl font-semibold text-slate-900 mb-1">Performance Intelligence</h1>
                        <p className="text-sm text-slate-500">Client-ready insights across campaigns, platforms, and leads</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" className="h-10 rounded-xl gap-2 border-slate-200 flex-1 md:flex-none justify-center">
                            <FileText className="h-4 w-4" strokeWidth={2} />
                            <span className="md:hidden">PDF</span>
                            <span className="hidden md:inline">Download PDF</span>
                        </Button>
                        <Button variant="outline" className="h-10 rounded-xl gap-2 border-slate-200 flex-1 md:flex-none justify-center">
                            <Download className="h-4 w-4" strokeWidth={2} />
                            <span className="md:hidden">CSV</span>
                            <span className="hidden md:inline">Export CSV</span>
                        </Button>
                        <Button className="h-10 rounded-xl gap-2 bg-slate-900 hover:bg-slate-800 flex-1 md:flex-none justify-center">
                            <Share2 className="h-4 w-4" strokeWidth={2} />
                            <span className="md:hidden">Share</span>
                            <span className="hidden md:inline">Share Report</span>
                        </Button>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-slate-100 mb-6 max-w-full">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
                        <div className="w-full md:w-auto">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                                Date Range
                            </label>
                            <button className="flex items-center justify-between md:justify-start gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors w-full md:w-auto">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" strokeWidth={2} />
                                    Last 30 Days
                                </div>
                                <ChevronDown className="h-4 w-4" strokeWidth={2} />
                            </button>
                        </div>
                        <div className="w-full md:w-auto">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                                Client
                            </label>
                            <button className="flex items-center justify-between md:justify-start gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors w-full md:w-auto">
                                <span className="flex items-center gap-2">All Clients</span>
                                <ChevronDown className="h-4 w-4" strokeWidth={2} />
                            </button>
                        </div>
                        <div className="w-full md:w-auto">
                            <label className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2 block">
                                Platform
                            </label>
                            <button className="flex items-center justify-between md:justify-start gap-2 px-4 py-2 bg-slate-50 rounded-xl text-sm font-medium text-slate-900 hover:bg-slate-100 transition-colors w-full md:w-auto">
                                <span className="flex items-center gap-2">All Platforms</span>
                                <ChevronDown className="h-4 w-4" strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Summary Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Total Ad Spend</p>
                        <p className="text-3xl font-bold text-slate-900 mb-2">₹{(totalSpend / 1000).toFixed(0)}k</p>
                        <p className="text-xs text-slate-500">Amount invested in advertising</p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Total Leads</p>
                        <p className="text-3xl font-bold text-slate-900 mb-2">{totalLeads}</p>
                        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" strokeWidth={2} />
                            +23% vs last period
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Average CPL</p>
                        <p className="text-3xl font-bold text-slate-900 mb-2">₹{avgCPL.toFixed(0)}</p>
                        <p className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                            <TrendingDown className="h-3 w-3" strokeWidth={2} />
                            -18% (improved)
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-3">Blended ROAS</p>
                        <p className="text-3xl font-bold text-slate-900 mb-2">{avgROAS.toFixed(1)}x</p>
                        <p className="text-xs text-slate-500">Revenue vs ad spend</p>
                    </div>
                </div>

                {/* Performance Trends */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 overflow-visible">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">Performance Trends</h2>
                        <p className="text-sm text-slate-500">How performance evolved over time</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Spend vs Leads */}
                        <div>
                            <p className="text-sm font-medium text-slate-700 mb-4">Spend vs Leads</p>
                            <div className="w-full relative h-[380px] md:h-[400px]">
                                <Chart
                                    options={spendLeadsOptions}
                                    series={[
                                        { name: "Spend", data: PERIOD_DATA.map(d => d.spend) },
                                        { name: "Leads", data: PERIOD_DATA.map(d => d.leads) }
                                    ]}
                                    type="line"
                                    height="100%"
                                />
                            </div>
                        </div>

                        {/* CPL Trend */}
                        <div>
                            <p className="text-sm font-medium text-slate-700 mb-4">Cost Per Lead Trend</p>
                            <div className="w-full relative h-[380px] md:h-[400px]">
                                <Chart
                                    options={cplOptions}
                                    series={[{ name: "CPL", data: PERIOD_DATA.map(d => d.cpl) }]}
                                    type="area"
                                    height="100%"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Platform Performance */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6 overflow-visible">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">Platform Performance</h2>
                        <p className="text-sm text-slate-500">Compare results by advertising platform</p>
                    </div>

                    <div className="space-y-4">
                        {PLATFORM_PERFORMANCE.map((platform) => {
                            const contribution = ((platform.leads / totalLeads) * 100).toFixed(0)

                            return (
                                <div
                                    key={platform.platform}
                                    className="border border-slate-100 rounded-xl p-5 hover:border-slate-200 transition-all"
                                >
                                    {/* Mobile: Grid/Stack layout */}
                                    <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:items-center">
                                        <div className="md:col-span-3">
                                            <div className="flex items-center justify-between mb-2 md:mb-0">
                                                <div>
                                                    <h3 className="text-base font-semibold text-slate-900">{platform.platform}</h3>
                                                    <p className="text-xs text-slate-500 mt-1">{contribution}% of total leads</p>
                                                </div>
                                                <div className="md:hidden">
                                                    <div className={cn(
                                                        "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                                                        platform.color === "blue" ? "bg-blue-50" :
                                                            platform.color === "indigo" ? "bg-indigo-50" :
                                                                "bg-purple-50"
                                                    )}>
                                                        <div className={cn(
                                                            "h-2 w-2 rounded-full",
                                                            platform.color === "blue" ? "bg-blue-500" :
                                                                platform.color === "indigo" ? "bg-indigo-500" :
                                                                    "bg-purple-500"
                                                        )} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:contents gap-4">
                                            <div className="md:col-span-2">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Spend</p>
                                                <p className="text-lg font-bold text-slate-900">₹{(platform.spend / 1000).toFixed(0)}k</p>
                                            </div>

                                            <div className="md:col-span-2">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Leads</p>
                                                <p className="text-lg font-bold text-slate-900">{platform.leads}</p>
                                            </div>

                                            <div className="md:col-span-2">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">CPL</p>
                                                <p className="text-lg font-bold text-slate-900">₹{platform.cpl.toFixed(0)}</p>
                                            </div>

                                            <div className="md:col-span-2">
                                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">ROAS</p>
                                                <p className="text-lg font-bold text-slate-900">{platform.roas}x</p>
                                            </div>
                                        </div>

                                        <div className="hidden md:block col-span-1 text-right">
                                            <div className={cn(
                                                "inline-flex h-8 w-8 items-center justify-center rounded-lg",
                                                platform.color === "blue" ? "bg-blue-50" :
                                                    platform.color === "indigo" ? "bg-indigo-50" :
                                                        "bg-purple-50"
                                            )}>
                                                <div className={cn(
                                                    "h-2 w-2 rounded-full",
                                                    platform.color === "blue" ? "bg-blue-500" :
                                                        platform.color === "indigo" ? "bg-indigo-500" :
                                                            "bg-purple-500"
                                                )} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

                    {/* Top Campaign Performance */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-1">Top Campaign Performance</h2>
                            <p className="text-sm text-slate-500">Ranked by performance score</p>
                        </div>

                        <div className="space-y-3">
                            {TOP_CAMPAIGNS.map((campaign, index) => (
                                <div
                                    key={campaign.name}
                                    className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-all"
                                >
                                    <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        {index + 1}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 truncate">{campaign.name}</p>
                                        <p className="text-xs text-slate-500">{campaign.platform}</p>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-sm font-bold text-slate-900">{campaign.leads} leads</p>
                                        <p className="text-xs text-slate-500">₹{campaign.cpl.toFixed(0)} CPL</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {campaign.trend === "up" ? (
                                            <TrendingUp className="h-4 w-4 text-emerald-600" strokeWidth={2} />
                                        ) : (
                                            <TrendingDown className="h-4 w-4 text-rose-600" strokeWidth={2} />
                                        )}
                                        <span className={cn(
                                            "text-xs font-semibold",
                                            campaign.performance >= 85 ? "text-emerald-600" :
                                                campaign.performance >= 70 ? "text-blue-600" :
                                                    "text-amber-600"
                                        )}>
                                            {campaign.performance}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Lead Quality Overview */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-slate-900 mb-1">Lead Outcomes</h2>
                            <p className="text-sm text-slate-500">Quality metrics</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Total Leads Generated</p>
                                <p className="text-3xl font-bold text-slate-900">{totalLeads}</p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Qualified Leads</p>
                                <p className="text-3xl font-bold text-purple-600">{qualifiedLeads}</p>
                                <p className="text-xs text-slate-500 mt-1">{((qualifiedLeads / totalLeads) * 100).toFixed(0)}% qualification rate</p>
                            </div>

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-slate-500 mb-2">Avg Response Time</p>
                                <p className="text-3xl font-bold text-slate-900">2.4h</p>
                                <p className="text-xs text-emerald-600 font-medium mt-1">-32% faster</p>
                            </div>

                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-xs text-slate-500 italic">Lead quality connects marketing to actual business outcomes</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Observations */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-1">Key Observations</h2>
                        <p className="text-sm text-slate-500">Auto-generated insights from the data</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {INSIGHTS.map((insight, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "p-4 rounded-xl border-l-4 flex items-start gap-3",
                                    insight.type === "positive" ? "bg-emerald-50 border-emerald-500" :
                                        insight.type === "warning" ? "bg-amber-50 border-amber-500" :
                                            "bg-blue-50 border-blue-500"
                                )}
                            >
                                {insight.type === "positive" ? (
                                    <TrendingUp className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                ) : insight.type === "warning" ? (
                                    <TrendingDown className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" strokeWidth={2} />
                                ) : (
                                    <div className="h-5 w-5 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" />
                                )}
                                <p className="text-sm font-medium text-slate-900">{insight.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, ArrowDownRight, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })

// ═══════════════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════════════

const TREND_DATA = [
    { date: "Jan 1", spend: 28000, leads: 145 },
    { date: "Jan 8", spend: 32000, leads: 168 },
    { date: "Jan 15", spend: 35000, leads: 182 },
    { date: "Jan 22", spend: 38000, leads: 195 },
    { date: "Jan 29", spend: 42000, leads: 210 },
    { date: "Feb 5", spend: 45000, leads: 228 },
]

const ALERTS = [
    { id: 1, client: "Horizon SaaS", message: "CPL spiked +42% (Google)", time: "2h ago", type: "critical" },
    { id: 2, client: "Nexus Software", message: "Budget pacing at 86%", time: "4h ago", type: "warning" },
    { id: 3, client: "Meridian Financial", message: "Google Ads API disconnected", time: "5h ago", type: "critical" },
]

const ACTIVITY = [
    { client: "Vivek Digital", value: "₹1,25,000", source: "Google Ads", time: "2m ago" },
    { client: "Vivek Chemicals", value: "₹82,000", source: "Meta Ads", time: "12m ago" },
    { client: "Vivek Industries", value: "₹45,000", source: "LinkedIn", time: "24m ago" },
]

// ApexCharts Portfolio Performance
const trendOptions: any = {
    chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
        animations: { enabled: true, speed: 400 }
    },
    stroke: { width: [3, 3], curve: "smooth" },
    colors: ["#6366f1", "#10b981"],
    xaxis: {
        categories: TREND_DATA.map(d => d.date),
        labels: { style: { colors: "#94a3b8", fontSize: "11px", fontWeight: 500 } },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: [
        {
            seriesName: 'Spend',
            labels: {
                style: { colors: "#94a3b8" },
                formatter: (val: number) => `₹${(val / 1000).toFixed(0)}k`
            }
        },
        {
            seriesName: 'Leads',
            opposite: true,
            labels: { style: { colors: "#94a3b8" } }
        }
    ],
    grid: {
        borderColor: "#f1f5f9",
        strokeDashArray: 4,
        padding: { left: 10, right: 10, bottom: 0 }
    },
    fill: {
        type: "gradient",
        gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.15,
            opacityTo: 0.05,
            stops: [0, 90, 100]
        }
    },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: {
        theme: 'light',
        x: { show: true },
        y: {
            formatter: (val: any, { seriesIndex }: any) => seriesIndex === 0 ? `₹${val.toLocaleString()}` : `${val} Leads`
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPONENT — SOFT ENTERPRISE SAAS UI
// ═══════════════════════════════════════════════════════════════════════════

export default function DashboardPage() {
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

    return (
        <div className="min-h-screen bg-[#F6F7F9]">
            <div className="max-w-[1600px] mx-auto px-4 md:px-8 py-6 md:py-8">

                {/* HEADER - Compact on Mobile */}
                <header className="mb-6 md:mb-8 text-center md:text-left">
                    <h1 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">Admin Dashboard</h1>
                    <p className="text-xs md:text-sm text-slate-500">Monitor your agency's performance and client campaigns</p>
                </header>

                {/* KEY METRICS — 3 Large Cards, Stacking on Mobile */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">

                    {/* Card 1: Managed Spend */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Managed Spend (MTD)</p>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">₹1,63,95,000</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0">
                                <TrendingUp className="h-5 w-5 text-indigo-600" strokeWidth={2} />
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                                12%
                            </span>
                            <span className="text-slate-500 text-xs md:text-sm">vs last month</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100">
                            <span className="inline-flex items-center gap-1 text-[10px] md:text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded-lg">
                                ⚠️ Overspending
                            </span>
                        </div>
                    </div>

                    {/* Card 2: Agency Revenue */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Agency Revenue</p>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">₹24,59,200</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                                <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                                8.4%
                            </span>
                            <span className="text-slate-500 text-xs md:text-sm">vs last month</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100">
                            <span className="text-[10px] md:text-xs text-slate-600">
                                Avg margin: <span className="font-semibold text-slate-900">15%</span>
                            </span>
                        </div>
                    </div>

                    {/* Card 3: Leads Generated */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-slate-500 mb-1">Leads Generated</p>
                                <p className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">842</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                                18%
                            </span>
                            <span className="text-slate-500 text-xs md:text-sm">vs last month</span>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100">
                            <span className="text-[10px] md:text-xs text-slate-600">
                                Cost per Lead: <span className="font-semibold text-slate-900">₹1,550</span>
                            </span>
                        </div>
                    </div>

                </section>

                {/* PORTFOLIO PERFORMANCE — Large Horizontal Card */}
                <section className="mb-6 md:mb-8">
                    <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-slate-100 overflow-visible">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h2 className="text-base md:text-lg font-semibold text-slate-900">Portfolio Performance</h2>
                                <p className="text-xs md:text-sm text-slate-500 mt-0.5">Spend vs Leads trend over time</p>
                            </div>
                            <div className="flex items-center gap-4 md:gap-6">
                                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                                    <span className="h-2 w-2 rounded-full bg-indigo-600"></span>
                                    <span className="text-slate-600 font-medium">Spend</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs md:text-sm">
                                    <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                                    <span className="text-slate-600 font-medium">Leads</span>
                                </div>
                            </div>
                        </div>

                        <div className="h-[380px] md:h-[420px] -ml-4 -mr-2 relative w-full">
                            <Chart
                                options={trendOptions}
                                series={[
                                    { name: "Spend", data: TREND_DATA.map(d => d.spend) },
                                    { name: "Leads", data: TREND_DATA.map(d => d.leads) }
                                ]}
                                type="area"
                                height="100%"
                            />
                        </div>
                    </div>
                </section>

                {/* BOTTOM SECTION — Alerts + Activity Stacking on Mobile */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">

                    {/* Attention Required Card */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-sm md:text-base font-semibold text-slate-900">Attention Required</h3>
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                                {ALERTS.length}
                            </span>
                        </div>
                        <div className="space-y-3">
                            {ALERTS.map((alert) => (
                                <div key={alert.id} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <div className="flex items-start gap-3">
                                        <div className={cn(
                                            "h-8 w-8 rounded-lg flex items-center justify-center shrink-0",
                                            alert.type === 'critical' ? 'bg-rose-100' : 'bg-amber-100'
                                        )}>
                                            <AlertTriangle className={cn(
                                                "h-4 w-4",
                                                alert.type === 'critical' ? 'text-rose-600' : 'text-amber-600'
                                            )} strokeWidth={2} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs md:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">{alert.client}</p>
                                            <p className="text-[10px] md:text-xs text-slate-600 mt-0.5 leading-tight">{alert.message}</p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 shrink-0">{alert.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity Card */}
                    <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-sm md:text-base font-semibold text-slate-900">Recent Activity</h3>
                            <Link href="/dashboard/leads" className="text-xs md:text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                                View all <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                        <div className="space-y-3">
                            {ACTIVITY.map((item, idx) => (
                                <div key={idx} className="p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer group">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs md:text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">{item.client}</p>
                                            <p className="text-[10px] md:text-xs text-slate-600 mt-0.5">
                                                {item.value} <span className="text-slate-400">•</span> {item.source}
                                            </p>
                                        </div>
                                        <span className="text-[10px] text-slate-400 shrink-0">{item.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </section>

                {/* QUICK STATS — 2 per row on Mobile */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-medium text-slate-500 mb-1 leading-tight">Active Clients</p>
                        <p className="text-xl md:text-2xl font-bold text-slate-900">42</p>
                        <p className="text-[10px] text-slate-500 mt-1">of 45 total</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-medium text-slate-500 mb-1 leading-tight">Avg. ROAS</p>
                        <p className="text-xl md:text-2xl font-bold text-slate-900">3.8x</p>
                        <p className="text-[10px] text-emerald-600 mt-1">+0.4 month</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100">
                        <p className="text-[10px] md:text-xs font-medium text-slate-500 mb-1 leading-tight">Pending Tasks</p>
                        <p className="text-xl md:text-2xl font-bold text-slate-900">7</p>
                        <p className="text-[10px] text-amber-600 mt-1">2 overdue</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex items-center justify-center">
                        <Link href="/dashboard/clients" className="text-[11px] md:text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center lg:gap-1.5 gap-1 text-center leading-tight">
                            View Accounts <ArrowRight className="h-3.5 w-3.5 md:h-4 md:w-4 shrink-0" strokeWidth={2} />
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    )
}

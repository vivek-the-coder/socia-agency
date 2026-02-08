"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false })
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const data = [
    { name: "Mon", google: 450, meta: 210 },
    { name: "Tue", google: 580, meta: 340 },
    { name: "Wed", google: 320, meta: 650 },
    { name: "Thu", google: 490, meta: 420 },
    { name: "Fri", google: 690, meta: 520 },
    { name: "Sat", google: 720, meta: 480 },
    { name: "Sun", google: 510, meta: 390 },
]

// ApexCharts Overview Options
const overviewOptions: any = {
    chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: false },
        fontFamily: 'inherit',
        animations: { enabled: true, speed: 400 }
    },
    stroke: { width: [3, 3], curve: "smooth" },
    colors: ["#EF4444", "#3B82F6"],
    xaxis: {
        categories: data.map(d => d.name),
        labels: { style: { colors: "#94a3b8", fontSize: "11px", fontWeight: 500 } },
        axisBorder: { show: false },
        axisTicks: { show: false }
    },
    yaxis: {
        labels: {
            style: { colors: "#94a3b8" },
            formatter: (val: number) => `₹${val}`
        }
    },
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
    legend: {
        position: "top",
        horizontalAlign: 'right',
        labels: { colors: "#64748b" },
        markers: { radius: 12, size: 7 }
    },
    dataLabels: { enabled: false },
    tooltip: {
        theme: 'light',
        x: { show: true },
        y: { formatter: (val: any) => `₹${val}` }
    }
}

export function OverviewCharts() {
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
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl bg-white h-full flex flex-col overflow-visible">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-6 pt-6">
                <CardTitle className="text-lg font-bold text-[#111827]">Multi-Channel Performance</CardTitle>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="h-8 text-xs border-[#E5E7EB] text-[#111827] bg-white hover:bg-[#F3F4F6] rounded-lg">
                        Last 7 Days <ChevronDown className="ml-2 h-3 w-3 text-[#6B7280]" />
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="w-full px-2 pb-2 h-[380px] md:h-[420px] relative">
                <Chart
                    options={overviewOptions}
                    series={[
                        { name: "Google Ads", data: data.map(d => d.google) },
                        { name: "Meta Ads", data: data.map(d => d.meta) }
                    ]}
                    type="area"
                    height="100%"
                />
            </CardContent>
        </Card>
    )
}

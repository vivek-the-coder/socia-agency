import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronRight, Plus, Calendar as CalendarIcon, Clock, CheckCircle2, Megaphone, AlertCircle } from "lucide-react"

export default function RightPanel() {
    return (
        <div className="flex flex-col gap-6 w-full lg:max-w-[320px] 2xl:max-w-[360px]">
            {/* Active Campaigns - Simplified Card */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#111827] text-lg">Active Campaigns</h3>
                    <Button size="icon" className="h-8 w-8 rounded-lg bg-[#3B82F6] text-white hover:bg-blue-600 shadow-sm shadow-blue-200">
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>

                <CampaignCard
                    title="Diwali Dhamaka 2024"
                    platform="Google Ads"
                    status="Active"
                    color="bg-red-50 text-red-600"
                    trend="+12%"
                />
                <CampaignCard
                    title="New Lead Gen"
                    platform="Meta Ads"
                    status="Active"
                    color="bg-blue-50 text-blue-600"
                    trend="+5%"
                />
                <CampaignCard
                    title="Retargeting Q3"
                    platform="Google Ads"
                    status="Review"
                    color="bg-yellow-50 text-yellow-600"
                    trend="0%"
                />
            </div>

            {/* Recent Notifications / Activity */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-[#111827] text-lg">Notifications</h3>
                    <span className="text-[#9CA3AF] text-xs font-semibold cursor-pointer hover:text-blue-600">Mark all read</span>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#E5E7EB] flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-[#EF4444] mt-1.5 ring-4 ring-red-50" />
                            <div className="w-[1px] h-12 bg-[#F3F4F6] mt-1" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#111827]">Today</p>
                        </div>
                    </div>

                    <ActivityItem
                        icon={Megaphone} iconClass="text-white bg-[#3B82F6]"
                        title="New Ad Creative approved for 'Vivek Digital'"
                        time="10 min ago"
                    />
                    <ActivityItem
                        icon={AlertCircle} iconClass="text-white bg-[#F97316]"
                        title="Budget pacing alert: 'Vivek Chemicals' reached 90% cap"
                        time="1 hour ago"
                    />
                    <ActivityItem
                        icon={CheckCircle2} iconClass="text-white bg-[#10B981]"
                        title="New Qualified Lead from 'LinkedIn Campaign'"
                        time="2 hours ago"
                    />
                    <ActivityItem
                        icon={Megaphone} iconClass="text-white bg-[#EF4444]"
                        title="Google Ads Campaign 'Diwali Dhamaka' started"
                        time="Yesterday"
                    />
                </div>
            </div>
        </div>
    )
}

function CampaignCard({ title, platform, status, color, trend }: any) {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E5E7EB] flex gap-3 items-center group hover:border-[#3B82F6] transition-all cursor-pointer">
            <div className={`h-10 w-10 rounded-lg shrink-0 flex items-center justify-center font-bold text-lg ${platform === 'Google Ads' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                {platform === 'Google Ads' ? 'G' : 'M'}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between items-start">
                    <h4 className="font-bold text-[#111827] text-sm group-hover:text-[#3B82F6] transition-colors line-clamp-1">{title}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>{status}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                    <span className="text-[11px] text-[#6B7280]">{platform}</span>
                    <span className="text-[10px] font-semibold text-[#10B981]">{trend}</span>
                </div>
            </div>
        </div>
    )
}

function ActivityItem({ icon: Icon, iconClass, title, time }: any) {
    return (
        <div className="flex gap-4 items-start relative">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 ${iconClass} z-10 shadow-sm`}>
                <Icon className="h-4 w-4" />
            </div>
            <div>
                <p className="text-xs font-semibold text-[#111827] leading-snug">{title}</p>
                <p className="text-[10px] font-medium text-[#9CA3AF] mt-1">{time}</p>
            </div>
        </div>
    )
}

"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, ExternalLink, ArrowUp, ArrowDown } from "lucide-react"

interface Campaign {
    id: string
    name: string
    platform: "Google Ads" | "Meta"
    status: "Active" | "Paused" | "Ended"
    impressions: string
    clicks: string
    ctr: string
    cpc: string
    spend: string
    roas: string
    trend: number
}

const CAMPAIGNS: Campaign[] = [
    { id: "1", name: "Diwali Dhamaka Sale - Search", platform: "Google Ads", status: "Active", impressions: "45.2K", clicks: "3.2K", ctr: "7.1%", cpc: "₹120", spend: "₹3,84,000", roas: "4.2x", trend: 12 },
    { id: "2", name: "Retargeting - All Visitors", platform: "Meta", status: "Active", impressions: "125K", clicks: "1.8K", ctr: "1.4%", cpc: "₹70", spend: "₹1,26,000", roas: "3.8x", trend: 5 },
    { id: "3", name: "Competitor Conquesting", platform: "Google Ads", status: "Paused", impressions: "12K", clicks: "450", ctr: "3.7%", cpc: "₹170", spend: "₹76,500", roas: "2.1x", trend: -15 },
    { id: "4", name: "Lead Gen - Lookalike 1%", platform: "Meta", status: "Active", impressions: "85K", clicks: "950", ctr: "1.1%", cpc: "₹95", spend: "₹90,250", roas: "5.5x", trend: 24 },
    { id: "5", name: "Brand Awareness - Video", platform: "Meta", status: "Ended", impressions: "250K", clicks: "5.2K", ctr: "2.1%", cpc: "₹35", spend: "₹1,82,000", roas: "1.2x", trend: 0 },
    { id: "6", name: "Holi Promo - Display", platform: "Google Ads", status: "Active", impressions: "350K", clicks: "1.5K", ctr: "0.4%", cpc: "₹25", spend: "₹37,500", roas: "0.8x", trend: -5 },
]

export function CampaignTable() {
    return (
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
            <Table>
                <TableHeader className="bg-[#F9FAFB]">
                    <TableRow>
                        <TableHead className="w-[300px]">Campaign Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Platform</TableHead>
                        <TableHead className="text-right">Spend</TableHead>
                        <TableHead className="text-right">ROAS</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {CAMPAIGNS.map((campaign) => (
                        <TableRow key={campaign.id} className="hover:bg-gray-50/50">
                            <TableCell className="font-medium">
                                <div className="flex flex-col">
                                    <span className="text-[#111827] font-semibold text-sm">{campaign.name}</span>
                                    <div className="flex gap-3 text-xs text-[#64748B] mt-1">
                                        <span>{campaign.impressions} Impr.</span>
                                        <span>{campaign.clicks} Clicks</span>
                                        <span>{campaign.ctr} CTR</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Switch checked={campaign.status === 'Active'} className="data-[state=checked]:bg-green-500" />
                                    <Badge variant="outline" className={`
                                        ${campaign.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' :
                                            campaign.status === 'Paused' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                                                'bg-gray-100 text-gray-600 border-gray-200'}
                                    `}>
                                        {campaign.status}
                                    </Badge>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className={`h-6 w-6 rounded-full flex items-center justify-center border shadow-sm ${campaign.platform === 'Google Ads' ? 'bg-white border-gray-100 text-red-500' : 'bg-white border-gray-100 text-blue-600'
                                        }`}>
                                        <span className="text-[10px] font-bold">{campaign.platform === 'Google Ads' ? 'G' : 'M'}</span>
                                    </div>
                                    <span className="text-sm text-[#111827]">{campaign.platform}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-medium text-[#111827]">{campaign.spend}</TableCell>
                            <TableCell className="text-right">
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-[#111827]">{campaign.roas}</span>
                                    {campaign.trend !== 0 && (
                                        <span className={`text-[10px] flex items-center ${campaign.trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                            {campaign.trend > 0 ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                                            {Math.abs(campaign.trend)}%
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8] hover:text-[#3B82F6]">
                                        <ExternalLink className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8]">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

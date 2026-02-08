"use client"

import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { X, Copy, Check, ExternalLink, TrendingUp, Users2, Target } from "lucide-react"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { Client } from "@/lib/mockClientData"
import { useState } from "react"
import { toast } from "sonner"

interface ClientDrillDownProps {
    client: Client
    onClose: () => void
}

export function ClientDrillDown({ client, onClose }: ClientDrillDownProps) {
    const [copiedWebhook, setCopiedWebhook] = useState<string | null>(null)

    const performanceData = [
        { date: "Jan 1", spend: 120000, leads: 45, roas: 3.2 },
        { date: "Jan 8", spend: 145000, leads: 52, roas: 3.6 },
        { date: "Jan 15", spend: 168000, leads: 61, roas: 3.9 },
        { date: "Jan 22", spend: 189000, leads: 68, roas: 4.1 },
        { date: "Jan 29", spend: 210000, leads: 75, roas: 4.3 },
        { date: "Feb 5", spend: 234000, leads: 82, roas: 4.5 },
    ]

    const leadForms = [
        { id: "1", name: "Homepage Contact Form", leads: 234, webhook: "https://socia.in/webhook/abc123xyz" },
        { id: "2", name: "Free Consultation Request", leads: 189, webhook: "https://socia.in/webhook/def456uvw" },
        { id: "3", name: "Demo Request", leads: 145, webhook: "https://socia.in/webhook/ghi789rst" },
    ]

    const copyWebhook = (webhook: string, formName: string) => {
        navigator.clipboard.writeText(webhook)
        setCopiedWebhook(webhook)
        toast.success("Webhook URL copied!", {
            description: `${formName} webhook copied to clipboard`,
        })
        setTimeout(() => setCopiedWebhook(null), 2000)
    }

    return (
        <motion.div
            className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="min-h-screen p-6 md:p-8"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-2xl font-bold text-[#3B82F6] border border-blue-100 shadow-lg">
                                {client.logo}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-[#111827]">{client.name}</h1>
                                <div className="flex items-center gap-3 mt-1">
                                    <p className="text-[#64748B]">{client.industry}</p>
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
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-[#64748B]">Total Spend</p>
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                            </div>
                            <p className="text-2xl font-bold text-[#111827]">{client.spend}</p>
                            <p className="text-xs text-green-600 mt-1">+{client.trend}% this month</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-[#64748B]">Leads Generated</p>
                                <Users2 className="h-4 w-4 text-green-500" />
                            </div>
                            <p className="text-2xl font-bold text-[#111827]">{client.leadCount}</p>
                            <p className="text-xs text-[#64748B] mt-1">Last 30 days</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-[#64748B]">Active Campaigns</p>
                                <Target className="h-4 w-4 text-purple-500" />
                            </div>
                            <p className="text-2xl font-bold text-[#111827]">{client.activeAds}</p>
                            <p className="text-xs text-[#64748B] mt-1">Across all platforms</p>
                        </div>
                        <div className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-medium text-[#64748B]">Assigned To</p>
                                <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                                    {client.assignedTo.split(' ').map(n => n[0]).join('')}
                                </div>
                            </div>
                            <p className="text-lg font-bold text-[#111827]">{client.assignedTo}</p>
                            <p className="text-xs text-[#64748B] mt-1">Account Manager</p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <Tabs defaultValue="performance" className="space-y-6">
                        <TabsList className="bg-white border border-[#E5E7EB] p-1 h-12 rounded-lg">
                            <TabsTrigger value="performance" className="rounded-md data-[state=active]:bg-[#F3F4F6] data-[state=active]:text-[#111827] data-[state=active]:shadow-sm">
                                Ad Performance
                            </TabsTrigger>
                            <TabsTrigger value="forms" className="rounded-md data-[state=active]:bg-[#F3F4F6] data-[state=active]:text-[#111827] data-[state=active]:shadow-sm">
                                Lead Forms
                            </TabsTrigger>
                            <TabsTrigger value="settings" className="rounded-md data-[state=active]:bg-[#F3F4F6] data-[state=active]:text-[#111827] data-[state=active]:shadow-sm">
                                Settings
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab 1: Ad Performance */}
                        <TabsContent value="performance" className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-[#111827]">Performance Trend</h3>
                                    <Button variant="outline" size="sm">
                                        <ExternalLink className="mr-2 h-4 w-4" />
                                        View Full Report
                                    </Button>
                                </div>
                                <div className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <defs>
                                                <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                                </linearGradient>
                                                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                                                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                                            <XAxis dataKey="date" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB' }}
                                                cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }}
                                            />
                                            <Area type="monotone" dataKey="spend" stroke="#3B82F6" strokeWidth={3} fill="url(#colorSpend)" name="Ad Spend" />
                                            <Area type="monotone" dataKey="leads" stroke="#10B981" strokeWidth={3} fill="url(#colorLeads)" name="Leads" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </TabsContent>

                        {/* Tab 2: Lead Forms */}
                        <TabsContent value="forms" className="space-y-4">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-bold text-[#111827]">Active Lead Forms</h3>
                                    <p className="text-sm text-[#64748B]">Manage webhook URLs for each form</p>
                                </div>
                                <Button className="bg-[#3B82F6] hover:bg-blue-600">Add New Form</Button>
                            </div>
                            {leadForms.map((form) => (
                                <div key={form.id} className="bg-white p-5 rounded-xl border border-[#E5E7EB] shadow-sm hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="font-semibold text-[#111827] mb-1">{form.name}</h4>
                                            <p className="text-sm text-[#64748B]">{form.leads} leads collected</p>
                                        </div>
                                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Active</Badge>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Input
                                            value={form.webhook}
                                            readOnly
                                            className="font-mono text-xs bg-gray-50"
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => copyWebhook(form.webhook, form.name)}
                                            className="shrink-0"
                                        >
                                            {copiedWebhook === form.webhook ? (
                                                <Check className="h-4 w-4 text-green-600" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>

                        {/* Tab 3: Settings */}
                        <TabsContent value="settings" className="space-y-6">
                            <div className="bg-white p-6 rounded-xl border border-[#E5E7EB] shadow-sm">
                                <h3 className="text-lg font-bold text-[#111827] mb-6">Client Settings</h3>
                                <div className="space-y-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="budget">Monthly Spend Limit</Label>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-[#111827]">₹</span>
                                            <Input
                                                id="budget"
                                                type="number"
                                                defaultValue={client.monthlyBudget}
                                                className="h-11 text-lg font-semibold"
                                            />
                                        </div>
                                        <p className="text-xs text-[#64748B]">You'll receive alerts when spend reaches 80% of this limit</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">Contact Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            defaultValue={client.contactEmail}
                                            className="h-11"
                                        />
                                        <p className="text-xs text-[#64748B]">Primary contact for reports and alerts</p>
                                    </div>
                                    <div className="grid gap-2">
                                        <Label htmlFor="website">Website URL</Label>
                                        <Input
                                            id="website"
                                            defaultValue={client.website}
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="pt-4 border-t border-[#E5E7EB]">
                                        <Button className="bg-[#111827] hover:bg-black text-white">
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </motion.div>
        </motion.div>
    )
}

"use client"

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Phone, Mail, MapPin, Calendar, MessageSquare, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    source: string
    status: string
    value: string
    date: string
    notes?: string
}

interface LeadDetailSheetProps {
    lead: Lead | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function LeadDetailSheet({ lead, open, onOpenChange }: LeadDetailSheetProps) {
    if (!lead) return null

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] p-0 overflow-hidden flex flex-col">
                <div className="p-6 pb-2 border-b border-[#E5E7EB]">
                    <SheetHeader className="mb-4">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                                    <AvatarFallback className="bg-blue-100 text-blue-600 font-bold text-xl">
                                        {lead.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <SheetTitle className="text-xl font-bold text-[#111827]">{lead.name}</SheetTitle>
                                    <SheetDescription className="flex items-center gap-2 mt-1">
                                        <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
                                            {lead.source}
                                        </Badge>
                                        <span className="text-xs text-[#64748B]">• Added {lead.date}</span>
                                    </SheetDescription>
                                </div>
                            </div>
                        </div>
                    </SheetHeader>

                    <div className="flex gap-2 mt-4">
                        <Button className="flex-1 bg-[#3B82F6] hover:bg-blue-600">
                            <Phone className="mr-2 h-4 w-4" /> Call
                        </Button>
                        <Button variant="outline" className="flex-1">
                            <Mail className="mr-2 h-4 w-4" /> Email
                        </Button>
                    </div>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-6 space-y-8">
                        {/* Status & Value */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider mb-1">Status</p>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${lead.status === 'New' ? 'bg-blue-100 text-blue-800' :
                                    lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                    {lead.status}
                                </span>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider mb-1">Est. Value</p>
                                <p className="text-lg font-bold text-[#111827]">{lead.value}</p>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-[#111827] flex items-center gap-2">
                                <MessageSquare className="h-4 w-4 text-[#94A3B8]" /> Contact Details
                            </h4>
                            <div className="grid gap-3 text-sm">
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E5E7EB]">
                                    <Mail className="h-4 w-4 text-[#64748B]" />
                                    <span className="text-[#111827]">{lead.email}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E5E7EB]">
                                    <Phone className="h-4 w-4 text-[#64748B]" />
                                    <span className="text-[#111827]">{lead.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#E5E7EB]">
                                    <MapPin className="h-4 w-4 text-[#64748B]" />
                                    <span className="text-[#111827]">Mumbai, India (IP Based)</span>
                                </div>
                            </div>
                        </div>

                        {/* Activity Timeline (Mock) */}
                        <div className="space-y-4">
                            <h4 className="font-semibold text-[#111827] flex items-center gap-2">
                                <Clock className="h-4 w-4 text-[#94A3B8]" /> Activity History
                            </h4>
                            <div className="relative pl-4 border-l-2 border-[#E5E7EB] space-y-6">
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-blue-500 border-2 border-white"></div>
                                    <p className="text-sm font-medium text-[#111827]">Lead Created</p>
                                    <p className="text-xs text-[#64748B] mt-0.5">{lead.date} via {lead.source}</p>
                                </div>
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-gray-300 border-2 border-white"></div>
                                    <p className="text-sm font-medium text-[#111827]">Form Submission</p>
                                    <p className="text-xs text-[#64748B] mt-0.5">Interested in "Diwali Dhamaka" package.</p>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <h4 className="font-semibold text-[#111827]">Notes</h4>
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-sm text-yellow-800">
                                {lead.notes || "No notes added yet."}
                            </div>
                        </div>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    )
}

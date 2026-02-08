"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, MoreHorizontal, Download, ArrowUpDown } from "lucide-react"
import { LeadDetailSheet } from "./LeadDetailSheet"

interface Lead {
    id: string
    name: string
    email: string
    phone: string
    source: "Google Ads" | "Meta" | "LinkedIn" | "Organic"
    status: "New" | "Contacted" | "Qualified" | "Closed" | "Lost"
    value: string
    date: string
    assignee: string
    notes?: string
}

const MOCK_LEADS: Lead[] = [
    { id: "1", name: "Hiren Vasava", email: "hiren@example.in", phone: "+91 98765 43210", source: "Google Ads", status: "New", value: "₹25,000", date: "Oct 24, 2024", assignee: "Anjali S.", notes: "Interested in full package." },
    { id: "2", name: "Manav Patel", email: "manav@example.in", phone: "+91 87654 32109", source: "Meta", status: "Contacted", value: "₹12,000", date: "Oct 23, 2024", assignee: "brijraj.d M.", notes: "Called twice, left voicemail." },
    { id: "3", name: "Tirth Patel", email: "tirth@example.in", phone: "+91 76543 21098", source: "LinkedIn", status: "Qualified", value: "₹50,000", date: "Oct 22, 2024", assignee: "Anjali S.", notes: "Budget approved, sending proposal." },
    { id: "4", name: "Vraj Padariya", email: "vraj@example.in", phone: "+91 65432 10987", source: "Organic", status: "New", value: "₹8,000", date: "Oct 21, 2024", assignee: "Unassigned", notes: "Website contact form." },
    { id: "5", name: "Sachin Singh", email: "sachin@example.in", phone: "+91 91234 56789", source: "Google Ads", status: "Closed", value: "₹32,000", date: "Oct 20, 2024", assignee: "brijraj.d M.", notes: "Closed won! Onboarding starts Monday." },
    { id: "6", name: "Riya Sharma", email: "riya@example.in", phone: "+91 82345 67890", source: "Meta", status: "Lost", value: "₹15,000", date: "Oct 19, 2024", assignee: "Anjali S.", notes: "Went with competitor." },
    { id: "7", name: "Amit Kumar", email: "amit@example.in", phone: "+91 93456 78901", source: "LinkedIn", status: "Contacted", value: "₹41,000", date: "Oct 18, 2024", assignee: "brijraj.d M.", notes: "Meeting scheduled for Tuesday." },
]

export function LeadTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const filteredLeads = MOCK_LEADS.filter(lead =>
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleRowClick = (lead: Lead) => {
        setSelectedLead(lead)
        setIsSheetOpen(true)
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
                    <Input
                        placeholder="Search leads..."
                        className="pl-10 bg-[#F9FAFB] border-[#E5E7EB]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Select defaultValue="all">
                        <SelectTrigger className="w-[180px] bg-white border-[#E5E7EB]">
                            <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button variant="outline" size="icon" className="border-[#E5E7EB] text-[#64748B]">
                        <Download className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-[#F9FAFB]">
                        <TableRow>
                            <TableHead className="w-[300px]">Lead Name</TableHead>
                            <TableHead>Source</TableHead>
                            <TableHead>
                                <div className="flex items-center gap-1 cursor-pointer hover:text-[#111827]">
                                    Value <ArrowUpDown className="h-3 w-3" />
                                </div>
                            </TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Assignee</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLeads.map((lead) => (
                            <TableRow
                                key={lead.id}
                                className="cursor-pointer hover:bg-blue-50/50 transition-colors"
                                onClick={() => handleRowClick(lead)}
                            >
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 bg-blue-50 text-blue-600 border border-blue-100">
                                            <AvatarFallback className="text-xs font-bold">
                                                {lead.name.split(' ').map(n => n[0]).join('')}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-[#111827] font-semibold">{lead.name}</p>
                                            <p className="text-xs text-[#64748B]">{lead.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className="bg-white border border-[#E5E7EB] text-[#64748B] hover:bg-gray-50 font-normal">
                                        <div className={`h-1.5 w-1.5 rounded-full mr-2 ${lead.source === 'Google Ads' ? 'bg-red-500' :
                                            lead.source === 'Meta' ? 'bg-blue-500' :
                                                lead.source === 'LinkedIn' ? 'bg-sky-600' :
                                                    'bg-green-500'
                                            }`}></div>
                                        {lead.source}
                                    </Badge>
                                </TableCell>
                                <TableCell className="font-semibold text-[#111827]">{lead.value}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${lead.status === 'New' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                        lead.status === 'Qualified' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                            lead.status === 'Closed' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                lead.status === 'Lost' ? 'bg-red-50 text-red-700 border-red-100' :
                                                    'bg-gray-50 text-gray-700 border-gray-100'
                                        }`}>
                                        {lead.status}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${lead.assignee}`} />
                                            <AvatarFallback className="text-[10px] bg-gray-100">{lead.assignee[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm text-[#64748B]">{lead.assignee}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-[#94A3B8]">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <LeadDetailSheet
                lead={selectedLead}
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
            />
        </div>
    )
}

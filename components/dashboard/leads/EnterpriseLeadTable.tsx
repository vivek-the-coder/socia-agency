"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { SegmentedControl } from "@/components/ui/segmented-control"
import { Search, Download, ArrowUpDown, MessageSquare, Mail, Phone, Calendar, Send, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"

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
    formData?: Record<string, string>
    conversation?: { type: "note" | "email" | "call"; message: string; timestamp: string; author: string }[]
}

const MOCK_LEADS: Lead[] = [
    {
        id: "1",
        name: "Manav Patel",
        email: "arjun.m@techcorp.in",
        phone: "+91 98765 43210",
        source: "Google Ads",
        status: "New",
        value: "₹42,000",
        date: "Today, 2:45 PM",
        assignee: "Unassigned",
        formData: { "Company": "TechCorp", "Role": "VP Marketing", "Interest": "Lead Generation" },
        conversation: []
    },
    {
        id: "2",
        name: "Brijraj Dhummad",
        email: "brijraj.d@meridian.in",
        phone: "+91 87654 32109",
        source: "LinkedIn",
        status: "Qualified",
        value: "₹1,25,000",
        date: "Today, 11:20 AM",
        assignee: "Anjali S.",
        formData: { "Company": "Meridian Financial", "Budget": "₹1L-2.5L", "Timeline": "Q4 2024" },
        conversation: [
            { type: "note", message: "Initial qualification call completed. Budget confirmed.", timestamp: "Today, 1:30 PM", author: "Anjali S." },
            { type: "email", message: "Sent proposal deck and case studies.", timestamp: "Today, 2:15 PM", author: "Anjali S." }
        ]
    },
    {
        id: "3",
        name: "Priya Reddy",
        email: "priya@Vivekbeauty.in",
        phone: "+91 76543 21098",
        source: "Meta",
        status: "Contacted",
        value: "₹80,000",
        date: "Yesterday",
        assignee: "brijraj.d M.",
        formData: { "Company": "Vivek Chemicals", "Interest": "Brand Awareness", "Audience": "25-45 Female" },
        conversation: [
            { type: "call", message: "Left voicemail. Will follow up tomorrow.", timestamp: "Yesterday, 4:00 PM", author: "brijraj.d M." }
        ]
    },
    {
        id: "4",
        name: "Rocky Upadhyay",
        email: "r.gupta@vertex.in",
        phone: "+91 65432 10987",
        source: "Organic",
        status: "New",
        value: "₹28,000",
        date: "Yesterday",
        assignee: "Unassigned",
        formData: { "Company": "Vertex Industries", "Source": "Blog Post", "Interest": "PPC Management" },
        conversation: []
    },
    {
        id: "5",
        name: "Vraj Patel",
        email: "asharma@quantum.in",
        phone: "+91 91234 56789",
        source: "Google Ads",
        status: "Closed",
        value: "₹1,80,000",
        date: "Oct 28",
        assignee: "Anjali S.",
        formData: { "Company": "Quantum Analytics", "Deal Size": "Enterprise", "Services": "Full Stack" },
        conversation: [
            { type: "note", message: "Contract signed! Onboarding starts Nov 1.", timestamp: "Oct 28, 3:00 PM", author: "Anjali S." }
        ]
    },
    {
        id: "6",
        name: "Rahul Khanna",
        email: "rahul@nexussoft.in",
        phone: "+91 82345 67890",
        source: "LinkedIn",
        status: "Lost",
        value: "₹65,000",
        date: "Oct 25",
        assignee: "brijraj.d M.",
        formData: { "Company": "Nexus Software", "Reason": "Budget constraints" },
        conversation: [
            { type: "note", message: "Lost to budget cuts. Follow up in Q1 2025.", timestamp: "Oct 25, 5:00 PM", author: "brijraj.d M." }
        ]
    },
]

export function EnterpriseLeadTable() {
    const [searchTerm, setSearchTerm] = useState("")
    const [statusFilter, setStatusFilter] = useState("all")
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isSheetOpen, setIsSheetOpen] = useState(false)
    const [newNote, setNewNote] = useState("")

    const filteredLeads = MOCK_LEADS.filter(lead => {
        const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lead.email.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesStatus = statusFilter === "all" || lead.status.toLowerCase() === statusFilter.toLowerCase()
        return matchesSearch && matchesStatus
    })

    const statusCounts = {
        all: MOCK_LEADS.length,
        new: MOCK_LEADS.filter(l => l.status === "New").length,
        qualified: MOCK_LEADS.filter(l => l.status === "Qualified").length,
        closed: MOCK_LEADS.filter(l => l.status === "Closed").length,
    }

    const handleRowClick = (lead: Lead) => {
        setSelectedLead(lead)
        setIsSheetOpen(true)
    }

    const handleAddNote = () => {
        if (newNote.trim() && selectedLead) {
            toast.success("Note added", { description: `Note added to ${selectedLead.name}'s record` })
            setNewNote("")
        }
    }

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "New": return "bg-slate-100 text-slate-600 border-slate-200"
            case "Contacted": return "bg-amber-50 text-amber-700 border-amber-200"
            case "Qualified": return "bg-indigo-50 text-indigo-700 border-indigo-200"
            case "Closed": return "bg-emerald-50 text-emerald-700 border-emerald-200"
            case "Lost": return "bg-rose-50 text-rose-600 border-rose-200"
            default: return "bg-slate-100 text-slate-600 border-slate-200"
        }
    }

    const getSourceColor = (source: string) => {
        switch (source) {
            case "Google Ads": return "bg-slate-900"
            case "Meta": return "bg-indigo-500"
            case "LinkedIn": return "bg-sky-600"
            case "Organic": return "bg-emerald-500"
            default: return "bg-slate-400"
        }
    }

    return (
        <div className="space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-md border border-slate-200/60 shadow-sm">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" strokeWidth={1.5} />
                    <Input
                        placeholder="Search leads..."
                        className="pl-9 h-9 text-sm bg-slate-50 border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <SegmentedControl
                        value={statusFilter}
                        onChange={setStatusFilter}
                        options={[
                            { value: "all", label: "All", count: statusCounts.all },
                            { value: "new", label: "New", count: statusCounts.new },
                            { value: "qualified", label: "Qualified", count: statusCounts.qualified },
                        ]}
                    />
                    <Button variant="outline" size="sm" className="h-8 px-3 text-xs border-slate-200 text-slate-600 rounded-md">
                        <Download className="mr-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                        Export
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-md border border-slate-200/60 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow className="border-slate-200/60">
                            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-slate-400 w-[280px]">Lead</TableHead>
                            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Source</TableHead>
                            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                <div className="flex items-center gap-1 cursor-pointer hover:text-slate-600">
                                    Value <ArrowUpDown className="h-3 w-3" strokeWidth={1.5} />
                                </div>
                            </TableHead>
                            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Status</TableHead>
                            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Assignee</TableHead>
                            <TableHead className="text-[10px] font-medium uppercase tracking-wider text-slate-400">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence mode="popLayout">
                            {filteredLeads.map((lead, index) => (
                                <motion.tr
                                    key={lead.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.03 }}
                                    className="border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors group"
                                    onClick={() => handleRowClick(lead)}
                                >
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-md bg-slate-100 border border-slate-200/60 flex items-center justify-center">
                                                <span className="text-[10px] font-semibold text-slate-600">
                                                    {lead.name.split(' ').map(n => n[0]).join('')}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{lead.name}</p>
                                                <p className="text-[10px] text-slate-500">{lead.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <div className="flex items-center gap-1.5">
                                            <span className={cn("h-1.5 w-1.5 rounded-full", getSourceColor(lead.source))}></span>
                                            <span className="text-xs text-slate-600">{lead.source}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <span className="text-sm font-mono tabular-nums font-medium text-slate-900">{lead.value}</span>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <span className={cn(
                                            "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider border",
                                            getStatusStyle(lead.status)
                                        )}>
                                            {lead.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <span className="text-xs text-slate-600">{lead.assignee}</span>
                                    </TableCell>
                                    <TableCell className="py-3">
                                        <span className="text-xs text-slate-500">{lead.date}</span>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* Lead Conversation Sheet */}
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetContent className="w-[480px] sm:w-[540px] overflow-y-auto border-l border-slate-200/60 bg-white">
                    {selectedLead && (
                        <>
                            <SheetHeader className="pb-4 border-b border-slate-100">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-md bg-slate-100 border border-slate-200/60 flex items-center justify-center">
                                        <span className="text-xs font-semibold text-slate-600">
                                            {selectedLead.name.split(' ').map(n => n[0]).join('')}
                                        </span>
                                    </div>
                                    <div>
                                        <SheetTitle className="text-base font-semibold text-slate-900">{selectedLead.name}</SheetTitle>
                                        <p className="text-xs text-slate-500">{selectedLead.email}</p>
                                    </div>
                                </div>
                            </SheetHeader>

                            <div className="py-5 space-y-5">
                                {/* Contact Info */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                                        <Mail className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
                                        <span className="text-xs text-slate-600 truncate">{selectedLead.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-md">
                                        <Phone className="h-4 w-4 text-slate-400" strokeWidth={1.5} />
                                        <span className="text-xs text-slate-600">{selectedLead.phone}</span>
                                    </div>
                                </div>

                                {/* Form Data */}
                                {selectedLead.formData && (
                                    <div>
                                        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-2">Form Submission</p>
                                        <div className="bg-slate-50 rounded-md p-3 space-y-2">
                                            {Object.entries(selectedLead.formData).map(([key, value]) => (
                                                <div key={key} className="flex justify-between text-xs">
                                                    <span className="text-slate-500">{key}</span>
                                                    <span className="font-medium text-slate-700">{value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Conversation Thread */}
                                <div>
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-3">Activity</p>
                                    {selectedLead.conversation && selectedLead.conversation.length > 0 ? (
                                        <div className="space-y-3">
                                            {selectedLead.conversation.map((item, i) => (
                                                <div key={i} className="flex gap-3">
                                                    <div className={cn(
                                                        "h-7 w-7 rounded-md flex items-center justify-center shrink-0",
                                                        item.type === "note" ? "bg-slate-100 text-slate-500" :
                                                            item.type === "email" ? "bg-indigo-50 text-indigo-600" :
                                                                "bg-emerald-50 text-emerald-600"
                                                    )}>
                                                        {item.type === "note" ? <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} /> :
                                                            item.type === "email" ? <Mail className="h-3.5 w-3.5" strokeWidth={1.5} /> :
                                                                <Phone className="h-3.5 w-3.5" strokeWidth={1.5} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-xs text-slate-700">{item.message}</p>
                                                        <p className="text-[10px] text-slate-400 mt-1">{item.author} • {item.timestamp}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-6 text-slate-400">
                                            <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" strokeWidth={1.5} />
                                            <p className="text-xs">No activity yet</p>
                                        </div>
                                    )}
                                </div>

                                {/* Add Note */}
                                <div className="pt-4 border-t border-slate-100">
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400 mb-2">Add Note</p>
                                    <Textarea
                                        placeholder="Type a note..."
                                        className="min-h-[80px] text-sm bg-slate-50 border-slate-200 rounded-md resize-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        value={newNote}
                                        onChange={(e) => setNewNote(e.target.value)}
                                    />
                                    <Button
                                        onClick={handleAddNote}
                                        className="mt-3 bg-slate-900 hover:bg-slate-800 text-white rounded-md h-8 px-3 text-xs font-medium"
                                        disabled={!newNote.trim()}
                                    >
                                        <Send className="mr-1.5 h-3 w-3" strokeWidth={1.5} />
                                        Add Note
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    )
}

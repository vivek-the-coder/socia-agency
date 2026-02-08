"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Check, ChevronRight, Loader2, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/useWindowSize"
import { cn } from "@/lib/utils"

const STEPS = [
    { id: 1, label: "Brand", description: "Basic Info" },
    { id: 2, label: "Connect", description: "Platforms" },
    { id: 3, label: "Assign", description: "Team" },
    { id: 4, label: "Complete", description: "Done" },
]

export function EnterpriseAddClientSheet() {
    const [step, setStep] = useState(1)
    const [open, setOpen] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize()

    const [googleLoading, setGoogleLoading] = useState(false)
    const [metaLoading, setMetaLoading] = useState(false)
    const [googleConnected, setGoogleConnected] = useState(false)
    const [metaConnected, setMetaConnected] = useState(false)

    const [formData, setFormData] = useState({
        brandName: "",
        website: "",
        industry: "",
        manager: "",
        budget: ""
    })

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1)
        } else {
            setShowConfetti(true)
            setTimeout(() => {
                setShowConfetti(false)
                setOpen(false)
                resetForm()
            }, 3500)
        }
    }

    const resetForm = () => {
        setStep(1)
        setFormData({ brandName: "", website: "", industry: "", manager: "", budget: "" })
        setGoogleConnected(false)
        setMetaConnected(false)
    }

    const handleConnectGoogle = () => {
        setGoogleLoading(true)
        setTimeout(() => {
            setGoogleLoading(false)
            setGoogleConnected(true)
        }, 1500)
    }

    const handleConnectMeta = () => {
        setMetaLoading(true)
        setTimeout(() => {
            setMetaLoading(false)
            setMetaConnected(true)
        }, 1500)
    }

    return (
        <Sheet open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) setTimeout(resetForm, 300)
        }}>
            <SheetTrigger asChild>
                <Button className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-sm rounded-md h-9 px-4 text-xs font-medium">
                    <Plus className="mr-1.5 h-3.5 w-3.5" strokeWidth={2} />
                    Add Client
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[420px] sm:w-[480px] overflow-y-auto border-l border-slate-200/60 bg-white/95 backdrop-blur-md">
                {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={300} />}

                <SheetHeader className="mb-6">
                    <SheetTitle className="text-lg font-semibold text-slate-900">Create New Client</SheetTitle>
                    <SheetDescription className="text-xs text-slate-500">
                        {step < 4 ? "Follow the steps to onboard a new client account." : "Account created successfully."}
                    </SheetDescription>
                </SheetHeader>

                {/* Step Indicator */}
                <div className="flex items-center mb-8">
                    {STEPS.map((s, index) => (
                        <div key={s.id} className="flex items-center">
                            <div className="flex flex-col items-center">
                                <div className={cn(
                                    "h-8 w-8 rounded-md flex items-center justify-center text-xs font-semibold transition-all",
                                    step > s.id
                                        ? "bg-indigo-600 text-white"
                                        : step === s.id
                                            ? "bg-slate-900 text-white"
                                            : "bg-slate-100 text-slate-400"
                                )}>
                                    {step > s.id ? <Check className="h-4 w-4" strokeWidth={2} /> : s.id}
                                </div>
                                <span className={cn(
                                    "text-[9px] uppercase tracking-wider mt-1.5 font-medium",
                                    step >= s.id ? "text-slate-700" : "text-slate-400"
                                )}>
                                    {s.label}
                                </span>
                            </div>
                            {index < STEPS.length - 1 && (
                                <div className={cn(
                                    "h-[2px] w-8 mx-2 mt-[-12px] transition-colors",
                                    step > s.id ? "bg-indigo-600" : "bg-slate-200"
                                )} />
                            )}
                        </div>
                    ))}
                </div>

                <div className="py-4">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Brand Info */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-5"
                            >
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Brand Name *</Label>
                                    <Input
                                        placeholder="e.g. Vivek Industries"
                                        className="h-10 text-sm bg-slate-50 border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        value={formData.brandName}
                                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Website URL *</Label>
                                    <Input
                                        placeholder="https://example.com"
                                        className="h-10 text-sm bg-slate-50 border-slate-200 rounded-md focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Industry</Label>
                                    <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                                        <SelectTrigger className="h-10 text-sm bg-slate-50 border-slate-200 rounded-md">
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technology">Technology</SelectItem>
                                            <SelectItem value="finance">Financial Services</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="retail">Retail & E-commerce</SelectItem>
                                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                            <SelectItem value="professional">Professional Services</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Monthly Budget</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
                                        <Input
                                            type="number"
                                            placeholder="10,000"
                                            className="h-10 text-sm bg-slate-50 border-slate-200 rounded-md pl-7 font-mono focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                                            value={formData.budget}
                                            onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Platform Connections */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <p className="text-xs text-slate-500">Connect advertising platforms to sync campaign data automatically.</p>

                                <div className={cn(
                                    "p-4 border rounded-md flex items-center justify-between transition-all",
                                    googleConnected
                                        ? "border-emerald-200 bg-emerald-50/50"
                                        : "border-slate-200 hover:border-slate-300 bg-white"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-9 w-9 rounded-md flex items-center justify-center text-xs font-bold transition-colors",
                                            googleConnected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                                        )}>
                                            G
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Google Ads</p>
                                            <p className="text-[10px] text-slate-500">Search, Display, YouTube</p>
                                        </div>
                                    </div>
                                    {googleConnected ? (
                                        <div className="flex items-center gap-1.5 text-emerald-700">
                                            <Check className="h-4 w-4" strokeWidth={2} />
                                            <span className="text-xs font-medium">Connected</span>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 px-3 text-xs rounded-md border-slate-200"
                                            onClick={handleConnectGoogle}
                                            disabled={googleLoading}
                                        >
                                            {googleLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Connect"}
                                        </Button>
                                    )}
                                </div>

                                <div className={cn(
                                    "p-4 border rounded-md flex items-center justify-between transition-all",
                                    metaConnected
                                        ? "border-emerald-200 bg-emerald-50/50"
                                        : "border-slate-200 hover:border-slate-300 bg-white"
                                )}>
                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "h-9 w-9 rounded-md flex items-center justify-center text-xs font-bold transition-colors",
                                            metaConnected ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-500"
                                        )}>
                                            M
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Meta Business</p>
                                            <p className="text-[10px] text-slate-500">Facebook, Instagram</p>
                                        </div>
                                    </div>
                                    {metaConnected ? (
                                        <div className="flex items-center gap-1.5 text-emerald-700">
                                            <Check className="h-4 w-4" strokeWidth={2} />
                                            <span className="text-xs font-medium">Connected</span>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 px-3 text-xs rounded-md border-slate-200"
                                            onClick={handleConnectMeta}
                                            disabled={metaLoading}
                                        >
                                            {metaLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Connect"}
                                        </Button>
                                    )}
                                </div>

                                <div className="p-4 border border-slate-200 rounded-md flex items-center justify-between bg-white opacity-50">
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-md bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">
                                            in
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-500">LinkedIn Ads</p>
                                            <p className="text-[10px] text-slate-400">Coming soon</p>
                                        </div>
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium">BETA</span>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Team Assignment */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 16 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -16 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-5"
                            >
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Account Manager *</Label>
                                    <Select value={formData.manager} onValueChange={(value) => setFormData({ ...formData, manager: value })}>
                                        <SelectTrigger className="h-10 text-sm bg-slate-50 border-slate-200 rounded-md">
                                            <SelectValue placeholder="Assign team member" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="vraj">Vraj Patel</SelectItem>
                                            <SelectItem value="brijraj">Brijraj Dhummad</SelectItem>
                                            <SelectItem value="rocky">Rocky Upadhyay</SelectItem>
                                            <SelectItem value="priya">Priya Reddy</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="p-4 bg-slate-50 border border-slate-200/60 rounded-md space-y-3">
                                    <p className="text-[10px] font-medium uppercase tracking-wider text-slate-500">Account Summary</p>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Brand</span>
                                            <span className="font-medium text-slate-900">{formData.brandName || "—"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Website</span>
                                            <span className="font-medium text-slate-900 truncate max-w-[180px]">{formData.website || "—"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Budget</span>
                                            <span className="font-medium text-slate-900 font-mono">₹{formData.budget || "0"}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-slate-500">Platforms</span>
                                            <span className="font-medium text-slate-900">
                                                {[googleConnected && "Google", metaConnected && "Meta"].filter(Boolean).join(", ") || "None"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Success */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="text-center py-8 space-y-4"
                            >
                                <div className="mx-auto h-14 w-14 bg-emerald-100 rounded-md flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.15, type: "spring", stiffness: 200 }}
                                    >
                                        <Check className="h-7 w-7 text-emerald-600" strokeWidth={2.5} />
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-slate-900">{formData.brandName} Created</h3>
                                    <p className="text-xs text-slate-500 mt-1">
                                        The account has been added to your portfolio.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
                    {step > 1 && step < 4 ? (
                        <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-xs text-slate-500 h-9">
                            Back
                        </Button>
                    ) : <div></div>}

                    {step < 4 ? (
                        <Button
                            onClick={handleNext}
                            className="bg-slate-900 text-white hover:bg-slate-800 rounded-md h-9 px-4 text-xs font-medium"
                            disabled={step === 1 && (!formData.brandName || !formData.website)}
                        >
                            {step === 3 ? "Create Account" : "Continue"}
                            <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={1.5} />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setOpen(false)}
                            className="bg-indigo-600 text-white hover:bg-indigo-700 rounded-md h-9 px-4 text-xs font-medium w-full"
                        >
                            Go to Dashboard
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

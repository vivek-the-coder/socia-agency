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
import { Plus, Check, ChevronRight, Loader2, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "react-confetti"
import { useWindowSize } from "@/hooks/useWindowSize"

export function EnhancedAddClientSheet() {
    const [step, setStep] = useState(1)
    const [open, setOpen] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const { width, height } = useWindowSize()

    // Loading states
    const [googleLoading, setGoogleLoading] = useState(false)
    const [metaLoading, setMetaLoading] = useState(false)
    const [googleConnected, setGoogleConnected] = useState(false)
    const [metaConnected, setMetaConnected] = useState(false)

    // Form data
    const [formData, setFormData] = useState({
        brandName: "",
        website: "",
        industry: "",
        manager: ""
    })

    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1)
        } else {
            // Final step - show confetti
            setShowConfetti(true)
            setTimeout(() => {
                setShowConfetti(false)
                setOpen(false)
                setStep(1)
                // Reset form
                setFormData({ brandName: "", website: "", industry: "", manager: "" })
                setGoogleConnected(false)
                setMetaConnected(false)
            }, 4000)
        }
    }

    const handleConnectGoogle = () => {
        setGoogleLoading(true)
        setTimeout(() => {
            setGoogleLoading(false)
            setGoogleConnected(true)
        }, 2000)
    }

    const handleConnectMeta = () => {
        setMetaLoading(true)
        setTimeout(() => {
            setMetaLoading(false)
            setMetaConnected(true)
        }, 2000)
    }

    return (
        <Sheet open={open} onOpenChange={(isOpen) => {
            setOpen(isOpen)
            if (!isOpen) {
                // Reset on close
                setTimeout(() => {
                    setStep(1)
                    setFormData({ brandName: "", website: "", industry: "", manager: "" })
                    setGoogleConnected(false)
                    setMetaConnected(false)
                }, 300)
            }
        }}>
            <SheetTrigger asChild>
                <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white shadow-lg shadow-blue-200 rounded-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add New Client
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                {showConfetti && <Confetti width={width} height={height} recycle={false} numberOfPieces={500} />}

                <SheetHeader className="mb-8">
                    <SheetTitle className="text-xl font-bold text-[#111827]">Onboard New Client</SheetTitle>
                    <SheetDescription>
                        {step < 4 ? "Follow the steps to configure a new client account." : "Success! Your client is ready."}
                    </SheetDescription>
                </SheetHeader>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 px-2 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="flex flex-col items-center gap-2 bg-white px-2">
                            <motion.div
                                className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${step >= i ? "bg-[#3B82F6] text-white shadow-lg shadow-blue-200" : "bg-gray-100 text-gray-400"
                                    }`}
                                animate={{ scale: step === i ? [1, 1.1, 1] : 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                {step > i ? <Check className="h-5 w-5" /> : i}
                            </motion.div>
                            <span className={`text-[9px] font-semibold uppercase tracking-wider ${step >= i ? "text-[#3B82F6]" : "text-gray-400"
                                }`}>
                                {i === 1 ? "Brand" : i === 2 ? "API" : i === 3 ? "Manager" : "Done"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="py-4">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Brand Info */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-sm font-semibold">Brand Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g. Vivek Industries"
                                        className="h-11"
                                        value={formData.brandName}
                                        onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website" className="text-sm font-semibold">Website URL *</Label>
                                    <Input
                                        id="website"
                                        placeholder="https://example.com"
                                        className="h-11"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="industry" className="text-sm font-semibold">Industry</Label>
                                    <Select value={formData.industry} onValueChange={(value) => setFormData({ ...formData, industry: value })}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select industry" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ecommerce">E-commerce</SelectItem>
                                            <SelectItem value="saas">SaaS / Technology</SelectItem>
                                            <SelectItem value="realestate">Real Estate</SelectItem>
                                            <SelectItem value="healthcare">Healthcare</SelectItem>
                                            <SelectItem value="finance">Finance</SelectItem>
                                            <SelectItem value="education">Education</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: API Connections */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <p className="text-sm text-[#64748B] mb-4">Connect advertising platforms to sync campaign data.</p>

                                <div className={`p-5 border-2 rounded-xl flex items-center justify-between transition-all ${googleConnected ? "border-green-200 bg-green-50" : "border-[#E5E7EB] hover:border-blue-200 hover:bg-blue-50/50"
                                    } cursor-pointer group`}>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                                            <span className="font-bold text-xl text-red-600">G</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#111827]">Google Ads</h4>
                                            <p className="text-xs text-[#64748B]">Connect ad account</p>
                                        </div>
                                    </div>
                                    {googleConnected ? (
                                        <div className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-600" />
                                            <span className="text-sm font-semibold text-green-700">Connected</span>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 rounded-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white"
                                            onClick={handleConnectGoogle}
                                            disabled={googleLoading}
                                        >
                                            {googleLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Connecting...
                                                </>
                                            ) : (
                                                "Connect"
                                            )}
                                        </Button>
                                    )}
                                </div>

                                <div className={`p-5 border-2 rounded-xl flex items-center justify-between transition-all ${metaConnected ? "border-green-200 bg-green-50" : "border-[#E5E7EB] hover:border-blue-200 hover:bg-blue-50/50"
                                    } cursor-pointer group`}>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100">
                                            <span className="font-bold text-xl text-blue-600">M</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#111827]">Meta Business Suite</h4>
                                            <p className="text-xs text-[#64748B]">Connect Facebook & Instagram</p>
                                        </div>
                                    </div>
                                    {metaConnected ? (
                                        <div className="flex items-center gap-2">
                                            <Check className="h-5 w-5 text-green-600" />
                                            <span className="text-sm font-semibold text-green-700">Connected</span>
                                        </div>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-9 rounded-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white"
                                            onClick={handleConnectMeta}
                                            disabled={metaLoading}
                                        >
                                            {metaLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Connecting...
                                                </>
                                            ) : (
                                                "Connect"
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {/* Step 3: Account Manager */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-5"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="manager" className="text-sm font-semibold">Assign Account Manager *</Label>
                                    <Select value={formData.manager} onValueChange={(value) => setFormData({ ...formData, manager: value })}>
                                        <SelectTrigger className="h-11">
                                            <SelectValue placeholder="Select team member" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="anjali">Vraj Patel</SelectItem>
                                            <SelectItem value="brijraj.d">Brijraj Dhummad</SelectItem>
                                            <SelectItem value="priya">Priya Reddy</SelectItem>
                                            <SelectItem value="rocky">Rocky Upadhyay</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <p className="text-xs text-[#64748B]">This person will be the primary contact for this client.</p>
                                </div>

                                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Setup Summary</h4>
                                    <div className="space-y-1 text-xs text-blue-700">
                                        <p><strong>Brand:</strong> {formData.brandName || "Not provided"}</p>
                                        <p><strong>Website:</strong> {formData.website || "Not provided"}</p>
                                        <p><strong>Platforms:</strong> {[googleConnected && "Google Ads", metaConnected && "Meta"].filter(Boolean).join(", ") || "None"}</p>
                                        <p><strong>Manager:</strong> {formData.manager || "Not assigned"}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Success */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="space-y-6 text-center py-8"
                            >
                                <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                    >
                                        <Check className="h-10 w-10 text-green-600" />
                                    </motion.div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-[#111827] mb-2">Client Onboarded!</h3>
                                    <p className="text-[#64748B]">
                                        {formData.brandName} has been added to your portfolio.
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-xl text-left">
                                    <p className="text-sm text-[#64748B] mb-3">Next steps:</p>
                                    <ul className="text-sm space-y-2 text-[#111827]">
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span>Campaign data will sync within 24 hours</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span>Set up lead forms and tracking pixels</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Check className="h-4 w-4 text-green-600 mt-0.5" />
                                            <span>Configure monthly budget alerts</span>
                                        </li>
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-between">
                    {step > 1 && step < 4 ? (
                        <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-[#64748B]">
                            Back
                        </Button>
                    ) : <div></div>}

                    {step < 4 ? (
                        <Button
                            onClick={handleNext}
                            className="bg-[#111827] text-white hover:bg-black rounded-lg px-6"
                            disabled={step === 1 && (!formData.brandName || !formData.website)}
                        >
                            Continue <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button
                            onClick={() => setOpen(false)}
                            className="bg-[#3B82F6] text-white hover:bg-blue-600 rounded-lg px-6"
                        >
                            Go to Dashboard <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </SheetContent>
        </Sheet>
    )
}

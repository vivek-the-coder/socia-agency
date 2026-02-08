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
    SheetFooter
} from "@/components/ui/sheet"
import { Plus, Check, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function AddClientSheet() {
    const [step, setStep] = useState(1)

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white shadow-lg shadow-blue-200 rounded-lg">
                    <Plus className="mr-2 h-4 w-4" /> Add New Client
                </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="mb-8">
                    <SheetTitle className="text-xl font-bold text-[#111827]">Onboard New Client</SheetTitle>
                    <SheetDescription>
                        Follow the steps to configure a new client account.
                    </SheetDescription>
                </SheetHeader>

                {/* Progress Steps */}
                <div className="flex items-center justify-between mb-8 px-2 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`flex flex-col items-center gap-2 bg-white px-2`}>
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${step >= i ? "bg-[#3B82F6] text-white shadow-md shadow-blue-200" : "bg-gray-100 text-gray-400"
                                }`}>
                                {step > i ? <Check className="h-4 w-4" /> : i}
                            </div>
                            <span className={`text-[10px] font-semibold uppercase tracking-wider ${step >= i ? "text-[#3B82F6]" : "text-gray-400"
                                }`}>
                                {i === 1 ? "Basic Info" : i === 2 ? "Integrations" : "Budget"}
                            </span>
                        </div>
                    ))}
                </div>

                <div className="py-4">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Brand Name</Label>
                                    <Input id="name" placeholder="e.g. Vivek Industries" className="h-11" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input id="industry" placeholder="e.g. E-commerce" className="h-11" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="website">Website URL</Label>
                                    <Input id="website" placeholder="https://..." className="h-11" />
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="p-4 border border-[#E5E7EB] rounded-xl flex items-center justify-between hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                                            <span className="font-bold text-lg text-blue-600">G</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#111827]">Google Ads</h4>
                                            <p className="text-xs text-[#64748B]">Connect ad account</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 rounded-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white">Connect</Button>
                                </div>

                                <div className="p-4 border border-[#E5E7EB] rounded-xl flex items-center justify-between hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100">
                                            <span className="font-bold text-lg text-blue-600">M</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#111827]">Meta Ads</h4>
                                            <p className="text-xs text-[#64748B]">Connect business manager</p>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="h-8 rounded-full border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white">Connect</Button>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="bg-blue-50 p-6 rounded-2xl text-center">
                                    <h3 className="font-bold text-blue-900 mb-2">Total Monthly Budget</h3>
                                    <div className="flex items-center justify-center text-4xl font-bold text-blue-600 mb-2">
                                        ₹ <Input type="number" className="w-48 bg-transparent border-none text-center text-4xl font-bold text-blue-600 focus-visible:ring-0 p-0 h-auto" placeholder="0" defaultValue="50000" />
                                    </div>
                                    <p className="text-sm text-blue-400 font-medium">Auto-pacing enabled</p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-sm font-medium">
                                        <span>Google Ads Allocation</span>
                                        <span className="text-[#111827]">60%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[60%] rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <SheetFooter className="mt-8 flex sm:justify-between items-center w-full">
                    {step > 1 ? (
                        <Button variant="ghost" onClick={() => setStep(step - 1)} className="text-[#64748B]">
                            Back
                        </Button>
                    ) : <div></div>}

                    <Button
                        onClick={() => step < 3 ? setStep(step + 1) : null}
                        className="bg-[#111827] text-white hover:bg-black rounded-lg px-6"
                    >
                        {step === 3 ? "Create Account" : "Continue"} <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

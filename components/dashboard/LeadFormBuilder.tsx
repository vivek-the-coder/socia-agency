"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
    ChevronDown, ChevronRight, Plus, Trash2, GripVertical, Check,
    Copy, ExternalLink, Code, Link2, Palette, Settings, FileText
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface FormField {
    id: string
    label: string
    type: "text" | "email" | "phone" | "number" | "dropdown" | "textarea"
    required: boolean
    placeholder?: string
    options?: string[]
}

interface LeadForm {
    id: string
    name: string
    fields: FormField[]
    settings: {
        thankYouMessage: string
        redirectUrl: string
        enableCaptcha: boolean
        notifyEmail: string
    }
    design: {
        buttonColor: string
        theme: "light" | "dark"
    }
    status: "active" | "disabled"
    submissions: number
    createdAt: string
}

// Default fields for SOCIA agency lead forms
const DEFAULT_FIELDS: FormField[] = [
    { id: "1", label: "Contact Name", type: "text", required: true, placeholder: "Your full name" },
    { id: "2", label: "Company Name", type: "text", required: true, placeholder: "Your company" },
    { id: "3", label: "Email", type: "email", required: true, placeholder: "your@email.com" },
    { id: "4", label: "Phone", type: "phone", required: true, placeholder: "+91 98765 43210" },
    { id: "5", label: "Monthly Ad Budget", type: "dropdown", required: true, placeholder: "Select budget", options: ["Under ₹50,000", "₹50,000-₹1,00,000", "₹1,00,000-₹5,00,000", "₹5,00,000-₹10,00,000", "₹10,00,000+"] },
    { id: "6", label: "Services Needed", type: "textarea", required: true, placeholder: "e.g., Google Ads, Meta Ads, LinkedIn Ads..." },
]

interface LeadFormBuilderProps {
    open: boolean
    onClose: () => void
    onSave: (form: LeadForm) => void
    editForm?: LeadForm | null
}

export function LeadFormBuilder({ open, onClose, onSave, editForm }: LeadFormBuilderProps) {
    const [step, setStep] = useState(1)
    const [formName, setFormName] = useState(editForm?.name || "")
    const [fields, setFields] = useState<FormField[]>(editForm?.fields || DEFAULT_FIELDS)
    const [settings, setSettings] = useState(editForm?.settings || {
        thankYouMessage: "Thank you for your interest! Our team will contact you within 24 hours.",
        redirectUrl: "",
        enableCaptcha: true,
        notifyEmail: "sales@socia.in",
    })
    const [design, setDesign] = useState(editForm?.design || {
        buttonColor: "#4F46E5",
        theme: "light" as const,
    })
    const [copied, setCopied] = useState<string | null>(null)

    const steps = [
        { num: 1, label: "Info", icon: FileText },
        { num: 2, label: "Fields", icon: Plus },
        { num: 3, label: "Settings", icon: Settings },
        { num: 4, label: "Design", icon: Palette },
        { num: 5, label: "Publish", icon: Link2 },
    ]

    const addField = () => {
        setFields([...fields, {
            id: Date.now().toString(),
            label: "New Field",
            type: "text",
            required: false,
            placeholder: "",
        }])
    }

    const removeField = (id: string) => {
        setFields(fields.filter(f => f.id !== id))
    }

    const updateField = (id: string, updates: Partial<FormField>) => {
        setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f))
    }

    const handleSave = () => {
        const form: LeadForm = {
            id: editForm?.id || Date.now().toString(),
            name: formName,
            fields,
            settings,
            design,
            status: "active",
            submissions: editForm?.submissions || 0,
            createdAt: editForm?.createdAt || new Date().toLocaleDateString(),
        }
        onSave(form)
        onClose()
    }

    const formSlug = formName.toLowerCase().replace(/\s+/g, '-') || "new-form"
    const embedCode = `<script src="https://leads.socia.in/embed.js" data-form="${formSlug}"></script>`
    const hostedUrl = `https://leads.socia.in/form/${formSlug}`

    const copyToClipboard = (text: string, type: string) => {
        navigator.clipboard.writeText(text)
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>{editForm ? "Edit SOCIA Lead Form" : "Create SOCIA Lead Form"}</DialogTitle>
                    <p className="text-xs text-slate-500 mt-1">For capturing businesses interested in your agency</p>
                </DialogHeader>

                {/* Step Indicator */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-lg mb-4">
                    {steps.map((s, i) => (
                        <div key={s.num} className="flex items-center">
                            <button
                                onClick={() => setStep(s.num)}
                                className={cn(
                                    "flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all text-xs font-medium",
                                    step === s.num
                                        ? "bg-indigo-600 text-white"
                                        : step > s.num
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "text-slate-400"
                                )}
                            >
                                <s.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                                {s.label}
                            </button>
                            {i < steps.length - 1 && (
                                <ChevronRight className="h-4 w-4 text-slate-300 mx-1" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                <div className="flex-1 overflow-y-auto px-1">
                    <AnimatePresence mode="wait">
                        {/* Step 1: Form Info */}
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label className="text-xs text-slate-500">Form Name</Label>
                                    <Input
                                        value={formName}
                                        onChange={(e) => setFormName(e.target.value)}
                                        placeholder="e.g., SOCIA Contact Form - Main Website"
                                        className="mt-1"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        This form will capture businesses wanting to hire SOCIA
                                    </p>
                                </div>

                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <p className="text-xs text-blue-700 font-medium mb-1">💡 Common Fields for Agency Leads</p>
                                    <p className="text-[10px] text-blue-600">
                                        Contact Name, Company Name, Email, Phone, Budget, Services Needed, Company Size, Industry
                                    </p>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Fields */}
                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-3"
                            >
                                {fields.map((field, i) => (
                                    <div key={field.id} className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg">
                                        <GripVertical className="h-4 w-4 text-slate-300 mt-2 cursor-grab" />
                                        <div className="flex-1 grid grid-cols-3 gap-2">
                                            <Input
                                                value={field.label}
                                                onChange={(e) => updateField(field.id, { label: e.target.value })}
                                                placeholder="Field label"
                                                className="text-sm"
                                            />
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="outline" size="sm" className="h-9 justify-between text-xs capitalize">
                                                        {field.type}
                                                        <ChevronDown className="h-3 w-3 ml-1" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    {["text", "email", "phone", "number", "dropdown", "textarea"].map(t => (
                                                        <DropdownMenuItem
                                                            key={t}
                                                            onClick={() => updateField(field.id, { type: t as FormField["type"] })}
                                                            className="text-xs capitalize"
                                                        >
                                                            {t}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                            <div className="flex items-center gap-2">
                                                <Switch
                                                    checked={field.required}
                                                    onCheckedChange={(v) => updateField(field.id, { required: v })}
                                                />
                                                <span className="text-[10px] text-slate-400">Required</span>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeField(field.id)}
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-rose-500"
                                        >
                                            <Trash2 className="h-3.5 w-3.5" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={addField}
                                    className="w-full text-xs h-9"
                                >
                                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Field
                                </Button>
                            </motion.div>
                        )}

                        {/* Step 3: Settings */}
                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label className="text-xs text-slate-500">Thank You Message</Label>
                                    <Textarea
                                        value={settings.thankYouMessage}
                                        onChange={(e) => setSettings({ ...settings, thankYouMessage: e.target.value })}
                                        className="mt-1 text-sm"
                                        rows={2}
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500">Redirect URL (optional)</Label>
                                    <Input
                                        value={settings.redirectUrl}
                                        onChange={(e) => setSettings({ ...settings, redirectUrl: e.target.value })}
                                        placeholder="https://socia.in/thank-you"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500">Notification Email</Label>
                                    <Input
                                        value={settings.notifyEmail}
                                        onChange={(e) => setSettings({ ...settings, notifyEmail: e.target.value })}
                                        placeholder="sales@socia.in"
                                        className="mt-1"
                                    />
                                    <p className="text-[10px] text-slate-400 mt-1">
                                        Get notified when new businesses submit the form
                                    </p>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                    <div>
                                        <p className="text-sm font-medium">Enable Captcha</p>
                                        <p className="text-[10px] text-slate-400">Protect against spam submissions</p>
                                    </div>
                                    <Switch
                                        checked={settings.enableCaptcha}
                                        onCheckedChange={(v) => setSettings({ ...settings, enableCaptcha: v })}
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Step 4: Design */}
                        {step === 4 && (
                            <motion.div
                                key="step4"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div>
                                    <Label className="text-xs text-slate-500">Button Color</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        {["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#000000"].map(c => (
                                            <button
                                                key={c}
                                                onClick={() => setDesign({ ...design, buttonColor: c })}
                                                className={cn(
                                                    "h-8 w-8 rounded-lg transition-all",
                                                    design.buttonColor === c && "ring-2 ring-offset-2 ring-slate-400"
                                                )}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label className="text-xs text-slate-500">Theme</Label>
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() => setDesign({ ...design, theme: "light" })}
                                            className={cn(
                                                "flex-1 p-4 rounded-lg border text-center transition-all",
                                                design.theme === "light"
                                                    ? "border-indigo-500 bg-white"
                                                    : "border-slate-200"
                                            )}
                                        >
                                            <div className="h-8 bg-slate-100 rounded mb-2" />
                                            <span className="text-xs">Light</span>
                                        </button>
                                        <button
                                            onClick={() => setDesign({ ...design, theme: "dark" })}
                                            className={cn(
                                                "flex-1 p-4 rounded-lg border text-center transition-all",
                                                design.theme === "dark"
                                                    ? "border-indigo-500 bg-slate-900"
                                                    : "border-slate-200 bg-slate-800"
                                            )}
                                        >
                                            <div className="h-8 bg-slate-700 rounded mb-2" />
                                            <span className="text-xs text-white">Dark</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="mt-6">
                                    <Label className="text-xs text-slate-500">Preview</Label>
                                    <div className={cn(
                                        "mt-2 p-6 rounded-lg border",
                                        design.theme === "dark" ? "bg-slate-900" : "bg-white"
                                    )}>
                                        <div className="space-y-3">
                                            {fields.slice(0, 3).map(f => (
                                                <div key={f.id}>
                                                    <p className={cn(
                                                        "text-xs mb-1",
                                                        design.theme === "dark" ? "text-slate-300" : "text-slate-600"
                                                    )}>
                                                        {f.label} {f.required && <span className="text-rose-500">*</span>}
                                                    </p>
                                                    <div className={cn(
                                                        "h-9 rounded border",
                                                        design.theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-slate-50 border-slate-200"
                                                    )} />
                                                </div>
                                            ))}
                                            <button
                                                className="w-full h-10 rounded-lg text-white text-sm font-medium"
                                                style={{ backgroundColor: design.buttonColor }}
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 5: Publish */}
                        {step === 5 && (
                            <motion.div
                                key="step5"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-4"
                            >
                                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-emerald-700 mb-1">
                                        <Check className="h-4 w-4" />
                                        <span className="text-sm font-medium">Form Ready</span>
                                    </div>
                                    <p className="text-xs text-emerald-600">Your SOCIA lead form is ready to capture business inquiries.</p>
                                </div>

                                {/* Embed Code */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-xs text-slate-500 flex items-center gap-1">
                                            <Code className="h-3 w-3" /> Embed Code for SOCIA Website
                                        </Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(embedCode, "embed")}
                                            className="h-6 text-[10px]"
                                        >
                                            {copied === "embed" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                            {copied === "embed" ? "Copied!" : "Copy"}
                                        </Button>
                                    </div>
                                    <div className="p-3 bg-slate-900 rounded-lg">
                                        <code className="text-xs text-emerald-400 break-all">{embedCode}</code>
                                    </div>
                                </div>

                                {/* Hosted URL */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <Label className="text-xs text-slate-500 flex items-center gap-1">
                                            <Link2 className="h-3 w-3" /> Hosted Form Link
                                        </Label>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => copyToClipboard(hostedUrl, "url")}
                                            className="h-6 text-[10px]"
                                        >
                                            {copied === "url" ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                                            {copied === "url" ? "Copied!" : "Copy"}
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border">
                                        <span className="text-xs text-slate-600 flex-1 truncate">{hostedUrl}</span>
                                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                            <ExternalLink className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => step > 1 ? setStep(step - 1) : onClose()}
                    >
                        {step === 1 ? "Cancel" : "Back"}
                    </Button>
                    {step < 5 ? (
                        <Button
                            size="sm"
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 && !formName.trim()}
                            className="bg-indigo-600 hover:bg-indigo-700"
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={handleSave}
                            className="bg-emerald-600 hover:bg-emerald-700"
                        >
                            <Check className="h-3.5 w-3.5 mr-1" /> Save Form
                        </Button>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

// Form Management Table Component
interface FormsTableProps {
    forms: LeadForm[]
    onEdit: (form: LeadForm) => void
    onDuplicate: (form: LeadForm) => void
    onToggleStatus: (formId: string) => void
    onDelete: (formId: string) => void
}

export function FormsTable({ forms, onEdit, onDuplicate, onToggleStatus, onDelete }: FormsTableProps) {
    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-[9px] font-medium uppercase tracking-wider text-slate-400">
                <div className="col-span-4">Form Name</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2 text-center">Submissions</div>
                <div className="col-span-2">Created</div>
                <div className="col-span-2 text-center">Actions</div>
            </div>

            {forms.length === 0 ? (
                <div className="px-4 py-12 text-center">
                    <p className="text-sm text-slate-500">No forms yet. Create your first SOCIA lead form.</p>
                </div>
            ) : (
                forms.map((form) => (
                    <div
                        key={form.id}
                        className="grid grid-cols-12 gap-2 px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors items-center"
                    >
                        <div className="col-span-4">
                            <p className="text-sm font-medium text-slate-900">{form.name}</p>
                            <p className="text-[10px] text-slate-400">{form.fields.length} fields</p>
                        </div>
                        <div className="col-span-2">
                            <span className={cn(
                                "text-[10px] font-medium px-2 py-0.5 rounded-full",
                                form.status === "active"
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-slate-100 text-slate-500"
                            )}>
                                {form.status === "active" ? "Active" : "Disabled"}
                            </span>
                        </div>
                        <div className="col-span-2 text-center">
                            <p className="text-sm font-mono tabular-nums font-semibold text-slate-900">{form.submissions}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-[10px] text-slate-500">{form.createdAt}</p>
                        </div>
                        <div className="col-span-2 flex justify-center gap-1">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                        Actions <ChevronDown className="h-3 w-3 ml-1" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => onEdit(form)} className="text-xs">
                                        Edit Form
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onDuplicate(form)} className="text-xs">
                                        Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => onToggleStatus(form.id)} className="text-xs">
                                        {form.status === "active" ? "Disable" : "Enable"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => onDelete(form.id)}
                                        className="text-xs text-rose-600"
                                    >
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

"use client"

import { cn } from "@/lib/utils"

interface SegmentedControlProps {
    value: string
    onChange: (value: string) => void
    options: { value: string; label: string; count?: number }[]
}

export function SegmentedControl({ value, onChange, options }: SegmentedControlProps) {
    return (
        <div className="inline-flex items-center p-0.5 bg-slate-100 rounded-md">
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={cn(
                        "relative px-3 py-1.5 text-xs font-medium rounded transition-all duration-200",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
                        value === option.value
                            ? "bg-white text-slate-900 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    {option.label}
                    {option.count !== undefined && (
                        <span className={cn(
                            "ml-1.5 text-[10px] font-medium",
                            value === option.value ? "text-slate-500" : "text-slate-400"
                        )}>
                            {option.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    )
}

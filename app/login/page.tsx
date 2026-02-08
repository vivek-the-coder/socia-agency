"use client"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen relative overflow-x-hidden flex items-center justify-center p-4 md:p-6 bg-[#0b0b0e]">
            {/* Absolute Background Cleanup - 100% noise-free lighting depth */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_15%_20%,rgba(255,120,0,0.05),transparent_35%)]" />
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_85%_80%,rgba(255,120,0,0.04),transparent_40%)]" />
            </div>

            {/* Main Login Container - Tier-1 App Window Elevation */}
            <div className="relative z-10 w-full max-w-[1000px] bg-gradient-to-br from-[#111218] to-[#0d0e13] rounded-[28px] overflow-hidden shadow-[0_70px_160px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.04)] border border-white/[0.06] flex flex-col lg:grid lg:grid-cols-2">

                {/* BRAND HEADER (Mobile only - Tight spacing) */}
                {/* LOGO AREA (Mobile) */}
                <div className="lg:hidden px-6 pt-8 pb-1 flex flex-col items-center">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 flex items-center justify-center">
                            <img
                                src="/images/socia-logo.-onlys.png"
                                alt="SOCIA Logo"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-[18px] font-bold tracking-tight uppercase leading-none">SOCIA</h1>
                            <span className="text-white/40 text-[10px] font-medium tracking-wider uppercase mt-[2px] leading-none">Creative Agency</span>
                        </div>
                    </div>
                </div>

                {/* LOGIN FORM SECTION (Mobile: 1st, Desktop: Left) */}
                <div className="p-6 md:px-12 md:py-8 lg:p-[60px] flex flex-col justify-between">
                    {/* Logo Section (Desktop Only) */}
                    <div className="hidden lg:flex items-center gap-3 mb-10">
                        <div className="h-9 w-9 flex items-center justify-center">
                            <img
                                src="/images/socia-logo.-onlys.png"
                                alt="SOCIA Logo"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-white text-[20px] font-bold tracking-tight uppercase leading-none">SOCIA</h1>
                            <span className="text-white/40 text-[12px] font-medium tracking-wider uppercase mt-[3px] leading-none">Creative Agency</span>
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-white lg:text-[rgba(255,255,255,0.55)] text-lg lg:text-lg font-normal mb-8 lg:mb-[28px] text-center lg:text-left">
                            Welcome Back
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-[22px]">
                            {/* Email */}
                            <div className="space-y-2">
                                <label className="text-[13px] lg:text-sm font-medium text-[rgba(255,255,255,0.75)] ml-1">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="h-[50px] lg:h-[48px] bg-white rounded-[12px] border-none text-gray-900 text-sm px-4 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.35)] focus-visible:ring-0 focus:outline-none focus:shadow-[0_0_0_2px_rgba(255,120,0,0.5),inset_0_2px_6px_rgba(0,0,0,0.25)] transition-all placeholder:text-gray-400"
                                />
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center ml-1">
                                    <label className="text-[13px] lg:text-sm font-medium text-[rgba(255,255,255,0.75)]">
                                        Password
                                    </label>
                                    <a href="#" className="text-xs text-[rgba(255,255,255,0.5)] hover:text-white underline underline-offset-4 transition-colors">
                                        Forgot Password?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-[50px] lg:h-[48px] bg-white rounded-[12px] border-none text-gray-900 text-base px-4 pr-12 shadow-[inset_0_2px_6px_rgba(0,0,0,0.25),0_1px_0_rgba(255,255,255,0.35)] focus-visible:ring-0 focus:outline-none focus:shadow-[0_0_0_2px_rgba(255,120,0,0.5),inset_0_2px_6px_rgba(0,0,0,0.25)] transition-all placeholder:text-gray-400"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            {/* Sign in Button - Professional Subtle Glow */}
                            <Button
                                type="submit"
                                className="w-full h-[54px] lg:h-[50px] bg-gradient-to-br from-[#ff7a00] to-[#ff4d00] hover:from-[#ff8a10] hover:to-[#ff5d10] text-white text-[15px] lg:text-base font-semibold rounded-[12px] shadow-[0_4px_12px_rgba(255,120,0,0.25)] hover:shadow-[0_6px_16px_rgba(255,120,0,0.35)] hover:-translate-y-0.5 border-0 transition-all duration-250 mt-4"
                            >
                                Sign in
                            </Button>
                        </form>

                        {/* Social Login */}
                        <div className="mt-8 flex flex-col items-center">
                            <div className="relative mb-8 w-full">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[rgba(255,255,255,0.1)]"></div>
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-[#111218] px-2 text-[rgba(255,255,255,0.4)]">Or continue with</span>
                                </div>
                            </div>

                            <button className="w-full h-[54px] lg:h-[50px] bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all flex items-center justify-center gap-3 group mb-8">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="text-[15px] lg:text-base">Continue with Google</span>
                            </button>

                            <a href="#" className="text-[13px] text-[rgba(255,255,255,0.4)] hover:text-white underline underline-offset-4 transition-colors">
                                Contact SOCIA Admin
                            </a>
                        </div>
                    </div>
                </div>

                {/* TESTIMONIAL SECTION (Mobile: 2nd, Desktop: Right) */}
                <div className="bg-transparent flex flex-col justify-center px-6 pb-12 pt-0 md:px-12 lg:px-[60px] lg:py-[60px] gap-8 mt-10 lg:mt-0">

                    <div className="lg:hidden text-center mb-1">
                        <h2 className="text-white text-lg font-semibold">What our Clients Said.</h2>
                    </div>

                    {/* Glass Testimonial Card */}
                    <div className="relative rounded-[20px] bg-gradient-to-br from-[rgba(255,255,255,0.06)] to-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] backdrop-blur-[6px] p-6 lg:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.55)]">
                        <div className="flex flex-col h-full">
                            <h2 className="hidden lg:flex text-white text-[32px] font-bold mb-[18px] leading-tight flex-col">
                                <span>What our</span>
                                <span>Clients Said.</span>
                            </h2>

                            <div className="text-white/50 text-[40px] lg:text-[52px] font-serif leading-none mb-2 lg:mb-4">"</div>

                            <p className="text-[rgba(255,255,255,0.75)] text-[15px] lg:text-[15px] leading-[1.6] italic mb-6 lg:mb-8">
                                Digital marketing isn’t about running ads. It’s about building predictable growth. When you track the right numbers, scaling stops being a risk and starts being a system.
                            </p>

                            <div className="flex items-center">
                                <div>
                                    <p className="text-white font-semibold text-sm lg:text-sm">SOCIA Growth Team</p>
                                    <p className="text-white/50 text-[13px] lg:text-xs">Performance Marketing Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* White Info Card (Desktop Only) */}
                    <div className="hidden lg:block bg-[#f8f8f8] rounded-[18px] p-5 shadow-[0_25px_60px_rgba(0,0,0,0.45)]">
                        <div className="flex items-start gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-slate-200">
                                        <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                                    </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#ff7a00] flex items-center justify-center text-white text-xs font-bold">
                                    +
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-gray-900 font-bold text-[14px] leading-tight mb-1">
                                    Join 4,000+ agencies
                                </h3>
                                <p className="text-gray-500 text-[12px] leading-tight">
                                    Get started with SOCIA today and scale your operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer Links (Desktop Only or Extra Muted) */}
            <div className="absolute bottom-8 text-[rgba(255,255,255,0.3)] text-xs hidden md:flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
        </div>
    )
}

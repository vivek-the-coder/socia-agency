"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface SociaContextType {
    // Active client selection
    activeClientId: string | null
    setActiveClientId: (id: string | null) => void

    // Sidebar state
    sidebarCollapsed: boolean
    setSidebarCollapsed: (collapsed: boolean) => void
    toggleSidebar: () => void

    // Global notifications count
    unreadNotifications: number
    setUnreadNotifications: (count: number) => void
}

const SociaContext = createContext<SociaContextType | undefined>(undefined)

export function SociaProvider({ children }: { children: ReactNode }) {
    const [activeClientId, setActiveClientId] = useState<string | null>(null)
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
    const [unreadNotifications, setUnreadNotifications] = useState(3)

    const toggleSidebar = () => setSidebarCollapsed(prev => !prev)

    return (
        <SociaContext.Provider value={{
            activeClientId,
            setActiveClientId,
            sidebarCollapsed,
            setSidebarCollapsed,
            toggleSidebar,
            unreadNotifications,
            setUnreadNotifications,
        }}>
            {children}
        </SociaContext.Provider>
    )
}

export function useSocia() {
    const context = useContext(SociaContext)
    if (context === undefined) {
        throw new Error("useSocia must be used within a SociaProvider")
    }
    return context
}

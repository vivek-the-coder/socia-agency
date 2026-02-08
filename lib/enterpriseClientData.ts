export interface EnterpriseClient {
    id: string
    name: string
    verified: boolean
    industry: string
    logo: string
    status: "Active" | "Paused" | "Onboarding"
    monthlyBudget: number
    currentSpend: number
    budgetStatus: "on-track" | "warning" | "over-budget"
    leads: number
    ctr: string
    roas: string
    platforms: {
        google: { connected: boolean; campaigns: number }
        meta: { connected: boolean; campaigns: number }
        linkedin: { connected: boolean; campaigns: number }
    }
    accountManager: string
    lastSync: string
}

export const ENTERPRISE_CLIENTS: EnterpriseClient[] = [
    {
        id: "1",
        name: "Vivek Digital Retail",
        verified: true,
        industry: "Retail & Electronics",
        logo: "RD",
        status: "Active",
        monthlyBudget: 1250000,
        currentSpend: 984000,
        budgetStatus: "on-track",
        leads: 452,
        ctr: "3.2%",
        roas: "4.2x",
        platforms: {
            google: { connected: true, campaigns: 8 },
            meta: { connected: true, campaigns: 12 },
            linkedin: { connected: false, campaigns: 0 }
        },
        accountManager: "Vraj Patel",
        lastSync: "2 min ago"
    },
    {
        id: "2",
        name: "Vivek Industries Quick Commerce",
        verified: true,
        industry: "FoodTech",
        logo: "ZO",
        status: "Active",
        monthlyBudget: 800000,
        currentSpend: 768000,
        budgetStatus: "warning",
        leads: 120,
        ctr: "2.4%",
        roas: "2.8x",
        platforms: {
            google: { connected: true, campaigns: 6 },
            meta: { connected: false, campaigns: 0 },
            linkedin: { connected: true, campaigns: 4 }
        },
        accountManager: "Brijraj Dhummad",
        lastSync: "5 min ago"
    },
    {
        id: "3",
        name: "Vivek Financial Services",
        verified: true,
        industry: "Banking",
        logo: "HF",
        status: "Active",
        monthlyBudget: 2500000,
        currentSpend: 2845000,
        budgetStatus: "over-budget",
        leads: 89,
        ctr: "1.8%",
        roas: "5.1x",
        platforms: {
            google: { connected: true, campaigns: 15 },
            meta: { connected: true, campaigns: 8 },
            linkedin: { connected: true, campaigns: 6 }
        },
        accountManager: "Vraj Patel",
        lastSync: "1 min ago"
    },
    {
        id: "4",
        name: "Vivek Motors Commercial",
        verified: false,
        industry: "Automotive",
        logo: "TM",
        status: "Paused",
        monthlyBudget: 1500000,
        currentSpend: 0,
        budgetStatus: "on-track",
        leads: 0,
        ctr: "—",
        roas: "—",
        platforms: {
            google: { connected: true, campaigns: 0 },
            meta: { connected: false, campaigns: 0 },
            linkedin: { connected: true, campaigns: 0 }
        },
        accountManager: "Rocky Upadhyay",
        lastSync: "3 days ago"
    },
    {
        id: "5",
        name: "Apollo Healthcare Mob",
        verified: true,
        industry: "Healthcare",
        logo: "AH",
        status: "Onboarding",
        monthlyBudget: 1800000,
        currentSpend: 210000,
        budgetStatus: "on-track",
        leads: 34,
        ctr: "2.1%",
        roas: "1.4x",
        platforms: {
            google: { connected: true, campaigns: 2 },
            meta: { connected: false, campaigns: 0 },
            linkedin: { connected: false, campaigns: 0 }
        },
        accountManager: "Brijraj Dhummad",
        lastSync: "12 min ago"
    },
    {
        id: "6",
        name: "Vivek Chemicals Direct",
        verified: true,
        industry: "E-commerce",
        logo: "NY",
        status: "Active",
        monthlyBudget: 2200000,
        currentSpend: 1892000,
        budgetStatus: "on-track",
        leads: 287,
        ctr: "4.1%",
        roas: "3.6x",
        platforms: {
            google: { connected: true, campaigns: 10 },
            meta: { connected: true, campaigns: 6 },
            linkedin: { connected: true, campaigns: 8 }
        },
        accountManager: "Vraj Patel",
        lastSync: "Just now"
    }
]

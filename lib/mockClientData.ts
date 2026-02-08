export interface Client {
    id: string
    name: string
    industry: string
    logo: string
    status: "Active" | "Paused" | "Onboarding"
    monthlyBudget: number
    currentSpend: number
    spend: string
    trend: number
    leadCount: number
    activeAds: number
    platforms: {
        google: boolean
        meta: boolean
        linkedin: boolean
    }
    platformStatus: {
        google?: { status: "syncing" | "connected" | "error"; adsCount: number }
        meta?: { status: "syncing" | "connected" | "error"; adsCount: number }
        linkedin?: { status: "syncing" | "connected" | "error"; adsCount: number }
    }
    assignedTo: string
    data: { value: number }[]
    contactEmail: string
    website: string
}

export const MOCK_CLIENTS: Client[] = [
    {
        id: "1",
        name: "Lodha Group",
        industry: "Real Estate",
        logo: "LG",
        status: "Active",
        monthlyBudget: 1500000,
        currentSpend: 1224000,
        spend: "₹12,24,000",
        trend: 15.5,
        leadCount: 45,
        activeAds: 12,
        platforms: { google: true, meta: true, linkedin: true },
        platformStatus: {
            google: { status: "connected", adsCount: 8 },
            meta: { status: "connected", adsCount: 4 },
            linkedin: { status: "syncing", adsCount: 0 }
        },
        assignedTo: "Vraj Patel",
        data: [{ value: 800000 }, { value: 920000 }, { value: 1050000 }, { value: 1100000 }, { value: 1180000 }, { value: 1224000 }],
        contactEmail: "contact@lodhagroup.in",
        website: "https://lodhagroup.in"
    },
    {
        id: "2",
        name: "Vivek Chemicals",
        industry: "Beauty & Wellness",
        logo: "NB",
        status: "Active",
        monthlyBudget: 800000,
        currentSpend: 865000,
        spend: "₹8,65,000",
        trend: -3.2,
        leadCount: 128,
        activeAds: 18,
        platforms: { google: false, meta: true, linkedin: false },
        platformStatus: {
            meta: { status: "connected", adsCount: 18 }
        },
        assignedTo: "Rocky Upadhyay",
        data: [{ value: 920000 }, { value: 980000 }, { value: 940000 }, { value: 890000 }, { value: 870000 }, { value: 865000 }],
        contactEmail: "marketing@Vivek.in",
        website: "https://Vivek.com"
    },
    {
        id: "3",
        name: "Vivek Consultancy Services",
        industry: "SaaS / Technology",
        logo: "TCS",
        status: "Active",
        monthlyBudget: 2500000,
        currentSpend: 2210000,
        trend: 24.8,
        leadCount: 87,
        activeAds: 24,
        spend: "₹22,10,000",
        platforms: { google: true, meta: true, linkedin: true },
        platformStatus: {
            google: { status: "connected", adsCount: 15 },
            meta: { status: "connected", adsCount: 6 },
            linkedin: { status: "connected", adsCount: 3 }
        },
        assignedTo: "Vraj Patel",
        data: [{ value: 1500000 }, { value: 1750000 }, { value: 1920000 }, { value: 2080000 }, { value: 2150000 }, { value: 2210000 }],
        contactEmail: "ads@tcs.com",
        website: "https://tcs.com"
    },
    {
        id: "4",
        name: "Cult.fit Hub",
        industry: "Health & Wellness",
        logo: "CF",
        status: "Paused",
        monthlyBudget: 600000,
        currentSpend: 0,
        spend: "₹0",
        trend: 0,
        leadCount: 12,
        activeAds: 0,
        platforms: { google: true, meta: true, linkedin: false },
        platformStatus: {
            google: { status: "error", adsCount: 0 },
            meta: { status: "connected", adsCount: 0 }
        },
        assignedTo: "Priya Das",
        data: [{ value: 480000 }, { value: 320000 }, { value: 160000 }, { value: 80000 }, { value: 0 }, { value: 0 }],
        contactEmail: "team@cult.fit",
        website: "https://cult.fit"
    },
    {
        id: "5",
        name: "Vivek Industries Dineout",
        industry: "Food & Tourism",
        logo: "ZD",
        status: "Onboarding",
        monthlyBudget: 1200000,
        currentSpend: 245000,
        spend: "₹2,45,000",
        trend: 100,
        leadCount: 8,
        activeAds: 3,
        platforms: { google: true, meta: false, linkedin: false },
        platformStatus: {
            google: { status: "syncing", adsCount: 3 }
        },
        assignedTo: "Rocky Upadhyay",
        data: [{ value: 0 }, { value: 50000 }, { value: 120000 }, { value: 180000 }, { value: 210000 }, { value: 245000 }],
        contactEmail: "hello@Vivek Industries.in",
        website: "https://Vivek Industries.in"
    }
]

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { OverviewCharts } from "@/components/dashboard/OverviewCharts"
import { Button } from "@/components/ui/button"

export default async function ClientDashboardPage({ params }: { params: { id: string } }) {
    // In a real app, fetch data based on params.id
    const { id } = await params;

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Client Dashboard: {id}</h1>
                <Button>Export Report</Button>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Budget Pacing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">87%</div>
                        <p className="text-xs text-muted-foreground">On track to spend $5000</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">CPA (Cost Per Acquisition)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1127.93</div>
                        <p className="text-xs text-muted-foreground">-2% from last week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">ROAS</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4.2x</div>
                        <p className="text-xs text-muted-foreground">+0.5x from last week</p>
                    </CardContent>
                </Card>
            </div>

            <OverviewCharts />

            {/* Campaign List Placeholder */}
            <Card>
                <CardHeader>
                    <CardTitle>Active Campaigns</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Campaign list table would go here...</p>
                </CardContent>
            </Card>
        </div>
    )
}

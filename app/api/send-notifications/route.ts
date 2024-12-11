import { NextRequest, NextResponse } from "next/server"
import webpush from "web-push"
import { getSubscriptions } from "@/lib/subscription-store"

webpush.setVapidDetails(
    "mailto:your-email@example.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export async function POST(req: NextRequest) {
    try {
        const { title, body } = await req.json()
        const subscriptions = getSubscriptions()

        const notifications = subscriptions.map((subscription) =>
            webpush.sendNotification(
                subscription,
                JSON.stringify({ title, body })
            )
        )

        await Promise.all(notifications)

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Error sending notifications:", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}

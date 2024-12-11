import { NextRequest, NextResponse } from "next/server"
import webpush, { PushSubscription } from "web-push"

webpush.setVapidDetails(
    "mailto:your-email@example.com",
    process.env.VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!
)

export async function POST(req: NextRequest) {
    try {
        const {
            subscription,
            title,
            body,
        }: { subscription: PushSubscription; title: string; body: string } =
            await req.json()

        await webpush.sendNotification(
            subscription,
            JSON.stringify({ title, body })
        )

        return NextResponse.json({ success: true }, { status: 200 })
    } catch (error) {
        console.error("Error sending notification:", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}

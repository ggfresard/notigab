import { NextResponse } from "next/server"
import webPush from "web-push"

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY!
const VAPID_SUBJECT = process.env.VAPID_SUBJECT!

webPush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, VAPID_PRIVATE_KEY)

const subscriptions: webPush.PushSubscription[] = []

export async function POST(request: Request) {
    try {
        const { title, message } = await request.json()
        console.log("send-notification", title, message)

        if (!title || !message) {
            return NextResponse.json(
                { error: "Title and message are required" },
                { status: 400 }
            )
        }

        for (const subscription of subscriptions) {
            await webPush.sendNotification(
                subscription,
                JSON.stringify({ title, message })
            )
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to send notification" },
            { status: 500 }
        )
    }
}

export async function PUT(request: Request) {
    try {
        const subscription = await request.json()
        subscriptions.push(subscription)
        console.log("Subscription added:", subscription)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { error: "Failed to save subscription" },
            { status: 500 }
        )
    }
}

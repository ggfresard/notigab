import { NextRequest, NextResponse } from "next/server"

const subscriptions: PushSubscription[] = []

export async function POST(req: NextRequest) {
    try {
        const subscription = await req.json()
        subscriptions.push(subscription)
        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error("Error saving subscription:", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}

// Export subscriptions for use in the `send-notification` route
export function getSubscriptions() {
    return subscriptions
}

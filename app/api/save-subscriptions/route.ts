import { NextRequest, NextResponse } from "next/server"
import { addSubscription } from "@/lib/subscription-store"

export async function POST(req: NextRequest) {
    try {
        const subscription = await req.json()
        addSubscription(subscription)

        return NextResponse.json({ success: true }, { status: 201 })
    } catch (error) {
        console.error("Error saving subscription:", error)
        return NextResponse.json({ success: false }, { status: 500 })
    }
}

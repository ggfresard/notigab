import { firebaseConfig } from "@/lib/config/firebase.config"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
    const { token, title, body } = await req.json()

    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `key=${firebaseConfig.vapidKey}`,
        },
        body: JSON.stringify({
            to: token,
            notification: {
                title,
                body,
            },
        }),
    })

    if (!response.ok) {
        return NextResponse.json(
            { error: "Failed to send notification" },
            { status: 500 }
        )
    }

    return NextResponse.json({ success: true })
}

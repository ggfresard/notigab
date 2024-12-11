"use client"

import { useEffect, useState } from "react"

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!

export default function NotificationsPage() {
    const [subscription, setSubscription] = useState<PushSubscription | null>(
        null
    )

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker
                .register("/sw.js")
                .then(async (registration) => {
                    const existingSubscription =
                        await registration.pushManager.getSubscription()
                    if (!existingSubscription) {
                        const newSubscription =
                            await registration.pushManager.subscribe({
                                userVisibleOnly: true,
                                applicationServerKey: VAPID_PUBLIC_KEY,
                            })

                        setSubscription(newSubscription)

                        await fetch("/api/send-notification", {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(newSubscription),
                        })
                    }
                })
                .catch((error) => console.error("Service Worker error:", error))
        }
    }, [])

    return (
        <div>
            <h1>Notifications</h1>
            <p>Subscription status: {subscription ? "Enabled" : "Disabled"}</p>
        </div>
    )
}

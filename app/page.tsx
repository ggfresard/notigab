"use client"

import NotificationButton from "@/components/notification-button"
import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.pushManager
                    .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey: "<Your Public VAPID Key>",
                    })
                    .then((subscription) => {
                        console.log("Push Subscription:", subscription)
                        // Send subscription to your backend
                        fetch("/api/save-subscription", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(subscription),
                        })
                    })
                    .catch(console.error)
            })
        }
    }, [])

    return (
        <main>
            <h1>Welcome to My PWA</h1>
            <NotificationButton />
        </main>
    )
}

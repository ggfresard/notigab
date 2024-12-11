"use client"

import { useEffect } from "react"

export default function Home() {
    useEffect(() => {
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker
                .register("/sw.js")
                .then((registration) => {
                    console.log("Service Worker registered:", registration)
                })
                .catch((error) => {
                    console.error("Service Worker registration failed:", error)
                })
        }
    }, [])

    useEffect(() => {
        if ("serviceWorker" in navigator && "PushManager" in window) {
            navigator.serviceWorker.ready.then((registration) => {
                registration.pushManager
                    .subscribe({
                        userVisibleOnly: true,
                        applicationServerKey:
                            "BDTEcsUts2botp5QQ5-9Y9ZmduyibNzRlLi-slghTLH82aSe5YmdwROBWsp9xp0-OvOiwdUPIrxI5NOBHLMr-2Y",
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
            <div className="">aca andamios</div>
        </main>
    )
}

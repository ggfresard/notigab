"use client"

export default function NotificationsButton() {
    const subscribeToNotifications = async () => {
        try {
            await requestNotificationPermission()
            await subscribeUser()
        } catch (error) {
            console.error("Error subscribing to notifications:", error)
        }
    }

    return (
        <button onClick={subscribeToNotifications}>Enable Notifications</button>
    )
}

async function requestNotificationPermission() {
    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
        throw new Error("Notification permission not granted")
    }
}

async function subscribeUser() {
    if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready

        const applicationServerKey = urlBase64ToUint8Array(
            "BDTEcsUts2botp5QQ5-9Y9ZmduyibNzRlLi-slghTLH82aSe5YmdwROBWsp9xp0-OvOiwdUPIrxI5NOBHLMr-2Y"
        )

        try {
            const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
            })

            console.log("Push Subscription:", subscription)

            await fetch("/api/save-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(subscription),
            })

            console.log("Subscription saved to backend")
        } catch (error) {
            console.error("Failed to subscribe the user:", error)
        }
    }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
        .replace(/-/g, "+")
        .replace(/_/g, "/")
    const rawData = atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i)
    }

    return outputArray
}

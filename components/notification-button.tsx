"use client"

export default function NotificationButton() {
    const requestPermission = async () => {
        if ("Notification" in window && navigator.serviceWorker) {
            const permission = await Notification.requestPermission()
            if (permission === "granted") {
                console.log("Notifications enabled!")
            }
        }
    }

    return <button onClick={requestPermission}>Enable Notifications</button>
}

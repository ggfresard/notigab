"use client"
import { useEffect } from "react"
import { getToken } from "firebase/messaging"
import { messaging } from "@/lib/client/firebase.client"
import { firebaseConfig } from "@/lib/config/firebase.config"

const Home = () => {
    useEffect(() => {
        const requestPermission = async () => {
            const permission = await Notification.requestPermission()
            if (permission === "granted" && messaging) {
                const token = await getToken(messaging, {
                    vapidKey: firebaseConfig.vapidKey,
                })
                console.log("FCM Token:", token)
            } else {
                console.error("Permission not granted for notifications")
            }
        }

        requestPermission()
    }, [])

    return <h1>Push Notification App</h1>
}

export default Home

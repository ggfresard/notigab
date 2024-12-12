"use client"
import { useEffect } from "react"
import {
    getMessaging,
    getToken,
    isSupported,
    Messaging,
} from "firebase/messaging"
import { firebaseConfig } from "@/lib/config/firebase.config"
import { initializeApp } from "firebase/app"

const Home = () => {
    useEffect(() => {
        const requestPermission = async () => {
            const app = initializeApp(firebaseConfig)
            let messaging: Messaging | null = null
            await (async () => {
                if (await isSupported()) {
                    messaging = getMessaging(app)
                } else {
                    console.warn("FCM is not supported in this browser.")
                }
            })()
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

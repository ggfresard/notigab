import { initializeApp } from "firebase/app"
import { getMessaging, isSupported, Messaging } from "firebase/messaging"
import { firebaseConfig } from "../config/firebase.config"

const app = initializeApp(firebaseConfig)
let messaging: Messaging | null = null
;(async () => {
    if (await isSupported()) {
        messaging = getMessaging(app)
    } else {
        console.warn("FCM is not supported in this browser.")
    }
})()

export { messaging }

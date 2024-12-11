self.addEventListener("push", (event) => {
    const data = event.data ? event.data.json() : {}
    const options = {
        body: data.body,
        icon: "/icon.png", // Add these image files to your `public` directory
        badge: "/badge.png",
    }

    event.waitUntil(self.registration.showNotification(data.title, options))
})

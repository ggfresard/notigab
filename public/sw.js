self.addEventListener("push", (event) => {
    const data = event.data.json()
    self.registration.showNotification(data.title, {
        body: data.message,
    })
})

self.addEventListener("notificationclick", (event) => {
    event.notification.close()
    // Add logic to handle notification click
})

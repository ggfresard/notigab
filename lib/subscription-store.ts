const subscriptions: PushSubscription[] = []

// Add a subscription
export function addSubscription(subscription: PushSubscription) {
    subscriptions.push(subscription)
}

// Retrieve all subscriptions
export function getSubscriptions() {
    return subscriptions
}

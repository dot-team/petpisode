self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

self.addEventListener('push', event => {
    if (!event.data) return;

    try {
        const data = event.data.json();

        const options = {
            title: data.title,
            body: data.body,
            icon: data.icon,
            requireInteraction: true,
            priority: 'high',
            data: {
                url: data.url,
            },
        };

        event.waitUntil(
            self.registration
                .showNotification(data.title, options)
                .then(() => {
                    console.log('[Service Worker] Notification shown successfully');
                })
                .catch(error => {
                    console.error('[Service Worker] Error showing notification:', error);
                }),
        );
    } catch (error) {
        console.error('[Service Worker] Error processing push event:', error);
    }
});

self.addEventListener('notificationclick', event => {
    event.notification.close();

    event.waitUntil(
        clients
            .openWindow(event.notification.data.url)
            .then(() => {
                console.log('[Service Worker] URL opened successfully');
            })
            .catch(error => {
                console.error('[Service Worker] Error opening URL:', error);
            }),
    );
});

import { useState, useEffect } from 'react';
import { updateDataByIdFromClient } from '@/services';

const tempUserId = '0a7bf2cd-d486-41f8-9a73-5c0b392ab598';

export function usePushNotification() {
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [serviceWorkerRegistration, setServiceWorkerRegistration] =
        useState<ServiceWorkerRegistration | null>(null);

    const convertSubscriptionToBase64 = (sub: PushSubscription) => {
        return btoa(JSON.stringify(sub));
    };

    useEffect(() => {
        const initializeServiceWorker = async () => {
            try {
                if ('serviceWorker' in navigator) {
                    const registration =
                        await navigator.serviceWorker.register('/service-worker.js');

                    if (registration.active) {
                        setServiceWorkerRegistration(registration);
                    } else {
                        registration.addEventListener('activate', () => {
                            setServiceWorkerRegistration(registration);
                        });
                    }

                    const existingSubscription = await registration.pushManager.getSubscription();
                    if (existingSubscription) {
                        setSubscription(existingSubscription);
                    }
                }
            } catch (error) {
                console.error('Service Worker 등록 실패:', error);
            }
        };

        initializeServiceWorker();
    }, []);

    const subscribePush = async () => {
        try {
            if (!serviceWorkerRegistration) {
                throw new Error('Service Worker가 아직 준비되지 않았습니다.');
            }

            if (Notification.permission !== 'granted') {
                const permission = await Notification.requestPermission();
                if (permission !== 'granted') {
                    throw new Error('알림 권한이 거부되었습니다.');
                }
            }

            const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            if (!vapidPublicKey) {
                throw new Error('VAPID_PUBLIC_KEY가 존재하지 않습니다.');
            }

            const sub = await serviceWorkerRegistration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: vapidPublicKey,
            });

            setSubscription(sub);

            await updateDataByIdFromClient('users', 'user_id', tempUserId, {
                push_token: convertSubscriptionToBase64(sub),
            });

            return true;
        } catch (error) {
            console.error('푸시 알림 구독 실패:', error);
            return false;
        }
    };

    const unsubscribePush = async () => {
        try {
            if (subscription) {
                await subscription.unsubscribe();
                setSubscription(null);

                await updateDataByIdFromClient('users', 'user_id', tempUserId, {
                    push_token: null,
                });
            }
            return true;
        } catch (error) {
            console.error('푸시 알림 구독 해지 실패:', error);
            return false;
        }
    };

    return {
        isSubscribed: !!subscription,
        subscribePush,
        unsubscribePush,
    };
}

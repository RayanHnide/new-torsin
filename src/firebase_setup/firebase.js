import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAE0443y1oY7EgAiJJ-EHhiOhIHFhYipI0",
    authDomain: "torsin-6084e.firebaseapp.com",
    databaseURL: "https://torsin-6084e-default-rtdb.firebaseio.com",
    projectId: "torsin-6084e",
    storageBucket: "torsin-6084e.appspot.com",
    messagingSenderId: "425305774130",
    appId: "1:425305774130:web:a1b462f680f615e1c7842b",
    measurementId: "G-7WNHDYT30W"
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebase_app);

export const db = getFirestore(firebase_app);
export const database = getDatabase(firebase_app)

const firebaseCloudMessaging = async () => {
    try {
        const messaging = getMessaging(firebase_app)

        // Request the push notification permission from browser
        const status = await Notification.requestPermission()

        if (status && status === "granted") {
            // Get new token from Firebase
            const fcm_token = await getToken(messaging, {
                vapidKey: "BDYe0W7caIyp10JFWK0Wyq4BVI571xUiEwzZ01iwobVaBi80WQ9k720hAvaBogPJ-JqMGBlWte5d_hlicBT_0-8",
            })

            // Set token in our local storage
            if (fcm_token) {
                localStorage.setItem('fcmToken', fcm_token)
                return fcm_token
            }

            onMessage(messaging, (payload) => {
                // console.log('Message received. ', payload);
                // ...
            });
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

export { firebaseCloudMessaging }

export default firebase_app;
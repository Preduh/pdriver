import { env } from "@/env"
import { getAnalytics, type Analytics } from "firebase/analytics"
import { initializeApp, type FirebaseApp } from "firebase/app"
import { getFirestore, type Firestore } from "firebase/firestore"
import { getStorage, type FirebaseStorage } from "firebase/storage"

let analytics: Analytics
let storage: FirebaseStorage
let database: Firestore
let app: FirebaseApp

if (typeof window !== "undefined") {
  const firebaseConfig = {
    apiKey: env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  }

  // Initialize Firebase
  app = initializeApp(firebaseConfig)
  analytics = getAnalytics(app)
  storage = getStorage(app)
  database = getFirestore(app)
}

export { analytics, app, database, storage }

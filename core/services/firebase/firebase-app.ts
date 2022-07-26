// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const app = initializeApp({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
});

// Initialize Firebase
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getDatabase(app);

// refs
const liveRoomsRef = (
  roomID: string | null,
  type: "room" | "question" | "like"
) => {
  if (roomID && type === "room") {
    return ref(db, `rooms/live-rooms/${roomID}`);
  }

  if (roomID && type === "question") {
    return ref(db, `rooms/live-rooms/${roomID}/questions`);
  }

  // if (roomID && type === "like") {
  //   return ref(db, `rooms/live-rooms/${roomID}/questions/${questionID}/likes`);
  // }

  return ref(db, `rooms/live-rooms`);
};
const annonymousRoomsRef = ref(db, "rooms/annonymous-rooms");

export { app, auth, db, liveRoomsRef, annonymousRoomsRef };

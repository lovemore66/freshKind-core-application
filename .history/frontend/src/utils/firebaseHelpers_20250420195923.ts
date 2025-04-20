import { doc, setDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "../configs/firebase";

export const createUserProfile = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: user.displayName || "",
    email: user.email,
    photoURL: user.photoURL || "",
    createdAt: new Date().toISOString()
  });
};

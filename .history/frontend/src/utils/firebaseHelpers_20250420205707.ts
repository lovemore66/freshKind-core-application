import { doc, setDoc, updateDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { db, storage } from "../configs/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const createUserProfile = async (user: User) => {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, {
    name: user.displayName || "",
    email: user.email,
    role: "guest",
    photoURL: user.photoURL || "",
    createdAt: new Date().toISOString()
  });
};

export const uploadLogo = async (file: File, uid: string) => {
    const fileRef = ref(storage, `logos/${uid}`);
    await uploadBytes(fileRef, file);
    return await getDownloadURL(fileRef);
  };
  
  export const updateUserSettings = async (uid: string, data: any) => {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  };
  

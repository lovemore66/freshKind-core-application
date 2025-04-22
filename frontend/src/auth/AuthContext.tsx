import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth, db } from "../configs/firebase";
import { doc, getDoc } from "firebase/firestore";

interface UserSettings {
  name?: string;
  role?: string;
  theme?: string;
  fontColor?: string;
  businessName?: string;
  businessAddress?: string;
  logoURL?: string;
  // Add other fields as needed
}

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  userSettings: UserSettings | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          setUser(firebaseUser);
          setLoading(false);

          if (firebaseUser) {
            const docRef = doc(db, "users", firebaseUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              setUserSettings(docSnap.data() as UserSettings);
            }
          } else {
            setUserSettings(null);
          }
        });

        return unsubscribe;
      })
      .catch((error) => {
        console.error("Failed to set persistence:", error);
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <AuthContext.Provider value={{ user, logout, userSettings }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

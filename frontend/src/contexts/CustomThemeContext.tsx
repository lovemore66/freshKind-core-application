// contexts/CustomThemeContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";
import { db } from "../configs/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const lightTheme = {
  name: "light",
  background: "#ffffff",
  text: "#111111",
  primary: "#1a202c",
};

const darkTheme = {
  name: "dark",
  background: "#1a202c",
  text: "#ffffff",
  primary: "#90cdf4",
};

const CustomThemeContext = createContext<any>(null);

export const CustomThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState(lightTheme);

  useEffect(() => {
    const fetchTheme = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const savedTheme = docSnap.data().theme;
          if (savedTheme === "dark") {
            setTheme(darkTheme);
          }
        }
      }
    };

    fetchTheme();
  }, [user]);

  const toggleTheme = async () => {
    const newTheme = theme.name === "light" ? darkTheme : lightTheme;
    setTheme(newTheme);
    if (user) {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, { theme: newTheme.name });
    }
  };

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme, themeName: theme.name }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) throw new Error("useCustomTheme must be used within CustomThemeProvider");
  return context;
};

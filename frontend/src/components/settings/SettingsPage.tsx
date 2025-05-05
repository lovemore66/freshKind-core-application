import {
  Input,
  Button,
  Box,
  Heading,
} from "@chakra-ui/react";
import { Switch } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormErrorIcon,
} from "@chakra-ui/form-control";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { db } from "../../configs/firebase";
import { uploadLogo, updateUserSettings } from "../../utils/firebaseHelpers";
import { Select } from "@chakra-ui/select";
import { Image } from "@chakra-ui/image";
import { useCustomTheme } from "../../contexts/CustomThemeContext";
import MapWithDirections from "../../deliveryModule/components/Directions/MapWithDirections";

export const SettingsPage = () => {
  const { user } = useAuth();
  const { theme, themeName, toggleTheme } = useCustomTheme();

  const [form, setForm] = useState({
    name: "",
    role: "guest",
    fontColor: "#000000",
    businessName: "",
    businessAddress: "",
    logoFile: null,
    logoURL: "",
  });

  useEffect(() => {
    if (user) {
      const fetchSettings = async () => {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setForm((prev) => ({
              ...prev,
              name: data.name || "",
              role: data.role || "guest",
              fontColor: data.fontColor || "#000000",
              businessName: data.businessName || "",
              businessAddress: data.businessAddress || "",
              logoURL: data.logoURL || "",
            }));
          }
        } catch (err) {
          console.error("Error fetching user settings:", err);
        }
      };

      fetchSettings();
    }
  }, [user]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: any) => {
    if (e.target.files[0]) {
      setForm((prev) => ({ ...prev, logoFile: e.target.files[0] }));
    }
  };

  const handleSubmit = async () => {
    try {
      let logoURL = form.logoURL;

      if (user) {
        if (form.logoFile) {
          logoURL = await uploadLogo(form.logoFile, user.uid);
        }

        await updateUserSettings(user.uid, {
          name: form.name,
          role: form.role,
          fontColor: form.fontColor,
          businessName: form.businessName,
          businessAddress: form.businessAddress,
          logoURL,
        });

        alert("Settings updated!");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update settings.");
    }
  };

  return (
    <Box p={6} bg={theme.background} color={theme.text}>
      <Heading color={theme.primary} mb={4}>Settings</Heading>
      <MapWithDirections />
      <Box mb={'20px'}>
  <FormLabel htmlFor='email-alerts' mb='0'>
  Activate {themeName === "light" ? 'Dark' : 'Light'} Theme
  </FormLabel>
  <Switch  isChecked={themeName === "dark"}
          onChange={toggleTheme} colorScheme='teal' size='lg' />
      </Box>


      <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" mb={2} />

      <Select name="role" value={form.role} onChange={handleChange} mb={2}>
        <option value="guest">Guest</option>
        <option value="basic">Basic</option>
        <option value="admin">Admin</option>
        <option value="professional">Professional</option>
        <option value="enterprise">Enterprise</option>
      </Select>

      <Input color={theme.text} type="color" name="fontColor" value={form.fontColor} onChange={handleChange} mb={2} />
      <Input color={theme.text} name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" mb={2} />
      <Input color={theme.text} name="businessAddress" value={form.businessAddress} onChange={handleChange} placeholder="Business Address" mb={2} />
      <Input color={theme.text} type="file" onChange={handleLogoChange} mb={2} />

      {form.logoURL && (
        <Image src={form.logoURL} alt="Logo Preview" boxSize="100px" mb={4} />
      )}

      <Button onClick={handleSubmit}>Update Settings</Button>
    </Box>
  );
};

export default SettingsPage;

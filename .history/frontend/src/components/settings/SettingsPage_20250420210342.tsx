import { Input, Button } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { Box, Heading } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/AuthContext";
import { db } from "../../configs/firebase";
import { uploadLogo, updateUserSettings } from "../../utils/firebaseHelpers";
import { Select } from "@chakra-ui/select"

const SettingsPage = () => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: "",
    role: "guest",
    theme: "light",
    fontColor: "#000000",
    businessName: "",
    businessAddress: "",
    logoFile: null,
    logoURL: "",
  });

  useEffect(() => {
    // Fetch and set existing settings
    if (user) {
      const fetchSettings = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm((prev) => ({ ...prev, ...docSnap.data() }));
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
    theme: form.theme,
    fontColor: form.fontColor,
    businessName: form.businessName,
    businessAddress: form.businessAddress,
    logoURL,
  });
}

      alert("Settings updated!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings.");
    }
  };

  return (
    <Box>
      <Heading>Settings</Heading>

      <Input name="name" value={form.name} onChange={handleChange} placeholder="Name" />
      <Select name="role" value={form.role} onChange={handleChange}>
        <option value="guest">Guest</option>
        <option value="basic">Basic</option>
        <option value="admin">Admin</option>
        <option value="professional">Professional</option>
        <option value="enterprise">Enterprise</option>
      </Select>
      <Select name="theme" value={form.theme} onChange={handleChange}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </Select>
      <Input type="color" name="fontColor" value={form.fontColor} onChange={handleChange} />
      <Input name="businessName" value={form.businessName} onChange={handleChange} placeholder="Business Name" />
      <Input name="businessAddress" value={form.businessAddress} onChange={handleChange} placeholder="Business Address" />
      <Input type="file" onChange={handleLogoChange} />
      {/* {form.logoURL && <Image src={form.logoURL} boxSize="100px" />} */}

      <Button mt={4} onClick={handleSubmit}>Update Settings</Button>
    </Box>
  );
};

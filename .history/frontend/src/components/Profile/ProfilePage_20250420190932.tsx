// pages/ProfilePage.tsx
import { Box, Heading, Text, Avatar, Spinner } from '@chakra-ui/react';
import { useAuth } from '../../auth/AuthContext'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/firebase';

const ProfilePage = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <Box p={6}>
      <Heading mb={4}>Profile</Heading>
      <Avatar.Root>
      <Avatar.Fallback name="Segun Adebayo" />
      {/* <Avatar.Image src="https://bit.ly/sage-adebayo" /> */}
    </Avatar.Root>
      <Text><strong>Name:</strong> {user?.displayName}</Text>
      <Text><strong>Email:</strong> {user?.email}</Text>
      {userData && (
        <>
          <Text><strong>Phone:</strong> {userData.phone}</Text>
          <Text><strong>Joined:</strong> {new Date(userData.createdAt).toLocaleDateString()}</Text>
        </>
      )}
    </Box>
  );
};

export default ProfilePage;

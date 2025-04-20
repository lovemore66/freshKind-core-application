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
    const fetchUser = async () => {
      if (!currentUser) return;

      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.error("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [currentUser]);

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

import { Box, Heading, Text,  Spinner } from '@chakra-ui/react';
import { useAuth } from '../../auth/AuthContext'
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../configs/firebase';
import { Image } from "@chakra-ui/image"

const ProfilePage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        setLoading(false); // No user, stop loading
        return;
      }
  
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
  
        if (userSnap.exists()) {
          setUserData(userSnap.data());
        } else {
          console.error("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false); 
      }
    };
  
    fetchUser();
  }, [user]);

  if (loading) return <Spinner />;

  return (
    <Box p={6}>
      <Heading mb={4}>Profile</Heading>
      <Image
      height={'40px'}
      borderRadius={'50%'}
      border={'2px solid pink'}
    src="https://bit.ly/sage-adebayo"
    fallbackSrc="https://bit.ly/sage-adebayo"
    alt="A Placeholder Image"
  />
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

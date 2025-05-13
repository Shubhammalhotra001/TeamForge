
// import React, { useEffect, useState } from 'react';
// import { Box, Heading, Text, VStack, Stack, Tag, TagLabel } from '@chakra-ui/react';
// import { auth, db } from '../firebase';
// import { doc, getDoc } from 'firebase/firestore';
// import Navbar from '../components/Navbar';

// export default function ProfileDashboard() {
//   const [userData, setUserData] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       const userRef = doc(db, 'users', auth.currentUser.uid);
//       const docSnap = await getDoc(userRef);
//       if (docSnap.exists()) {
//         setUserData(docSnap.data());
//       }
//     };

//     if (auth.currentUser) {
//       fetchProfile();
//     }
//   }, []);

//   return (
//     <>
//       <Navbar />
//       <Box p={8}>
//         <Heading mb={6}>Your Profile</Heading>

//         {!userData ? (
//           <Text>Loading...</Text>
//         ) : (
//           <VStack spacing={4} align="start">
//             <Box>
//               <Text fontWeight="bold">Bio:</Text>
//               <Text>{userData.bio || 'No bio provided'}</Text>
//             </Box>

//             <Box>
//               <Text fontWeight="bold" mb={1}>Tech Stack:</Text>
//               <Stack direction="row" wrap="wrap" gap={2}>
//                 {userData.techStack && userData.techStack.map((tech, i) => (
//                   <Tag key={i} colorScheme="blue" variant="solid" borderRadius="full">
//                     <TagLabel>{tech}</TagLabel>
//                   </Tag>
//                 ))}
//               </Stack>
//             </Box>

//             <Box>
//               <Text fontWeight="bold">Past Hackathons:</Text>
//               <Text>{userData.hackathons || 'None mentioned'}</Text>
//             </Box>
            
//           </VStack>
//         )}
//       </Box>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, VStack, Stack, Tag, TagLabel, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';

export default function ProfileDashboard() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    };

    if (auth.currentUser) {
      fetchProfile();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Box p={8}>
        <Heading mb={6}>Your Profile</Heading>

        {!userData ? (
          <Text>Loading...</Text>
        ) : (
          <VStack spacing={4} align="start">
            <Box>
              <Text fontWeight="bold">Bio:</Text>
              <Text>{userData.bio || 'No bio provided'}</Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={1}>Tech Stack:</Text>
              <Stack direction="row" wrap="wrap" gap={2}>
                {userData.techStack && userData.techStack.map((tech, i) => (
                  <Tag key={i} colorScheme="blue" variant="solid" borderRadius="full">
                    <TagLabel>{tech}</TagLabel>
                  </Tag>
                ))}
              </Stack>
            </Box>

            <Box>
              <Text fontWeight="bold">Past Hackathons:</Text>
              <Text>{userData.hackathons || 'None mentioned'}</Text>
            </Box>
            
            {/* Add the edit profile button */}
            <Link to="/profile-edit">
              <Button colorScheme="blue" mt={4}>Edit Profile</Button>
            </Link>
          </VStack>
        )}
      </Box>
    </>
  );
}

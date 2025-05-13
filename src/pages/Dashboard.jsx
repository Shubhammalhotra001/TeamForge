// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box, Heading, Text, VStack, Button, Spinner, Center,
  Image, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, Checkbox, CheckboxGroup,
  Stack, useDisclosure, Flex
} from '@chakra-ui/react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const availableSkills = [
  'React', 'Node.js', 'JavaScript', 'Python', 'CSS', 'HTML', 
  'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 
  'GraphQL', 'Firebase', 'GCP', 'Azure', 'Machine Learning', 
  'Data Science', 'TensorFlow', 'Django', 'Flask'
];

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [profilePicURL, setProfilePicURL] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          setUsername(data.username);
          setProfilePicURL(data.profilePicURL || '');
        } else {
          console.log('No user profile found!');
          navigate('/create-profile');
        }
      } catch (error) {
        console.error('Error fetching user profile: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  // Handle finding team matches
  const handleFindTeam = async () => {
    if (selectedSkills.length === 0) {
      alert('Please select at least one skill!');
      return;
    }

    try {
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const allUsers = [];
      usersSnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.uid !== auth.currentUser.uid) { // Exclude the current user
          allUsers.push(userData);
        }
      });

      const matched = allUsers.filter(user =>
        user.techStack && user.techStack.some(skill => selectedSkills.includes(skill))
      );

      setMatchedUsers(matched);
      onClose();
    } catch (error) {
      console.error('Error finding matches:', error);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Center h="80vh">
          <Spinner size="xl" color="teal.500" />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout>
      <MotionBox
        maxW="3xl"
        mx="auto"
        mt={10}
        p={6}
        bg="gray.50"
        rounded="xl"
        shadow="lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <VStack spacing={6} align="start">
          <Box display="flex" justifyContent="center" mb={4}>
            {profilePicURL ? (
              <Image
                borderRadius="full"
                boxSize="100px"
                src={profilePicURL}
                alt="Profile Picture"
                objectFit="cover"
              />
            ) : (
              <Box
                borderRadius="full"
                boxSize="100px"
                bg="gray.300"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Text color="white" fontSize="xl">
                  {username ? username[0].toUpperCase() : 'U'}
                </Text>
              </Box>
            )}
          </Box>

          <Heading size="xl" color="teal.500">
            Welcome, {username ? username : 'User'}!
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Glad to have you onboard! 🎉
          </Text>
          <Text fontSize="md" color="gray.500">
            Let's find the perfect hackathon for you 🚀
          </Text>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ width: '100%' }}>
            <Button
              as={RouterLink}
              to="/hackathon-explorer"
              colorScheme="teal"
              size="lg"
              width="full"
              mt={4}
              _hover={{ bg: 'teal.600' }}
            >
              Explore Hackathons
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ width: '100%' }}>
            <Button
              colorScheme="purple"
              size="lg"
              width="full"
              mt={2}
              onClick={onOpen}
              _hover={{ bg: 'purple.600' }}
            >
              Find My Team
            </Button>
          </motion.div>
        </VStack>
      </MotionBox>

      {/* Skill Selection Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Your Skills</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CheckboxGroup value={selectedSkills} onChange={setSelectedSkills}>
              <Stack spacing={3}>
                {availableSkills.map((skill, idx) => (
                  <Checkbox key={idx} value={skill}>
                    {skill}
                  </Checkbox>
                ))}
              </Stack>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="purple" onClick={handleFindTeam}>
              Find Matches
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Matched Users */}
      {matchedUsers.length > 0 && (
        <Box maxW="3xl" mx="auto" mt={10}>
          <Heading size="lg" mb={4}>
            Potential Team Matches ✨
          </Heading>
          <VStack spacing={4} align="stretch">
            {matchedUsers.map((user, idx) => (
              <Box
                key={idx}
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="lg"
                bg="white"
                _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                transition="all 0.3s ease"
              >
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    {user.profilePicURL ? (
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src={user.profilePicURL}
                        alt="Profile Picture"
                        objectFit="cover"
                        mr={4}
                      />
                    ) : (
                      <Box
                        borderRadius="full"
                        boxSize="50px"
                        bg="gray.300"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        mr={4}
                      >
                        <Text color="white" fontSize="xl">
                          {user.username ? user.username[0].toUpperCase() : 'U'}
                        </Text>
                      </Box>
                    )}
                    <Heading size="md">{user.username}</Heading>
                  </Flex>

                  <Text color="gray.500" fontSize="sm">
                    Skills: {user.techStack ? user.techStack.join(', ') : 'No skills listed'}
                  </Text>
                </Flex>
              </Box>
            ))}
          </VStack>
        </Box>
      )}
    </Layout>
  );
}
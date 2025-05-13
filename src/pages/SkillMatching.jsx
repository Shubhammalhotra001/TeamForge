// src/pages/SkillMatching.jsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Box, Heading, Text, VStack, Spinner, Center, SimpleGrid } from '@chakra-ui/react';
import Layout from '../components/Layout';
import UserCard from '../components/UserCard';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function SkillMatching() {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSkills } = location.state || {};
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!selectedSkills || selectedSkills.length === 0) {
      navigate('/dashboard');
      return;
    }

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const users = [];

        querySnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (docSnap.id !== auth.currentUser.uid) { // Exclude current user
            const userSkills = data.techStack || [];  // Adjusted to use 'techStack'
            const matchedSkills = userSkills.filter(skill => selectedSkills.includes(skill));
            const matchCount = matchedSkills.length;

            if (matchCount > 0) {
              users.push({
                id: docSnap.id,
                username: data.username,
                profilePicURL: data.profilePicURL || '',
                matchedSkills,
                totalSkills: userSkills.length,
                matchCount,
              });
            }
          }
        });

        // Sort users by the number of matched skills
        users.sort((a, b) => b.matchCount - a.matchCount);
        setMatchedUsers(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedSkills, navigate]);

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
        maxW="6xl"
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
        <VStack spacing={6} align="center">
          <Heading size="xl" color="teal.500">
            🎯 Matching Results
          </Heading>
          <Text fontSize="md" color="gray.600">
            Based on your selected skills: {selectedSkills.join(', ')}
          </Text>

          {matchedUsers.length === 0 ? (
            <Text fontSize="lg" color="red.500" mt={6}>
              No matching users found. Try selecting different skills!
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={8}>
              {matchedUsers.map(user => (
                <UserCard key={user.id} user={user} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </MotionBox>
    </Layout>
  );
}

// src/components/UserCard.jsx
import React from 'react';
import { Box, Image, Text, Badge, VStack, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

export default function UserCard({ user }) {
  const navigate = useNavigate();

  // Function to navigate to the user's profile page
  const handleProfileClick = () => {
    navigate(`/profile/${user.id}`);
  };

  return (
    <MotionBox
      p={5}
      shadow="md"
      borderWidth="1px"
      rounded="xl"
      bg="white"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <VStack spacing={4} align="center">
        {user.profilePicURL ? (
          <Image
            borderRadius="full"
            boxSize="80px"
            src={user.profilePicURL}
            alt={user.username}
            onClick={handleProfileClick}
            cursor="pointer"
          />
        ) : (
          <Box
            borderRadius="full"
            boxSize="80px"
            bg="gray.300"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={handleProfileClick}
            cursor="pointer"
          >
            <Text color="white" fontSize="2xl">
              {user.username ? user.username[0].toUpperCase() : 'U'}
            </Text>
          </Box>
        )}

        <Link onClick={handleProfileClick}>
          <Text fontWeight="bold" fontSize="lg" color="teal.500" _hover={{ textDecoration: 'underline' }}>
            {user.username}
          </Text>
        </Link>

        <Box>
          {user.matchedSkills.map((skill, idx) => (
            <Badge key={idx} colorScheme="teal" m={1}>
              {skill}
            </Badge>
          ))}
        </Box>

        <Text fontSize="sm" color="gray.500">
          {user.matchCount} skills matched
        </Text>
      </VStack>
    </MotionBox>
  );
}

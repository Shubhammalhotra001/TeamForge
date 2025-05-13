// src/pages/HackathonDetails.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

export default function HackathonDetails() {
  const { state } = useLocation();
  const hackathon = state?.hackathon;

  if (!hackathon) {
    return <Text>No hackathon data available.</Text>;
  }

  const handleRegisterNow = () => {
    window.open(hackathon['Registration Link'], '_blank');
  };

  return (
    <Box p={8}>
      <Heading mb={4}>{hackathon['Hackathon Name'] || 'Name not available'}</Heading>
      <Text fontWeight="bold">Date: {hackathon['Date'] || 'Not available'}</Text>
      <Text>Location: {hackathon['Location'] || 'Not available'}</Text>
      <Text>Theme: {hackathon['Theme'] || 'Not available'}</Text>
      <Text>Organizer: {hackathon['Organizer'] || 'Not available'}</Text>
      <Text>Prizes: {hackathon['Prizes'] || 'Not available'}</Text>
      {hackathon['Registration Link'] && (
        <Button onClick={handleRegisterNow} colorScheme="blue" mt={4}>
          Register Now
        </Button>
      )}
    </Box>
  );
}

// src/pages/HackathonExplorer.jsx
import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const S3_CSV_URL = 'https://teamforgedata.s3.us-east-1.amazonaws.com/2025_hackathons_updated.csv';

export default function HackathonExplorer() {
  const [hackathons, setHackathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(S3_CSV_URL)
      .then(response => response.text())
      .then(csv => {
        Papa.parse(csv, {
          header: true,
          complete: (results) => {
            setHackathons(results.data);
          }
        });
      })
      .catch(error => console.error("Error loading CSV:", error));
  }, []);

  const handleViewDetails = (hackathon) => {
    navigate('/hackathon-details', { state: { hackathon } });
  };

  return (
    <>
      <Navbar />
      <Box p={8}>
        <Heading mb={6}>Upcoming Hackathons</Heading>
        <Stack spacing={6}>
          {hackathons.map((hackathon, idx) => (
            <Box key={idx} p={4} shadow="md" borderWidth="1px" borderRadius="lg">
              <Text fontWeight="bold">{hackathon['Hackathon Name'] || 'Name not available'}</Text>
              <Text>Date: {hackathon['Date'] || 'Not available'}</Text>
              <Text>Location: {hackathon['Location'] || 'Not available'}</Text>
              <Button onClick={() => handleViewDetails(hackathon)} colorScheme="blue">View Details</Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </>
  );
}

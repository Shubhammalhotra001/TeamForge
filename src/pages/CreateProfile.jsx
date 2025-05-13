import React, { useState } from 'react';
import { Box, Button, Input, FormControl, FormLabel, VStack, Heading, Text, useToast, Image } from '@chakra-ui/react';
import { auth, db, storage } from '../firebase'; // Make sure storage is imported
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


export default function ProfileCreate() {
  const [bio, setBio] = useState('');
  const [hackathons, setHackathons] = useState('');
  const [techStack, setTechStack] = useState([]);
  const [username, setUsername] = useState('');
  const [profilePic, setProfilePic] = useState(null); // NEW
  const [previewPic, setPreviewPic] = useState(null); // NEW
  const toast = useToast();
  const navigate = useNavigate();

  const options = [
    { value: 'React', label: 'React' },
    { value: 'Node.js', label: 'Node.js' },
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'CSS', label: 'CSS' },
    { value: 'HTML', label: 'HTML' },
    { value: 'AWS', label: 'AWS' },
    { value: 'Docker', label: 'Docker' },
    { value: 'Kubernetes', label: 'Kubernetes' },
    { value: 'MongoDB', label: 'MongoDB' },
    { value: 'PostgreSQL', label: 'PostgreSQL' },
    { value: 'GraphQL', label: 'GraphQL' },
    { value: 'Firebase', label: 'Firebase' },
    { value: 'GCP', label: 'GCP' },
    { value: 'Azure', label: 'Azure' },
    { value: 'Machine Learning', label: 'Machine Learning' },
    { value: 'Data Science', label: 'Data Science' },
    { value: 'TensorFlow', label: 'TensorFlow' },
    { value: 'Django', label: 'Django' },
    { value: 'Flask', label: 'Flask' },
  ];

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfilePic(e.target.files[0]);
      setPreviewPic(URL.createObjectURL(e.target.files[0])); // Preview the selected pic
    }
  };
  
  console.log(auth.currentUser);
  const handleSubmit = async (e) => {
    console.log('Current user:', auth.currentUser);
    e.preventDefault();

    try {
      if (auth.currentUser) {
        let profilePicURL = '';

        if (profilePic) {
          const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
          await uploadBytes(storageRef, profilePic);
          profilePicURL = await getDownloadURL(storageRef);
        }

        const userRef = doc(db, 'users', auth.currentUser.uid);
        await setDoc(userRef, {
          username,
          bio,
          techStack: techStack.map((skill) => skill.value),
          hackathons,
          profilePicURL, // Save the image URL too
        });

        toast({
          title: 'Profile created successfully!',
          description: 'Your profile has been saved.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        navigate('/dashboard');
      } else {
        toast({
          title: 'Error',
          description: 'You must be logged in to create a profile.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      console.error('Full error details:', error.message);

      toast({
        title: 'Error',
        description: 'There was an issue saving your profile.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={8} borderRadius="lg" bg="gray.50" boxShadow="xl" maxW="md" margin="0 auto" mt={10}>
      <VStack spacing={6} align="start">
        <Heading size="lg" color="teal.500" textAlign="center">
          Create Your Profile
        </Heading>

        <FormControl>
          <FormLabel fontWeight="bold">Profile Picture</FormLabel>
          <Input type="file" accept="image/*" onChange={handleImageChange} />
          {previewPic && (
            <Image src={previewPic} alt="Preview" boxSize="100px" objectFit="cover" mt={2} rounded="full" />
          )}
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Choose a username"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Bio</FormLabel>
          <Input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Write a short bio..."
          />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Hackathons (Past Participation)</FormLabel>
          <Input
            type="text"
            value={hackathons}
            onChange={(e) => setHackathons(e.target.value)}
            placeholder="Mention hackathons"
          />
        </FormControl>

        <FormControl>
          <FormLabel fontWeight="bold">Tech Stack (Skills)</FormLabel>
          <Select
            isMulti
            options={options}
            value={techStack}
            onChange={(selected) => setTechStack(selected)}
            placeholder="Select your skills"
          />
        </FormControl>

        <Button onClick={handleSubmit} colorScheme="teal" width="full" mt={4}>
          Create Profile
        </Button>
      </VStack>
    </Box>
  );
}


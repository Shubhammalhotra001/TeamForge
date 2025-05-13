import React, { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { useNavigate, useLocation } from 'react-router-dom'; // ⬅️ import location
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { Box, Input, Button, Heading, FormControl, FormLabel, Text } from '@chakra-ui/react';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // ⬅️

  // Set login/signup mode based on query or route state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const mode = params.get('mode');
    if (mode === 'signup') setIsLogin(false);
    else if (mode === 'login') setIsLogin(true);
  }, [location.search]);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/dashboard');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        navigate('/create-profile');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box p={8} maxW="400px" mx="auto" mt="10">
      <Heading mb={6} textAlign="center">
        {isLogin ? 'Login' : 'Sign Up'}
      </Heading>
      {error && <Text color="red.500" mb={4}>{error}</Text>}

      <FormControl mb={4}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormControl>

      <FormControl mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormControl>

      <Button onClick={handleAuth} width="100%" colorScheme="teal" mb={4}>
        {isLogin ? 'Login' : 'Sign Up'}
      </Button>

      <Text textAlign="center">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
        <Button
          variant="link"
          colorScheme="blue"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </Button>
      </Text>
    </Box>
  );
}

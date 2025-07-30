// src/pages/NotFound.tsx

import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      height="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <VStack textAlign="center">
        <Heading fontSize="6xl">404</Heading>
        <Text fontSize="xl" mt={10}>
          This page doesn't exist — yet.
        </Text>
        <Text maxW="md">
          It’s possible the feature you're looking for will be available in the
          future, or the link is broken.
        </Text>
        <Button colorScheme="teal" onClick={() => navigate("/")}>
          Go back home
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFound;

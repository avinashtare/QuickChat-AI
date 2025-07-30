import {
  Box,
  AvatarGroup,
  Flex,
  HStack,
  Link,
  Button,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";

const Nav = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  const bg = useColorModeValue("#ecececff", "#0e0e0fff");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const activeColor = useColorModeValue("#00a552ff", "#c1dcffff");
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      p={4}
      paddingX={10}
      bg={bg}
      borderBottom="1px solid"
      borderColor={borderColor}
      w="full"
    >
      <Box fontWeight="bold" fontSize="xl">
        Logo
      </Box>

      <HStack gap={8} display={{ base: "none", md: "flex" }}>
        <Link
          href="/"
          color={activeColor}
          _hover={{ textDecoration: "underline" }}
        >
          Home
        </Link>
        <Link href="/services" _hover={{ textDecoration: "underline" }}>
          Services
        </Link>
        <Link href="/pricing" _hover={{ textDecoration: "underline" }}>
          Pricing
        </Link>
        <Link href="/about" _hover={{ textDecoration: "underline" }}>
          About
        </Link>
      </HStack>

      <HStack gap={4}>
        <Button size="sm" variant="solid" colorScheme="blue">
          Login
        </Button>
        <IconButton onClick={toggleColorMode} variant="outline" size="sm">
          {colorMode === "light" ? <LuSun /> : <LuMoon />}
        </IconButton>
        <AvatarGroup>
          <Avatar.Root>
            <Avatar.Fallback />
            <Avatar.Image />
          </Avatar.Root>
        </AvatarGroup>
      </HStack>
    </Flex>
  );
};

export default Nav;

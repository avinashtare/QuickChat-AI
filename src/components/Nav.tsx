import {
  Box,
  AvatarGroup,
  Flex,
  HStack,
  Button,
  IconButton,
  Avatar,
  Span,
} from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { NAVBAR_ITEMS } from "@/constant/navbar";
import { Link as RouteLink } from "react-router-dom";

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
        <Span>
          <RouteLink to="/">QuickChat</RouteLink>
        </Span>
      </Box>

      <HStack gap={8} display={{ base: "none", md: "flex" }}>
        {NAVBAR_ITEMS.map(({ label, path }) => (
          <Span
            key={path}
            color={path == "/" ? activeColor : undefined}
            _hover={{ textDecoration: "underline" }}
          >
            <RouteLink to={path}>{label}</RouteLink>
          </Span>
        ))}
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

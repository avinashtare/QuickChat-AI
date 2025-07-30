import { Box, Tag } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import type { ChatMessage } from "@/types/chats";
import MarkDownBox from "./MarkDownBox";

export const ChatBox = ({ role, message, id }: ChatMessage) => {
  const isUser = role.toLowerCase() === "user";
  const { colorMode } = useColorMode();

  const bg = useColorModeValue(
    isUser ? "blue.100" : "gray.100",
    isUser ? "blue.600" : "gray.700"
  );
  const color = useColorModeValue("black", "white");

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={isUser ? "flex-end" : "flex-start"}
      my={2}
      px={2}
    >
      <Tag.Root size="sm" colorScheme={isUser ? "blue" : "gray"} mb={1}>
        {role}
      </Tag.Root>
      {isUser ? (
        <Box
          maxW="90%"
          px={4}
          py={2}
          bg={bg}
          color={color}
          borderRadius="lg"
          boxShadow="sm"
          fontSize="md"
          whiteSpace="pre-wrap"
        >
          {message}
        </Box>
      ) : (
        <MarkDownBox
          key={id}
          theme={colorMode === "dark" ? "dark" : "light"}
          markDownString={message}
        />
      )}
    </Box>
  );
};

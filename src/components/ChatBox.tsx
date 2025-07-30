import { Box, Skeleton, Tag } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "./ui/color-mode";
import type { TChatMessage } from "@/types/chats";
import MarkDownBox from "./MarkDownBox";

export const ChatBox = ({ role, message, id }: TChatMessage) => {
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

export const LoadingChatBox = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"flex-start"}
      my={2}
      px={2}
    >
      <Tag.Root size="sm" colorScheme={"gray"} mb={1}>
        Assistant
      </Tag.Root>
      <Skeleton
        variant="shine"
        width="5"
        borderRadius="50%"
        height="5"
        css={{
          "--start-color": "colors.green.500",
          "--end-color": "colors.blue.500",
        }}
      />
    </Box>
  );
};

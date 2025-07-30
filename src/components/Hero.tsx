// Hero.tsx
import { Box, Button, Container, Heading, Input } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEffect, useRef, useState } from "react";
import type { AIChatResponse } from "@/types/puter";
import { type ChatMessage } from "@/types/chats";
import { ChatBox } from "@/components/ChatBox";
import { AiPormpt } from "@/constant/constant";

const Hero = () => {
  const bg = useColorModeValue("#ecececff", "#131316ff");
  const [inputValue, setInputValue] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { id: 1, role: "system", message: AiPormpt },
  ]);
  const ChatAreaRef = useRef<HTMLDivElement>(null);

  const askCurrentInputToAi = (): void => {
    const newMessage: ChatMessage = {
      id: Math.random(), // simple unique ID
      role: "User",
      message: inputValue.trim(),
    };

    setChatMessages((prev) => [...prev, newMessage]);

    setTimeout(() => {
      ChatAreaRef.current?.scrollTo({
        top: ChatAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 100);

    setInputValue(""); // clear input
  };

  const handleButtonClick = () => {
    askCurrentInputToAi();
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      askCurrentInputToAi();
    }
  };

  useEffect(() => {
    if (
      chatMessages.length > 0 &&
      chatMessages[chatMessages.length - 1].role === "User"
    ) {
      try {
        console.log(chatMessages);
        window.puter.ai
          .chat(JSON.stringify(chatMessages))
          .then((e: AIChatResponse) => {
            let aiData = e.message;

            const newMessage: ChatMessage = {
              id: Math.random(), // simple unique ID
              role: aiData.role,
              message: aiData.content.trim(),
            };

            setChatMessages((prev) => [...prev, newMessage]);

            setTimeout(() => {
              // Scroll to bottom whenever a new message is added
              if (ChatAreaRef.current) {
                ChatAreaRef.current.scrollTo({
                  top: ChatAreaRef.current.scrollHeight,
                  behavior: "smooth",
                });
              }
            }, 100);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [chatMessages]);

  return (
    <Box flex="1" display="flex" flexDirection="column" paddingTop={10}>
      <Container ref={ChatAreaRef} height={"90vh"} overflowY="scroll">
        <Heading textAlign="center" size="2xl">
          Welocme To Chat
        </Heading>
        <Box>
          {chatMessages.map((msg) =>
            msg.role != "system" ? (
              <ChatBox
                key={msg.id}
                id={msg.id}
                role={msg.role}
                message={msg.message}
              />
            ) : null
          )}
        </Box>
        <Box marginBottom="15vh"></Box>
      </Container>
      <Box
        position="absolute"
        bottom={0}
        paddingBottom={10}
        paddingTop={5}
        width="full"
      >
        <Container
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={5}
        >
          <Box
            bg={bg}
            width="full"
            padding={5}
            rounded={10}
            display="flex"
            gap={5}
          >
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Etner anyting..."
              onKeyDown={handleKeyDown}
            />
            <Button rounded="10px" onClick={handleButtonClick}>
              Send
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;

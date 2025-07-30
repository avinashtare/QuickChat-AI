// Hero.tsx
import { Box, Button, Container, Heading, Input } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEffect, useRef, useState } from "react";
import { type ChatMessage } from "@/types/chats";
import { ChatBox, LoadingChatBox } from "@/components/ChatBox";
import { AiPormpt } from "@/constant/constant";
import { askAi } from "@/services/chat.puter";

const Hero = () => {
  // dark mode custom color
  const bg = useColorModeValue("#ffffff", "#000000");

  // element input state
  const [inputValue, setInputValue] = useState("");
  // processing state
  const [isAiChatProcessing, setIsAiChatProcessing] = useState<boolean>(false);

  // chat message obj
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    // sytem prompt
    { id: 1, role: "system", message: AiPormpt, timestamp: Date.now() },
  ]);

  // chat are scroll element
  const ChatAreaRef = useRef<HTMLDivElement>(null);

  const askCurrentInputToAi = (): void => {
    // create new user message
    const newMessage: ChatMessage = {
      id: Math.random(),
      role: "User",
      message: inputValue.trim(),
      timestamp: Date.now(),
    };

    // add to chat
    setChatMessages((prev) => [...prev, newMessage]);

    // go to bottom
    ScrollToBottom();
    setInputValue(""); // clear input
  };

  // handle click send button
  const handleButtonClick = () => {
    askCurrentInputToAi();
  };

  // handle key down event
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == "Enter") {
      askCurrentInputToAi();
    }
  };

  // if new message appeares call ai
  useEffect(() => {
    const lastMessage = chatMessages[chatMessages.length - 1];

    if (chatMessages.length > 0 && lastMessage.role === "User") {
      (async () => {
        try {
          // set as ai is processing
          setIsAiChatProcessing(true);
          // console.log(chatMessages);
          const newMessage = await askAi({ chat: chatMessages });

          setIsAiChatProcessing(false);
          // if there is error
          if (newMessage instanceof Error) {
            return console.log(newMessage as Error);
          }

          setChatMessages((prev) => [...prev, newMessage]);

          // scroll to bottom
          ScrollToBottom();
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [chatMessages]);

  // scroll to button chat
  const ScrollToBottom = (time: number = 100) => {
    setTimeout(() => {
      // Scroll to bottom whenever a new message is added
      if (ChatAreaRef.current) {
        ChatAreaRef.current.scrollTo({
          top: ChatAreaRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, time);
  };

  return (
    <Box flex="1" display="flex" flexDirection="column" paddingTop={10}>
      <Container ref={ChatAreaRef} height={"90vh"} overflowY="scroll">
        <Heading textAlign="center" size="2xl">
          Welocme To QuickChat
        </Heading>
        <Box>
          {/* // laod all chats  */}
          {chatMessages.map((msg) =>
            msg.role != "system" ? (
              <ChatBox
                key={msg.id}
                id={msg.id}
                role={msg.role}
                message={msg.message}
                timestamp={Date.now()}
              />
            ) : null
          )}
        </Box>
        {/* if chat is processing */}
        {isAiChatProcessing && <LoadingChatBox />}
        <Box marginBottom="15vh"></Box>
      </Container>
      <Box
        position="absolute"
        bottom={0}
        paddingBottom={8}
        paddingTop={4}
        width="full"
        bg={bg}
      >
        <Container
          display="flex"
          alignItems="center"
          justifyContent="center"
          gap={5}
        >
          <Box width="full" padding={5} rounded={10} display="flex" gap={5}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Etner anyting..."
              onKeyDown={handleKeyDown}
              disabled={isAiChatProcessing}
            />
            <Button
              rounded="10px"
              onClick={handleButtonClick}
              disabled={isAiChatProcessing}
            >
              Send
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Hero;

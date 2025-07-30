// Hero.tsx
import { Box, Button, Container, Heading, Input, Span } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEffect, useRef, useState } from "react";
import { type TChatMessage, type TChatSession } from "@/types/chats";
import { ChatBox, LoadingChatBox } from "@/components/ChatBox";
import { AiPormpt } from "@/constant/constant";
import { askAi } from "@/services/chat.puter";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetChat, SetChatSession } from "@/utils/chat.localstorage";
import { v4 as uuidv4 } from "uuid";

const Chat = () => {
  // react router dom
  let navigate = useNavigate();
  let location = useLocation();

  // check id exists
  const { id } = useParams();

  // chat message obj defualt
  const [chatSession, setChatSession] = useState<TChatSession>({
    id: uuidv4(),
    title: "",
    createdAt: Date.now(),
    updatedAt: Date.now(),
    messages: [],
  });

  // add messages to chat session object
  const addMessage = (message: TChatMessage) => {
    setChatSession((prev) => {
      return { ...prev, messages: [...prev.messages, message] };
    });
  };

  // add data to local stoarge
  useEffect(() => {
    if (chatSession.messages.length > 1) {
      // set localsorage
      SetChatSession(chatSession);
    }
  }, [chatSession]);

  const hasRun = useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    // check chats already exist using path
    if (id && location.pathname != "/") {
      // fetch data form params id
      let isSessionDataExist = GetChat(id);

      // if user id not valid
      if (!isSessionDataExist) {
        navigate("/");
        return;
      }

      // finnally get object
      let chatSessionData = isSessionDataExist as TChatSession;

      // set localstorage data in context
      setChatSession(chatSessionData);

      // after loading message scrol to bottom
      ScrollToBottom();
    }
    // it's new chat
    else {
      // sytem prompt
      let SystemPrompt = {
        id: 1,
        role: "system",
        message: AiPormpt,
        timestamp: Date.now(),
      };
      // set system prompt first time
      addMessage(SystemPrompt);
    }
  }, []);

  // dark mode custom color
  const bg = useColorModeValue("#ffffff", "#000000");

  // element input state
  const [inputValue, setInputValue] = useState("");
  // processing state
  const [isAiChatProcessing, setIsAiChatProcessing] = useState<boolean>(false);

  // chat are scroll element
  const ChatAreaRef = useRef<HTMLDivElement>(null);

  // handling user input
  const askCurrentInputToAi = (): void => {
    if (chatSession.id !== location.pathname.replace("/c/", "")) {
      navigate(`/c/${chatSession.id}`, { replace: true });
    }
    // create new user message
    const newMessage: TChatMessage = {
      id: Math.random(),
      role: "User",
      message: inputValue.trim(),
      timestamp: Date.now(),
    };

    // add to chat
    addMessage(newMessage);

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
    const lastMessage = chatSession.messages[chatSession.messages.length - 1];

    if (chatSession.messages.length > 0 && lastMessage.role === "User") {
      (async () => {
        try {
          // set as ai is processing
          setIsAiChatProcessing(true);
          // console.log(chatSession.messages);
          const aiResponseMessage = await askAi({ chat: chatSession.messages });

          setIsAiChatProcessing(false);
          // if there is error
          if (aiResponseMessage instanceof Error) {
            return console.log(aiResponseMessage as Error);
          }

          // set message in messages
          addMessage(aiResponseMessage);

          // scroll to bottom
          ScrollToBottom();
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [chatSession.messages]);

  // scroll to button chat
  const ScrollToBottom = (time: number = 200) => {
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
      <Container
        ref={ChatAreaRef}
        height={"90vh"}
        overflowY="scroll"
        paddingTop="8vh"
      >
        <Box display={chatSession.messages.length > 1 ? "none" : "block"}>
          <Heading textAlign="center" color="orange.400" size="5xl">
            Welocme To QuickChat
          </Heading>

          <Span display="block" textAlign="center">
            A fast, minimal AI chat tool built for{" "}
            <Span color="teal.600">security </Span> and{" "}
            <Span color="pink.600">speed.</Span>
          </Span>
        </Box>
        <Box>
          {/* // laod all chats  */}
          {chatSession.messages.map((msg) =>
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

export default Chat;

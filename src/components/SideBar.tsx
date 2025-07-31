import { Box, ColorSwatchMix, Image, Span } from "@chakra-ui/react";
import {
  BadgePlus,
  ChevronsLeftRight,
  Search,
  Image as ImageIcon,
  Ellipsis,
} from "lucide-react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useEffect, useState, type ReactNode } from "react";
import { SideBar_ITEMS, type SideBarItems } from "@/constant/links.constant";
import { Link } from "react-router-dom";
import { getAllChatTitleId } from "@/utils/chat.localstorage";

const SideBar = () => {
  const colapsIconColor = useColorModeValue("#ecececff", "#5e5c5c67");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const [isHoverOnSideBar, setisHoverOnSideBar] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

  const [AllChatHistory, setChatHistory] = useState<
    Array<{ title: string; id: string }>
  >([]);

  useEffect(() => {
    if (isHoverOnSideBar && !isSideBarOpen) {
      document.body.style.cursor = "col-resize";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isHoverOnSideBar]);

  useEffect(() => {
    if (isSideBarOpen) {
      document.body.style.cursor = "default";
    }

    // laod data from localhost
    setChatHistory(getAllChatTitleId());
  }, []);

  return (
    <Box
      width={isSideBarOpen ? "300px" : "60px"}
      style={{ transition: "width 0.5s ease-in-out" }}
      height="100vh"
      borderRight={isHoverOnSideBar ? "3px solid" : "1px solid"}
      borderColor={borderColor}
      padding="10px"
      display="flex"
      flexDirection="column"
      paddingTop="20px"
      onClick={() => {
        !isSideBarOpen && setIsSideBarOpen(true);
      }}
      onMouseEnter={() => setisHoverOnSideBar(true)}
      onMouseLeave={() => setisHoverOnSideBar(false)}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="left"
        flexDirection="row"
        cursor="pointer"
        width="100%"
        height="40px"
        padding="5px"
      >
        {isHoverOnSideBar ? (
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexDirection="row"
            gap={2}
          >
            <Image src={window.location.origin + "/logo.png"} width="50px" />
            <ChevronsLeftRight
              onClick={() => setIsSideBarOpen(false)}
              style={{ background: colapsIconColor, borderRadius: "5px" }}
              width="35px"
              height="35px"
            />
          </Box>
        ) : (
          <Box>
            <Image src={window.location.origin + "/logo.png"} width="50px" />
          </Box>
        )}
      </Box>
      {/* other icons */}
      <Box
        marginTop="25px"
        display="flex"
        flexDirection="column"
        justifyContent="left"
        gap={2}
        onClick={(event) => event.stopPropagation()}
      >
        {SideBar_ITEMS.map(({ icon: Icon, isLink, label, path }) => (
          <ShowIcon
            key={label}
            isLink={isLink}
            path={path}
            label={label}
            isSideBarOpen={isSideBarOpen}
          >
            <Icon />
          </ShowIcon>
        ))}
      </Box>
      {/* chat history load */}
      <Box
        marginTop="25px"
        className="default-scroll"
        overflowY="scroll"
        overflowX="hidden"
        scrollBehavior="smooth"
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="left"
        gap={2}
        style={{
          opacity: isSideBarOpen ? 1 : 0,
          transition: isSideBarOpen ? "opacity 2s ease" : "opacity 0.3s ease",
        }}
      >
        <Span fontSize="1xl">Chats</Span>
        <Box>
          {AllChatHistory.map(({ id, title }) => (
            <ChatBoxHisotrySelect key={id} title={title} path={`/c/${id}`} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

const ChatBoxHisotrySelect = ({
  title,
  path,
}: {
  title: string;
  path: string;
}) => {
  const bgColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius="5px"
      _hover={{ backgroundColor: bgColor }}
    >
      <Box width="90%" overflow="hidden">
        <Link
          to={path}
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "inline-block",
            maxWidth: "100%",
            padding: "4px 5px",
          }}
        >
          {title}
        </Link>
      </Box>
      <Box width="10%">
        <Ellipsis />
      </Box>
    </Box>
  );
};

interface ShowIconProps extends Omit<SideBarItems, "icon"> {
  children: React.ReactNode;
  label: string;
  isSideBarOpen: boolean;
}

const ShowIcon = ({
  children,
  label,
  isSideBarOpen,
  isLink,
  path,
}: ShowIconProps) => {
  const borderHoverColor = useColorModeValue("#ecececff", "#5e5c5c67");

  const Content = (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="left"
      cursor="pointer"
      flexWrap="nowrap"
      flexDirection="row"
      width="100%"
      height="40px"
      padding={2}
      borderRadius="5px"
      _hover={{ background: borderHoverColor }}
    >
      <Box display="flex" gap={4} alignItems="center">
        {children}
        <span
          style={{
            opacity: isSideBarOpen ? 1 : 0,
            transition: isSideBarOpen ? "opacity 2s ease" : "opacity 0.3s ease",
            pointerEvents: "none",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </span>
      </Box>
    </Box>
  );

  // Wrap in a Link if needed
  return isLink && path ? <Link to={path}>{Content}</Link> : Content;
};

export default SideBar;

import { Box, ColorSwatchMix, Image, Span } from "@chakra-ui/react";
import {
  BadgePlus,
  ChevronsLeftRight,
  Search,
  Image as ImageIcon,
} from "lucide-react";
import { useColorModeValue } from "./ui/color-mode";
import { useEffect, useState, type ReactNode } from "react";
import { SideBar_ITEMS, type SideBarItems } from "@/constant/links.constant";
import { Link } from "react-router-dom";

const SideBar = () => {
  const colapsIconColor = useColorModeValue("#ecececff", "#5e5c5c67");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const [isHoverOnSideBar, setisHoverOnSideBar] = useState<boolean>(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState<boolean>(false);

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
  });

  return (
    <Box
      width={isSideBarOpen ? "200px" : "60px"}
      style={{ transition: "width 0.5s ease-in-out" }}
      height="100vh"
      borderRight={isHoverOnSideBar ? "3px solid" : "1px solid"}
      borderColor={borderColor}
      padding="10px"
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

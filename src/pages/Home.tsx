import { Box } from "@chakra-ui/react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SideBar from "@/components/SideBar";

export const Home = () => {
  return (
    <Box minH="100vh" display="flex">
      <SideBar />
      <Box
        width="-webkit-fill-available"
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
        <Nav />
        <Hero />
      </Box>
    </Box>
  );
};

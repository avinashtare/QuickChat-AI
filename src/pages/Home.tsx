import { Box } from "@chakra-ui/react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { useEffect } from "react";

export const Home = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.puter.com/v2/";
    document.body.appendChild(script);
  }, []);

  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Nav />
      <Hero />
    </Box>
  );
};

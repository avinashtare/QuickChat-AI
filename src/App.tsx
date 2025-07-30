import { Provider } from "@/components/ui/provider";
import "@/css/markdown.css";
import { useEffect } from "react";
import { initPuter } from "@/services/puter";
import { Box } from "@chakra-ui/react";
import SideBar from "@/components/SideBar";
import Nav from "@/components/Nav";
import Routes from "@/Root.Routes";

function App() {
  useEffect(() => {
    return () => {
      initPuter();
    };
  }, []);

  return (
    <Provider>
      <Box minH="100vh" display="flex">
        <SideBar />
        <Box
          width="-webkit-fill-available"
          minH="100vh"
          display="flex"
          flexDirection="column"
        >
          <Nav />
          <Routes />
        </Box>
      </Box>
    </Provider>
  );
}

export default App;

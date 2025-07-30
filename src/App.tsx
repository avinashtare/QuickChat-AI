import { Provider } from "@/components/ui/provider";
import { Home } from "@/pages/Home";
import "@/css/markdown.css";
import { useEffect } from "react";
import { initPuter } from "@/services/puter";

function App() {
  useEffect(() => {
    return () => {
      initPuter();
    };
  }, []);

  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;

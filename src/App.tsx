import { Provider } from "@/components/ui/provider";
import { Home } from "@/pages/Home";
import "@/css/markdown.css";

function App() {
  return (
    <Provider>
      <Home />
    </Provider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import NotFound from "@/pages/Not_Found";
import { Home } from "@/pages/Home";
import Chat from "./pages/Chat";

const RootRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/c/:id" element={<Chat />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default RootRoutes;

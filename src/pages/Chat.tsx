import QuickChat from "@/components/QuickChat";
import { useParams } from "react-router-dom";

function Chat() {
  const { id } = useParams();

  return <QuickChat key={id} id={id} />;
}

export default Chat;

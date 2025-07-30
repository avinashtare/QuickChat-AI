import type { TChatSession } from "@/types/chats";
import { JsonParse } from "./utils";

export const GetAllChatsId = (): string[] => {
  // c/id
  const allLocalStorageItems: string[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    let item = localStorage.key(index);
    if (item?.startsWith("c/")) {
      allLocalStorageItems.push(item);
    }
  }
  return allLocalStorageItems;
};

export const GetChat = (itemId: string): TChatSession | boolean => {
  let itemData = localStorage.getItem("c/" + itemId);

  let parseData = JsonParse<TChatSession>(itemData);
  if (parseData.success && parseData.data?.id === itemId) {
    return parseData.data as TChatSession;
  }
  return false;
};

export const SetChatSession = (ChatSessionObj: TChatSession): void => {
  let ChatSessionData = JSON.stringify(ChatSessionObj);
  localStorage.setItem("c/" + ChatSessionObj.id, ChatSessionData);
};

import type { TChatSession } from "@/types/chats";
import { JsonParse } from "./utils";

export const GetAllChatsId = (): string[] => {
  // qchat:id
  const allLocalStorageItems: string[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    let item = localStorage.key(index);
    if (item?.startsWith("qchat:")) {
      allLocalStorageItems.push(item);
    }
  }
  return allLocalStorageItems;
};

export const GetChat = (itemId: string): TChatSession | boolean => {
  let itemData = localStorage.getItem("qchat:" + itemId);

  let parseData = JsonParse<TChatSession>(itemData);
  if (parseData.success && parseData.data?.id === itemId) {
    return parseData.data as TChatSession;
  }
  return false;
};

export const SetChatSession = (ChatSessionObj: TChatSession): void => {
  let ChatSessionData = JSON.stringify(ChatSessionObj);
  localStorage.setItem("qchat:" + ChatSessionObj.id, ChatSessionData);
};

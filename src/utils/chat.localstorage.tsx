import type { TChatSession } from "@/types/chats";
import { JsonParse } from "./utils";

export const GetAllChatsId = (): string[] => {
  // chat/id
  const allLocalStorageItems: string[] = [];
  for (let index = 0; index < localStorage.length; index++) {
    let item = localStorage.key(index);
    if (item?.startsWith("chat/")) {
      allLocalStorageItems.push(item);
    }
  }
  return allLocalStorageItems;
};

export const GetChat = (itemId: string): TChatSession | boolean => {
  let itemData = localStorage.getItem("chat/" + itemId);

  let parseData = JsonParse<TChatSession>(itemData);
  if (parseData.success && parseData.data?.id === itemId) {
    return parseData.data as TChatSession;
  }
  return false;
};

export const SetChatSession = (ChatSessionObj: TChatSession): void => {
  let ChatSessionData = JSON.stringify(ChatSessionObj);
  localStorage.setItem("chat/" + ChatSessionObj.id, ChatSessionData);
};

export const getAllChatTitleId = (): Array<{ title: string; id: string }> => {
  const chatIds = GetAllChatsId();
  const TitleAndId: Array<{ title: string; id: string }> = [];

  chatIds.forEach((e) => {
    let ChatData = JsonParse<TChatSession>(localStorage.getItem(e));
    if (ChatData.success && ChatData.data?.id) {
      TitleAndId.push({ id: ChatData.data?.id, title: ChatData.data?.title });
    }
  });
  return TitleAndId;
};

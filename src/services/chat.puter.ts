import type { ChatMessage } from "@/types/chats";
import type { AIChatResponse } from "@/types/puter";

export const askAi = async ({
  chat,
}: {
  chat: ChatMessage[];
}): Promise<ChatMessage | Error> => {
  return new Promise((reslove, reject) => {
    try {
      window.puter.ai.chat(JSON.stringify(chat)).then((e: AIChatResponse) => {
        let aiData = e.message;

        reslove({
          id: Math.random(),
          role: aiData.role,
          message: aiData.content.trim(),
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

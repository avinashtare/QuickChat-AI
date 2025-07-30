import type { TChatMessage } from "@/types/chats";
import type { AIChatResponse } from "@/types/puter";

export const askAi = async ({
  chat,
}: {
  chat: TChatMessage[];
}): Promise<TChatMessage | Error> => {
  return new Promise((reslove, reject) => {
    try {
      window.puter.ai.chat(JSON.stringify(chat)).then((e: AIChatResponse) => {
        let aiData = e.message;

        reslove({
          id: Math.random(),
          role: aiData.role,
          message: aiData.content.trim(),
          timestamp: Date.now(),
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

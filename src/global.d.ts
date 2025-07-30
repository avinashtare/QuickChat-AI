import type { ChatMessage } from "./types/chats";

// 👇 Add this to make it a module
export {};
declare global {
  interface Window {
    puter: {
      ai: {
        chat: (
          input: string | ChatMessage[],
          options?: { model: strnig }
        ) => Promise<any>;
      };
    };
  }
}

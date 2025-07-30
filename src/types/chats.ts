export type TChatMessage = {
  id: number;
  role: string;
  message: string;
  timestamp: number;
};

export type TChatSession = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];

  model?: string;
  isPinned?: boolean;
  tags?: string[];
  archived?: boolean;
};

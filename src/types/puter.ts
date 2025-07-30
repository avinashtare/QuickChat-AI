export type AIChatResponse = {
  index: number;
  message: {
    role: string;
    content: string;
    refusal: null | string;
    annotations: any[]; // Can be further typed if structure is known
  };
  logprobs: null | any; // You can refine this if you know the structure
  finish_reason: string;
  usage: {
    type: "prompt" | "completion";
    model: string;
    amount: number;
    cost: number;
  };
};

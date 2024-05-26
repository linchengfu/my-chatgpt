import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type ChatMessage = {
  id: string;
  message: {
    role: "user" | "assistant" | "system" | "tool";
    content: string;
  };
  parsedHtml: string;
};

export const chatListAtom = atom<ChatMessage[]>([]);

export const apiKeyAtom = atomWithStorage("apiKey", "");

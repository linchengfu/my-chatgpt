import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export type ChatMessage = {
  id: string;
  type: "gpt" | "user";
  content: string;
};

export const chatListAtom = atom<ChatMessage[]>([]);

export const apiKeyAtom = atomWithStorage("apiKey", "");

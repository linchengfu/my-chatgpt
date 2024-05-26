export type Message = {
  content: string;
  role: "user" | "assistant" | "system" | "tool";
};
export type ChoiceType = {
  index: number;
  message: Message;
  finish_reason: string;
};

export type MessageResponse = {
  id: string;
  choices: ChoiceType[];
};

export const sendMessage = async (messages: Message[], apiKey: string) => {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      // "HTTP-Referer": `${YOUR_SITE_URL}`, // Optional, for including your app on openrouter.ai rankings.
      // "X-Title": `${YOUR_SITE_NAME}`, // Optional. Shows in rankings on openrouter.ai.
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "mistralai/mistral-7b-instruct:free",
      messages,
    }),
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(data?.error?.message);
  } else {
    return data as MessageResponse;
  }
};

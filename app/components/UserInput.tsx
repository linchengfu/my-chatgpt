"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { OutlinedInput } from "@mui/material";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import AutorenewTwoToneIcon from "@mui/icons-material/AutorenewTwoTone";
import { sendMessage } from "../api";
import { useAtom } from "jotai";
import { ChatMessage, apiKeyAtom, chatListAtom } from "../store";
import { styled, keyframes } from "@mui/material/styles";
import { marked } from "marked";

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const AutorenewTwoToneIconWrapper = styled(AutorenewTwoToneIcon)(
  ({ theme }) => ({
    animation: `1s ${rotate} linear infinite`,
  })
);

export default function UserInput() {
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const [chatList, setChatList] = useAtom(chatListAtom);

  const [keyValue] = useAtom(apiKeyAtom);
  const send = async () => {
    if (!keyValue || !inputValue || loading) return;

    const userChat: ChatMessage = {
      id: Date.now().toString(),
      message: {
        content: inputValue,
        role: "user",
      },
      parsedHtml: inputValue,
    };
    const newList = [...chatList, userChat];

    setChatList((prev) => [...prev, userChat]);

    const Messages = newList.map((item) => item.message);

    try {
      setLoading(true);
      const res = await sendMessage(Messages, keyValue);
      console.log("🚀 ~ send ~ res:", res);

      const parsedHtml = await marked.parse(res.choices[0].message.content);
      const choices = res.choices;
      const gptChat: ChatMessage = {
        id: res.id,
        message: {
          role: choices[choices.length - 1].message.role,
          content: choices[choices.length - 1].message.content,
        },
        parsedHtml,
      };

      setChatList((prev) => [...prev, gptChat]);
    } catch (error) {
      console.error("🚀 ~ send ~ error:", error);
    } finally {
      setInputValue("");
      setLoading(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 阻止默认的回车换行行为

      send();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
      marginBottom="24px"
    >
      <OutlinedInput
        maxRows={5}
        multiline
        fullWidth
        onChange={handleInputChange}
        value={inputValue}
        placeholder='给"chatgpt"发送消息'
        id="fullWidth"
        aria-describedby="outlined-weight-helper-text"
        onKeyDown={handleKeyDown}
        endAdornment={
          loading ? (
            <AutorenewTwoToneIconWrapper />
          ) : (
            <ArrowUpwardIcon sx={{ cursor: "pointer" }} onClick={send} />
          )
        }
        sx={{ alignItems: "flex-start" }}
      />
    </Box>
  );
}

"use client";

import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import { chatListAtom } from "../store";
import { useAtom } from "jotai";
import { Box, styled } from "@mui/material";
import Image from "next/image";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const PreWrapper = styled("pre")(({ theme }) => ({
  whiteSpace: "pre-wrap",
  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
}));

export default function ChatList() {
  const [chatList] = useAtom(chatListAtom);
  const listRef = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    console.log("listRef", listRef.current);
    if (listRef.current) {
      // 滚动到底部
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [chatList]);

  return !chatList.length ? (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="12px"
      height="100%"
    >
      <Image
        src="/chatgpt.svg"
        alt="chatgpt Logo"
        width={180}
        height={38}
        priority
      />
      <Typography textAlign={"center"}>今天能帮您些什么？</Typography>
    </Box>
  ) : (
    <List
      ref={listRef}
      sx={{ width: "100%", bgcolor: "background.paper", overflowY: "auto" }}
    >
      {chatList.map((chat) => {
        return (
          <ListItem alignItems="flex-start" key={chat.id}>
            <ListItemAvatar>
              {chat.message.role !== "user" ? (
                <Image
                  src="/chatgpt.svg"
                  alt="chatgpt Logo"
                  width={24}
                  height={24}
                  priority
                />
              ) : (
                <AccountCircleIcon sx={{ width: 24, height: 24 }} />
              )}
            </ListItemAvatar>
            <PreWrapper
              dangerouslySetInnerHTML={{ __html: chat.parsedHtml }}
            ></PreWrapper>
          </ListItem>
        );
      })}
    </List>
  );
}

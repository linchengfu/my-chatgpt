"use client";

import { Box, Container } from "@mui/material";
import ChatList from "./components/ChatList";
import UserInput from "./components/UserInput";
import HeaderBar from "./components/Header";

export default function Home() {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <HeaderBar />
      <Box
        sx={{
          bgcolor: "white",
          maxWidth: "1000px",
          margin: "0 auto",
          height: "calc(100vh - 64px)",
        }}
        width="80%"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        flex="1 1 auto"
      >
        <ChatList />
        <UserInput />
      </Box>
    </Container>
  );
}

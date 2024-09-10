import { Box, Container } from "@mui/material";
import ChatList from "@/components/ChatList";
import UserInput from "@/components/UserInput";
import HeaderBar from "@/components/Header";

import type { Metadata } from "next";
import BlurIn from "@/components/magicui/blur-in";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "Mistral 7B chat bot",
  description: "Mistral 7B Instruct (free) chat bot",
};

async function getData() {
  // 接口每次调用都会返回一个随机的猫猫图片数据
  const res = await fetch("https://api.thecatapi.com/v1/images/search", {
    next: {
      revalidate: 30,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default function Home() {
  const t = useTranslations("HomePage");
  // const data = await getData();
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <HeaderBar />
      <h1>{t("title")}</h1>

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

        <BlurIn word="ChatGPT" />
        <UserInput />
      </Box>
    </Container>
  );
}

"use client";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { useAtom } from "jotai";
import { apiKeyAtom } from "../store";

export default function HeaderBar() {
  const [key, setKey] = useAtom(apiKeyAtom);

  const [value, setValue] = React.useState("");

  const setApiKey = () => {
    setKey(value);
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    setValue(key);
  }, [key]);

  return (
    <Box flexGrow={0}>
      <AppBar position="static" sx={{ boxShadow: "none" }}>
        <Toolbar sx={{ background: "white" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="#000000de"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ChatGPT
          </Typography>
          <TextField
            size="small"
            value={value}
            onChange={handleInputChange}
            id="outlined-basic"
            label="Input OpenRouter API key"
            variant="outlined"
            onKeyDown={setApiKey}
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

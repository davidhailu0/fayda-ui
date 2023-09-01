"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function DigitalIDForm() {
  const [id, setID] = useState("");
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/registration");
  }, []);

  const onTextType = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.match(/^\d+$/g) || e.target.value == "") {
      setID(e.target.value);
    }
  };

  const onSubmitClk = (e: FormEvent) => {
    e.preventDefault();
    const regex = new RegExp(/^\d{12}$/g);
    if (regex.test(id)) {
      router.push("/registration");
    }
  };
  return (
    <Box
      component="form"
      onSubmit={onSubmitClk}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ToastContainer position="bottom-left" />
      <Typography mb="3rem" variant="h4">
        Please Enter your Digital ID Number
      </Typography>
      <TextField
        value={id}
        onChange={onTextType}
        label="Digital ID"
        sx={{ width: "25rem" }}
      />
      <Button type="submit" variant="contained" sx={{ mt: "2rem" }}>
        Submit
      </Button>
    </Box>
  );
}

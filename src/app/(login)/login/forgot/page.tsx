"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email) {
      setError("Fill the field");
      return;
    }

    setError("");
    setInfo("");
    setLoading(true);

    const result = await api.forgotPassword(email);
    setLoading(false);
    if (result.error) setError(result.error);
    else setInfo("Verify your mailbox");
  };

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: "center", mt: 2, color: "#555" }}
      >
        Do you wish to recover your password?
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Enter your email"
          name="email"
          // required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          disabled={loading}
        />
        <Button
          type={"submit"}
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Wait..." : "Recover your password"}
        </Button>

        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
        {info && (
          <Alert variant="filled" severity="success" sx={{ mt: 3 }}>
            {info}
          </Alert>
        )}
      </Box>
    </>
  );
};

export default Page;

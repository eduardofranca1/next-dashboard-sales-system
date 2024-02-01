"use client";

import { api } from "@/libs/api";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useState, FormEvent } from "react";

const Page = () => {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password || !confirmPassword) {
      setError("Fill the fields");
      setInfo("");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords must to be equal");
      setInfo("");
      return;
    }
    setError("");
    setInfo("");
    setLoading(true);
    const result = await api.redefinePassword(password, confirmPassword, "123");
    setLoading(false);
    if (result.error) setError(result.error);
    else {
      setInfo("Success");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: "center", mt: 2, color: "#555" }}
      >
        Hello **USER**, define your new password below
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="Enter your new password"
          name="password"
          type="password"
          // required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loading}
        />
        <TextField
          label="Confirm your new password"
          name="confirmPassword"
          type="password"
          // required
          fullWidth
          autoFocus
          sx={{ mb: 2 }}
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          disabled={loading}
        />
        <Button
          type={"submit"}
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Wait..." : "Confirm new password"}
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

"use client";

import { api } from "@/libs/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Alert,
} from "@mui/material";
import Link from "next/link";
import { useState, FormEvent } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Fill the fields");
      return;
    }

    setError("");
    setLoading(true);

    const result = await api.login(email, password);
    setLoading(false);
    if (result.error) setError(result.error);
  };

  return (
    <>
      <Typography
        component="p"
        sx={{ textAlign: "center", mt: 2, color: "#555" }}
      >
        Enter your credentials to log in to the dashboard
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
        <TextField
          label="Enter your password"
          name="password"
          type="password"
          // required
          fullWidth
          sx={{ mb: 2 }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          disabled={loading}
        />
        <Button
          type={"submit"}
          variant="contained"
          fullWidth
          disabled={loading}
        >
          {loading ? "Wait..." : "Sign in"}
        </Button>

        {error && (
          <Alert variant="filled" severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ mt: 3 }}>
          <MuiLink href="/login/forgot" variant="body2" component={Link}>
            Forgot you password?
          </MuiLink>
        </Box>
      </Box>
    </>
  );
};

export default Page;
